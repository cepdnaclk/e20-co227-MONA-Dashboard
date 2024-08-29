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
        <div className='product1'>
          <div className='product-details'>
            <h3>PRODUCT 1 #123 material123</h3>
          </div>
          <table className='product-table'>
            <thead>
              <tr>
                <th>Part</th>
                <th>Number of Machines</th>
                <th>Machine Number</th>
                <th>Succeeded</th>
                <th>Target</th>
                <th>Failed</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Part 1</td>
                <td>3</td>
                <td><button>14</button> <button>24</button> <button>25</button></td>
                <td>50</td>
                <td>70</td>
                <td>20</td>
                <td>140</td>
              </tr>
              <tr>
                <td>Part 2</td>
                <td>1</td>
                <td><button>15</button></td>
                <td>30</td>
                <td>45</td>
                <td>15</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Part 3</td>
                <td>1</td>
                <td><button>4</button></td>
                <td>40</td>
                <td>60</td>
                <td>20</td>
                <td>120</td>
              </tr>
              <tr>
                <td>Part 4</td>
                <td>1</td>
                <td><button>23</button></td>
                <td>55</td>
                <td>80</td>
                <td>25</td>
                <td>160</td>
              </tr>
              <tr>
                <td>Part 5</td>
                <td>2</td>
                <td><button>13</button> <button>20</button></td>
                <td>65</td>
                <td>95</td>
                <td>30</td>
                <td>190</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='product2'>product 2</div>
        <div className='product3'>product 3</div>
      </div>
    </div>
  );
}

export default AllSummary;
