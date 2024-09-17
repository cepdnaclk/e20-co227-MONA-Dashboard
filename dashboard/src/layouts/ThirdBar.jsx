import React from "react";
import "./thirdbar.scss";
import { useNavigate, useLocation } from "react-router-dom";

import QueryBuilderIcon from "@mui/icons-material/WatchLaterOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";

const ThirdBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    return (
        <div className="thirdbar">
            <div className="box">
                <ul >
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
                                fontWeight:"bold",
                                fontSize: "15px",
                                fontFamily: "Trebuchet MS",
                                color:
                                    location.pathname === "/rate/HourlyRate"
                                        ? "white"
                                        : "#201F67",
                            }}
                        >
                              BY MACHINE
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
                                fontWeight:"bold",
                                fontSize: "15px",
                                fontFamily: "Trebuchet MS",
                                color:
                                    location.pathname === "/rate/ProductProgress"
                                        ? "white"
                                        : "#201F67",
                            }}
                        >
                              BY PRODUCT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )




};

export default ThirdBar;