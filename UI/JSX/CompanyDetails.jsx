// CompanyDetails.jsx
import React from 'react';

const CompanyDetails = () => {
  return (
    <div style={containerStyle}>
      <h2>Company Details</h2>
      <p style={paragraphStyle}>
        Google LLC is an American multinational corporation and technology
        company focusing on online advertising, search engine technology, cloud
        computing, computer software, quantum computing, e-commerce, consumer
        electronics, and artificial intelligence.
      </p>
      <p style={infoStyle}>
        <strong>Address:</strong> 123 Main Street, City, Country
      </p>
      <p style={infoStyle}>
        <strong>Contact:</strong> +1 234 567 890
      </p>
      <p style={infoStyle}>
        <strong>Email:</strong> info@example.com
      </p>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const paragraphStyle = {
  textAlign: 'justify',
};

const infoStyle = {
  margin: '5px 0',
};

export default CompanyDetails;
