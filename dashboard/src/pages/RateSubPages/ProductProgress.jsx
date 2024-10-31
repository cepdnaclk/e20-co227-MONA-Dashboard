import React, { useState } from "react";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";
import "./ProductProgress.scss";

const products = Array.from({ length: 10 }, (_, index) => {
  const productId = index + 1;
  const targetCount = 250 + index * 50; // Increment target count for variety
  return {
    id: productId,
    name: `Product ${productId}`,
    totalProduced: Math.floor(Math.random() * (targetCount + 1) + 50), // Random produced count
    targetCount: targetCount,
    parts: Array.from({ length: 12 }, (_, partIndex) => ({
      name: `Part ${partIndex + 1}`,
      mold: `Mold 0${partIndex + 1}`,
      productionTime: `${Math.floor(Math.random() * 4) + 1} hours`,
      progress: Math.floor(Math.random() * 101), // Random progress from 0 to 100
    })),
  };
});

const ProductProgress = () => {
  const [expandedProduct, setExpandedProduct] = useState(null); // Track the expanded product

  const toggleExpand = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId); // Toggle expansion
  };

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
            const isExpanded = expandedProduct === product.id; // Check if this product is expanded

            return (
              <React.Fragment key={product.id}>
                {/* Small product card */}
                <div
                  className={`product-card ${isExpanded ? "expanded" : ""}`}
                  onClick={() => toggleExpand(product.id)} // Make the whole card clickable
                >
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
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <span className="progress-percentage">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Block - only appears when clicked */}
                {isExpanded && (
                  <div
                    className="overlay"
                    onClick={() => toggleExpand(null)} // Close modal on overlay click
                  >
                    <div
                      className="expanded-modal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2>{product.name}</h2>
                      <div className="product-stats-expanded">
                        <div className="stat-item">
                          <span className="label">Total Produced:</span>
                          <span className="value">{product.totalProduced}</span>
                        </div>
                        <div className="stat-item">
                          <span className="label">Target Count:</span>
                          <span className="value">{product.targetCount}</span>
                        </div>
                      </div>
                      <div className="progress-container-expanded">
                        <div
                          className="progress-bar-expanded"
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <span className="progress-percentage-expanded">
                            {progressPercentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      {/* Displaying part details with progress bars in expanded view */}
                      <div className="parts-mold-grid">
                        {product.parts.map((part, index) => (
                          <div key={index} className="part-mold-item">
                            <div className="part-name">{part.name}</div>
                            <div className="mold-name">Mold: {part.mold}</div>
                            <div className="production-time">
                              Production Time: {part.productionTime}
                            </div>
                            <div className="current-progress">
                              Current Progress: {part.progress}%
                            </div>
                            <div className="part-progress-container">
                              <div
                                className="part-progress-bar"
                                style={{ width: `${part.progress}%` }}
                              >
                                <span className="progress-percentage">
                                  {part.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductProgress;
