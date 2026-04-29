import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
