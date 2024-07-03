import Header from '../layouts/Header';
import SecondBar from '../layouts/SecondBar';

import RealTime from '../components/Statuspage/RealTime';
import MachineStatus from '../components/Statuspage/MachineStatus';

export default function Status() {
        document.title = 'Dashboard - Production Status';
        return(
                <>
                <Header />
                <SecondBar/>
                <div style={{ display: 'flex' }}>
                <RealTime />
                <MachineStatus />
        </div>
                </>
        )
}