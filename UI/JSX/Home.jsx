// Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div style={containerStyle}>
      <h2>Welcome to Our Company Google</h2>
      <p style={paragraphStyle}>
        Google was founded on September 4, 1998, by American computer scientists
        Larry Page and Sergey Brin while they were PhD students at Stanford
        University in California. Together they own about 14% of its publicly
        listed shares and control 56% of its stockholder voting power through
        super-voting stock. The company went public via an initial public
        offering (IPO) in 2004. In 2015, Google was reorganized as a wholly
        owned subsidiary of Alphabet Inc. Google is Alphabet's largest
        subsidiary and is a holding company for Alphabet's internet properties
        and interests. Sundar Pichai was appointed CEO of Google on October 24,
        2015, replacing Larry Page, who became the CEO of Alphabet. On December
        3, 2019, Pichai also became the CEO of Alphabet
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

export default Home;
