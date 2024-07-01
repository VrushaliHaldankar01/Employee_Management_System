import React from 'react';
import { Link } from 'react-router-dom';
class EmployeeRow extends React.Component {
  render() {
    const buttonStyle = {
      marginRight: '5px',
      padding: '5px 10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    };
    const deleteButtonStyle = {
      ...buttonStyle,
      backgroundColor: 'red',
    };
    return (
      <tr key={this.props.employeedata.id}>
        <td style={this.props.rowStyle}>{this.props.employeedata.id}</td>
        <td style={this.props.rowStyle}>{this.props.employeedata.FirstName}</td>
        <td style={this.props.rowStyle}>{this.props.employeedata.LastName}</td>
        <td style={this.props.rowStyle}>{this.props.employeedata.Age}</td>
        <td style={this.props.rowStyle}>
          {this.props.employeedata.DateOfJoining}
        </td>
        <td style={this.props.rowStyle}>{this.props.employeedata.Title}</td>
        <td style={this.props.rowStyle}>
          {this.props.employeedata.Department}
        </td>
        <td style={this.props.rowStyle}>
          {this.props.employeedata.EmployeeType}
        </td>
        <td style={this.props.rowStyle}>
          <Link to={`/edit/${this.props.employeedata.id}`}>
            <button style={buttonStyle}>Edit</button>
          </Link>
          <Link to={`/delete/${this.props.employeedata.id}`}>
            <button style={deleteButtonStyle}>Delete</button>
          </Link>
        </td>
      </tr>
    );
  }
}
export default class EmployeeTable extends React.Component {
  render() {
    const rowStyle = {
      border: '1px solid silver',
      padding: '12px',
      backgroundColor: 'grey',
      color: 'white',
    };
    const tablestyle = {
      borderCollapse: 'collapse',
      marginTop: '20px',
      margin: 'auto',
      width: '100%',
    };

    const result = this.props.data.map((c) => (
      <EmployeeRow key={c.id} employeedata={c} rowStyle={rowStyle} />
    ));
    return (
      <table style={tablestyle}>
        <thead>
          <tr>
            <th style={rowStyle}>Sr No</th>
            <th style={rowStyle}>FirstName</th>
            <th style={rowStyle}>lastName</th>
            <th style={rowStyle}>Age</th>
            <th style={rowStyle}>DateOfJoining</th>
            <th style={rowStyle}>Title</th>
            <th style={rowStyle}>Department</th>
            <th style={rowStyle}>EmployeeType</th>
            <th style={rowStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </table>
    );
  }
}
