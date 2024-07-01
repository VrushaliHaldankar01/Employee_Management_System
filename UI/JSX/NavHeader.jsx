// NavHeader.jsx
import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import EmployeeList from './employeeList.jsx';
import EmployeeEdit from './employeeEdit.jsx';
import EmployeeDelete from './employeeDelete.jsx';
import Home from './Home.jsx'; // Import the Home component
import CompanyDetails from './CompanyDetails.jsx'; // Import the CompanyDetails component

const NotFound = () => <h1>Page Not Found</h1>;

export default function NavHeader() {
  const navigate = useNavigate();

  const handleAllEmployeeClick = () => {
    console.log('hhh');
    window.location.href = '/';
  };

  return (
    <>
      <nav style={navStyle}>
        <NavLink
          to={'/employeelist'}
          style={navLinkStyle}
          activeStyle={activeLinkStyle}
          onClick={handleAllEmployeeClick} // Call handleAllEmployeeClick on click
        >
          All Employee
        </NavLink>
        <NavLink
          to={'/home'}
          style={navLinkStyle}
          activeStyle={activeLinkStyle}
        >
          Home
        </NavLink>
        <NavLink
          to={'/companydetails'}
          style={navLinkStyle}
          activeStyle={activeLinkStyle}
        >
          Company Details
        </NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<EmployeeList />} />
        <Route path='/employeelist' element={<EmployeeList />} />
        {/* <Route path='/edit/:id' element={<EmployeeEdit />} /> */}
        <Route
          path='/edit/:id'
          element={<EmployeeEdit navigate={navigate} />}
        />
        {/* <Route path='/delete/:id' element={<EmployeeDelete />} /> */}
        <Route
          path='/delete/:id'
          element={<EmployeeDelete navigate={navigate} />}
        />
        <Route path='/home' element={<Home />} />{' '}
        {/* Add Home component route */}
        <Route path='/companydetails' element={<CompanyDetails />} />{' '}
        {/* Add CompanyDetails component route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

// Define your styles here
const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
  height: '30px',
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px',
  padding: '8px 12px',
  borderRadius: '5px',
};

const activeLinkStyle = {
  backgroundColor: '#007bff',
};
