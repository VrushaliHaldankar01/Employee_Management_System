require('dotenv').config({ path: './env.env' });
const { MongoClient } = require('mongodb');
let db;
const dbUrl = process.env.dbUrl;

async function dbConnect() {
  const dbclient = new MongoClient(
    'mongodb+srv://vrushhaldankar16:vrushali123@cluster0.j4lo0kc.mongodb.net/Employee',
    { useNewUrlParser: true }
  );
  db = (await dbclient.connect()).db();

  console.log('connected to databse');
  return db;
}
async function getNextSequence(field) {
  const result = await db
    .collection('counters')
    .findOneAndUpdate(
      { name: field },
      { $inc: { counter: 1 } },
      { returnOriginal: false },
      { new: true, upsert: true }
    );

  return result.counter;
}

async function getDbEmployee() {
  const query = { isDeleted: 1 }; // Including the isDeleted condition
  const employeelist = await db
    .collection('employeedata')
    .find(query)
    .toArray();
  return employeelist;
}

async function createinitialissues() {
  await db.collection('employeedata').insertMany(initialEmployeeDetails);
}
async function insertDbEmployee(employee) {
  await db.collection('employeedata').insertOne(employee);
}
//update employee data
async function updateDbEmployee(id, changes) {
  console.log('in update issue 1222', id);
  console.log('in update issue changes', changes);
  //   const db = getDb();

  if (
    changes.FirstName ||
    changes.LastName ||
    changes.Age ||
    changes.DateOfJoining ||
    changes.Title ||
    changes.Department ||
    changes.EmployeeType ||
    changes.currentStatus
  ) {
    const issue = await db.collection('employeedata').findOne({ id });
    Object.assign(issue, changes);
    // validate(issue);
  }
  await db.collection('employeedata').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('employeedata').findOne({ id });
  return savedIssue;
}
async function deleteDbEmployee(id, changes) {
  console.log('in update issue 1222', id);
  console.log('in update issue changes', changes);
  //   const db = getDb();
  changes = {};
  changes.isDeleted = 0;

  const employee = await db.collection('employeedata').findOne({ id });
  Object.assign(employee, changes);

  await db.collection('employeedata').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('employeedata').findOne({ id });
  console.log('saved Issue...' + savedIssue);
  return savedIssue;
}
async function getDbFilterEmployee(employeeType) {
  console.log('eeetttt', employeeType);
  const query = { EmployeeType: employeeType, isDeleted: 1 }; // Constructing the query object
  // const query = employeeType;
  console.log('Query:', query);
  const employeelist = await db
    .collection('employeedata')
    .find(query)
    .toArray();
  console.log('Filtered employees:', employeelist); // Log the filtered employees for debugging
  return employeelist;
}
async function getDBdetailsData(id) {
  const filter = {};
  console.log('in getDBdetailsData' + id); //if (id) id = 2;
  // console.log('in issues' + filter.id);
  const employee = await db.collection('employeedata').find({ id }).toArray();
  console.log('in issues' + employee);
  return employee;
}
module.exports = {
  getNextSequence,
  insertDbEmployee,
  getDbEmployee,
  dbConnect,
  getDbFilterEmployee,
  updateDbEmployee,
  getDBdetailsData,
  deleteDbEmployee,
};
