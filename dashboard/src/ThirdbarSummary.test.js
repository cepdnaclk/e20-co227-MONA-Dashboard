import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ThirdbarSummary from "./layouts/ThirdbarSummary";

// Mock components for the routes you want to navigate to
const ProductSummaryPage = () => <div>Product Summary Page</div>;
const PartSummaryPage = () => <div>Part Summary Page</div>;
const MachineSummaryPage = () => <div>Machine Summary Page</div>;

describe("ThirdbarSummary Navigation", () => {
  test("renders navigation items", () => {
    render(
      <MemoryRouter>
        <ThirdbarSummary />
      </MemoryRouter>
    );

    // Check if navigation items are rendered
    expect(screen.getByText(/PRODUCT SUMMARY/i)).toBeInTheDocument();
    expect(screen.getByText(/PART SUMMARY/i)).toBeInTheDocument();
    expect(screen.getByText(/MACHINE SUMMARY/i)).toBeInTheDocument();
  });

  test("navigates to Product Summary on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ThirdbarSummary />} />
          <Route path="/history/product" element={<ProductSummaryPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the PRODUCT SUMMARY button
    const productSummaryButton = screen.getByText(/PRODUCT SUMMARY/i);
    userEvent.click(productSummaryButton);

    // Check if the Product Summary Page is rendered
    expect(screen.getByText("Product Summary Page")).toBeInTheDocument();
  });

  test("navigates to Part Summary on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ThirdbarSummary />} />
          <Route path="/history/part" element={<PartSummaryPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the PART SUMMARY button
    const partSummaryButton = screen.getByText(/PART SUMMARY/i);
    userEvent.click(partSummaryButton);

    // Check if the Part Summary Page is rendered
    expect(screen.getByText("Part Summary Page")).toBeInTheDocument();
  });

  test("navigates to Machine Summary on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ThirdbarSummary />} />
          <Route path="/history/machine" element={<MachineSummaryPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the MACHINE SUMMARY button
    const machineSummaryButton = screen.getByText(/MACHINE SUMMARY/i);
    userEvent.click(machineSummaryButton);

    // Check if the Machine Summary Page is rendered
    expect(screen.getByText("Machine Summary Page")).toBeInTheDocument();
  });
});
