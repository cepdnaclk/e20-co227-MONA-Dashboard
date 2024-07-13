

import React,{useState} from 'react';
import ButtonGroup from './ButtonGroup';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ExtensionIcon from '@mui/icons-material/ExtensionOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './settingspage.css';
import MachineSettings from './MachineSettings';
import ProductionandMaterial from './ProductionandMaterial';
import Password from './Password';
import About from './About';


const buttongroup = [
    {
        id: 1,
        name: (
        <>
        <BuildOutlinedIcon  style={{paddingBottom:"2%"}}/>
        <div style={{marginLeft:"3%"}}> Machines Settings</div>
       
        </>
        )
    },
    {
        id: 2,
        name: (
            <>
            <ExtensionIcon style={{paddingBottom:"2%"}}/>
            <div style={{marginLeft:"3%"}}>Pruductions & Materials</div>
           
            </>
            )
    },
    {
        id: 3,
        name: (
            <>
            <VpnKeyOutlinedIcon style={{paddingBottom:"2%"}}/>
            <div style={{marginLeft:"3%"}}>Password</div>
           
            </>
            )
    },
    {
        id: 4,
        name: (
            <>
            <InfoOutlinedIcon  style={{paddingBottom:"3%"}}/>
            <div style={{marginLeft:"3%"}}>About</div>
           
            </>
            )
    }
]

const ButtonComponent = ({index}) => {
    switch (index) {
        case 1:
            return <MachineSettings/>
        case 2:
            return <ProductionandMaterial/>
        case 3: 
            return <Password/>
        case 4:
            return <About/>
        default:
            return <MachineSettings/>
    }

}

export default function Settingstab() {
    const [isSelected, setIsSelected] = useState(1);

    return (
        <div style={{display:'flex'}} >
            <ButtonGroup buttons={buttongroup} isSelected={isSelected} setIsSelected={setIsSelected}/>
            <ButtonComponent index={isSelected}/>
        </div>
    )
}