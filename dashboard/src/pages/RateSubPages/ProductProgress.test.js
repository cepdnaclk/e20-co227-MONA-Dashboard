import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProductProgress from "./ProductProgress"; // Import the component
import axios from "axios";
// Mock Axios to prevent actual API calls
jest.mock("axios");

// Sample product data for testing
const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    totalProduced: 100,
    targetCount: 200,
    parts: [
      {
        name: "Part 1",
        mold: "Mold 01",
        productionTime: "2 hours",
        progress: 60,
      },
      {
        name: "Part 2",
        mold: "Mold 02",
        productionTime: "3 hours",
        progress: 80,
      },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    totalProduced: 50,
    targetCount: 150,
    parts: [
      {
        name: "Part 1",
        mold: "Mold 01",
        productionTime: "2 hours",
        progress: 40,
      },
      {
        name: "Part 2",
        mold: "Mold 02",
        productionTime: "3 hours",
        progress: 20,
      },
    ],
  },
];

describe("ProductProgress Component", () => {
  beforeEach(() => {
    // Mock the Axios GET request for products
    axios.get.mockResolvedValue({ data: mockProducts });
  });

  test("renders product list correctly", async () => {
    render(<ProductProgress />);

    // Wait for the component to fetch and display products
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });

    // Check if progress bars display the correct percentages
    expect(screen.getByText("50%")).toBeInTheDocument(); // 100/200
    expect(screen.getByText("33%")).toBeInTheDocument(); // 50/150
  });

  test("expands and collapses product details when clicked", async () => {
    render(<ProductProgress />);

    // Wait for products to be displayed
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    // Click on the first product to expand it
    fireEvent.click(screen.getByText("Product 1"));

    // Check if parts and progress bars are displayed in expanded view
    await waitFor(() => {
      expect(screen.getByText("Part 1")).toBeInTheDocument();
      expect(screen.getByText("Mold 01")).toBeInTheDocument();
      expect(screen.getByText("60%")).toBeInTheDocument(); // Part 1 progress
      expect(screen.getByText("80%")).toBeInTheDocument(); // Part 2 progress
    });

    // Click again to collapse
    fireEvent.click(screen.getByText("Product 1"));

    // Check if the expanded view is closed
    await waitFor(() => {
      expect(screen.queryByText("Mold 01")).not.toBeInTheDocument();
    });
  });

  test("displays correct progress bar for each product", async () => {
    render(<ProductProgress />);

    // Wait for the component to fetch and display products
    await waitFor(() => {
      expect(screen.getByText("50%")).toBeInTheDocument(); // Progress for Product 1 (100/200)
      expect(screen.getByText("33%")).toBeInTheDocument(); // Progress for Product 2 (50/150)
    });
  });

  test("handles API error gracefully", async () => {
    // Mock Axios to return an error
    axios.get.mockRejectedValue(new Error("Failed to fetch products"));

    render(<ProductProgress />);

    // Check if an error message or some fallback UI is rendered
    await waitFor(() => {
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
      // Optionally, test for an error message or loader here.
    });
  });
});
