import React, { useState } from 'react';

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRecovery = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/recover', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone, fullName, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Password updated successfully');
            } else {
                setErrorMessage(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while recovering password');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="row">
                    <div className="col-6">
                        <img
                            src="https://img.freepik.com/free-vector/password-recovery-concept-illustration_114360-7883.jpg"
                            alt="Password Recovery Illustration"
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-6">
                        <div className="card justify-center">
                            <h1 className="mt-3">Password Recovery</h1>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <form onSubmit={handleRecovery}>
                                <input
                                    type="text"
                                    className="input form-control mb-3 mt-3"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    className="input form-control mb-3 mt-3"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    className="input form-control mb-3 mt-3"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="input form-control mb-3 mt-3"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-primary mb-3 mt-3">
                                    Recover Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordRecovery;