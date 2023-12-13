import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main/Main';
import About from './views/About/About';
import Contact from './views/Contact/Contact';
import Locations from './views/Locations/Locations';
import WineryDetails from './views/WineryDetails/WineryDetails';
import Footer from './components/Footer/Footer';
import Wines from './views/Wines/Wines';
import Wineries from './views/Wineries/Wineries';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/wineries" element={ <Wineries position={[41.4361, 22.0049]} /> } />
        <Route path="/locations" element={ <Locations /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/aboutus" element={ <About /> } />
        <Route path="/wines" element={ <Wines /> } />
        <Route path="/winery" element={ <WineryDetails position={[42.0018, 21.4679]} name='Винарија Тиквеш' /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
