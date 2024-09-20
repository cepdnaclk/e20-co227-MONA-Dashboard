import React from "react";
import "./secondbar.scss";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import QueryBuilderIcon from "@mui/icons-material/WatchLaterOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";

const SecondBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="secondbar">
      <div className="box">
        <ul>
          <li
            onClick={() => handleButtonClick("/status")}
            style={{
              backgroundColor:
                location.pathname === "/status" ? "#201F67" : "white",
            }}
          >
            <DashboardRoundedIcon
              className="icon"
              style={{
                color: location.pathname === "/status" ? "white" : "inherit",
              }}
            />
            <span
              style={{
                color: location.pathname === "/status" ? "white" : "inherit",
              }}
            >
              MACHINE STATUS
            </span>
          </li>
          <li
          onClick={() => handleButtonClick("/rate/HourlyRate")}
            style={{
              backgroundColor: location.pathname.startsWith("/rate")
                ? "#201F67"
                : "white",
              position: "relative",
            }}
          >
            <QueryStatsRoundedIcon
              className="icon"
              style={{
                color: location.pathname.startsWith("/rate")
                  ? "white"
                  : "inherit",
              }}
            />
            <span
              style={{
                color: location.pathname.startsWith("/rate")
                  ? "white"
                  : "inherit",
              }}
            >
              PRODUCTION PROGRESS
            </span>
            {/* <ul className="submenu">
              <li
                onClick={() => handleButtonClick("/rate/HourlyRate")}
                style={{
                  backgroundColor:
                    location.pathname === "/rate/HourlyRate"
                      ? "#201F67"
                      : "white",
                }}
              >
                <QueryBuilderIcon
                  style={{
                    color:
                      location.pathname === "/rate/HourlyRate"
                        ? "white"
                        : "#201F67",
                  }}
                />
                <a
                  style={{
                    color:
                      location.pathname === "/rate/HourlyRate"
                        ? "white"
                        : "#201F67",
                  }}
                >
                    HOURLY RATE
                </a>
              </li>
              <li
                onClick={() => handleButtonClick("/rate/ProductProgress")}
                style={{
                  backgroundColor:
                    location.pathname === "/rate/ProductProgress"
                      ? "#201F67"
                      : "white",
                }}
              >
                {" "}
                <PrecisionManufacturingOutlinedIcon
                  style={{
                    color:
                      location.pathname === "/rate/ProductProgress"
                        ? "white"
                        : "#201F67",
                  }}
                />
                <a
                  style={{
                    color:
                      location.pathname === "/rate/ProductProgress"
                        ? "white"
                        : "#201F67",
                  }}
                >
                    PRODUCT PROGRESS
                </a>
              </li>
            </ul> */}
          </li>
          <li
            onClick={() => handleButtonClick("/history")}
            style={{
              backgroundColor:
                location.pathname.startsWith("/history") ? "#201F67" : "white",
            }}
          >
            <DescriptionRoundedIcon
              className="icon"
              style={{
                color: location.pathname.startsWith("/history") ? "white" : "inherit",
              }}
            />
            <span
              style={{
                color: location.pathname.startsWith("/history") ? "white" : "inherit",
              }}
            >
              PRODUCTION HISTORY
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SecondBar;
