//to create queries we need to call the db here
const { json } = require("body-parser");
const pool = require("../../db");
const queries = require("./queries");

//creating a function to query all the students present in the database
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //initially we will check if the email already exists, because if it exists then we won't add the user
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    // if (error) throw error;
    //console.log("outside the if condition");
    if (results.rows.length) {
      //console.log("inside the if condition");
      res.send("email exists");
    }
    //if the student's email id doesn't exist then we will add the student to the db
    pool.query(queries.addStudent,[name,email,age,dob], (error,results) =>{
        if(error) throw error;
        res.status(201).send("Student was successfully added to the db")
        console.log("student added to the db")
       // console.log(results);
    })
  });

};

const deleteStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id],(error,results) =>{
        const noStudentFound = !results.rows.length; //student with the passed id doesn't exist
        if(noStudentFound){ res.send("student doesn't exists"); }

        pool.query(queries.removeStudent,[id],(error,resuts)=>{
            if(error) throw error;
            res.status(200).send("student was deleted ")
            console.log(`student with the id ${id} was deleted`);
        })
        
    })
}


const updateStudent = (req,res) =>{
    const id = parseInt(req.params.id);
    const {name } = req.body;
    pool.query(queries.getStudentById,[id], (error,results)=>{
        const noStudentFound = !results.rows.length;
        if(noStudentFound) { res.send("Student doesn't exists");}

        pool.query(queries.updateStudent,[name, id ], (error,results) =>{
            if(error) throw error;
            res.status(200).send("the student detail was update successfully");
        })
    })
}
module.exports = { getStudents, getStudentById, addStudent, deleteStudent, updateStudent };
