import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SecondBar from "./SecondBar";

// Mock components for the routes you want to navigate to
const StatusPage = () => <div>Status Page</div>;
const ProductionProgressPage = () => <div>Production Progress Page</div>;
const ProductionHistoryPage = () => <div>Production History Page</div>;

describe("SecondBar Navigation", () => {
  test("renders navigation items", () => {
    render(
      <MemoryRouter>
        <SecondBar />
      </MemoryRouter>
    );

    // Check if navigation items are rendered
    expect(screen.getByText(/MACHINE STATUS/i)).toBeInTheDocument();
    expect(screen.getByText(/PRODUCTION PROGRESS/i)).toBeInTheDocument();
    expect(screen.getByText(/PRODUCTION HISTORY/i)).toBeInTheDocument();
  });

  test("navigates to Machine Status on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SecondBar />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the MACHINE STATUS button
    const machineStatusButton = screen.getByText(/MACHINE STATUS/i);
    userEvent.click(machineStatusButton);

    // Check if the Status Page is rendered
    expect(screen.getByText("Status Page")).toBeInTheDocument();
  });

  test("navigates to Production Progress on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SecondBar />} />
          <Route path="/rate/HourlyRate" element={<ProductionProgressPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the PRODUCTION PROGRESS button
    const productionProgressButton = screen.getByText(/PRODUCTION PROGRESS/i);
    userEvent.click(productionProgressButton);

    // Check if the Production Progress Page is rendered
    expect(screen.getByText("Production Progress Page")).toBeInTheDocument();
  });

  test("navigates to Production History on click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SecondBar />} />
          <Route path="/history" element={<ProductionHistoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the PRODUCTION HISTORY button
    const productionHistoryButton = screen.getByText(/PRODUCTION HISTORY/i);
    userEvent.click(productionHistoryButton);

    // Check if the Production History Page is rendered
    expect(screen.getByText("Production History Page")).toBeInTheDocument();
  });
});
