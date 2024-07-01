import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';

function Myparam(Il) {
  return (props) => <Il {...props} params={useParams()} loc={useLocation()} />;
}
class employeeEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const {
      params: { id: prevId },
    } = prevProps;
    const {
      params: { id },
    } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }
  onChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      employee: { ...prevState.employee, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { employee } = this.state;
    // const rowId1 = this.props.params.id;
    const rowId1 = parseInt(this.props.params.id);
    employee.currentStatus = parseInt(employee.currentStatus);
    // const rowId1 = this.props.params.id; // Assigning the value to rowId1
    const { id, ...changes } = employee; // Removing id from the object

    console.log(' in handle submit1', rowId1);
    console.log(' in handle submit2', changes);
    console.log('Value of $id:', parseInt(rowId1));

    try {
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation employeeUpdate($employee: EmployeeUpdateInputs!) {
            employeeUpdate(employee: $employee) {
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
          }`,
          variables: { employee: { id: rowId1, ...changes } },
        }),
      });
      console.log('id bbbbbbbbb', employee);
      const result = await response.json();
      console.log('rrr', result);
      if (result.data && result.data.employeeUpdate) {
        this.setState({ employee: result.data.employeeUpdate });
        alert('Updated employee successfully');
        this.props.navigate('/employeelist');
      } else {
        throw new Error('No data returned from the server');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle error
    }
  }

  getDetailsForUpdate = (employee) => {
    const id = parseInt(employee.id);
    this.detailsData(id);
  };
  async loadData() {
    const id = parseInt(this.props.params.id);

    console.log('idddd', id);
    const query = `query getDetailsForUpdate($id: Int!) {
      detailsList(id: $id) {
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

      }`;
    const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
    });
    const result = await response.json();
    console.log('display', result);
    console.log('display', result.data.detailsList[0]);
    this.setState({ employee: result.data.detailsList[0] });
  }

  render() {
    const inputstyles = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    };
    const submitstyles = {
      width: '100%',
      backgroundColor: 'black',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    };
    console.log(this.props);
    const {
      employee: { id },
    } = this.state;
    const rowId = this.props.params.id;
    console.log('rowId', +rowId);
    {
    }
    if (rowId == null) {
      if (typeof this.props.params !== 'undefined') {
        return <h3>{`employee with ID ${rowId} not found.`}</h3>;
      }
      return null;
    }
    const rowId1 = parseInt(this.props.params.id);
    const {
      employee: {
        FirstName,
        LastName,
        Age,
        DateOfJoining,
        Title,
        Department,
        EmployeeType,
        currentStatus,
      },
    } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ maxWidth: '400px', margin: 'auto', marginTop: '60px' }}
      >
        <div>
          <label htmlFor='FirstName'>First Name:</label>
          <input
            type='text'
            id='FirstName'
            name='FirstName'
            value={FirstName}
            onChange={this.onChange}
            placeholder='Enter First Name'
            style={inputstyles}
            disabled
          />
        </div>
        <div>
          <label htmlFor='LastName'>Last Name:</label>
          <input
            type='text'
            id='LastName'
            name='LastName'
            value={LastName}
            onChange={this.onChange}
            placeholder='Enter Last Name'
            style={inputstyles}
            disabled
          />
        </div>
        <div>
          <label htmlFor='Age'>Age:</label>
          <input
            type='number'
            id='Age'
            name='Age'
            value={Age}
            onChange={this.onChange}
            placeholder='Enter Age'
            style={inputstyles}
            disabled
          />
        </div>
        <div>
          <label htmlFor='DateOfJoining'>Date of Joining:</label>
          <input
            type='date'
            id='DateOfJoining'
            name='DateOfJoining'
            value={DateOfJoining}
            onChange={this.onChange}
            style={inputstyles}
            disabled
          />
        </div>
        <div>
          <label htmlFor='Title'>Title:</label>
          <select
            id='Title'
            name='Title'
            style={inputstyles}
            value={Title}
            onChange={this.onChange}
          >
            <option value='Employee'>Employee</option>
            <option value='Manager'>Manager</option>
            <option value='Director'>Director</option>
            <option value='VP'>VP</option>
          </select>
        </div>
        <div>
          <label htmlFor='Department'>Department:</label>
          <select
            id='Department'
            name='Department'
            style={inputstyles}
            value={Department}
            onChange={this.onChange}
          >
            <option value='IT'>IT</option>
            <option value='Marketing'>Marketing</option>
            <option value='HR'>HR</option>
            <option value='Engineering'>Engineering</option>
          </select>
        </div>
        <div>
          <label htmlFor='EmployeeType'>Employee Type:</label>
          <select
            id='EmployeeType'
            name='EmployeeType'
            style={inputstyles}
            value={EmployeeType}
            onChange={this.onChange}
            disabled
          >
            <option value='FullTime'>FullTime</option>
            <option value='PartTime'>PartTime</option>
            <option value='Contract'>Contract</option>
            <option value='Seasonal'>Seasonal</option>
          </select>
        </div>
        <div>
          <label htmlFor='Current Status'>Current Status:</label>
          <select
            id='currentStatus'
            name='currentStatus'
            style={inputstyles}
            value={currentStatus}
            onChange={this.onChange}
          >
            <option value='1'>Working</option>
            <option value='0'>Retried</option>
          </select>
        </div>
        <div style={{ color: 'red' }}>{this.state.error}</div>
        <div>
          <button type='submit' style={submitstyles}>
            Update Employee
          </button>
        </div>
      </form>
    );
  }
}

export default Myparam(employeeEdit);
