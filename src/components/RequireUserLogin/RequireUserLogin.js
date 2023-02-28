import React from 'react';
import { Link } from 'react-router-dom';


const RequireUserLogin = () => {
  return (
    <div className="upgrade-container">
      <h1 className="upgrade">
        To watch Movie, Please <Link to="/login">Login</Link> to the website
      </h1>
      <img
        src="https://img.freepik.com/free-vector/bank-login-concept-illustration_114360-7964.jpg?w=2000"
        className="upgrade-img"
      ></img>
    </div>
  );
};
export default RequireUserLogin;
