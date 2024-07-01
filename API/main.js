const fs = require('fs');
require('dotenv').config({ path: 'env.env' });
const {
  getNextSequence,
  insertDbEmployee,
  getDbEmployee,
  dbConnect,
  getDbFilterEmployee,
  updateDbEmployee,
  getDBdetailsData,
  deleteDbEmployee,
} = require('./db.js');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const app = express();
const initialEmployeeDetails = [
  {
    id: 1,
    FirstName: 'Vrushali',
    LastName: 'Haldankar',
    Age: 24,
    DateOfJoining: 'Jan 1 2000',
    Title: 'Manger',
    Department: 'IT',
    EmployeeType: 'Full Time',
  },
];

const myschema = fs.readFileSync('./graphqlSchema', 'utf-8');

async function addEmployee(_, { employee }) {
  employee.id = await getNextSequence('employeedata');
  employee.currentStatus = 1;
  employee.isDeleted = 1;
  await insertDbEmployee(employee);
  return employee;
}
let aboutMsg = 'This is about my API';
const resolvers = {
  Query: {
    about: getAboutMsg,
    employeeList: getEmployee,
    filterList: (_, { EmployeeType }) => filterData(EmployeeType),
    detailsList: (parent, { id }) => detailsData(id),
  },

  Mutation: {
    setAboutMessage,
    addEmployee,
    employeeUpdate,
    employeeDelete,
  },
};
function getAboutMsg() {
  return aboutMsg;
}
async function getEmployee() {
  // createinitialissues();

  return await getDbEmployee();
}
async function filterData(employeeType) {
  console.log('filterData', employeeType);
  return await getDbFilterEmployee(employeeType);
}
async function detailsData(id) {
  console.log('detailsData...' + id);
  return await getDBdetailsData(id);
}
function setAboutMessage(_, { msg }) {
  aboutMsg = msg;
  return aboutMsg;
}

async function employeeUpdate(_, { employee }) {
  console.log('Received employee:', employee);
  try {
    const { id, ...changes } = employee;
    const updatedIssue = await updateDbEmployee(id, changes);
    return updatedIssue;
  } catch (error) {
    console.error('Error updating issue:', error);
    throw error;
  }
}
async function employeeDelete(_, { employee }) {
  console.log('Received issue:', employee);
  try {
    const { id, ...changes } = employee;
    const updatedIssue = await deleteDbEmployee(id, changes);
    return updatedIssue;
  } catch (error) {
    console.error('Error updating issue:', error);
    throw error;
  }
}
const myPort = process.env.API_PORT;
const server = new ApolloServer({ typeDefs: myschema, resolvers });
server.start().then((res) => {
  server.applyMiddleware({ app, path: '/graphql' });
  dbConnect();
  app.listen(myPort, () => console.log('server started at port 8000'));
});
