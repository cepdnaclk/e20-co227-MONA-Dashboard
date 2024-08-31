import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import Tooltip from '@mui/material/Tooltip';
import videold from './load.mp4';


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

    const [realtimeinfo, setMachines] = useState([]); // Use clear variable name


    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/machineinfo');
                setMachines(response.data.sort((a, b) => a.MachineNumber - b.MachineNumber));
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1000); // Update every 0.5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to fetch data only once on mount








    return (
        <div className="card-grid " >
            {realtimeinfo.length === 0 ? (
                <video src={videold} autoPlay loop muted></video>
            ) : (

                realtimeinfo.map((realtimeinfo) => (
                    <div key={realtimeinfo.MachineNumber} className={realtimeinfo.Status==='-1' ?"carderror " : "card"}  style={{ backgroundColor: realtimeinfo.Status === "off" ? '#dddddd' : '' }}>
                        <div className="headrow" style={{ height: '18%', backgroundColor: realtimeinfo.Status === "-1" ? '#cc6666' : realtimeinfo.Status === "off" ? '#ababab' : realtimeinfo.Status === "1" ? '#99cc33' : realtimeinfo.Status === "0" ? '#77ccee' : '#bbb' }} >
                            <h3 style={{ color: realtimeinfo.Status === "off" ? '#888888' : '#012970', cursor: 'default' }}>Machine {realtimeinfo.MachineNumber}
                            </h3>
                            <div className='statu' style={{}}>
                                <span>{realtimeinfo.MachineName}</span>
                                <span>
                                    {realtimeinfo.Status === "-1" ? 'Emergency !' : realtimeinfo.Status === "off" ? 'Inactive' : realtimeinfo.Status === "1" ? 'Active' : realtimeinfo.Status === "0" ? 'Idle' : '?'}
                                </span>
                                <span style={{ width: '28%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'serif', textTransform: 'lowercase' }}>
                                    <TimeDifference TimeString={realtimeinfo.StatusChangedTime} />
                                </span>
                            </div>

                        </div>

                        <div className="headrow" style={{ cursor: 'default', height: '150px' }}>


                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { value: realtimeinfo.SuccessSlots, color: realtimeinfo.Status === "off" ? 'none' : '#99cc33', label: "Success Slots : " + realtimeinfo.SuccessSlots },
                                            { value: realtimeinfo.FailureSlots, color: realtimeinfo.Status === "off" ? 'none' : '#cc6666', label: 'Failure Slots    : ' + realtimeinfo.FailureSlots },/*alt+0160 */
                                            { value: ((realtimeinfo.TargetSlots) - realtimeinfo.SuccessSlots - realtimeinfo.FailureSlots) > 0 ? ((realtimeinfo.TargetSlots) - realtimeinfo.SuccessSlots - realtimeinfo.FailureSlots) : 0, color: '#dddddd' },
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
                                            /*
                                            { value: realtimeinfo.TargetSlots*24, color: 'none' },
                                            { value: realtimeinfo.TargetSlots, color:  realtimeinfo.Status === "off" ? 'none' :'black' ,label:"Target Slots     : " + realtimeinfo.TargetSlots},
                                            { value: realtimeinfo.TargetSlots*24, color: 'none' },
                                            */
                                            { value: realtimeinfo.TargetSlots, color: realtimeinfo.Status === "off" ? 'none' : '#888888', label: "Target Slots     : " + realtimeinfo.TargetSlots },
                                            { value: ((realtimeinfo.TargetSlots) - realtimeinfo.SuccessSlots - realtimeinfo.FailureSlots) < 0 ? parseInt(realtimeinfo.SuccessSlots, 10) + parseInt(realtimeinfo.FailureSlots, 10) - parseInt(realtimeinfo.TargetSlots, 10) : realtimeinfo.FailureSlots, color: 'none' },


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


                                skipAnimation >
                                <>
                                    <PieChartText
                                        x="25%"
                                        y="45%"
                                        size={'18px'}
                                        color={realtimeinfo.Status === 'off' ? 'none' : (realtimeinfo.TargetSlots - realtimeinfo.SuccessSlots) > 0 ? "#f46c00" : '#99cc33'}
                                        text={realtimeinfo.Status === 'off' ? '' : (realtimeinfo.SuccessSlots / realtimeinfo.TargetSlots * 100).toFixed(1) + " %"}
                                        style={{ transform: 'translate(-50%, -50%)', fontSize: '15px' }} // Center the text
                                    />
                                    <PieChartText
                                        x="25%"
                                        y="55%"
                                        size='10px'
                                        color={realtimeinfo.Status === 'off' ? 'none' : (realtimeinfo.TargetSlots - realtimeinfo.SuccessSlots) > 0 ? "#f46c00" : '#99cc33'}
                                        text={"SLOTS GOAL"}
                                        style={{ transform: 'translate(-50%, -50%)', fontSize: '10px' }} // Center the text
                                    />
                                    <PieChartText
                                        x="25%"
                                        y="65%"
                                        size='10px'
                                        color={realtimeinfo.Status === 'off' ? 'none' : (realtimeinfo.TargetSlots - realtimeinfo.SuccessSlots) > 0 ? "#f46c00" : '#99cc33'}
                                        text={realtimeinfo.Status === 'off' ? "" : realtimeinfo.TargetSlots - realtimeinfo.SuccessSlots > 0 ? (realtimeinfo.TargetSlots - realtimeinfo.SuccessSlots) + " slots behind" : " Target Achieved"}
                                        style={{ transform: 'translate(-50%, -50%)', fontSize: '10px' }} // Center the text
                                        
                                    >
                                    <div>
                                    </div>
                                    </PieChartText>

                                </>


                                <PieChartLable
                                    x="60%"
                                    y="10%"
                                    xb={"47%"}
                                    yb={"2%"}
                                    size="15px"
                                    title="Production"
                                    color={realtimeinfo.Status === 'off' ? '#888888' : "black"}
                                    text={realtimeinfo.Production}
                                    borderWidth={1} // Set default border width (optional)
                                    boxWidth={'26%'} // Adjust for desired text box width
                                    boxHeight={"14%"} // Adjust for desired text box height
                                    style={{ transform: 'translate(-50%, -50%)', fontSize: '15px' }} // Center the text
                                />

                                <PieChartLable
                                    x="89%"
                                    y="10%"
                                    xb={"81%"}
                                    yb={"2%"}
                                    size="15px"
                                    title="Part"
                                    color={realtimeinfo.Status === 'off' ? '#888888' : "black"}
                                    text={realtimeinfo.Part}
                                    borderWidth={1} // Set default border width (optional)
                                    boxWidth={'16%'} // Adjust for desired text box width
                                    boxHeight={"14%"} // Adjust for desired text box height
                                />
                            </PieChart>

                        </div>




                    </div>
                ))
            )}
        </div>
    )



}
export default RealTime;