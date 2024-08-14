import React from "react";
import ProductProgressChart from "../../components/RateComponents/ProductProgress/ProductProgressChart";
import {
  productProgressData,
  calculateOverallProgress,
} from "../../components/RateComponents/Data/product_data";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import "./ProductProgress.scss";
import ProductProgressBar from "../../components/RateComponents/ProductProgress/ProgressBar";
import BarGraph from "../../components/RateComponents/ProductProgress/BarGraph";

const ProductProgress = () => {
  return (
    <>
      <Header />
      <SecondBar />

      <div className="product-progress-page">
        {productProgressData.map((product) => (
          <div key={product.productName} className="product-block">
            <div className="product-info">
              <div className="product-title">{product.productName}</div>
              <div className="product-overall-progress">
                <span>Overall Progress:</span>
                <div className="progress-bar">
                  <ProductProgressBar
                    progress={calculateOverallProgress(product.machines)}
                  />
                </div>
              </div>
            </div>
            <div className="bar-graph">
              <BarGraph
                data={product.machines.map((machine) =>
                  calculateOverallProgress([machine])
                )}
              />
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
