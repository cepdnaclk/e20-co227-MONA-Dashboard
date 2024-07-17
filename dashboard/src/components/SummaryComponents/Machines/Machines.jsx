import React from 'react';
import './Machines.scss';
import JSONDATA from '../../../product.json';

const Machines = ({ onMoldClick }) => {
  return (
    <div className='machinesContainer'>
      {JSONDATA.map((product) => (
        <div key={product.product_id} className='machine'>
          <h3>{product.product_name}</h3>
          <div className='moldsUsed'>
            {product.molds_used.map((mold, idx) => (
              <button
                key={idx}
                className='moldButton'
                onClick={() => onMoldClick(mold, product)}
              >
                {mold}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Machines;
