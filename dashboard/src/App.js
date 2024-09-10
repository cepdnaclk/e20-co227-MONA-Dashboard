import './App.css';

import Status from './pages/Status';
import Page404 from './pages/page404';
import Loader from './components/Loader/Loader';
import ProductPage from './pages/Summary/ProductPage';
import PartPage from './pages/Summary/PartPage';
import MachinePage from './pages/Summary/MachinePage';
import ProductProgress from './pages/RateSubPages/ProductProgress';
import HourlyRate from './pages/RateSubPages/HourlyRate';
import PartProgress from './pages/RateSubPages/PartProgress';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AllSummary from './pages/Summary/AllSummary';

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
            <Route path="/history" element={<AllSummary />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/part" element={<PartPage />} />
            <Route path="/machine" element={<MachinePage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/rate/HourlyRate" element={<HourlyRate />} />
            <Route path="/rate/ProductProgress" element={<ProductProgress />} />
            <Route path="/rate/PartProgress" element={<PartProgress />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
