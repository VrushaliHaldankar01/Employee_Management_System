import React from 'react';

export default class EmployeeFilter extends React.Component {
  doFilter = (e) => {
    e.preventDefault();
    const frm = document.forms.filteremployee;

    const employeeType = frm.EmployeeType.value;
    this.props.filterEmployee(employeeType);
  };

  render() {
    const inputstyles = {
      marginRight: '10px',
    };

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
    };

    const formStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const labelStyle = {
      marginRight: '10px',
      fontSize: '20px', // Increase font size
    };

    const selectStyle = {
      marginRight: '10px',
      fontSize: '16px',
      padding: '8px',
    };

    const buttonStyle = {
      padding: '12px 24px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    };

    return (
      <div style={containerStyle}>
        <form name='filteremployee' onSubmit={this.doFilter} style={formStyle}>
          <label htmlFor='EmployeeType' style={labelStyle}>
            Employee Type:
          </label>
          <select id='EmployeeType' name='EmployeeType' style={selectStyle}>
            <option value='FullTime'>FullTime</option>
            <option value='PartTime'>PartTime</option>
            <option value='Contract'>Contract</option>
            <option value='Seasonal'>Seasonal</option>
          </select>
          <button type='submit' style={buttonStyle}>
            Filter
          </button>
        </form>
      </div>
    );
  }
}
