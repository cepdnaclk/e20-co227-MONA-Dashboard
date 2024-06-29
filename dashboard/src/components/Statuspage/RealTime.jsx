import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
import { BiSolidUpArrow } from "react-icons/bi";
import { PieChart } from '@mui/x-charts/PieChart';
import Tooltip from '@mui/material/Tooltip';


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
                <p>Loading machines...</p>
            ) : (
                realtimeinfo.map((realtimeinfo) => (
                    <div key={realtimeinfo.MachineNumber} className="card " >
                        <div className="headrow">
                            <h2 style={{ color: '#012970', cursor: 'default' }}>Machine {realtimeinfo.MachineNumber}</h2>
                            <Tooltip title={realtimeinfo.Status === "-1" ? 'Machine Status: Stucked Materials' : realtimeinfo.Status === "0" ? 'Machine Status: Stoped' : realtimeinfo.Status === "1" ? 'Machine Status: Running' : 'Machine Status: unknown'} placement="top" arrow>
                                <span className='statusdot' style={{ backgroundColor: realtimeinfo.Status === "-1" ? '#cc6666' : realtimeinfo.Status === "0" ? '#ffcc66' : realtimeinfo.Status === "1" ? '#99cc33' : '#bbb' }}>
                                </span>
                            </Tooltip>
                        </div>
                        <div className="headrow" >
                            <Tooltip title="Machine Name" placement="top" arrow>
                                <span className="lable">{realtimeinfo.MachineName}</span>
                            </Tooltip>
                            <Tooltip title="Material" placement="top" arrow>
                                <span className="lable">{realtimeinfo.Material}</span>
                            </Tooltip>

                        </div>
                        <div className="headrow" style={{ width: "82%" }}>
                            <Tooltip title="No of Success Slots" placement="top" arrow>
                            <span style={{ textAlign: 'center', cursor: 'pointer' }}>Success<br></br> {realtimeinfo.SuccessSlots}</span>
                            </Tooltip>
                            <Tooltip title="No of Failure Slots" placement="top" arrow>
                            <span style={{ textAlign: 'center', cursor: 'pointer' }}>Failure <br></br>{realtimeinfo.FailureSlots}</span>
                            </Tooltip>
                        </div>

                        <div>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { value: realtimeinfo.SuccessSlots, color: '#99cc33' /*, label: 'Success Slots'*/ },
                                            { value: realtimeinfo.FailureSlots, color: '#cc6666' /*, label: 'Failure Slots'*/ },
                                        ],
                                        innerRadius: 30,
                                        outerRadius: 65,/*65*/
                                        paddingAngle: 2,
                                        cornerRadius: 5,
                                        startAngle: -110,
                                        endAngle: 110,
                                        cx: 95,
                                        cy: 65,
                                    },
                                ]}
                                width={200}
                                height={100}
                            />

                        </div>
                        <div className="headrow" style={{ width: "60%", marginLeft: "10px" }}>
                            <Tooltip title="Current Rate" placement="top" arrow>
                                <span style={{ cursor:'pointer' }}>Rate: {realtimeinfo.Rate}</span>
                                <span>  </span>
                                <span><BiSolidUpArrow style={{ color: realtimeinfo.Status === "1" ? '#99cc33' : '#cc6666', transform: realtimeinfo.Status === "1" ? 'none' : 'scaleY(-1)' }} /></span>
                            </Tooltip>
                        </div>

                    </div>
                ))
            )}

        </div>
    )



}
export default RealTime;