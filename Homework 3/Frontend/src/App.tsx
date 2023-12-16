import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main/Main';
import About from './views/About/About';
import Contact from './views/Contact/Contact';
import Locations from './views/Locations/Locations';
import Footer from './components/Footer/Footer';
import Wines from './views/Wines/Wines';
import Wineries from './views/Wineries/Wineries';
import WineryDetailsPage from './views/WineryDetails/WineryDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/wineries" element={ <Wineries /> } />
        <Route path="/locations" element={ <Locations /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/aboutus" element={ <About /> } />
        <Route path="/wines" element={ <Wines /> } />
        <Route path="/winery" element={ <WineryDetailsPage /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
