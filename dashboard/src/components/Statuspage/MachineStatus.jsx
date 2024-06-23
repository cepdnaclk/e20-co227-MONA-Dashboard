import React from "react";
import './MachineStatus.css';
import ButtonGrid from "./ButtonGrid";
import ProductionSummary from "./ProductionSummary";

function MachineStatus(){
        return(
                
                <div className="machine-status" >
                        <h5 style={{ textAlign: 'center', color: '#381E72' ,marginTop:'10px' }}>MACHINE PROTECTOR STATUS</h5>
                        <ButtonGrid />
                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <button style={{color: 'white' , backgroundColor: '#99cc33'}}>RUNNING</button>
                        <button style={{color: 'white' , backgroundColor: '#ffcc66'}}>STOPED</button>
                        <button style={{color: 'white' , backgroundColor: '#cc6666'}}>STUCKED</button>
                </div>
                
                        <h3  style={{ textAlign: 'center', color: '#381E72' ,marginTop:'40px',marginBottom:'10px'}}>PRODUCTION SUMMARY</h3>
                        <ProductionSummary />
                        
                
                </div>
        )
}    
export default MachineStatus;   