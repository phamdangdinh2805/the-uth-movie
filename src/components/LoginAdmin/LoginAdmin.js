import React from 'react';
import { useState } from 'react';
import './loginadmin.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const handleLoginAdmin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Navigate('/adminpage');
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className="login-admin">
      <h1>Login to Admin</h1>
      <form className="form-login-admin" onSubmit={handleLoginAdmin}>
        <input
          type="email"
          placeholder="Email address"
          className="input-login-admin"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-login-admin"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-login-admin">
          Login Admin
        </button>
        {error && <span className="wrong-admin">Wrong email or password! Please try again</span>}
      </form>
    </div>
  );
};

export default LoginAdmin;
