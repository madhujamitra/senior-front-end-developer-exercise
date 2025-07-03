import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import UserProfiles from './components/UserProfiles'
import BaseMap from './components/BaseMap'
import PropertyData from './components/PropertyData';
import PropertyListingsPage from './components/PropertyListingsPage/PropertyListingsPage';

export interface SearchState {
  location: string;
}

function App() {
  const [search, setSearch] = useState<SearchState>({ location: '' });

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => { console.log("lalala") }} search={search} setSearch={setSearch} />

        <Route path="/" exact component={BaseMap} />
        <Route path='/user-profiles' component={UserProfiles} />
        <Route path='/property/:id' component={PropertyData} />
        <Route path="/properties" render={() => <PropertyListingsPage search={search} />} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
