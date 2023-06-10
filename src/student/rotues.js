const { Router } = require("express");
const controller = require("./controller");
const router = Router();

//we don't need a callback here we can directly call this function
//there is no need to pass the request and response here as well
router.get("/", controller.getStudents);
router.get("/:id",controller.getStudentById);
router.post("/",controller.addStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);
module.exports = router;
