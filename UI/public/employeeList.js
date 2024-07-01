import React from 'react';
import ReactDOM from 'react-dom';
class EmployeeRow extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("tr", {
      key: this.props.employeedata.id
    }, /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.FirstName), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.LastName), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.Age), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.DateOfJoining), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.Title), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.Department), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.EmployeeType), /*#__PURE__*/React.createElement("td", {
      style: this.props.rowStyle
    }, this.props.employeedata.currentStatus));
  }
}
class EmployeeTable extends React.Component {
  render() {
    const rowStyle = {
      border: '1px solid silver',
      padding: '12px',
      backgroundColor: 'grey',
      color: 'white'
    };
    const tablestyle = {
      borderCollapse: 'collapse',
      marginTop: '20px',
      margin: 'auto',
      width: '100%'
    };
    const result = this.props.data.map(c => /*#__PURE__*/React.createElement(EmployeeRow, {
      key: c.id,
      employeedata: c,
      rowStyle: rowStyle
    }));
    return /*#__PURE__*/React.createElement("table", {
      style: tablestyle
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "FirstName"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "lastName"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Age"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "DateOfJoining"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Title"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Department"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "EmployeeType"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, result));
  }
}
class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ''
    };
  }
  onAddEmplyee = e => {
    e.preventDefault();
    const form = document.forms.addEmployee;
    const firstName = form.FirstName.value.trim();
    const lastName = form.LastName.value.trim();
    const dateOfJoining = form.DateOfJoining.value.trim();
    const age = parseInt(form.Age.value, 10);

    // Check if any of the required fields is empty
    if (!firstName || !lastName || isNaN(age) || !dateOfJoining) {
      this.setState({
        error: 'All fields are required'
      });
      return;
    }
    if (age < 20 || age > 70) {
      this.setState({
        error: 'Please enter a valid age between 20 and 70'
      });
      return;
    }

    // Separate validation for first name
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      this.setState({
        error: 'First name should contain only text'
      });
      return;
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      this.setState({
        error: 'Last name should contain only text'
      });
      return;
    }
    this.setState({
      error: ''
    });
    let employeedata = {
      FirstName: form.FirstName.value,
      LastName: form.LastName.value,
      Age: form.Age.value,
      DateOfJoining: form.DateOfJoining.value,
      Title: form.Title.value,
      Department: form.Department.value,
      EmployeeType: form.EmployeeType.value,
      currentStatus: 1
    };
    this.props.createEmployee(employeedata);
  };
  render() {
    const inputstyles = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    };
    const submitstyles = {
      width: '100%',
      backgroundColor: 'black',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    return /*#__PURE__*/React.createElement("form", {
      name: "addEmployee",
      onSubmit: this.onAddEmplyee,
      style: {
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '60px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "FirstName"
    }, "First Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "FirstName",
      name: "FirstName",
      placeholder: "Enter First Name",
      style: inputstyles
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "LastName"
    }, "Last Name:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "LastName",
      name: "LastName",
      placeholder: "Enter Last Name",
      style: inputstyles
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "Age"
    }, "Age:"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      id: "Age",
      name: "Age",
      placeholder: "Enter Age",
      style: inputstyles
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "DateOfJoining"
    }, "Date of Joining:"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      id: "DateOfJoining",
      name: "DateOfJoining",
      style: inputstyles
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "Title"
    }, "Title:"), /*#__PURE__*/React.createElement("select", {
      id: "Title",
      name: "Title",
      style: inputstyles
    }, /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "Department"
    }, "Department:"), /*#__PURE__*/React.createElement("select", {
      id: "Department",
      name: "Department",
      style: inputstyles
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "EmployeeType"
    }, "Employee Type:"), /*#__PURE__*/React.createElement("select", {
      id: "EmployeeType",
      name: "EmployeeType",
      style: inputstyles
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal"))), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'red'
      }
    }, this.state.error), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: submitstyles
    }, "Add Employee")));
  }
}
class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      employeedetails: []
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const query = `query {
        about
        employeeList {
            FirstName,
            LastName,
            Age,
            DateOfJoining,
            Title,
            Department,
            EmployeeType
            currentStatus
           
        }
      }`;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    console.log('rrrr', result);
    // setTimeout(()=>{
    this.setState({
      employeedetails: result.data.employeeList
    }); //json data format in https://studio.apollographql.com/sandbox/explorer
    // },500);
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

        }
      }
    `;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    this.loadData();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        textAlign: 'center'
      }
    }, "Employee details"), /*#__PURE__*/React.createElement(EmployeeTable, {
      data: this.state.employeedetails
    }), /*#__PURE__*/React.createElement(EmployeeAdd, {
      createEmployee: this.createEmployee.bind(this)
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeList, null), document.getElementById('root'));