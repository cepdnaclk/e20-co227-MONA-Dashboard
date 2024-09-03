import React, { useRef, useState } from "react";
import './settingspage.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Checkpassword({ onclose1, onPasswordCorrect }) {
    const [password, setPassword] = useState('');
    const modelRef = useRef();

    const closeModel = (e) => {
        if (modelRef.current === e.target) {
            onclose1();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '1234') {
            onPasswordCorrect(); // Trigger the callback when the password is correct
        } else {
            alert("Incorrect password! Please try again.");
            onclose1(); // Close the password modal without saving
        }
    };

    return (
        <div ref={modelRef} onClick={closeModel} className='fixed-element2' style={{ height: "100%", width: "100%", padding: "25% 45%" }}>
            <div className='pwbox'>
                <div style={{ background: '#201f67', padding: '8px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                    <h3>Password</h3>
                    <button className='xbutton_pw' onClick={onclose1} style={{ margin: '0', background: 'none' }}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ paddingTop: '8%', paddingLeft: '18%' }}>
                        <label className='lablelable'>
                            Enter Password
                            <input
                                className="inputbox"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                            />
                        </label>
                    </div>
                    <div style={{ paddingTop: '5%', paddingLeft: '38%' }}>
                        <button className='buttonedit' style={{ margin: '0px' }} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkpassword;
