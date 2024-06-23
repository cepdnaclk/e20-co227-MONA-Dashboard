import { useEffect, useState } from "react";
import './RealTime.css';
import axios from 'axios';      

function RealTime(){
        
        const [machines_1, setStatus] = useState([]);
        useEffect(() => {
                axios.get('http://localhost:8000/status')
                .then(machines_1 => setStatus(machines_1.data))
                .catch(err => console.error(err))
                
        }, [])
        return(
                <div className="real-time-container">
                        <div className="w-50">
                        <table className="table table-striped">
                                <thead>
                                        <tr>
                                                <th>Machine Number</th>
                                                <th>Status</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {machines_1.map(user => {
                                                return <tr>
                                                        <td>{user.MachineNumber}</td>
                                                        <td>{user.Status}</td>
                                                </tr>
                                        })
                                }
                                </tbody>
                        </table>
                        </div>
                </div>
        )
                
}
export default RealTime;