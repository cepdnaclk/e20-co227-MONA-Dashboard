import React from 'react'
import './SummaryPercentage.scss'
import {CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

const SummaryPercentage = ({type}) => {
  let data1;
  switch(type){
    case 'success':
      data1={
        icon:<DoneAllRoundedIcon className='icon'/>,
        title:'SUCCESSIVE PERCENTAGE',
        chart: <CircularProgressbar value={85.51} text='85.51%'/> ,
      };
      break;
    case 'failed':
      data1={
        icon:<PriorityHighRoundedIcon className='icon'/>,
        title:'FAILED PERCENTAGE',
        chart:<CircularProgressbar value={14.49} text='14.49%' />,
      };
      break;
    default:
      data1={
        icon: null,
        title: 'UNKNOWN TYPE',
        chart: null,
      };
      break;
  }

  return (
    <div className='percentage'>
      <div className='top'>
        {data1.icon} 
        <span className='title'>{data1.title}</span>
      </div>
      <div className='bottom'>
        <div className='chart'>
          {data1.chart}
        </div>
      </div>
    </div>
  )
}

export default SummaryPercentage
