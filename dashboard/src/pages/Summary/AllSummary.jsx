import React from 'react';
import SummaryPage from './SummaryPage';
import './AllSummary.scss';

const AllSummary = () => {
  return (
    <div className='allSummary'>
      <SummaryPage />
      <div className='container'>
        <div className='table'>
          <table className='vanilla'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Finished</th>
                <th>Target</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product 1</td>
                <td>12</td>
                <td>23</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>35</td>
                <td>45</td>
                <td>65</td>
              </tr>
              <tr>
                <td>Product 3</td>
                <td>56</td>
                <td>34</td>
                <td>67</td>
              </tr>
              {/* New Total Row */}
              <tr className="total-row">
                <td>Total</td>
                <td>103</td> {/* Sum of finished values */}
                <td>102</td> {/* Sum of target values */}
                <td>145</td> {/* Sum of failed values */}
              </tr>
            </tbody>
          </table>
        </div>
        <div className='product1'>product 1</div>
        <div className='product2'>product 2</div>
        <div className='product3'>product 3</div>
      </div>
    </div>
  );
}

export default AllSummary;
