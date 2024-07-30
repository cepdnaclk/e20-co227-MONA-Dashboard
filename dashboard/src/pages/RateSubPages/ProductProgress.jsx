import React from "react";
import ProductProgressChart from "../../components/RateComponents/ProductProgress/ProductProgressChart";

import {
  productProgressData,
  calculateOverallProgress,
} from "../../components/RateComponents/Data/product_data";

import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
// import SideBar from "../../components/RateComponents/SideBar/SideBar";
import "./ProductProgress.scss";

const ProductProgress = () => {
  return (
    <>
      <Header />
      <SecondBar />
      {/* <SideBar /> */}

      <div className="product-progress-page">
        {productProgressData.map((product) => (
          <div key={product.productName} className="product-block">
            <div className="product-info">
              <div className="product-title">{product.productName}</div>
              <div className="product-overall-progress">
                Overall Progress: {calculateOverallProgress(product.machines)}%
              </div>
            </div>
            <div className="Pchart-container">
              <ProductProgressChart data={product.machines} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductProgress;
