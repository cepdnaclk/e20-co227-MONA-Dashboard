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

  return (
    <div className='secondbar'>
      <div className='box'>
        <ul>
          <li
            onClick={() => handleButtonClick('/status')}
            style={{
              backgroundColor: location.pathname === '/status' ? '#201F67' : 'inherit',
            }}
          >
            <DashboardRoundedIcon className='icon' style={{ color: location.pathname === '/status' ? 'white' : 'inherit' }} />
            <span style={{ color: location.pathname === '/status' ? 'white' : 'inherit' }}>STATUS</span>
          </li>
          {/* Corrected path comparison for Production Rate */}
          <li
            onClick={() => handleButtonClick('/rate/HourlyRate')}
            style={{
              backgroundColor: location.pathname.startsWith('/rate') ? '#201F67' : 'inherit',
            }}
          >
            <QueryStatsRoundedIcon className='icon' style={{ color: location.pathname.startsWith('/rate') ? 'white' : 'inherit' }} />
            <span style={{ color: location.pathname.startsWith('/rate') ? 'white' : 'inherit' }}>PRODUCTION RATE</span>
          </li>
          <li
            onClick={() => handleButtonClick('/history')}
            style={{
              backgroundColor: location.pathname === '/history' ? '#201F67' : 'inherit',
            }}
          >
            <DescriptionRoundedIcon className='icon' style={{ color: location.pathname === '/history' ? 'white' : 'inherit' }} />
            <span style={{ color: location.pathname === '/history' ? 'white' : 'inherit' }}>PRODUCTION HISTORY</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecondBar;
