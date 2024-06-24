import { useEffect, useState } from "react";
import './statuspage.css';
import axios from 'axios';
import { BiSolidUpArrow } from "react-icons/bi";


function RealTime() {

    const [realtimeinfo, setMachines] = useState([]); // Use clear variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/status');
                setMachines(response.data);
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 5000); // Update every 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to fetch data only once on mount
    /*
      return (
          <div className="real-time-container">
              <div className="w-50">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <th>Machine Number</th>
                              <th>Status</th>
                              <th>Material</th>
                              <th>Success Slots</th>
                              <th>Failure Slots</th>
                              <th>Total Slots</th>
                              <th>Rate</th>
                          </tr>
                      </thead>
                      <tbody style={{ fontSize: '13px' }}>
                          {realtimeinfo.map(user => {
                              return <tr>
                                  <td>{user.MachineNumber}</td>
                                  <td>{user.Status}</td>
                                  <td>{user.Material}</td>
                                  <td>{user.SuccessSlots}</td>
                                  <td>{user.FailureSlots}</td>
                                  <td>{user.TotalSlots}</td>
                                  <td>{user.Rate}</td>
                              </tr>
                          })
                          }
                      </tbody>
                  </table>
              </div>
          </div>
      )
  */

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
                        <div className="headrow" style={{width:"60%"}}>
                            <span>Rate:  {realtimeinfo.Rate}</span>
                            <span><BiSolidUpArrow style={{ color: realtimeinfo.Status === "1" ? '#99cc33' :  '#cc6666' ,transform: realtimeinfo.Status === "1" ? 'none' :'scaleY(-1)' }}/></span>
                        </div>
                        <div>
                        
                        </div>
                    </div>
                ))
            )}

        </div>
    )



}
export default RealTime;