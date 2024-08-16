import React, { useState, useEffect } from "react";
import HourlyRateChart from "../../components/RateComponents/HourlyRate/HourlyRateChart";
import "./HourlyRate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import axios from "axios";

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
        const machineData = rateinfo.filter((rate) => rate.MachineNumber === machineNumber);
    
        if (machineData.length === 0) {
            console.log("No data found for machine number:", machineNumber);
            return data;
        }
    
        // Get the time difference between the first and last data points
        const firstTime = new Date(machineData[0].LastUpdatedTime);
        const lastTime = new Date(machineData[machineData.length - 1].LastUpdatedTime);
        const timeDifferenceInHours = (lastTime - firstTime) / (1000 * 60 * 60);
    
        if (timeDifferenceInHours > 1) {
            // Group the data by the same hour (HH)
            const groupedData = machineData.reduce((acc, rate) => {
                const lastUpdatedTime = new Date(rate.LastUpdatedTime);
                const hours = lastUpdatedTime.getHours().toString().padStart(2, '0');
                const timeKey = `${hours}`;
    
                if (!acc[timeKey]) {
                    acc[timeKey] = [];
                }
                acc[timeKey].push({
                    time: lastUpdatedTime,
                    rate: rate.SuccessSlots
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
    
                    if (timeDifferenceInMinutes !== 0) {  // To avoid division by zero
                        const rateDifference = lastEntry.rate - firstEntry.rate; // Difference between first and last rate
                        const adjustedRate =((rateDifference*60) / (timeDifferenceInMinutes)).toFixed(2); // Adjust by time difference
    
                        data.push({
                            time: `${time}h`, // Time formatted as HH:00
                            rate: parseFloat(adjustedRate),
                        });
                    }
                }
            });
        } else {
            // Group the data by the same minute (HH:MM)
            const groupedData = machineData.reduce((acc, rate) => {
                const lastUpdatedTime = new Date(rate.LastUpdatedTime);
                const hours = lastUpdatedTime.getHours().toString().padStart(2, '0');
                const minutes = lastUpdatedTime.getMinutes().toString().padStart(2, '0');
                const timeKey = `${hours}:${minutes}`;
    
                if (!acc[timeKey]) {
                    acc[timeKey] = [];
                }
                acc[timeKey].push(rate.SuccessSlots);
    
                return acc;
            }, {});
    
            // Get all keys (time entries) and remove the last one
            const timeKeys = Object.keys(groupedData);
            timeKeys.pop(); // Remove the last time entry
    
            // Calculate the rate difference and format the time
            timeKeys.forEach((time) => {
                const rates = groupedData[time];
                if (rates.length > 1) {
                    const rateDifference = rates[rates.length - 1] - rates[0]; // Difference between first and last rate
                    data.push({
                        time: time, // Time formatted as HH:MM
                        rate: rateDifference,
                    });
                }
            });
        }
    
        return data;
    };






    return (
        <>
            <Header />
            <SecondBar />

            <div className="hourly-rate-page ">
                {realtimeinfo.map((realtimeinfo) => (

                    <div
                        key={realtimeinfo.MachineNumber}
                        className="machine-block"
                        style={{ backgroundColor: realtimeinfo.Status === "off" ? '#dddddd' : '' }}
                    >
                        <div
                            className="status"
                        >
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>

                                <div
                                    className="Smachine"
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
                                >

                                </div>
                                <div>
                                    <h3> Machine {realtimeinfo.MachineNumber}

                                    </h3>
                                </div>
                            </div>

                        </div>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {setdata(realtimeinfo.MachineNumber).map((data) => (
                                    <tr key={data.time}>
                                        <td>{data.time}</td>
                                        <td>{data.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                        <div className="Rchart-container">
                            <HourlyRateChart data={setdata(realtimeinfo.MachineNumber)} />
                        </div>


                    </div>
                ))}

            </div>
        </>
    );
};

export default HourlyRate;
