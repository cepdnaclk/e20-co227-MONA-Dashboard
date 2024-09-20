import React, { useState, useEffect } from "react";
import HourlyRateChart from "../../components/RateComponents/HourlyRate/HourlyRateChart";
import "./HourlyRate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import axios from "axios";
import ProgressBar from "../../components/RateComponents/HourlyRate/Progress";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tooltip from '@mui/material/Tooltip';

import ThirdbarRate from "../../layouts/ThirdbarRate";


const HourlyRate = () => {
    const [realtimeinfo, setRealtimeInfo] = useState([]); // Use clear variable name
    const [rateinfo, setRateInfo] = useState([]);

    useEffect(() => {
        const fetchMachineData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/machineinfo");
                setRealtimeInfo(
                    response.data.sort((a, b) => a.MachineNumber - b.MachineNumber)
                );
            } catch (error) {
                console.error("Error fetching machine data:", error);
            }
        };

        const fetchRateData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/rateinfo");
                setRateInfo(
                    response.data.sort((a, b) => a.MachineNumber - b.MachineNumber)
                );
            } catch (error) {
                console.error("Error fetching rate data:", error);
            }
        };

        fetchMachineData();
        fetchRateData();

        const intervalId = setInterval(() => {
            fetchMachineData();
            fetchRateData();
        }, 1000); // Update every 10 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to fetch data only once on mount

    const setdata = (machineNumber) => {
        const data = [];

        // Filter and map the rate info for the specific machine number
        const machineData = rateinfo.filter(
            (rate) => rate.MachineNumber === machineNumber
        );

        if (machineData.length === 0) {
            console.log("No data found for machine number:", machineNumber);
            return data;
        }

        // Get the time difference between the first and last data points
        const firstTime = new Date(machineData[0].LastUpdatedTime);
        const lastTime = new Date(
            machineData[machineData.length - 1].LastUpdatedTime
        );
        const timeDifferenceInHours = (lastTime - firstTime) / (1000 * 60 * 60);

        if (timeDifferenceInHours > 1) {
            // Group the data by the same hour (HH)
            const groupedData = machineData.reduce((acc, rate) => {
                const lastUpdatedTime = new Date(rate.LastUpdatedTime);
                const hours = lastUpdatedTime.getHours().toString().padStart(2, "0");
                const timeKey = `${hours}`;

                if (!acc[timeKey]) {
                    acc[timeKey] = [];
                }
                acc[timeKey].push({
                    time: lastUpdatedTime,
                    success: rate.SuccessSlots,
                    faliure: rate.FailureSlots,
                });

                return acc;
            }, {});

            const timeKeys = Object.keys(groupedData);

            // Calculate the rate difference for each hour and adjust by time difference in minutes
            timeKeys.forEach((time) => {
                const rateData = groupedData[time];
                if (rateData.length > 1) {
                    const firstEntry = rateData[0];
                    const lastEntry = rateData[rateData.length - 1];

                    const firstMinute = firstEntry.time.getMinutes();
                    const lastMinute = lastEntry.time.getMinutes();
                    const timeDifferenceInMinutes = lastMinute - firstMinute;

                    if (timeDifferenceInMinutes !== 0) {
                        // To avoid division by zero
                        const rateDifference = lastEntry.success - firstEntry.success; // Difference between first and last rate
                        const adjustedRate = (
                            (rateDifference * 60) /
                            timeDifferenceInMinutes
                        ).toFixed(2); // Adjust by time difference

                        const rateDifference1 = lastEntry.faliure - firstEntry.faliure; // Difference between first and last rate
                        const adjustedRate1 = (
                            (rateDifference1 * 60) /
                            timeDifferenceInMinutes
                        ).toFixed(2); // Adjust by time difference

                        data.push({
                            time: `${time}h`, // Time formatted as HH:00
                            success: parseFloat(adjustedRate),
                            faliure: parseFloat(adjustedRate1),
                        });
                    }
                }
            });
        } else {
            // Group the data by the same minute (HH:MM)
            const groupedData = machineData.reduce((acc, rate) => {
                const lastUpdatedTime = new Date(rate.LastUpdatedTime);
                const hours = lastUpdatedTime.getHours().toString().padStart(2, "0");
                const minutes = lastUpdatedTime
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                const timeKey = `${hours}:${minutes}`;

                if (!acc[timeKey]) {
                    acc[timeKey] = [];
                }
                acc[timeKey].push({
                    time: lastUpdatedTime,
                    success: rate.SuccessSlots,
                    faliure: rate.FailureSlots,
                });

                return acc;
            }, {});

            // Get all keys (time entries) and remove the last one
            const timeKeys = Object.keys(groupedData);
            timeKeys.pop(); // Remove the last time entry

            // Calculate the rate difference and format the time
            timeKeys.forEach((time) => {
                const rates = groupedData[time];
                if (rates.length > 1) {
                    const successDifference =
                        rates[rates.length - 1].success - rates[0].success; // Difference between first and last rate
                    const faliureDifference =
                        rates[rates.length - 1].faliure - rates[0].faliure;
                    data.push({
                        time: time, // Time formatted as HH:MM
                        success: successDifference,
                        faliure: faliureDifference,
                    });
                }
            });
        }

        return data;
    };

    // const lastItem = data[data.length - 1]; // Get the last item
    // const lastItem2 = data[data.length - 2]; // Get the last item
    // const lastSuccessValue = data[data.length - 1] // Check if it exists and get the success value
    // const lastSuccessValue2 = lastItem2 ? lastItem2.success : null; // Check if it exists and get the success value


    //   const getRandomProgress = () => {
    //     return Math.floor(Math.random() * 101); // Generate random progress percentage between 0 and 100
    //   };

    return (
        <>
            <Header />
            <SecondBar />
            <ThirdbarRate/>

            <div className="hourly-rate-page ">
                {realtimeinfo.map((realtimeinfo) => {
                    const machineData = setdata(realtimeinfo.MachineNumber);
                    const lastSuccess1 = machineData.length > 0 ? machineData[machineData.length - 1].success.toFixed(2) : '-';
                    const lastSuccess2 = machineData.length > 1 ? machineData[machineData.length - 2].success.toFixed(2) : '-';
                    const lastSuccess3 = machineData.length > 2 ? machineData[machineData.length - 3].success.toFixed(2) : '-';

                    const lastdiff1 = (lastSuccess1 - lastSuccess2) || (lastSuccess1 - lastSuccess2) == 0 ? (lastSuccess1 - lastSuccess2).toFixed(2) : "-";
                    const lastdiff2 = (lastSuccess2 - lastSuccess3) || (lastSuccess1 - lastSuccess2) == 0 ? (lastSuccess2 - lastSuccess3).toFixed(2) : "-";


                    return (

                        <div
                            key={realtimeinfo.MachineNumber}
                            className="machine-block"
                            style={{
                                backgroundColor: realtimeinfo.Status === "off" ? "#dddddd" : "",
                            }}
                        >
                            <div className="status">
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <div
                                        className={
                                            realtimeinfo.Status === "-1" ? "ESmachine" : "Smachine"
                                        }
                                        style={{
                                            backgroundColor:
                                                realtimeinfo.Status === "-1"
                                                    ? "#cc6666"
                                                    : realtimeinfo.Status === "off"
                                                        ? "#ababab"
                                                        : realtimeinfo.Status === "1"
                                                            ? "#99cc33"
                                                            : realtimeinfo.Status === "0"
                                                                ? "#77ccee"
                                                                : "#bbb",
                                        }}
                                    ></div>

                                    <div className="progress-bar-container">
                                        <ProgressBar
                                            SuccessSlots={realtimeinfo.SuccessSlots}
                                            TargetSlots={realtimeinfo.TargetSlots} />
                                    </div>


                                    <div
                                        style={{
                                            color: realtimeinfo.Status === "off" ? "#ababab" : "",
                                        }}
                                    >
                                        <h3> Machine {realtimeinfo.MachineNumber}</h3>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{ display: "flex", flexDirection: "row", height: "90%" }}
                            >
                                <div className="Rchart-container">
                                    <HourlyRateChart data={setdata(realtimeinfo.MachineNumber)} />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginTop: "9%",
                                        height: "80%",
                                    }}
                                >
                                    <div
                                        className="rate-rate-p"
                                    >
                                        <Tooltip title="Previous Rate" placement="top" arrow>
                                            {realtimeinfo.Status !== 'off' && (
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                    <div>
                                                        <h4>{lastSuccess2}</h4>
                                                    </div>
                                                    <div>
                                                        {lastdiff2 !== 0 && (
                                                            <PlayArrowIcon
                                                                style={{
                                                                    color: lastdiff2 > 0 ? '#99cc33' : lastdiff1 < 0 ? 'red' : lastdiff1 === 0 ? 'yellow' : 'none',
                                                                    transform: lastdiff2 > 0 ? 'rotate(270deg)' : lastdiff1 < 0 ? 'rotate(90deg)' : 'rotate(270deg)',
                                                                    marginTop: lastdiff2 > 0 ? '-3px' : lastdiff1 < 0 ? '-6px' : '-5px',
                                                                    fontSize: '10px'
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            )}</Tooltip>
                                        <div>

                                        </div>
                                    </div>
                                    <div
                                        className="rate-rate-c"
                                    >
                                        <Tooltip title="Current Rate" placement="top" arrow>
                                            {realtimeinfo.Status !== 'off' && (
                                                <div>
                                                    <h4>{lastSuccess1}</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                            {lastdiff1 !== 0 && (

                                                                <PlayArrowIcon style={{
                                                                    color: lastdiff1 > 0 ? '#99cc33' : lastdiff1 < 0 ? 'red' : lastdiff1 === 0 ? 'yellow' : 'none',
                                                                    transform: lastdiff1 > 0 ? 'rotate(270deg)' : lastdiff1 < 0 ? 'rotate(90deg)' : 'rotate(270deg)',
                                                                    marginTop: lastdiff1 > 0 ? '-3px' : lastdiff1 < 0 ? '-6px' : '-5px',
                                                                }} />)}
                                                            <h6 style={{ color: lastdiff1 > 0 ? '#99cc33' : lastdiff1 < 0 ? 'red' : 'black' }}>{lastdiff1}
                                                            </h6>


                                                        </div>
                                                    </div>
                                                </div>
                                            )}</Tooltip>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })};
            </div>
        </>
    );
};

export default HourlyRate;
