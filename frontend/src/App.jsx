import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';

// Components
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [loginTimestamp, setLoginTimestamp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Check if user is logged in
      const userData = localStorage.getItem('user');
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Get login timestamp from sessionStorage (resets on browser close)
        const timestamp = sessionStorage.getItem('loginTimestamp');
        setLoginTimestamp(timestamp);
      }
      
      // Check if disclaimer was accepted
      const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
      if (!disclaimerAccepted) {
        setShowDisclaimer(true);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user data');
      // Clear corrupted data
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    const timestamp = Date.now().toString();
    sessionStorage.setItem('loginTimestamp', timestamp);
    setUser(userData);
    setLoginTimestamp(timestamp);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('loginTimestamp');
    sessionStorage.removeItem('quoteShown');
    setUser(null);
    setLoginTimestamp(null);
  };

  const handleDisclaimerAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-ayur-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AyurAI...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-ayur-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/chat" replace /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/chat" replace /> : <Register onLogin={handleLogin} />} 
            />
            <Route 
              path="/chat" 
              element={user ? <Chat user={user} loginTimestamp={loginTimestamp} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" replace />} 
            />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {showDisclaimer && (
          <Disclaimer onAccept={handleDisclaimerAccept} />
        )}
      </div>
    </Router>
  );
}

export default App;
