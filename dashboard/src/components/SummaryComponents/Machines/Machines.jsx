import React from 'react';
import './Machines.scss';
import JSONDATA from '../../../product.json';

const Machines = ({ selectedProductName, onMoldClick }) => {
  // Find the selected product based on the selectedProductName prop
  const selectedProduct = JSONDATA.find(product => product.product_name === selectedProductName);

  return (
    <div className='machinesContainer'>
      {selectedProduct ? (
        <div key={selectedProduct.product_id} className='machine'>
          <h3>{selectedProduct.product_name}</h3>
          <div className='moldsUsed'>
            {selectedProduct.molds_used.map((mold, idx) => (
              <button
                key={idx}
                className='moldButton'
                onClick={() => onMoldClick(mold, selectedProduct)}
              >
                {mold}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className='notSelected'>No product selected</div>
      )}
    </div>
  );
};

export default Machines;
