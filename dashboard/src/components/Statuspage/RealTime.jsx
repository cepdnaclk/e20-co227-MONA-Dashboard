import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import Tooltip from '@mui/material/Tooltip';
import videold from './load.mp4';

import { BarChart } from '@mui/x-charts/BarChart';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import NightsStayIcon from '@mui/icons-material/NightsStayOutlined';


function TimeDifference({ TimeString }) {
    const [timeDifference, setTimeDifference] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateDifference = () => {
            const now = new Date();
            const backendTime = new Date(TimeString);
            const diffMs = now.getTime() - backendTime.getTime();
            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diffMs % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

            const formatTime = (time) => (time < 10 ? `0${time}` : time);

            setTimeDifference({
                days: formatTime(days),
                hours: formatTime(hours),
                minutes: formatTime(minutes),
                seconds: formatTime(seconds)
            });
        };

        updateDifference();
        const intervalId = setInterval(updateDifference, 1000);

        return () => clearInterval(intervalId);
    }, [TimeString]);

    return (
        <div>
            <p>
                {timeDifference.days >= 100 ? `${timeDifference.days} d `
                    : (timeDifference.days > 0 ? `${timeDifference.days} d ${timeDifference.hours} h `
                        : (timeDifference.hours > 0 ? `${timeDifference.hours} h ${timeDifference.minutes} m `
                            : (timeDifference.minutes > 0 ? `${timeDifference.minutes} m ${timeDifference.seconds} s`
                                : `${timeDifference.seconds} s`)))}

            </p>
        </div>
    );
}

const PieChartText = ({ x, y, text, color, size }) => (
    <svg>
        <text x={x} y={y} dominantBaseline="middle" textAnchor="middle"
            style={{ fontWeight: 'bold', fill: color, fontSize: size }}
        >

            {text}
        </text>
    </svg>
);

const PieChartLable = ({ x, y, xb, yb, text, size, color, boxWidth, boxHeight, title }) => (
    <Tooltip title={title} placement="top" arrow>
        <svg>
            <rect
                x={xb}
                y={yb}
                width={boxWidth}
                height={boxHeight}
                fill='none'
                stroke={color}
                strokeWidth={1}

            />
            <text
                x={x}
                y={y}
                dominantBaseline="middle"
                textAnchor="middle"
                style={{
                    fontWeight: 'bold',
                    fill: color,
                    fontSize: size,
                    cursor: 'pointer',
                }}
            >
                {text}
            </text>
        </svg>
    </Tooltip>
);



function RealTime() {
    const [realtimeinfo, setMachines] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());
    const [dayShift, setDayShift] = useState(false);
    const [nightShift, setNightShift] = useState(false);
    const [overShift, setoverShift] = useState(false);

    useEffect(() => {
        // Fetch machine data every second
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/machineinfo');
                setMachines(response.data.sort((a, b) => a.MachineNumber - b.MachineNumber));
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        // Start interval to fetch data every second
        const fetchIntervalId = setInterval(fetchData, 1000);

        // Start interval to update time and shift status every second
        const shiftIntervalId = setInterval(() => {
            setDateTime(new Date());
            const now = new Date();
            const hour = now.getHours();

            const dayshiftbegin = 7;
            const dayshiftend = 15;
            const nightshiftbegin = 15;
            const nightshiftend = 23;

            setDayShift(hour >= dayshiftbegin && hour < dayshiftend);
            setNightShift(hour >= nightshiftbegin && hour < nightshiftend);
            setoverShift((hour >= nightshiftend && hour < 24) || (hour >= 0 && hour < dayshiftbegin));
        }, 1000);

        // Cleanup function to clear intervals when the component unmounts
        return () => {
            clearInterval(fetchIntervalId);
            clearInterval(shiftIntervalId);
        };
    }, []);


    const formattedDate = dateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    const formattedTime = dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // Create an array with the first element empty to create the empty first tile
    const gridItems = [null, ...realtimeinfo.slice(0, 24)]; // Adds an empty first tile and limits data to 24 items

    const currentHour = new Date().getHours() + ((new Date().getMinutes()) / 60);
    return (
        <div className="card-grid">
            {gridItems.length === 1 ? (
                <video src={videold} autoPlay loop muted></video>
            ) : (
                gridItems.map((info, index) => (
                    info === null ? (
                        // Render the first empty tile
                        <div key={index} className="card-first-tile" >
                            {/* Optional content for empty tile */}
                            <div className="datetime-container-status">
                                <div className="time-container-status">

                                    {formattedTime}

                                </div>
                                <div>
                                    <h1>
                                        {formattedDate}
                                    </h1>
                                </div>
                                <div className="shift-container-status" >
                                    {nightShift &&
                                        <div style={{ display: "flex", flexDirection: 'row', marginTop: "5px" }}>
                                            <NightsStayIcon sx={{ fontSize: 30 }}></NightsStayIcon>
                                            <h2>
                                                Night Shift
                                            </h2>

                                        </div>
                                    }

                                    {dayShift &&
                                        <div style={{ display: "flex", flexDirection: 'row', marginTop: "5px" }}>
                                            <LightModeIcon sx={{ fontSize: 30 }} ></LightModeIcon>
                                            <h2>
                                                Day Shift
                                            </h2>
                                        </div>
                                    }
                                    {overShift &&
                                        <div style={{ display: "flex", flexDirection: 'row', marginTop: "5px" }}>
                                            <NightsStayIcon sx={{ fontSize: 30 }} ></NightsStayIcon>
                                            <h2>
                                                Overtime Shift
                                            </h2>
                                        </div>
                                    }
                                </div>
                                <div style={{ marginTop: "-65px", marginBottom: "-70px", cursor: "default" }}>
                                    <BarChart
                                        series={[{
                                            data: [currentHour],
                                            color: '#888888',
                                            tooltipComponent: () => null,
                                        }]}
                                        yAxis={[{ scaleType: 'band', data: ['Time'], hideTooltip: true }]}
                                        xAxis={[nightShift
                                            ? { min: 15, max: 23, hideTooltip: true, valueFormatter: (value) => `${value < 10 ? '0' : ''}${value}h` }
                                            : dayShift
                                                ? { min: 7, max: 15, valueFormatter: (value) => `${value < 10 ? '0' : ''}${value}h` }
                                                : { min: 0, max: 7, valueFormatter: (value) => `${value < 10 ? '0' : ''}${value}h` }
                                        ]}
                                        height={100}
                                        width={320}
                                        margin={{ top: 70, left: 10, right: 10, bottom: 20 }}
                                        leftAxis={null}
                                        layout="horizontal"
                                        tooltip={false}
                                    />


                                </div>


                            </div>

                        </div>
                    ) : (
                        <div
                            key={info.MachineNumber}
                            className={info.Status === '-1' ? "carderror" : "card"}
                            style={{ backgroundColor: info.Status === "off" ? '#dddddd' : '' }}
                        >
                            <div className="headrow" style={{ height: '18%', backgroundColor: info.Status === "-1" ? '#cc6666' : info.Status === "off" ? '#ababab' : info.Status === "1" ? '#99cc33' : info.Status === "0" ? '#77ccee' : '#bbb' }}>
                                <h3 style={{ color: info.Status === "off" ? '#888888' : '#012970', cursor: 'default' }}>
                                    Machine {info.MachineNumber}
                                </h3>
                                <div className='statu'>
                                    <span>{info.MachineName}</span>
                                    <span>
                                        {info.Status === "-1" ? 'Emergency !' : info.Status === "off" ? 'Inactive' : info.Status === "1" ? 'Active' : info.Status === "0" ? 'Idle' : '?'}
                                    </span>
                                    <span style={{ width: '28%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'serif', textTransform: 'lowercase' }}>
                                        <TimeDifference TimeString={info.StatusChangedTime} />
                                    </span>
                                </div>
                            </div>

                            <div className="headrow" style={{ cursor: 'default', height: '150px' }}>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { value: info.SuccessSlots, color: info.Status === "off" ? 'none' : '#99cc33', label: "Success Slots : " + info.SuccessSlots },
                                                { value: info.FailureSlots, color: info.Status === "off" ? 'none' : '#cc6666', label: 'Failure Slots    : ' + info.FailureSlots },
                                                { value: ((info.TargetSlots) - info.SuccessSlots - info.FailureSlots) > 0 ? ((info.TargetSlots) - info.SuccessSlots - info.FailureSlots) : 0, color: '#dddddd' },
                                            ],
                                            innerRadius: 50,
                                            outerRadius: 70,
                                            cornerRadius: 7,
                                            startAngle: 0,
                                            endAngle: 360,
                                            cx: 100,
                                            cy: 80,
                                        },
                                        {
                                            data: [
                                                { value: info.TargetSlots, color: info.Status === "off" ? 'none' : '#888888', label: "Target Slots     : " + info.TargetSlots },
                                                { value: ((info.TargetSlots) - info.SuccessSlots - info.FailureSlots) < 0 ? parseInt(info.SuccessSlots, 10) + parseInt(info.FailureSlots, 10) - parseInt(info.TargetSlots, 10) : info.FailureSlots, color: 'none' },
                                            ],
                                            innerRadius: 71,
                                            outerRadius: 76,
                                            startAngle: 0,
                                            endAngle: 360,
                                            cornerRadius: 2,
                                            cx: 100,
                                            cy: 80,
                                        },
                                    ]}
                                    width={420}
                                    height={160}
                                    skipAnimation
                                >
                                    <>
                                        <PieChartText
                                            x="25%"
                                            y="45%"
                                            size={'18px'}
                                            color={info.Status === 'off' ? 'none' : (info.TargetSlots - info.SuccessSlots) > 0 ? "#f46c00" : '#99cc33'}
                                            text={info.Status === 'off' ? '' : (info.SuccessSlots / info.TargetSlots * 100).toFixed(1) + " %"}
                                            style={{ transform: 'translate(-50%, -50%)', fontSize: '15px' }}
                                        />
                                        <PieChartText
                                            x="25%"
                                            y="55%"
                                            size='10px'
                                            color={info.Status === 'off' ? 'none' : (info.TargetSlots - info.SuccessSlots) > 0 ? "#f46c00" : '#99cc33'}
                                            text={"SLOTS GOAL"}
                                            style={{ transform: 'translate(-50%, -50%)', fontSize: '10px' }}
                                        />
                                        <PieChartText
                                            x="25%"
                                            y="65%"
                                            size='10px'
                                            color={info.Status === 'off' ? 'none' : (info.TargetSlots - info.SuccessSlots) > 0 ? "#f46c00" : '#99cc33'}
                                            text={info.Status === 'off' ? "" : info.TargetSlots - info.SuccessSlots > 0 ? (info.TargetSlots - info.SuccessSlots) + " slots behind" : " Target Achieved"}
                                            style={{ transform: 'translate(-50%, -50%)', fontSize: '10px' }}
                                        />
                                    </>

                                    <PieChartLable
                                        x="60%"
                                        y="10%"
                                        xb={"47%"}
                                        yb={"2%"}
                                        size="15px"
                                        title="Production"
                                        color={info.Status === 'off' ? '#888888' : "black"}
                                        text={info.Production}
                                        boxWidth={'26%'}
                                        boxHeight={"14%"}
                                        style={{ transform: 'translate(-50%, -50%)', fontSize: '15px' }}
                                    />

                                    <PieChartLable
                                        x="89%"
                                        y="10%"
                                        xb={"81%"}
                                        yb={"2%"}
                                        size="15px"
                                        title="Part"
                                        color={info.Status === 'off' ? '#888888' : "black"}
                                        text={info.Part}
                                        boxWidth={'16%'}
                                        boxHeight={"14%"}
                                    />
                                </PieChart>
                            </div>
                        </div>
                    )
                ))
            )}
        </div>
    )
}

export default RealTime;