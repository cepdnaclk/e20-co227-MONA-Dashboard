import './App.css';

import Status from './pages/Status';
import Rate from './pages/Rate';
import History from './pages/History';
import Page404 from './pages/page404';
import Loader from './components/Loader/Loader';


import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import { useEffect,useState } from 'react';

function App() {
        
        const[isloading, setIsLoading] = useState(true);

        useEffect(() => {
                const fakeDataFetch = () => {
                        setTimeout(() => {
                                setIsLoading(false);
                        }, 3000);
                }
                fakeDataFetch();
        }, []);

  return isloading ? (
        <Loader />) : (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route index element ={<Status/>}/>
          <Route path="/status" element={<Status/>} />
          <Route path="/rate" element={<Rate/>} />
          <Route path="/history" element={<History/>} />
          <Route path="*" element={<Page404 />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
