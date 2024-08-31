import React, { useState, useEffect } from "react";
import ProductProgressChart from "../../components/RateComponents/ProductProgress/ProductProgressChart";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdBar from "../../layouts/ThirdBar";
import "./ProductProgress.scss";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import axios from "axios";

const ProductProgress = () => {
    const [realtimeinfo, setRealtimeInfo] = useState([]);
    const [rateinfo, setRateInfo] = useState([]);

    useEffect(() => {
        const fetchMachineData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/machineinfo");
                setRealtimeInfo(
                    response.data.sort((a, b) => a.Production - b.Production)
                );
            } catch (error) {
                console.error("Error fetching machine data:", error);
            }
        };

        const fetchRateData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/rateinfo");
                setRateInfo(
                    response.data.sort((a, b) => b.Production - a.Production)
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
        }, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId);
    }, []);

    const processDataForBarChart = (data) => {
        const groupedData = data.reduce(
            (acc, curr) => {
                const { Production, Part, SuccessSlots, FailureSlots, TargetSlots } = curr;

                if (!acc.success[Production]) {
                    acc.success[Production] = {};
                }
                if (!acc.success[Production][Part]) {
                    acc.success[Production][Part] = 0;
                }
                acc.success[Production][Part] += Number(SuccessSlots); // Sum SuccessSlots

                if (!acc.failure[Production]) {
                    acc.failure[Production] = {};
                }
                if (!acc.failure[Production][Part]) {
                    acc.failure[Production][Part] = 0;
                }
                acc.failure[Production][Part] += Number(FailureSlots); // Sum FailureSlots

                if (!acc.target[Production]) {
                    acc.target[Production] = {};
                }
                if (!acc.target[Production][Part]) {
                    acc.target[Production][Part] = 0;
                }
                acc.target[Production][Part] += Number(TargetSlots); // Sum TargetSlots

                return acc;
            },
            { success: {}, failure: {}, target: {} }
        );

        // Define specific productions and parts
        const desiredProductions = ["Production I", "Production II", "Production III"];
        const parts = ["Part I", "Part II", "Part III", "Part IV", "Part V"];

        // Create series data for stacked chart, grouping by each Part
        const seriesData = parts.flatMap((part) => [
            {
                label: part + " Failure",
                data: desiredProductions.map(
                    (production) => groupedData.failure[production]?.[part] || 0
                ),
                stack: part, // Stack by part name to separate stacks for each part
                color: "#cc6666",
            },
            {
                label: part + " Success",
                data: desiredProductions.map(
                    (production) => groupedData.success[production]?.[part] || 0
                ),
                stack: part, // Stack by part name to separate stacks for each part
                color: "#99cc33",
            },
        ]);

        return { productions: desiredProductions, seriesData, groupedData };
    };

    const { productions, seriesData, groupedData } = processDataForBarChart(
        realtimeinfo
    );

    const productionsset = ["Production I", "Production II", "Production III"];
    const partsset = ["Part I", "Part II", "Part III", "Part IV", "Part V"];

    const setdata = (production, part) => {
        const data = [];
        // Filter and map the rate info for the specific machine number
        const machineData = rateinfo.filter(
            (rate) => rate.Production === production && rate.Part === part
        );

        if (machineData.length === 0) {
            console.log("No data found for machine number:", part);
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
                const hours = lastUpdatedTime.getHours().toString().padStart(2, "0");
                const timeKey = `${hours}`;

                if (!acc[timeKey]) {
                    acc[timeKey] = [];
                }
                acc[timeKey].push({
                    time: lastUpdatedTime,
                    machine: rate.MachineNumber,
                    success: rate.SuccessSlots,
                    failure: rate.FailureSlots,
                });

                return acc;
            }, {});

            const timeKeys = Object.keys(groupedData);

            // Calculate the rate difference for each hour and adjust by time difference in minutes
            // timeKeys.forEach((time) => {
            //     const rateData = groupedData[time];
            //     if (rateData.length > 1) {
            //         const firstEntry = rateData[0];
            //         const lastEntry = rateData[rateData.length - 1];

            //         const firstMinute = firstEntry.time.getMinutes();
            //         const lastMinute = lastEntry.time.getMinutes();
            //         const timeDifferenceInMinutes = lastMinute - firstMinute;

            //         if (timeDifferenceInMinutes !== 0) {
            //             // To avoid division by zero
            //             const rateDifference = lastEntry.success - firstEntry.success; // Difference between first and last rate
            //             const adjustedRate = (
            //                 (rateDifference * 60) /
            //                 timeDifferenceInMinutes
            //             ).toFixed(2); // Adjust by time difference

            //             const rateDifference1 = lastEntry.failure - firstEntry.failure; // Difference between first and last rate
            //             const adjustedRate1 = (
            //                 (rateDifference1 * 60) /
            //                 timeDifferenceInMinutes
            //             ).toFixed(2); // Adjust by time difference

            //             data.push({
            //                 time: `${time}h`, // Time formatted as HH:00
            //                 machine: machine,
            //                 success: parseFloat(adjustedRate),
            //                 failure: parseFloat(adjustedRate1),
            //             });
            //         }
            //     }
            // });

            timeKeys.forEach((time) => {
                const rates = groupedData[time];
            
                // Group data by machine number
                const machineGroups = rates.reduce((acc, rate) => {
                    const machine = rate.machine;
                    if (!acc[machine]) {
                        acc[machine] = [];
                    }
                    acc[machine].push(rate);
                    return acc;
                }, {});
            
                // Initialize sums for success and failure differences
                let totalSuccessDifference = 0;
                let totalFailureDifference = 0;
            
                // Calculate success and failure differences for each machine group
                Object.values(machineGroups).forEach((machineRates) => {
                    const successValues = machineRates.map((rate) => rate.success);
                    const failureValues = machineRates.map((rate) => rate.failure); // Ensure 'failure' matches key
            
                    const timeValues = machineRates.map((rate) => rate.time.getTime()); // Convert date objects to milliseconds
            
                    // Calculate max-min differences for success and failure
                    const maxSuccess = Math.max(...successValues);
                    const minSuccess = Math.min(...successValues);
                    const maxTime = Math.max(...timeValues);
                    const minTime = Math.min(...timeValues);
                    const timeDifference = (maxTime - minTime) / (1000*60*60); // Convert time difference to minutes
            
                    // Ensure time difference is not zero to avoid division by zero
                    const successDifference =
                        timeDifference !== 0
                            ? parseFloat(((maxSuccess - minSuccess) / timeDifference).toFixed(2))
                            : 0;
            
                    const maxFailure = Math.max(...failureValues);
                    const minFailure = Math.min(...failureValues);
                    const failureDifference =
                        timeDifference !== 0
                            ? parseFloat(((maxFailure - minFailure) / timeDifference).toFixed(2))
                            : 0;
            
                    // Add to the total sums
                    totalSuccessDifference += successDifference;
                    totalFailureDifference += failureDifference;
                });
            
                // Push the aggregated data for the current time period
                data.push({
                    time: `${time}h`, // Time formatted as HH:MM or HH:00
                    success: parseFloat(totalSuccessDifference.toFixed(2)), // Round to 2 decimal places
                    failure: parseFloat(totalFailureDifference.toFixed(2)), // Correct spelling and round to 2 decimal places
                });
            });
            
            


        } else {
            // Group the data by the same minute (HH:MM)
            const groupedData = machineData.reduce((acc, rate) => {
                const lastUpdatedTime = new Date(rate.LastUpdatedTime);
                const hours = lastUpdatedTime.getHours().toString().padStart(2, "0");
                const minutes = lastUpdatedTime.getMinutes().toString().padStart(2, "0");
                const timeKey = `${hours}:${minutes}`;

                if (!acc[timeKey]) {
                    acc[timeKey] = [];
                }
                acc[timeKey].push({
                    time: lastUpdatedTime,
                    machine: rate.MachineNumber,
                    success: rate.SuccessSlots,
                    failure: rate.FailureSlots,
                });

                return acc;
            }, {});

            // Get all keys (time entries) and remove the last one
            const timeKeys = Object.keys(groupedData);
            timeKeys.pop(); // Remove the last time entry

            // Calculate the rate difference and format the time
            // Updated code to group by time, then by machine, and calculate differences
            timeKeys.forEach((time) => {
                const rates = groupedData[time];

                // Group data by machine number
                const machineGroups = rates.reduce((acc, rate) => {
                    const machine = rate.machine;
                    if (!acc[machine]) {
                        acc[machine] = [];
                    }
                    acc[machine].push(rate);
                    return acc;
                }, {});

                // Initialize sums for success and failure differences
                let totalSuccessDifference = 0;
                let totalFailureDifference = 0;

                // Calculate success and failure differences for each machine group
                Object.values(machineGroups).forEach((machineRates) => {
                    const successValues = machineRates.map((rate) => rate.success);
                    const failureValues = machineRates.map((rate) => rate.failure);

                    // Calculate max-min differences for success and failure
                    const maxSuccess = Math.max(...successValues);
                    const minSuccess = Math.min(...successValues);
                    const successDifference = maxSuccess - minSuccess;

                    const maxFailure = Math.max(...failureValues);
                    const minFailure = Math.min(...failureValues);
                    const failureDifference = maxFailure - minFailure;

                    // Add to the total sums
                    totalSuccessDifference += successDifference;
                    totalFailureDifference += failureDifference;
                });

                // Push the aggregated data for the current time period
                data.push({
                    time: time, // Time formatted as HH:MM or HH:00
                    success: totalSuccessDifference,
                    failure: totalFailureDifference,
                });
            });
            

        }

        return data;
    };

    // Function to calculate the Gauge value based on aggregated success and target slots
    const calculateGaugeValue = (production, part) => {
        const successSlots = groupedData.success[production]?.[part] || 0;
        const targetSlots = groupedData.target[production]?.[part] || 1; // Default to 1 to avoid division by zero
        return ((successSlots / targetSlots) * 100).toFixed(1);
    };

    return (
        <>
            <Header />
            <SecondBar />
            <ThirdBar />
            <div className="container">
                <div className="total-product">
                    {/* Combined Stacked Bar Chart */}
                    <h3>TOTAL PRODUCTION</h3>

                    <div className="">
                        {productionsset.map((product) => (
                            <div key={product} className="">
                                <div className="">
                                    <div className="g-product-title">{product}</div>
                                </div>
                                <div className="gauge-container">
                                    {partsset.map((part) => {
                                        const gaugeValue = calculateGaugeValue(product, part);
                                        return (
                                            <div key={part}>
                                                <div className="g-part-title">{part}</div>
                                                <Gauge
                                                    width={100}
                                                    height={100}
                                                    value={gaugeValue}
                                                    max={100}
                                                    cornerRadius="50%"
                                                    innerRadius="75%"
                                                    outerRadius="100%"
                                                    text={
                                                        ({ value, }) => `${value} %`

                                                    }
                                                    sx={(theme) => ({
                                                        [`& .${gaugeClasses.valueText}`]: {
                                                            fontSize: 15,
                                                        },
                                                        [`& .${gaugeClasses.valueArc}`]: {
                                                            fill: '#99cc33',
                                                        },
                                                    })}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            marginTop: "20px",
                            marginBottom: "-40px",
                            marginLeft: "10px",
                        }}
                    >
                        <span>Slots</span>
                    </div>

                    <BarChart
                        xAxis={[{ scaleType: "band", data: productions }]}
                        series={seriesData}
                        slotProps={{ legend: { hidden: true } }}
                        width={700}
                        height={370}
                        borderRadius={10}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </div>
                <div className="product-progress-page">
                    {productionsset.map((product) => (
                        <div key={product} className="product-block">
                            <div className="product-info">
                                <div className="product-title">{product}</div>
                            </div>
                            {partsset.map((part) => {
                                return (
                                    <div key={part}>
                                        <div className="part-title">{part}</div>
                                        <div className="Pchart-container">
                                            {/* Assuming ProductProgressChart expects some data format */}
                                            <ProductProgressChart data={setdata(product, part)} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductProgress;
