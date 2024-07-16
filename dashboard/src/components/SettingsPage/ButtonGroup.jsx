import React from "react";
import './settingspage.css'

function ButtonGroup({ buttons, isSelected, setIsSelected }) {
    return (
        <div>
            {
                buttons.map((buttons) => (

                    <button
                        className={isSelected === buttons.id ? 'selectbutton' : 'buttons'}
                        onClick={() => setIsSelected(buttons.id)}
                        key={buttons.id}
                        >
                        {buttons.name}
                    </button>
                ))
            }
        </div>
    );
}

export default ButtonGroup;