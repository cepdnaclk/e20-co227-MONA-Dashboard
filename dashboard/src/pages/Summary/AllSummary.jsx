import React from 'react'
import SummaryPage from './SummaryPage'
import './AllSummary.scss';

const AllSummary = () => {
  return (
    <div className='allSummary'>
      <SummaryPage />
      <div className='container'>
        <div className='table'>table</div>
        <div className='product1'>product 1</div>
        <div className='product2'>product 2</div>
        <div className='product3'>product 3</div>
      </div>
    </div>
  )
}

export default AllSummary