const express = require("express");
const studentRoutes = require("./src/student/rotues");

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("this is the home page of the student application");
});
app.use("/api/v1/students", studentRoutes);
app.listen(port, () => {
  console.log("app is running on port 3000");
});
