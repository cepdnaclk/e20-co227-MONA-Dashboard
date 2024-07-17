import React, { useState, useEffect } from 'react';
import './Header.css';
import imagepath from '../images/logo.png';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import Settings from '../components/SettingsPage/settingstabs';


     
function Datenow() {
        const [dateTime, setDateTime] = useState(new Date());
      
        useEffect(() => {
          const intervalId = setInterval(() => {
            setDateTime(new Date());
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
              {formattedDate} - {formattedTime}
            </h2>
          </div>
        );
      }

function Logo() {
        return (
              <div className="logo">
                      <a href="/status" className="logo">
                              <img src={imagepath} alt="" className="img-fluid"/>
                      </a>
              </div>
        );
      }

function Header() {

    
    const [showSettings, setShowSettings] = useState(false);
        
  return (
    <>
        <header id="header" className="header" >
                
                <Logo/> 
                
                <Datenow/>
                
                <button  onClick={() => setShowSettings(true)} className="settings"><SettingsSharpIcon /></button>
                       
        </header>
        {showSettings && <Settings onclose={()=> setShowSettings(false)} />}
        </>
  );
}
export default Header;