import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProductProgress.scss";

// Function to generate random percentages for progress
const getRandomProgress = () => Math.floor(Math.random() * 100);

const generateInitialProducts = () =>
  Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    totalProduced: Math.floor(Math.random() * 100),
    targetCount: 300 + Math.floor(Math.random() * 200),
    parts: Array.from({ length: 12 }, (_, partIndex) => ({
      name: `Part ${partIndex + 1}`,
      progress: getRandomProgress(),
    })),
  }));

const ProductProgress = () => {
  const [products, setProducts] = useState(generateInitialProducts());

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prevProducts) =>
        prevProducts.map((product) => ({
          ...product,
          totalProduced: Math.min(
            product.totalProduced + Math.floor(Math.random() * 10) + 5,
            product.targetCount
          ),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <SecondBar />
      <ThirdbarRate />
      <div className="production-page">
        <div className="product-list">
          {products.map((product) => {
            const progressPercentage =
              (product.totalProduced / product.targetCount) * 100;

            return (
              <div key={product.id} className="product-card">
                <h2>{product.name}</h2>
                <div className="product-stats">
                  <div className="stat-item">
                    <span className="label">Total Produced:</span>
                    <span className="value">{product.totalProduced}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Target Count:</span>
                    <span className="value">{product.targetCount}</span>
                  </div>
                </div>
                <div className="linear-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                  <span className="progress-label">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="grid-layout">
                  {product.parts.map((part, partIndex) => (
                    <div key={partIndex} className="grid-part">
                      <CircularProgressbar
                        value={part.progress}
                        text={`${part.progress}%`}
                        styles={buildStyles({
                          textColor: "#333",
                          pathColor: "#99cc33",
                          trailColor: "#e0e0e0",
                        })}
                      />
                      <span>{part.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductProgress;
