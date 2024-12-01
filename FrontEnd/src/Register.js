import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    bio: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { fullName, email, password, confirmPassword, phone, gender, bio } = formData;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, phone, gender, bio }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Registration successful');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          gender: '',
          bio: '',
        });
      } else {
        setErrorMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while registering');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="row">
          <div className="col-6">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740&t=st=1729365256~exp=1729365856~hmac=06edb309fc6da2a9fe38891d64b38f5f1201c431035396c6a3c36833d77e3015"
              alt="Register Illustration"
              className="img-fluid"
            />
          </div>

          <div className="col-6">
            <div className="card justify-center">
              <h1 className="mt-3">Register</h1>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                  placeholder="Confirm Password"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                  placeholder="Phone (Optional)"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input form-control mb-3 mt-3"
                  placeholder="Bio (Optional)"
                ></textarea>
                <button type="submit" className="btn btn-primary mb-3 mt-3">
                  Register
                </button>
                <br />
                <p className="mt-3">
                  Already have an account? <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.location.href='/login'}
                  >
                    Login
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

export default Register;
