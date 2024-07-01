const initialEmployeeDetails = [
  {
    id: 1,
    FirstName: "Vrushali",
    LastName: "Haldankar",
    Age: 24,
    DateOfJoining: "Jan 1 2000",
    Title: "Manger",
    Department: "IT",
    EmployeeType: "Full Time",
  },
];
require("dotenv").config({ path: "env.env" });
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));

const myAppPort = process.env.UI_PORT;

app.listen(myAppPort, function () {
  console.log("App started on port 3000");
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
