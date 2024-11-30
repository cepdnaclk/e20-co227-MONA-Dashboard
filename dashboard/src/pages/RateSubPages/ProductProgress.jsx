import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";
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
    molds: Array.from({ length: 9 }, () => ({
      productionTime: Math.floor(Math.random() * 100),
      currentProgress: getRandomProgress(),
    })),
  }));

const ProductProgress = () => {
  const [products, setProducts] = useState(generateInitialProducts());
  const [expandedProduct, setExpandedProduct] = useState(null);

  const closeExpandedView = () => setExpandedProduct(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prevProducts) =>
        prevProducts.map((product) => ({
          ...product,
          totalProduced: Math.min(
            product.totalProduced + Math.floor(Math.random() * 10) + 5,
            product.targetCount
          ),
          molds: product.molds.map((mold) => ({
            ...mold,
            currentProgress: Math.min(mold.currentProgress + 4, 100),
          })),
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
        {expandedProduct ? (
          <div className="expanded-view" onClick={(e) => e.stopPropagation()}>
            <div className="expanded-header">
              <h1>{expandedProduct.name}</h1>
              <div className="stats">
                <p>
                  Total Produced: <span>{expandedProduct.totalProduced}</span>
                </p>
                <p>
                  Target: <span>{expandedProduct.targetCount}</span>
                </p>
              </div>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${
                    (expandedProduct.totalProduced /
                      expandedProduct.targetCount) *
                    100
                  }%`,
                }}
              />
              <p className="progress-label">
                {Math.round(
                  (expandedProduct.totalProduced /
                    expandedProduct.targetCount) *
                    100
                )}
                %
              </p>
            </div>

            <div className="molds-section">
              {expandedProduct.molds.slice(0, 10).map((mold, index) => (
                <div
                  key={index}
                  className={`mold-item ${
                    mold.currentProgress === 100
                      ? "completed"
                      : "not-started"
                  }`}
                >
                  Mold {index + 1}
                </div>
              ))}
            </div>

            <div className="parts-grid">
              {expandedProduct.parts.slice(0, 10).map((part, partIndex) => (
                <div
                  key={partIndex}
                  className={`part-item ${
                    part.progress === 100 ? "completed" : "not-started"
                  }`}
                >
                  {part.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => setExpandedProduct(product)}
              >
                <h3>{product.name}</h3>
                <div className="stats">
                  <p>
                    Total Produced: <span>{product.totalProduced}</span>
                  </p>
                  <p>
                    Target: <span>{product.targetCount}</span>
                  </p>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        (product.totalProduced / product.targetCount) * 100
                      }%`,
                    }}
                  />
                </div>
                <div className="parts-grid">
                  {product.parts.slice(0, 10).map((part, partIndex) => (
                    <div
                      key={partIndex}
                      className={`part-item ${
                        part.progress === 100 ? "completed" : "not-started"
                      }`}
                    >
                      {part.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {expandedProduct && <div className="backdrop" onClick={closeExpandedView} />}
    </>
  );
};


export default ProductProgress;
