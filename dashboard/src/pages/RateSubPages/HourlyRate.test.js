import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HourlyRate from "./HourlyRate";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mocking the axios module
jest.mock("axios");

describe("HourlyRate Component", () => {
  const machineData = [
    {
      MachineNumber: 1,
      Status: "1",
      SuccessSlots: 10,
      TargetSlots: 20,
      LastUpdatedTime: "2024-10-20T10:00:00Z",
    },
    {
      MachineNumber: 2,
      Status: "0",
      SuccessSlots: 5,
      TargetSlots: 15,
      LastUpdatedTime: "2024-10-20T10:05:00Z",
    },
  ];

  const rateData = [
    {
      MachineNumber: 1,
      LastUpdatedTime: "2024-10-20T10:00:00Z",
      SuccessSlots: 10,
      FailureSlots: 2,
    },
    {
      MachineNumber: 1,
      LastUpdatedTime: "2024-10-20T10:05:00Z",
      SuccessSlots: 15,
      FailureSlots: 1,
    },
    {
      MachineNumber: 2,
      LastUpdatedTime: "2024-10-20T10:05:00Z",
      SuccessSlots: 5,
      FailureSlots: 0,
    },
  ];

  beforeEach(() => {
    // Setting up mock responses for the API calls
    axios.get.mockImplementation((url) => {
      if (url === "http://localhost:8000/machineinfo") {
        return Promise.resolve({ data: machineData });
      } else if (url === "http://localhost:8000/rateinfo") {
        return Promise.resolve({ data: rateData });
      }
    });
  });

  test("renders HourlyRate component and fetches data", async () => {
    render(
      <MemoryRouter>
        <HourlyRate />
      </MemoryRouter>
    );

    // Verify that loading occurs and then the machines are displayed
    await waitFor(() => {
      expect(screen.getByText(/Machine 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Machine 2/i)).toBeInTheDocument();
    });
  });

  test("displays machine statuses correctly", async () => {
    render(
      <MemoryRouter>
        <HourlyRate />
      </MemoryRouter>
    );

    await waitFor(() => {
      const machine1Status = screen
        .getByText(/Machine 1/i)
        .closest(".machine-block");
      const machine2Status = screen
        .getByText(/Machine 2/i)
        .closest(".machine-block");

      // Assuming the status indicator is styled by the status value
      expect(machine1Status).toHaveStyle({ backgroundColor: "" }); // Machine is "1"
      expect(machine2Status).toHaveStyle({ backgroundColor: "#77ccee" }); // Machine is "0"
    });
  });

  test("calculates and displays success rates correctly", async () => {
    render(
      <MemoryRouter>
        <HourlyRate />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/10/i)).toBeInTheDocument(); // Last success for Machine 1
      expect(screen.getByText(/5/i)).toBeInTheDocument(); // Last success for Machine 2
    });
  });

  test("updates machine data every second", async () => {
    jest.useFakeTimers(); // Use fake timers for the interval
    render(
      <MemoryRouter>
        <HourlyRate />
      </MemoryRouter>
    );

    // Advance timers
    jest.advanceTimersByTime(1000); // Advance time by 1 second

    // Check if the fetching functions were called after the interval
    expect(axios.get).toHaveBeenCalledTimes(2); // Should be called for machine info and rate info

    jest.useRealTimers(); // Reset to real timers
  });
});
