import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
import { BiSolidUpArrow } from "react-icons/bi";
import { PieChart } from '@mui/x-charts/PieChart';


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
                            <h2 style={{ color: '#012970' }}>Machine {realtimeinfo.MachineNumber}</h2>
                            <span className='statusdot' style={{ backgroundColor: realtimeinfo.Status === "-1" ? '#cc6666' : realtimeinfo.Status === "0" ? '#ffcc66' : realtimeinfo.Status === "1" ? '#99cc33' : '#bbb' }}>

                            </span>
                        </div>
                        <div className="headrow" >
                            <span className="lable">{realtimeinfo.MachineName}</span>
                            <span className="lable">{realtimeinfo.Material}</span>
                        </div>
                        <div className="headrow" style={{width:"82%"}}>
                            <span style={{ textAlign: 'center' }}>Success<br></br> {realtimeinfo.SuccessSlots}</span>
                            <span style={{ textAlign: 'center' }}>Failure <br></br>{realtimeinfo.FailureSlots}</span>
                        </div>
                        
                        <div>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { value: realtimeinfo.SuccessSlots ,color: '#99cc33' /*, label: 'Success Slots'*/},
                                        { value: realtimeinfo.FailureSlots ,color: '#cc6666' /*, label: 'Failure Slots'*/},
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
                        <div className="headrow" style={{width:"60%",marginLeft:"10px"}}>
                            <span>Rate:  {realtimeinfo.Rate}</span>
                            <span><BiSolidUpArrow style={{ color: realtimeinfo.Status === "1" ? '#99cc33' :  '#cc6666' ,transform: realtimeinfo.Status === "1" ? 'none' :'scaleY(-1)' }}/></span>
                        </div>

                    </div>
                ))
            )}

        </div>
    )



}
export default RealTime;