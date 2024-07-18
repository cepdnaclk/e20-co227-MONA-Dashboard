import './Summary.scss';
import Header from '../../layouts/Header';
import SecondBar from '../../layouts/SecondBar';
import { useState } from 'react';
import SummaryWidgets from '../../components/SummaryComponents/Widgets/SummaryWidgets';
import Dropdownbox from '../../components/SummaryComponents/Boxes/Dropdownbox';
import DatePicker from '../../components/SummaryComponents/DatePicker/DatePicker';
import ProductTable from '../../components/SummaryComponents/Tables/ProductTable';
import ProductPercentage from '../../components/SummaryComponents/Featured/ProductPercentage';
import ProductWidgets from '../../components/SummaryComponents/Widgets/ProductWidgets';
import ProductChart from '../../components/SummaryComponents/Charts/ProductChart';
import Machines from '../../components/SummaryComponents/Machines/Machines';
import MachineDropdown from '../../components/SummaryComponents/DropDown/MachineDropdown';

const SummaryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState('Select Product');
  const [selectedProductName, setSelectedProductName] = useState(null);

  const handleMoldClick = (mold, product) => {
    // Handle mold click event here
    console.log(`Mold clicked: ${mold}, Product: ${product.product_name}`);
  };

  return (
    <div className='summary'>
      <Header />
      <SecondBar />
      <div className='summaryContainer'>
        <div className='box'>
          <Dropdownbox />
          <div className='pickers'>
            <MachineDropdown
              selected={selectedProduct}
              setSelected={(product) => {
                setSelectedProduct(product);
                setSelectedProductName(product);
              }}
            />
            <DatePicker />
          </div>
        </div>
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
    </div>
  );
};

export default SummaryPage;
