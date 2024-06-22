import React from 'react';
import './secondbar.scss'; // Import SCSS stylesheet
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

const SecondBar = () => {
  const navigate = useNavigate(); // Utilize useNavigate hook for navigation

  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className='secondbar'>
      <div className='box'>
        <ul>
          <li onClick={() => handleButtonClick('/status')}>
            <DashboardRoundedIcon className='icon' />
            <span>STATUS</span>
          </li>
          <li onClick={() => handleButtonClick('/rate')}>
            <QueryStatsRoundedIcon className='icon' />
            <span>PRODUCTION RATE</span>
          </li>
          <li onClick={() => handleButtonClick('/history')}>
            <DescriptionRoundedIcon className='icon' />
            <span>PRODUCTION HISTORY</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecondBar;
