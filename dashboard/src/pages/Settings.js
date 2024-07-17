import Header from "../layouts/Header"
import SecondBar from "../layouts/SecondBar"
import Settingstab from "../components/SettingsPage/settingstabs"


export default function Settings() {


        return (
                <>
                        <Header />
                        <SecondBar />

                        <h1 style={{ marginLeft: '3%', marginTop: '1%' }}>Settings</h1>
                        <Settingstab ></Settingstab>




                </>
        )
}
