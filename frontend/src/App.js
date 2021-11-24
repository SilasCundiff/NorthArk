import './styles/App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Upgrade from './pages/Upgrade';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Providers from './components/Global/Providers';
import Footer from './components/Global/Footer/Footer';
import NavBar from './components/Global/Nav/NavBar';

function App() {
  return (
    <Providers>
      <CssBaseline />
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/upgrade' element={<Upgrade />} />
      </Routes>

      <Footer />
    </Providers>
  );
}

export default App;
