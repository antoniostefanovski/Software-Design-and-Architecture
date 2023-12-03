import { Route, Routes } from 'react-router-dom';
import TopWineries from './views/TopWineries';
import WineryDetails from './views/WineryDetails';
import WineriesFilter from './views/WineriesFilter';
import About from './views/About';
import React from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <TopWineries/> } />
        <Route path="/wineryDetails" element={ <WineryDetails /> } />
        <Route path="/wineries" element={ <WineriesFilter/> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
    </>
  );
}

export default App;
