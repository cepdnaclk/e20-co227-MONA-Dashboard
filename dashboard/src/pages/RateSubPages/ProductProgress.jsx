import React, { useState, useEffect } from "react";
import ProductProgressChart from "../../components/RateComponents/ProductProgress/ProductProgressChart";
import {
    productProgressData,
    calculateOverallProgress,
} from "../../components/RateComponents/Data/product_data";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import "./ProductProgress.scss";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
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

        // Define specific productions and parts
        const desiredProductions = ["Production I", "Production II", "Production III"];
        const parts = ["Part I", "Part II", "Part III", "Part IV", "Part V"];

        // Filter the data to include only the desired productions
        const seriesData1 = parts.map((part) => ({
            label: part,
            data: desiredProductions.map(
                (production) => groupedData.success[production]?.[part] || 0
            ),
        }));

        const seriesData2 = parts.map((part) => ({
            label: part,
            data: desiredProductions.map(
                (production) => groupedData.failure[production]?.[part] || 0
            ),
        }));

        return { productions: desiredProductions, seriesData1, seriesData2 };
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

    const productionsset = ['Production I', 'Production II', 'Production III'];
    const partsset = ['Part I', 'Part II', 'Part III', 'Part IV', 'Part V'];

    return (
        <>
            <Header />
            <SecondBar />
            <div className='container'>

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
                        width={700}
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
                        width={700}
                        height={400}
                        borderRadius={5}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </div>
                <div className="product-progress-page">

                    {productionsset.map((product) => (
                        <div key={product.productName} className="product-block">
                            <div className="product-info">
                                <div className="product-title">{product}</div>

                            </div>
                            {partsset.map((part) => (
                                <div >
                                    <div className="part-title">{part}</div>
                                    <div className="Pchart-container">
                                        <LineChart
                                            xAxis={[{ data: [0, 3, 6, 9, 12, 15, 18, 21, 24] }]}
                                            series={[
                                                {
                                                    data: [0, 0.5, 0.75, 1.5, 1.25, 2, 2.5, 3, 3.5],
                                                    label: "Machine 1",
                                                },
                                                {
                                                    data: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
                                                    label: "Machine 2",
                                                },
                                                {
                                                    data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                                                    label: "Machine 3",
                                                },
                                                {
                                                    data: [0, 0.9, 1.8, 2.7, 2.8, 2.9, 3.5, 3.6, 3.7],
                                                    label: "Machine 4",
                                                },
                                            ]}

                                            slotProps={{ legend: { hidden: true } }}
                                            width={380}
                                            height={200}

                                        />
                                    </div>
                                    </div>
                            ))}
                                </div>
                            ))}
                        </div>
            </div>

            </>
            );
};

            export default ProductProgress;
