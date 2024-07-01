import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeFilter from './employeeFilter.jsx';
import EmployeeAdd from './employeeAdd.jsx';
import EmployeeTable from './employeeTable.jsx';

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employeedetails: [] };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const query = `query {
        about
        employeeList {
          id,
            FirstName,
            LastName,
            Age,
            DateOfJoining,
            Title,
            Department,
            EmployeeType,
            currentStatus,
            isDeleted

           
        }
      }`;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    // setTimeout(()=>{
    this.setState({ employeedetails: result.data.employeeList }); //json data format in https://studio.apollographql.com/sandbox/explorer
    // },500);
  }
  async filterData(employeeType) {
    console.log('Filtering with employee type in filterdata: ' + employeeType);
    const query = `query FilterEmployee($EmployeeType: String!) {
    filterList(EmployeeType: $EmployeeType) {
      id,
      FirstName,
      LastName,
      Age,
      DateOfJoining,
      Title,
      Department,
      EmployeeType
      currentStatus,
      isDeleted
       
    }
    
    }`;
    const variables = {
      EmployeeType: employeeType,
    };

    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    console.log(result);
    this.setState({ employeedetails: result.data.filterList });
  }
  async createEmployee(employeedetails) {
    const query = `
      mutation {
        addEmployee(employee: {
          FirstName: "${employeedetails.FirstName}"
          LastName: "${employeedetails.LastName}"
          Age: "${employeedetails.Age}"
          DateOfJoining: "${employeedetails.DateOfJoining}"
          Title: "${employeedetails.Title}"
          Department: "${employeedetails.Department}"
          EmployeeType: "${employeedetails.EmployeeType}"
          currentStatus: ${employeedetails.currentStatus}
          isDeleted:${employeedetails.isDeleted}
        }) {
          id
          FirstName
          LastName
          Age
          DateOfJoining
          Title
          Department
          EmployeeType
          currentStatus
          isDeleted
        }
      }
    `;

    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    this.loadData();
  }

  filterEmployee = (employeeType) => {
    console.log('Employee type:', employeeType);
    this.filterData(employeeType);
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Employee details</h1>
        <EmployeeFilter filterEmployee={this.filterEmployee.bind(this)} />
        <EmployeeTable data={this.state.employeedetails} />
        <EmployeeAdd createEmployee={this.createEmployee.bind(this)} />
      </div>
    );
  }
}
