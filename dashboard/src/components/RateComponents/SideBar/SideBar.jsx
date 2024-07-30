import React from "react";
import RateImage from "../../../images/graph.svg";
import ProductImage from "../../../images/production.svg";
import HourlyImage from "../../../images/hourly.svg";
import "./SideBar.scss";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="logoContainer">
        {/* Uncomment and use if needed */}
        {/* <img src={RateImage} alt="RateImage" className="logo" />
        <h2 className="title">Production Rate</h2> */}
      </div>

      <div className="menuIconContainer">
        <div className="menuIconTrigger"></div>
        <div className="menuIcon"></div>
      </div>

      <div className="contentContainer">
        <ul>
          <li
            className={location.pathname === "/rate/HourlyRate" ? "active" : ""}
            onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
          >
            <a onClick={() => handleButtonClick("/rate/HourlyRate")}>
              <img src={HourlyImage} alt="HourlyImage" />
              <span>Hourly Rate</span>
            </a>
            <ul className="submenu">
              <li onClick={() => handleButtonClick("/rate/HourlyRate")}>
                <a>Hourly Rate</a>
              </li>
              <li onClick={() => handleButtonClick("/rate/ProductProgress")}>
                <a>Production Progress</a>
              </li>
            </ul>
          </li>

          <li
            className={
              location.pathname === "/rate/ProductProgress" ? "active" : ""
            }
          >
            <a onClick={() => handleButtonClick("/rate/ProductProgress")}>
              <img src={ProductImage} alt="ProductImage" />
              <span>Product Progress</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
