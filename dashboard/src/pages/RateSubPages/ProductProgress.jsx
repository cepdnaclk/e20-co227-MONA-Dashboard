import React, { useState, useEffect } from "react";
import ProductProgressChart from "../../components/RateComponents/ProductProgress/ProductProgressChart";
import {
    productProgressData,
    calculateOverallProgress,
} from "../../components/RateComponents/Data/product_data";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import "./ProductProgress.scss";
import ProductProgressBar from "../../components/RateComponents/ProductProgress/ProgressBar";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const ProductProgress = () => {
    const [realtimeinfo, setRealtimeInfo] = useState([]);
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

        return () => clearInterval(intervalId);
    }, []);

    // Function to process data for both SuccessSlots and FailureSlots
    const processDataForBarChart = (data) => {
        const groupedData = data.reduce(
            (acc, curr) => {
                const { Production, Part, SuccessSlots, FailureSlots } = curr;

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

                return acc;
            },
            { success: {}, failure: {} }
        );

        const productions = Object.keys(groupedData.success);
        const parts = ["Part I", "Part II", "Part III", "Part IV", "Part V"];

        const seriesData1 = parts.map((part) => ({
            label: part,
            data: productions.map(
                (production) => groupedData.success[production][part] || 0
            ),
        }));

        const seriesData2 = parts.map((part) => ({
            label: part,
            data: productions.map(
                (production) => groupedData.failure[production][part] || 0
            ),
        }));

        return { productions, seriesData1, seriesData2 };
    };

    const getBarColor1 = (index) => {
        const colors = ["#99cc33", "#99cc33", "#99cc33", "#99cc33", "#99cc33"];
        return colors[index % colors.length];
    };

    const getBarColor2 = (index) => {
        const colors = ["#cc6666", "#cc6666", "#cc6666", "#cc6666", "#cc6666"];
        return colors[index % colors.length];
    };

    const { productions, seriesData1, seriesData2 } = processDataForBarChart(realtimeinfo);

    return (
        <>
            <Header />
            <SecondBar />
            <div style={{ overflowY: "scroll", height: "950px" }}>
                <div className="total-product">
                    {/* Success Slots Bar Chart */}
                    <h3>Success Slots</h3>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: productions }]}
                        series={seriesData1.map((serie, index) => ({
                            ...serie,
                            color: getBarColor1(index), // Set color dynamically
                        }))}
                        slotProps={{ legend: { hidden: true } }}
                        width={800}
                        height={400}
                        borderRadius={5}

                        grid={{ vertical: true, horizontal: true }}
                    />


                    {/* Failure Slots Bar Chart */}
                    <h3>Failure Slots</h3>
                    <BarChart
                        xAxis={[{ scaleType: "band", data: productions }]}
                        series={seriesData2.map((serie, index) => ({
                            ...serie,
                            color: getBarColor2(index), // Set color dynamically
                        }))}
                        slotProps={{ legend: { hidden: true } }}
                        width={800}
                        height={400}
                        borderRadius={5}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </div>
                <div className="product-progress-page">
                    {productProgressData.map((product) => (
                        <div key={product.productName} className="product-block">
                            <div className="product-info">
                                <div className="product-title">{product.productName}</div>
                                <div className="product-overall-progress">
                                    <span>Overall Progress:</span>
                                    <div className="progress-bar">
                                        <ProductProgressBar />
                                    </div>
                                </div>
                            </div>
                            <div className="Pchart-container">
                                <ProductProgressChart data={product.machines} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductProgress;
