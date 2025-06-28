import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Travel } from './pages/Travel';
import { Header } from './components/custom/Header';
import Viewtrip from './view-trip/[tripId]/index';
// import MyTrips from './my-trips';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Header based on the current route */}
      {location.pathname !== "/" && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Travel" element={<Travel />} />
        <Route path="/view-trip/:tripId" element={<Viewtrip />} />
        {/* <Route path='/my-trips' element={<MyTrips />} /> */}
      </Routes>
    </>
  );
}

export default App;
