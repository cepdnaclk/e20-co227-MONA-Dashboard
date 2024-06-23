import React from 'react'
import './SummaryWidgets.scss'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';

const SummaryWidgets = ({type}) => {
  let data;
  switch(type){
    case 'success':
      data={
        icon:<CheckCircleRoundedIcon className='icon'/>,
        title:'TOTAL SUCCESIVE SHOTS',
        count: 3275,
      };
      break;
    case 'failed':
      data={
        icon:<CancelRoundedIcon className='icon'/>,
        title:'TOTAL FAILED SHOTS',
        count: 555,
      };
      break;
    
    case 'total':
      data={
        icon:<FunctionsRoundedIcon className='icon'/>,
        title:'TOTAL SHOTS',
        count: 3830,
      };
      break;

    default:
      data={
        icon: null,
        title: 'UNKNOWN TYPE',
        count: null,
      };
      break;

  }

  return (
    <div className='widgets'>
      <div className='top'>
        {data.icon}
        <span className='title'>{data.title}</span>
      </div>
      <div className='bottom'>
        <div className='count'>{data.count}</div>
      </div>
    </div>
  )
}

export default SummaryWidgets