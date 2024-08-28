
import * as React from 'react';
import SummaryPage from './SummaryPage';
import { useState } from 'react';
import ProductTable from '../../components/SummaryComponents/Tables/ProductTable';
import ProductPercentage from '../../components/SummaryComponents/Featured/ProductPercentage';
import ProductWidgets from '../../components/SummaryComponents/Widgets/ProductWidgets';
import ProductChart from '../../components/SummaryComponents/Charts/ProductChart';
import Machines from '../../components/SummaryComponents/Machines/Machines';
import './ProductPage.scss';

const ProductPage = () => {
  const [selectedProductName, setSelectedProductName] = useState(null);

  const handleMoldClick = (mold, product) => {
    // Handle mold click event here
    console.log(`Mold clicked: ${mold}, Product: ${product.product_name}`);
  };


  return (
    <div className='productPage'>
      <SummaryPage />
        <div className='container2'>
          <div className='machines'>
            <div className='machineTitle'>Used Machines</div>
            <Machines selectedProductName={selectedProductName} onMoldClick={handleMoldClick} />
          </div>
          <div className='widgets3'>
            <ProductWidgets type='target' productName={selectedProductName}/>
            <ProductWidgets type='complete' productName={selectedProductName}/>
            <ProductWidgets type='tobe' productName={selectedProductName}/>
          </div>
          <div className='graph'>
            <ProductChart productName={selectedProductName}/>
          </div>
          <div className='table'>
            <div className='tableTitle'>Product Summary</div>
            <ProductTable productName={selectedProductName} />
          </div>
          <div className='percentages'>
            <ProductPercentage type='complete' productName={selectedProductName}/>
            <ProductPercentage type='notComplete' productName={selectedProductName}/>
          </div>
        </div>

     
    </div>
  );
};

export default ProductPage;
