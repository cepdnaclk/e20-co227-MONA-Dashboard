import React,{useRef} from "react";
import './settingspage.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Checkpassword({onclose1}) {

    const modelRef = useRef();

    const closeModel = (e) => {
        if (modelRef.current === e.target) {
            onclose1();
        }
    }

    return(
    
    <div ref={modelRef} onClick={closeModel} className='fixed-element2' style={{ height: "100%", width: "100%", padding: "25% 45%"}}>
        <div className='pwbox'>
            <div style={{borderBottom:'3px solid red', padding:'8px',paddingTop:'10px',display:'flex', justifyContent:'space-between'}}>
        <h3 >Password</h3>
        <button className='xbutton' onClick={onclose1} style={{ margin:'0', boxShadow:"none" ,cursor:'pointer'}} >
        <CloseRoundedIcon  />
        </button>
        </div>
        <form>
            <div style={{paddingTop:'6%',paddingLeft:'15%'}}>
            <label className='lablelable'>
                Enter Password   
                <input className="inputbox" type="password" name="password" />
            </label>
            </div>
            <div style={{paddingTop:'4%',paddingLeft:'38%'}}>
            <button className='buttonedit' style={{margin:'0px'}} type="submit">Submit</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default Checkpassword;