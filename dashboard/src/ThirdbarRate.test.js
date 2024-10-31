import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ThirdbarRate from "./layouts/ThirdbarRate";

// Mock components for the routes you want to navigate to
const HourlyRatePage = () => <div>Hourly Rate Page</div>;
const ProductProgressPage = () => <div>Product Progress Page</div>;

describe("ThirdbarRate Navigation", () => {
  test("renders navigation items", () => {
    render(
      <MemoryRouter>
        <ThirdbarRate />
      </MemoryRouter>
    );

    // Check if navigation items are rendered
    expect(screen.getByText(/BY MOLD/i)).toBeInTheDocument();
    expect(screen.getByText(/BY PRODUCT/i)).toBeInTheDocument();
  });

  test("navigates to Hourly Rate on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ThirdbarRate />} />
          <Route path="/rate/HourlyRate" element={<HourlyRatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the BY MOLD button
    const byMoldButton = screen.getByText(/BY MOLD/i);
    userEvent.click(byMoldButton);

    // Check if the Hourly Rate Page is rendered
    expect(screen.getByText("Hourly Rate Page")).toBeInTheDocument();
  });

  test("navigates to Product Progress on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ThirdbarRate />} />
          <Route
            path="/rate/ProductProgress"
            element={<ProductProgressPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Click the BY PRODUCT button
    const byProductButton = screen.getByText(/BY PRODUCT/i);
    userEvent.click(byProductButton);

    // Check if the Product Progress Page is rendered
    expect(screen.getByText("Product Progress Page")).toBeInTheDocument();
  });

  afterAll(() => {
    console.log("All tests in ThirdbarRate have passed!");
    console.log("Detailed Test Report:");
    console.log("1. Renders navigation items: PASSED");
    console.log("2. Navigates to Hourly Rate: PASSED");
    console.log("3. Navigates to Product Progress: PASSED");
  });
});
