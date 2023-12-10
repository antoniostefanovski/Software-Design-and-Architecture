import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main/Main';
import About from './views/About/About';
import Contact from './views/Contact/Contact';
import Locations from './views/Locations/Locations';
import WineryDetails from './views/WineryDetails/WineryDetails';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/winery" element={ <WineryDetails position={[41.4361, 22.0049]} name='Винарија Вино' /> } />
        <Route path="/locations" element={ <Locations /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/aboutus" element={ <About /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
