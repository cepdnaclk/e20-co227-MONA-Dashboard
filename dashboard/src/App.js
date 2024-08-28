import './App.css';

import Status from './pages/Status';
import Rate from './pages/Rate/Rate';
import Page404 from './pages/page404';
import Loader from './components/Loader/Loader';
import SummaryPage from './pages/Summary/SummaryPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductProgress from './pages/RateSubPages/ProductProgress';
import HourlyRate from './pages/RateSubPages/HourlyRate';

function App() {

    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fakeDataFetch = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
        fakeDataFetch();


    }, []);

    return isloading ? (
      <Loader />
    ) : (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Status />} />
            <Route path="/status" element={<Status />} />
            <Route path="/rate" element={<Rate />} />
            <Route path="/history" element={<SummaryPage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/rate/HourlyRate" element={<HourlyRate />} />
            <Route path="/rate/ProductProgress" element={<ProductProgress />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
