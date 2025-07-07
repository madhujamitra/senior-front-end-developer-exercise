import './App.css';
import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { preloadCriticalRoutes } from './utils/performance';

// Lazy load route components for code splitting
const UserProfiles = React.lazy(() => import('./components/UserProfiles'));
const PropertyDetail = React.lazy(() => import('./pages/PropertyDetail/PropertyDetail'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const PropertyListing = React.lazy(() => import('./pages/PropertyListing/PropertyListing'));

export interface SearchState {
  location: string;
}

// Custom fallback component for different route types
const RouteFallback: React.FC<{ type: 'card' | 'detail' | 'list' | 'spinner' | 'dashboard' | 'profile' }> = ({ type }) => {
  const count = type === 'card' ? 6 : type === 'list' ? 8 : 1;
  return <LoadingSpinner type={type} count={count} />;
};

function App() {
  const [search, setSearch] = useState<SearchState>({ location: '' });

  // Preload critical routes after app loads
  useEffect(() => {
    preloadCriticalRoutes();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <div className="container">
              <Header onAdd={() => { console.log("lalala") }} search={search} setSearch={setSearch} />

              <Suspense fallback={<RouteFallback type="card" />}>
                <Route path='/user-profiles' component={UserProfiles} />
                <Route path='/property/:id' component={PropertyDetail} />
                <Route path="/" exact render={() => <PropertyListing search={search} />} />
                <Route path='/login' component={Login} />
                <ProtectedRoute path='/dashboard' component={Dashboard} />
              </Suspense>
              
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
