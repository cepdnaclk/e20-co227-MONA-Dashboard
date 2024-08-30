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
              <tr className="total-row">
                <td>Total</td>
                <td>103</td>
                <td>102</td>
                <td>145</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='product1'>
          <div className='product-details'>
            <h3>PRODUCT1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  #123 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;material123</h3>
          </div>
          <table className='product-table'>
            <thead>
              <tr>
                <th>Part</th>
                <th># Machines</th>
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
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 14" data-success="50" data-failed="20">M14</button>
                    <button aria-label="Machine 24" data-success="30" data-failed="10">M24</button>
                    <button aria-label="Machine 25" data-success="40" data-failed="15">M25</button>
                  </div>
                </td>
                <td>50</td>
                <td>70</td>
                <td>20</td>
                <td>140</td>
              </tr>
              <tr>
                <td>Part 2</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 15" data-success="30" data-failed="10">M15</button>
                  </div>
                </td>
                <td>30</td>
                <td>45</td>
                <td>15</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Part 3</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 4" data-success="40" data-failed="20">M4</button>
                  </div>
                </td>
                <td>40</td>
                <td>60</td>
                <td>20</td>
                <td>120</td>
              </tr>
              <tr>
                <td>Part 4</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 23" data-success="55" data-failed="25">M23</button>
                  </div>
                </td>
                <td>55</td>
                <td>80</td>
                <td>25</td>
                <td>160</td>
              </tr>
              <tr>
                <td>Part 5</td>
                <td>2</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 13" data-success="65" data-failed="30">M13</button>
                    <button aria-label="Machine 20" data-success="70" data-failed="35">M20</button>
                  </div>
                </td>
                <td>65</td>
                <td>95</td>
                <td>30</td>
                <td>190</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='product2'>
          <div className='product-details'>
            <h3>PRODUCT2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  #456 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;material456</h3>
          </div>
          <table className='product-table'>
            <thead>
              <tr>
                <th>Part</th>
                <th># Machines</th>
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
                <td>4</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 3" data-success="20" data-failed="10">M3</button>
                    <button aria-label="Machine 8" data-success="25" data-failed="15">M8</button>
                    <button aria-label="Machine 21" data-success="30" data-failed="20">M21</button>
                    <button aria-label="Machine 22" data-success="35" data-failed="25">M22</button>
                  </div>
                </td>
                <td>20</td>
                <td>40</td>
                <td>10</td>
                <td>70</td>
              </tr>
              <tr>
                <td>Part 2</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 12" data-success="30" data-failed="20">M12</button>
                  </div>
                </td>
                <td>30</td>
                <td>50</td>
                <td>20</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Part 3</td>
                <td>2</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 2" data-success="40" data-failed="15">M2</button>
                    <button aria-label="Machine 9" data-success="45" data-failed="20">M9</button>
                  </div>
                </td>
                <td>40</td>
                <td>60</td>
                <td>15</td>
                <td>95</td>
              </tr>
              <tr>
                <td>Part 4</td>
                <td>2</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 5" data-success="50" data-failed="25">M5</button>
                    <button aria-label="Machine 6" data-success="55" data-failed="30">M6</button>
                  </div>
                </td>
                <td>50</td>
                <td>80</td>
                <td>25</td>
                <td>130</td>
              </tr>
              <tr>
                <td>Part 5</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 16" data-success="60" data-failed="20">M16</button>
                  </div>
                </td>
                <td>60</td>
                <td>70</td>
                <td>20</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='product3'>
          <div className='product-details'>
            <h3>PRODUCT3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  #789 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;material789</h3>
          </div>
          <table className='product-table'>
            <thead>
              <tr>
                <th>Part</th>
                <th># Machines</th>
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
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 7" data-success="30" data-failed="10">M7</button>
                  </div>
                </td>
                <td>30</td>
                <td>50</td>
                <td>10</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Part 2</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 10" data-success="35" data-failed="15">M10</button>
                  </div>
                </td>
                <td>35</td>
                <td>50</td>
                <td>15</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Part 3</td>
                <td>2</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 11" data-success="40" data-failed="20">M11</button>
                    <button aria-label="Machine 18" data-success="45" data-failed="25">M18</button>
                  </div>
                </td>
                <td>40</td>
                <td>60</td>
                <td>20</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Part 4</td>
                <td>2</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 1" data-success="50" data-failed="25">M1</button>
                    <button aria-label="Machine 19" data-success="55" data-failed="30">M19</button>
                  </div>
                </td>
                <td>50</td>
                <td>70</td>
                <td>25</td>
                <td>105</td>
              </tr>
              <tr>
                <td>Part 5</td>
                <td>1</td>
                <td>
                  <div className="button-group">
                    <button aria-label="Machine 17" data-success="60" data-failed="20">M17</button>
                  </div>
                </td>
                <td>60</td>
                <td>80</td>
                <td>20</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSummary;
