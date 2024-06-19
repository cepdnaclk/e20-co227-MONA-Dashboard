import React from "react";
import ButtonStatus from './ButtonStatus';
import ButttonRate from './ButtonRate';
import ButtonSummary from './ButtonSummary';
import './Button.css';


function ButtonRow(){
        return(
                <buttonrow  className="buttonrow">
                        <ButtonStatus/>
                        <ButttonRate/>
                        <ButtonSummary/>
                </buttonrow>
        )
}
export default ButtonRow;