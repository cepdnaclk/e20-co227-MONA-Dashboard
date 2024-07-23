import React, { useState } from 'react';
import './settingspage.css';

function PasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    });

    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);

    const validatePassword = () => {
        let isValid = true;
        let errors = {
            currentPassword: '',
            newPassword: '',
            repeatPassword: ''
        };

        if (currentPassword !== 'Mona123') {
            errors.currentPassword = 'Incorrect current password';
            isValid = false;
        }
        if (!newPassword) {
            errors.newPassword = 'required';
            isValid = false;
        } else if (!repeatPassword) {
            errors.repeatPassword = 'required';
            isValid = false;
        } else if (newPassword !== repeatPassword) {
            errors.repeatPassword = 'not same';
            isValid = false;
        }

        setErrorMessages(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePassword()) {
            console.log('Current Password:', currentPassword);
            console.log('New Password:', newPassword);
            console.log('Repeat Password:', repeatPassword);
            // Perform further actions such as sending data to an API
        }
    };

    return (
        <div className="machinesettings password-container">
            <h2 style={{ marginLeft: '320px' }}>Change Password</h2>
            <form name="frmChange" onSubmit={handleSubmit}>
                <div style={{marginTop:'100px'}}>
                    <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input
                            type="password"
                            /*new one added here*/
                            placeholder={'Enter your current password'}
                            /**/
                            className="form-input"
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            required
                        />
                        {errorMessages.currentPassword && <div className="error">{errorMessages.currentPassword}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            /*new one added here*/
                            placeholder='Enter your new password'
                            /**/
                            className="form-input"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                        {errorMessages.newPassword && <div className="error">{errorMessages.newPassword}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Repeat New Password</label>
                        <input
                            type="password"
                            /*new one added here*/
                            placeholder='Repeat your new password'
                            /**/
                            className="form-input"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                            required
                        />
                        {errorMessages.repeatPassword && <div className="error">{errorMessages.repeatPassword}</div>}
                    </div>
                    <button type="submit" className="submit-button">Confirm</button>
                </div>
            </form>
        </div>
    );
}

export default PasswordPage;
