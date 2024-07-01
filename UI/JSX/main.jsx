import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import NavHeader from './NavHeader.jsx';

const element = (
  <Router>
    <NavHeader />
  </Router>
);
ReactDOM.render(element, document.getElementById('root'));
