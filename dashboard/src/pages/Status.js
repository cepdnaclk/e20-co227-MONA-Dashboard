import Header from '../layouts/Header';
import SecondBar from '../layouts/SecondBar';

import RealTime from '../components/Statuspage/RealTime';

export default function Status() {
        document.title = 'Dashboard - Production Status';
        return(
                <>
                <Header />
                <SecondBar/>
                <RealTime />
                </>
        )
}