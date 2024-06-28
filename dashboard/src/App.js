//import Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//Import Bootsrtrap
import './App.css';

import Status from './pages/Status';
import Rate from './pages/Rate/Rate';
import Page404 from './pages/page404';
import SummaryPage from './pages/Summary/SummaryPage';

import { BrowserRouter , Routes ,Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route index element ={<Status/>}/>
          <Route path="/status" element={<Status/>} />
          <Route path="/rate" element={<Rate/>} />
          <Route path="/history" element={<SummaryPage/>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
