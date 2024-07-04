import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
/*import { BiSolidUpArrow } from "react-icons/bi";*/
import { PieChart } from '@mui/x-charts/PieChart';
import Tooltip from '@mui/material/Tooltip';
import videold from './load.mp4';


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
                    <div key={realtimeinfo.MachineNumber} className="card " style={{ backgroundColor: realtimeinfo.Status === "0" ? '#dddddd' : '#fff' }}>
                        <div className="headrow">
                            <h2 style={{ color: realtimeinfo.Status === "0" ? '#888888' : '#012970', cursor: 'default' }}>Machine {realtimeinfo.MachineNumber}</h2>
                            <Tooltip title={realtimeinfo.Status === "-1" ? 'Machine Status: Stucked Materials' : realtimeinfo.Status === "0" ? 'Machine Status: Stoped' : realtimeinfo.Status === "1" ? 'Machine Status: Running' : 'Machine Status: unknown'} placement="top" arrow>
                                <span className='statusdot' style={{ backgroundColor: realtimeinfo.Status === "-1" ? '#cc6666' : realtimeinfo.Status === "0" ? '#888888' : realtimeinfo.Status === "1" ? '#99cc33' : '#bbb' }}>
                                </span>
                            </Tooltip>
                        </div>
                        <div className='headrow' style={{ height: '40px', width: "95%" }}>


                            <Tooltip title="Machine Name" placement="top" arrow>
                                <span className="lable">{realtimeinfo.MachineName}</span>
                            </Tooltip>
                            <Tooltip title="Material" placement="top" arrow>
                                <span className="lable">{realtimeinfo.Material}</span>
                            </Tooltip>
                            <Tooltip title="Production" placement="top" arrow>
                                <span className="lable" style={{ width: "120px" }}>{realtimeinfo.Production}</span>
                            </Tooltip>


                        </div>


                        <div className="headrow">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { value: realtimeinfo.SuccessSlots, color: realtimeinfo.Status === "0" ? '#888888' : '#99cc33', label: "Success Slots : " + realtimeinfo.SuccessSlots },
                                            { value: realtimeinfo.FailureSlots, color: realtimeinfo.Status === "0" ? '#ababab' : '#cc6666', label: 'Failure Slots    : ' + realtimeinfo.FailureSlots },/*alt+0160 */
                                        ],
                                        innerRadius: 30,
                                        outerRadius: 65,/*65*/
                                        paddingAngle: 2,
                                        cornerRadius: 5,
                                        startAngle: -90,
                                        endAngle: 90,
                                        cx: 95,
                                        cy: 65,
                                    },
                                ]}
                                width={380}
                                height={70}
                            />

                        </div>




                    </div>
                ))
            )}

        </div>
    )



}
export default RealTime;

/*                        <div className="headrow" style={{ width: "60%", marginLeft: "10px" }}>
                            <Tooltip title="Current Rate" placement="top" arrow>
                                <span style={{ cursor:'pointer' }}>Rate: {realtimeinfo.Rate}</span>
                                <span>  </span>
                                <span><BiSolidUpArrow style={{ color: realtimeinfo.Status === "1" ? '#99cc33' : realtimeinfo.Status === "-1" ? '#cc6666' : '#888888', transform: realtimeinfo.Status === "1" ? 'none' : 'scaleY(-1)' }} /></span>
                            </Tooltip>
                        </div>
                        */

/*
                        <div className="headrow" style={{ width: "82%" }}>
                            <Tooltip title="No of Success Slots" placement="top" arrow>
                            <span style={{ textAlign: 'center', cursor: 'pointer' }}>Success {realtimeinfo.SuccessSlots}</span>
                            </Tooltip>
                            </div>
                            <div className="headrow" style={{ width: "82%" }} >
                            <Tooltip title="No of Failure Slots" placement="top" arrow>
                            <span style={{ textAlign: 'center', cursor: 'pointer' }}>Failure {realtimeinfo.FailureSlots}</span>
                            </Tooltip>
                        </div>
                        */