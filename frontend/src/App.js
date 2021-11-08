import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import firebase from './utils/firebase';
import Providers from './components/Providers';
import Footer from './components/Footer';

function App() {
  return (
    <Providers>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      
      <Footer />
    </Providers>
  );
}

export default App;
