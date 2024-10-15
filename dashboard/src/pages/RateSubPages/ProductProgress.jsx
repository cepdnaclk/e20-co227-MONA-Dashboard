import React, { useState } from "react";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";
import "./ProductProgress.scss"; // Ensure your styles are in this file

// Sample product data (10 products)
const products = [
  {
    id: 1,
    name: "Product 01",
    totalProduced: 100,
    parts: ["Part 1", "Part 2", "Part 3"],
  },
  {
    id: 2,
    name: "Product 02",
    totalProduced: 150,
    parts: ["Part 4", "Part 5", "Part 6"],
  },
  {
    id: 3,
    name: "Product 03",
    totalProduced: 80,
    parts: ["Part 7", "Part 8", "Part 9"],
  },
  {
    id: 4,
    name: "Product 04",
    totalProduced: 200,
    parts: ["Part 10", "Part 11", "Part 12"],
  },
  {
    id: 5,
    name: "Product 05",
    totalProduced: 90,
    parts: ["Part 13", "Part 14", "Part 15"],
  },
  {
    id: 6,
    name: "Product 06",
    totalProduced: 120,
    parts: ["Part 16", "Part 17", "Part 18"],
  },
  {
    id: 7,
    name: "Product 07",
    totalProduced: 60,
    parts: ["Part 19", "Part 20", "Part 21"],
  },
  {
    id: 8,
    name: "Product 08",
    totalProduced: 150,
    parts: ["Part 22", "Part 23", "Part 24"],
  },
  {
    id: 9,
    name: "Product 09",
    totalProduced: 110,
    parts: ["Part 25", "Part 26", "Part 27"],
  },
  {
    id: 10,
    name: "Product 10",
    totalProduced: 130,
    parts: ["Part 28", "Part 29", "Part 30"],
  },
];

const ProductProgress = () => {
  const [expandedProduct, setExpandedProduct] = useState(null); // State to track expanded product

  const handleExpand = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId); // Toggle expand/collapse
  };

  return (
    <>
      <Header />
      <SecondBar />
      <ThirdbarRate />
      <div className="production-page">
        <h1>Production Overview by Product</h1>
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                expandedProduct === product.id ? "active" : ""
              }`}
              onClick={() => handleExpand(product.id)} // Toggle expand on click
            >
              {expandedProduct !== product.id ? (
                // Show smaller card when not expanded
                <>
                  <h2>{product.name}</h2>
                  <p>Total Produced: {product.totalProduced}</p>
                  {/* Removed parts produced from small card */}
                </>
              ) : (
                // When expanded, show larger card with details
                <div className="expanded-details">
                  <h2>{product.name}</h2>
                  <p>Total Produced: {product.totalProduced}</p>
                  <h3>Parts Produced:</h3>
                  <ul>
                    {product.parts.map((part, index) => (
                      <li key={index}>{part}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Overlay for expanded product card */}
        {expandedProduct && (
          <div className="overlay" onClick={() => handleExpand(null)}>
            <div className="expanded-card">
              <h2>{products.find((p) => p.id === expandedProduct).name}</h2>
              <p>
                Total Produced:{" "}
                {products.find((p) => p.id === expandedProduct).totalProduced}
              </p>
              <h3>Parts Produced:</h3>
              <ul>
                {products
                  .find((p) => p.id === expandedProduct)
                  .parts.map((part, index) => (
                    <li key={index}>{part}</li>
                  ))}
              </ul>
              <button onClick={() => handleExpand(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductProgress;
