import { render, screen, waitFor } from "@testing-library/react";
import RealTime from "./components/Statuspage/RealTime";
import axios from "axios";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom"; // for the matchers like 'toBeInTheDocument'

// Mock axios
jest.mock("axios");

describe("RealTime Component", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock time intervals
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should fetch machine and part data and render the component", async () => {
    // Mock response for axios calls
    axios.get
      .mockResolvedValueOnce({
        data: [
          {
            MachineNumber: 1,
            MachineName: "Machine A",
            Status: "1",
            StatusChangedTime: "2024-10-20T10:00:00Z",
            SuccessSlots: 5,
            FailureSlots: 2,
            TargetSlots: 10,
          },
          {
            MachineNumber: 2,
            MachineName: "Machine B",
            Status: "0",
            StatusChangedTime: "2024-10-20T11:00:00Z",
            SuccessSlots: 7,
            FailureSlots: 1,
            TargetSlots: 8,
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          { MachineNumber: 1, ProductNumber: 1, PartNumber: 101 },
          { MachineNumber: 1, ProductNumber: 1, PartNumber: 102 },
          { MachineNumber: 2, ProductNumber: 2, PartNumber: 201 },
        ],
      });

    // Render component
    await act(async () => {
      render(<RealTime />);
    });

    // Check if data is rendered
    const machine1 = await screen.findByText("Machine 1");
    expect(machine1).toBeInTheDocument();

    const machine2 = await screen.findByText("Machine 2");
    expect(machine2).toBeInTheDocument();

    // Check if the product data is rendered correctly
    await waitFor(() => {
      expect(screen.getByText("Success Slots")).toBeInTheDocument();
    });
  });

  it("should update the time and shift status correctly", async () => {
    // Render component
    await act(async () => {
      render(<RealTime />);
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Assert the time and shifts are updated
    await waitFor(() => {
      const timeText = screen.getByText(/:/); // Check time format
      expect(timeText).toBeInTheDocument();
    });
  });
});
