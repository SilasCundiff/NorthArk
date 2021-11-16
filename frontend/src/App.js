import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Providers from './components/Providers';
import Footer from './components/Footer';

function App() {
  return (
    <Providers>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route exact path='/settings' element={<Settings />} />
        <Route exact path='/reports' element={<Reports />} />
      </Routes>
      
      <Footer />
    </Providers>
  );
}

export default App;
