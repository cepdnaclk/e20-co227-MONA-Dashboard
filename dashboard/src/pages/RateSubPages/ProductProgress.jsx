import React, { useState } from "react";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";
import "./ProductProgress.scss"; // Ensure your styles are in this file

// Sample product data with 12 parts and molds numbered from 1 to 24
const products = [
  {
    id: 1,
    name: "Product 01",
    totalProduced: 100,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${(index % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 2,
    name: "Product 02",
    totalProduced: 150,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 12) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 3,
    name: "Product 03",
    totalProduced: 200,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 24) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 4,
    name: "Product 04",
    totalProduced: 250,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 36) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 5,
    name: "Product 05",
    totalProduced: 300,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 48) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 6,
    name: "Product 06",
    totalProduced: 350,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 60) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 7,
    name: "Product 07",
    totalProduced: 400,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 72) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 8,
    name: "Product 08",
    totalProduced: 450,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 84) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 9,
    name: "Product 09",
    totalProduced: 500,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 96) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
  },
  {
    id: 10,
    name: "Product 10",
    totalProduced: 550,
    parts: Array.from({ length: 12 }, (_, index) => ({
      name: `Part ${index + 1}`,
      mold: `Mold ${((index + 108) % 24) + 1}`, // Molds are numbered 1 to 24
    })),
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
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                expandedProduct === product.id ? "active" : ""
              }`}
              onClick={() => handleExpand(product.id)} // Toggle expand on click
            >
              <h2>{product.name}</h2>
              <p>Total Produced: {product.totalProduced}</p>
            </div>
          ))}
        </div>
        {/* Expanded card will be shown in the overlay */}
        {expandedProduct && (
          <div className="overlay" onClick={() => handleExpand(null)}>
            <div className="expanded-card" onClick={(e) => e.stopPropagation()}>
              <h2>{products.find((p) => p.id === expandedProduct).name}</h2>
              <p>
                Total Produced:{" "}
                {products.find((p) => p.id === expandedProduct).totalProduced}
              </p>
              <h3>Parts & Molds Produced:</h3>
              <div className="parts-mold-grid">
                {products
                  .find((p) => p.id === expandedProduct)
                  .parts.map((part, index) => (
                    <div key={index} className="part-mold-item">
                      <div className="part-name">{part.name}</div>
                      <div className="mold-name">Mold: {part.mold}</div>
                    </div>
                  ))}
              </div>
              <button onClick={() => handleExpand(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductProgress;
