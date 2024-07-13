import React from 'react';
import './ProductTable.scss';
import productData from '../../../product.json';

const ProductTable = ({ productName }) => {
  // Find the product object based on product ID
  const product = productData.find(item => item.product_name === productName);

  // Default values for the table
  const defaultValues = {
    product_id: "N/A",
    product_name: "N/A",
    Number_of_molds_used: "N/A",
    molds_used: "N/A",
    completed_percentage: "N/A",
    time_taken: "N/A",
    total_products_made: "N/A",
    target_products: "N/A",
    left_products: "N/A"
  };

  // Use default values if no product is found
  const data = product || defaultValues;

  // Define keys and their corresponding labels
  const keyLabelMap = {
    product_id: "Product ID",
    product_name: "Product Name",
    Number_of_molds_used: "Number of Molds Used",
    molds_used: "Molds Used",
    completed_percentage: "Completed Percentage",
    time_taken: "Time Taken",
    total_products_made: "Total Products Made",
    target_products: "Target Products",
    left_products: "Products to be Made"
  };

  const keys = Object.keys(keyLabelMap);

  return (
    <div className='summaryTable'>
      <table>
        <tbody>
          {keys.map((key, idx) => (
            <tr key={idx}>
              <td className="key-column">{keyLabelMap[key]}</td>
              <td className="value-column" align='center'>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
