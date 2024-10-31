import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import ProductProgress from "./pages/RateSubPages/ProductProgress"; // Ensure the correct import path for ProductProgress

// Mock the CSS import if necessary to avoid issues
// jest.mock("./settingspage.css", () => ({})); // Mock the CSS file if it's causing issues

// Mock any unnecessary components from SettingsPage if they are being imported indirectly
// jest.mock("./SettingsPage", () => () => <div>Mocked SettingsPage</div>); // Adjust this if you need to mock specific functionality

// Mock timers for interval testing
jest.useFakeTimers();

describe("ProductProgress Component", () => {
  test("renders initial products correctly", () => {
    // Render the ProductProgress component
    render(<ProductProgress />);

    // Verify that the first product name is displayed
    const productName = screen.getByText(/Product 1/i);
    expect(productName).toBeInTheDocument();

    // Verify that all products start with 0 total production
    const totalProduced = screen.getAllByText(/Total Produced: 0/i);
    expect(totalProduced.length).toBeGreaterThan(0); // Each product should show "Total Produced: 0"
  });

  test("expands and collapses product details", () => {
    // Render the ProductProgress component
    render(<ProductProgress />);

    // Simulate expanding the first product's details
    const productCard = screen.getByText(/Product 1/i);
    fireEvent.click(productCard);

    // Verify that the product's parts are shown after expanding
    const partName = screen.getByText(/Part 1/i);
    expect(partName).toBeInTheDocument();

    // Simulate collapsing the product's details
    fireEvent.click(productCard);

    // Verify that the product's parts are no longer visible
    expect(partName).not.toBeVisible();
  });

  test("increments production and progress over time", async () => {
    // Render the ProductProgress component
    render(<ProductProgress />);

    // Fast-forward time by 10 seconds
    jest.advanceTimersByTime(10000);

    // Wait for the UI to update after the simulated time passes
    await waitFor(() => {
      // Check that the total produced has increased for all products
      const totalProduced = screen.getAllByText(/Total Produced:/i);
      totalProduced.forEach((produced) => {
        expect(produced.textContent).not.toBe("Total Produced: 0");
      });
    });

    // Verify that at least one part has non-zero progress
    const progress = screen.getAllByText(/Current Progress:/i);
    expect(
      progress.some((prog) => parseInt(prog.textContent.match(/\d+/)[0]) > 0)
    ).toBe(true); // Ensure that at least one progress bar is updated
  });
});
