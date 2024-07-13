import Header from "../layouts/Header"
import SecondBar from "../layouts/SecondBar"
import Settingstab from "../components/SettingsPage/settingstabs"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


export default function Settings() {


    return (
        < >
            <Header />
            <SecondBar />

            <div style={{  height: "70%", paddingLeft: "25%", paddingTop: "5%" }}>
                <div style={{ display: 'flex', marginBottom: "1%", marginLeft: "2%" }}>
                    <SettingsOutlinedIcon /><h1 style={{ marginLeft: '1%' }}>Settings</h1>
                </div>
                <Settingstab ></Settingstab>
            </div>




        </>
    )
}
