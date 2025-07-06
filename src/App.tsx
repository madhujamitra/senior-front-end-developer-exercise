import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import UserProfiles from './components/UserProfiles'
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import PropertyListing from './pages/PropertyListing/PropertyListing';


export interface SearchState {
  location: string;
}

function App() {
  const [search, setSearch] = useState<SearchState>({ location: '' });

  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <div className="container">
              <Header onAdd={() => { console.log("lalala") }} search={search} setSearch={setSearch} />

             
                          <Route path='/user-profiles' component={UserProfiles} />
                <Route path='/property/:id' component={PropertyDetail} />
                <Route path="/" exact render={() => <PropertyListing search={search} />} />
                <Route path='/login' component={Login} />
                <ProtectedRoute path='/dashboard' component={Dashboard} />
              
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
