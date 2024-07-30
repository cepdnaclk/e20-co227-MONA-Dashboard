import React, { useState, useEffect } from "react";
import HourlyRateChart from "../../components/RateComponents/HourlyRate/HourlyRateChart";
import "./HourlyRate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import Sidebar from "../../components/RateComponents/SideBar/SideBar";
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
        rateinfo.map((rateinfo) => {
            if (rateinfo.MachineNumber === machineNumber) {
                const lastUpdatedTime = new Date(rateinfo.LastUpdatedTime);
                const hours = lastUpdatedTime.getHours().toString().padStart(2, '0'); // Get hours and pad with zero if needed
                const minutes = lastUpdatedTime.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed

                data.push({
                    time: `${hours}:${minutes}`, // Format time as HH:MM
                    rate: rateinfo.Rate,
                });
            }
        });
        return data;
    };



    return (
        <>
            <Header />
            <SecondBar />
            <Sidebar />

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
                            <div style={{ display: "flex" ,justifyContent:'space-between'}}>

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
