import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import UserProfiles from './components/UserProfiles'

import PropertyData from './components/PropertyData';
import PropertyListingsPage from './components/PropertyListingsPage/PropertyListingsPage';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';


export interface SearchState {
  location: string;
}

function App() {
  const [search, setSearch] = useState<SearchState>({ location: '' });

  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header onAdd={() => { console.log("lalala") }} search={search} setSearch={setSearch} />

         
          <Route path='/user-profiles' component={UserProfiles} />
          <Route path='/property/:id' component={PropertyDetail} />
          <Route path="/" exact render={() => <PropertyListingsPage search={search} />} />
          <Route path='/login' component={Login} />
          <ProtectedRoute path='/dashboard' component={Dashboard} />
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
