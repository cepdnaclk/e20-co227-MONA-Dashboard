import React, { useState, useEffect } from 'react';
import './Header.css';
import imagepath from '../images/logo.png';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import Settings from '../components/SettingsPage/settingstabs';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import NightsStayIcon from '@mui/icons-material/NightsStayOutlined';



function Datenow() {
    const [dateTime, setDateTime] = useState(new Date());
    const [dayShift, setDayShift] = useState(false);
    const [nightShift, setNightShift] = useState(false);
    const [overShift, setoverShift] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
            const now = new Date();
            const hour = now.getHours();

            const dayshiftbegin = 7;
            const dayshiftend = 15;
            const nightshiftbegin = 15;
            const nightshiftend = 23;
            setDayShift(hour >= dayshiftbegin && hour < dayshiftend);
            setNightShift(hour >= nightshiftbegin && hour < nightshiftend);
            setoverShift((hour >= nightshiftend && hour < 24) || (hour >= 0 && hour < dayshiftbegin));


        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup function
    }, []);

    const formattedDate = dateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    const formattedTime = dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div className="datetime-container">
            <h2>
                {formattedDate}   {formattedTime}
            </h2>
            {nightShift &&
                <>
                    <NightsStayIcon sx={{ fontSize: 20 }} style={{ marginBottom: '2px', }}></NightsStayIcon>
                    <h2>
                        Night Shift
                    </h2>
                </>
            }

            {dayShift &&
                <>
                    <LightModeIcon sx={{ fontSize: 20 }} style={{ marginBottom: '2px' }}></LightModeIcon>
                    <h2>
                        Day Shift
                    </h2>
                </>
            }
            {overShift &&
                <>
                    <NightsStayIcon sx={{ fontSize: 20 }} style={{ marginBottom: '2px' }}></NightsStayIcon>
                    <h2>
                        Overtime Shift
                    </h2>
                </>
            }


        </div>
    );
}

function Logo() {
    return (
        <div className="logo">
            <a href="/status" className="logo">
                <img src={imagepath} alt="" className="img-fluid" />
            </a>
        </div>
    );
}

function Header() {


    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <header id="header" className="header" >

                <Logo />

                <Datenow />

                <button onClick={() => setShowSettings(true)} className="settings"><SettingsSharpIcon /></button>

            </header>
            {showSettings && <Settings onclose={() => setShowSettings(false)} />}
        </>
    );
}
export default Header;