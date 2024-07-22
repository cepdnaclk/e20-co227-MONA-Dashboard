import React, { useState } from 'react';
import './settingspage.css';

function PasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === repeatPassword) {
            console.log('Current Password:', currentPassword);
            console.log('New Password:', newPassword);
            console.log('Repeat Password:', repeatPassword);
            // Perform further actions such as sending data to an API
        } else {
            alert('New passwords do not match!');
        }
    };

    return (
        <div className="password-container">
            <h2 style={{ marginLeft: '320px' }}>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-input"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-input"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Repeat New Password</label>
                    <input
                        type="password"
                        className="form-input"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Confirm</button>
            </form>
        </div>
    );
}

export default PasswordPage;
