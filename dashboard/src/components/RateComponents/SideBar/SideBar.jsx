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
        <img src={RateImage} alt="RateImage" className="logo" />
        <h2 className="title">Production Rate</h2>
      </div>

      <div className="menuIconContainer">
        <div className="menuIconTrigger"></div>
        <div className="menuIcon"></div>
      </div>

      <div className="contentContainer">
        <ul>
          <li
            className={location.pathname === "/rate/HourlyRate" ? "active" : ""}
          >
            <a onClick={() => handleButtonClick("/rate/HourlyRate")}>
              <img src={HourlyImage} alt="HourlyImage" />
              <span>Hourly Rate</span>
            </a>
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

          {/* <li className={location.pathname === "/rate" ? "active" : ""}>
            <a onClick={() => handleButtonClick('/rate')}>
              <img src={RateImage} alt="RateImage" />
              <span>Production Rate</span>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
