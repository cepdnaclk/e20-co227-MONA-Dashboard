import React from 'react';
import './secondbar.scss'; // Import SCSS stylesheet
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate hook
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

const SecondBar = () => {
  const navigate = useNavigate(); // Utilize useNavigate hook for navigation
  const location = useLocation();

  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  //const location = useLocation();



  return (
    <div className='secondbar'>
      <div className='box'>
        <ul>
                
          <li  onClick={() => handleButtonClick('/status')} style={{ backgroundColor : location.pathname === '/status' ? '#201F67' : 'default' }}>
            <DashboardRoundedIcon className='icon' style={{ color : location.pathname === '/status' ? 'white' : 'default' }}/>
            <span style={{ color : location.pathname === '/status' ? 'white' : 'default' }} >STATUS</span>
          </li>
          <li onClick={() => handleButtonClick('/rate')} style={{ backgroundColor : location.pathname === '/rate' ? '#201F67' : 'default' }}>
            <QueryStatsRoundedIcon className='icon' style={{ color : location.pathname === '/rate' ? 'white' : 'default' }}/>
            <span style={{ color : location.pathname === '/rate' ? 'white' : 'default' }}>PRODUCTION RATE</span>
          </li>
          <li onClick={() => handleButtonClick('/history')} style={{ backgroundColor : location.pathname === '/history' ? '#201F67' : 'default' }}>
            <DescriptionRoundedIcon className='icon' style={{ color : location.pathname === '/history' ? 'white' : 'default' }}/>
            <span style={{ color : location.pathname === '/history' ? 'white' : 'default' }}>PRODUCTION HISTORY</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecondBar;
