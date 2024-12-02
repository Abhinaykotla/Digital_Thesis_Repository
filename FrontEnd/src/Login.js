import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('role', data.role);

        console.log('User Info:', data);

        if (data.role === 'author') {
          window.location.href = '/authordashboard';
        } else if (data.role == 'admin') {
          window.location.href = '/admindashboard';
        }
        else {
          setErrorMessage('Unauthorized role');
        }
      } else {
        setErrorMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="row">
          <div className="col-6">
            <img
              src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg?w=740&t=st=1729363467~exp=1729364067~hmac=51db386bcf9a56935a82db9a170b3fe42b63afdda91a88a06b2faaa0c2aa38be"
              alt="Login Illustration"
              className="img-fluid"
            />
          </div>

          <div className="col-6">
            <div className="card justify-center">
              <h1 className="mt-3">Login</h1>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  className="input form-control mb-3 mt-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="input form-control mb-3 mt-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary mb-3 mt-3">
                  Login
                </button>
                <br />
                <p className="mt-3">
                  Don’t have an account?
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.location.href = '/register'}
                  >
                    Register
                  </button>
                </p>
                <p className="mt-3">
                  Forgot your password?
                  <br />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => window.location.href = '/password-recovery'}
                  >
                    Recover Password
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
