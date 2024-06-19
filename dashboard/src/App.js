//import Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//Import Bootsrtrap
import './App.css';
import Header from './components/Header';
import ButtonRow from './components/ButtonRow';
import MachineStatus from './components/MachineStatus';
import RealTime from './components/RealTime';

function App() {
  return (
        <><Header />
        <ButtonRow/>
        <div style={{ display: 'flex' }}>
                <RealTime />
                <MachineStatus />
        </div>


        </>
  );
}

export default App;
