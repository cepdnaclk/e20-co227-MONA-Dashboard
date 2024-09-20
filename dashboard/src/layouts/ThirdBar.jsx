import React from "react";
import "./thirdbar.scss";
import { useNavigate, useLocation } from "react-router-dom";

const ThirdBar = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="thirdbar">
      <div className="box">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleButtonClick(item.path)}
              style={{
                backgroundColor:
                  location.pathname === item.path ? "#201F67" : "white",
              }}
            >
              <item.icon
                style={{
                  color:
                    location.pathname === item.path ? "white" : "#201F67",
                }}
              />
              <a
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontFamily: "Trebuchet MS",
                  color:
                    location.pathname === item.path ? "white" : "#201F67",
                }}
              >
                  {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThirdBar;
