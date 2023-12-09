import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './views/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main /> } />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
