import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation, useParams } from 'react-router-dom';

function Myparam(Il) {
  return (props) => <Il {...props} params={useParams()} loc={useLocation()} />;
}
class EmployeeDelete extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
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
  async loadData() {
    const { employee } = this.state;
    const currentId1 = parseInt(this.props.params.id);
    const { id, ...changes } = employee; // Removing id from the object

    try {
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation employeeDelete($employee: EmployeeDeleteInputs!) {
            employeeDelete(employee: $employee) {
              id
              currentStatus
            }
          }`,
          variables: { employee: { id: currentId1, ...changes } },
        }),
      });

      const result = await response.json();

      if (result.data && result.data.employeeDelete) {
        this.setState({ employee: result.data.employeeDelete });
        alert('employee deleted successfully');
        this.props.navigate('/employeelist');
      } else {
        throw new Error('No data returned from the server');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      // Handle error
    }
  }
  onChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      employee: { ...prevState.employee, [name]: value },
    }));
  }

  render() {
    console.log(this.props);
    const {
      employee: { id },
    } = this.state;
    const currentId = this.props.params.id;

    if (currentId == null) {
      if (typeof this.props.params !== 'undefined') {
        return <h3>{`employee with ID ${currentId} not found.`}</h3>;
      }
      return null;
    }
    const currentId1 = parseInt(this.props.params.id);
    const {
      employee: { title, owner },
    } = this.state;
    return <></>;
  }
}

export default Myparam(EmployeeDelete);
