import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
/*import { BiSolidUpArrow } from "react-icons/bi";*/
import { PieChart } from '@mui/x-charts/PieChart';
import Tooltip from '@mui/material/Tooltip';
import videold from './load.mp4';


function TimeDifference({ TimeString }) {
    const [timeDifference, setTimeDifference] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateDifference = () => {
            const now = new Date();
            const backendTime = new Date(TimeString);
            const diffMs = now.getTime() - backendTime.getTime();
            const minutes = Math.floor(diffMs / (1000 * 60));
            const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
            setTimeDifference({ minutes, seconds });
        };

        updateDifference();
        const intervalId = setInterval(updateDifference, 1000);

        return () => clearInterval(intervalId);
    }, [TimeString]);

    return (
        <div>
            <p>
                {timeDifference.minutes} m {timeDifference.seconds} s
            </p>
        </div>
    );
}


function RealTime() {

    const [realtimeinfo, setMachines] = useState([]); // Use clear variable name


    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/machineinfo');
                setMachines(response.data);
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 500); // Update every 0.5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to fetch data only once on mount








    return (
        <div className="card-grid " >
            {realtimeinfo.length === 0 ? (
                <video src={videold} autoPlay loop muted></video>
            ) : (

                realtimeinfo.map((realtimeinfo) => (
                    <div key={realtimeinfo.MachineNumber} className="card " style={{ backgroundColor: realtimeinfo.Status === "off" ? '#dddddd' : '#fff' }}>
                        <div className="headrow" style={{ height: '18%', backgroundColor: realtimeinfo.Status === "-1" ? '#cc6666' : realtimeinfo.Status === "off" ? '#ababab' : realtimeinfo.Status === "1" ? '#99cc33' : realtimeinfo.Status === "0" ? '#77ccee' : '#bbb' }} >
                            <h3 style={{ color: realtimeinfo.Status === "off" ? '#888888' : '#012970', cursor: 'default' }}>Machine {realtimeinfo.MachineNumber}
                            </h3>
                            <div className='statu' style={{}}>
                                <span>{realtimeinfo.MachineName}</span>
                                <span>
                                    {realtimeinfo.Status === "-1" ? 'Emergency !' : realtimeinfo.Status === "off" ? 'Inactive' : realtimeinfo.Status === "1" ? 'Active' : realtimeinfo.Status === "0" ? 'Idle' : '?'}
                                </span>
                                <span>
                                <TimeDifference TimeString={realtimeinfo.StatusChangedTime} />
                                </span>
                            </div>

                        </div>
                        
                        <div className="headrow" style={{cursor:'default'}}>
                            
                            
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { value: realtimeinfo.SuccessSlots, color: realtimeinfo.Status === "off" ? 'none' : '#99cc33', label: "Success Slots : " + realtimeinfo.SuccessSlots },
                                            { value: realtimeinfo.FailureSlots, color: realtimeinfo.Status === "off" ? 'none' : '#cc6666', label: 'Failure Slots    : ' + realtimeinfo.FailureSlots },/*alt+0160 */
                                            { value: ((realtimeinfo.TargetSlots*2)-(realtimeinfo.SuccessSlots - realtimeinfo.FailureSlots)), color:  '#dddddd' },
                                        ],
                                        innerRadius: 55,
                                        outerRadius: 70,/*65*/
                                        paddingAngle: 1,
                                        cornerRadius: 7,
                                        startAngle: -90,
                                        endAngle: 90,
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
                                            { value: realtimeinfo.TargetSlots, color: realtimeinfo.Status === "off" ? 'none' :'#888888' ,label:"Target Slots     : " + realtimeinfo.TargetSlots},
                                            { value: realtimeinfo.TargetSlots, color: 'none' },


                                        ],
                                        innerRadius: 71,
                                        outerRadius: 75,/*65*/
                                        paddingAngle: 2,
                                        startAngle: -86,
                                        endAngle: 86,
                                        cx: 100,
                                        cy: 80,
                                        
                                        legend: { hidden: true },

                                    
                                    },
                                ]}
                                

                                width={380}
                                height={100}
                                
                                skipAnimation/>
                            
                        </div>

                        <div className='headrow' style={{ height: '40px', width: "95%" }}>
                            <Tooltip title="Production" placement="top" arrow>
                                <span className="lable" style={{ width: "120px" }}>{realtimeinfo.Production}</span>
                            </Tooltip>
                            <Tooltip title="Material" placement="top" arrow>
                                <span className="lable">{realtimeinfo.Material}</span>
                            </Tooltip>
                        </div>

                    </div>
                ))
            )}
        </div>
    )



}
export default RealTime;