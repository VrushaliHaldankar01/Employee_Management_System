import React from 'react';
export default class EmployeeAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      error: '',
    };
  }

  onAddEmplyee = (e) => {
    e.preventDefault();
    const form = document.forms.addEmployee;

    const firstName = form.FirstName.value.trim();
    const lastName = form.LastName.value.trim();
    const dateOfJoining = form.DateOfJoining.value.trim();
    const age = parseInt(form.Age.value, 10);

    // Check if any of the required fields is empty
    if (!firstName || !lastName || isNaN(age) || !dateOfJoining) {
      this.setState({ error: 'All fields are required' });
      return;
    }

    if (age < 20 || age > 70) {
      this.setState({ error: 'Please enter a valid age between 20 and 70' });
      return;
    }

    // Separate validation for first name
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      this.setState({ error: 'First name should contain only text' });
      return;
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      this.setState({ error: 'Last name should contain only text' });
      return;
    }

    this.setState({ error: '' });

    let employeedata = {
      FirstName: form.FirstName.value,
      LastName: form.LastName.value,
      Age: form.Age.value,
      DateOfJoining: form.DateOfJoining.value,
      Title: form.Title.value,
      Department: form.Department.value,
      EmployeeType: form.EmployeeType.value,
      currentStatus: 1,
      isDeleted: 1,
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
    return (
      <>
        <h2 style={{ textAlign: 'center' }}>Add Employee details</h2>
        <form
          name='addEmployee'
          onSubmit={this.onAddEmplyee}
          style={{ maxWidth: '400px', margin: 'auto', marginTop: '60px' }}
        >
          <div>
            <label htmlFor='FirstName'>First Name:</label>
            <input
              type='text'
              id='FirstName'
              name='FirstName'
              placeholder='Enter First Name'
              style={inputstyles}
            />
          </div>
          <div>
            <label htmlFor='LastName'>Last Name:</label>
            <input
              type='text'
              id='LastName'
              name='LastName'
              placeholder='Enter Last Name'
              style={inputstyles}
            />
          </div>
          <div>
            <label htmlFor='Age'>Age:</label>
            <input
              type='number'
              id='Age'
              name='Age'
              placeholder='Enter Age'
              style={inputstyles}
            />
          </div>
          <div>
            <label htmlFor='DateOfJoining'>Date of Joining:</label>
            <input
              type='date'
              id='DateOfJoining'
              name='DateOfJoining'
              style={inputstyles}
            />
          </div>
          <div>
            <label htmlFor='Title'>Title:</label>
            <select id='Title' name='Title' style={inputstyles}>
              <option value='Employee'>Employee</option>
              <option value='Manager'>Manager</option>
              <option value='Director'>Director</option>
              <option value='VP'>VP</option>
            </select>
          </div>
          <div>
            <label htmlFor='Department'>Department:</label>
            <select id='Department' name='Department' style={inputstyles}>
              <option value='IT'>IT</option>
              <option value='Marketing'>Marketing</option>
              <option value='HR'>HR</option>
              <option value='Engineering'>Engineering</option>
            </select>
          </div>
          <div>
            <label htmlFor='EmployeeType'>Employee Type:</label>
            <select id='EmployeeType' name='EmployeeType' style={inputstyles}>
              <option value='FullTime'>FullTime</option>
              <option value='PartTime'>PartTime</option>
              <option value='Contract'>Contract</option>
              <option value='Seasonal'>Seasonal</option>
            </select>
          </div>
          <div style={{ color: 'red' }}>{this.state.error}</div>
          <div>
            <button type='submit' style={submitstyles}>
              Add Employee
            </button>
          </div>
        </form>
      </>
    );
  }
}
