import * as React from 'react';
import Header from '../../layouts/Header';
import SecondBar from '../../layouts/SecondBar';

import './Summary.scss';
import ThirdbarSummary from '../../layouts/ThirdbarSummary';

const SummaryPage = () => {
  return (
    <div className='summary'>
      <Header />
      <SecondBar />
      <ThirdbarSummary />
      
    </div>
  );
};

export default SummaryPage;
