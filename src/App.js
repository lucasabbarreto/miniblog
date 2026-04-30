import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './context/AuthContext';

import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
