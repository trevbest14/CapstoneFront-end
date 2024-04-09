import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ItemDetails from './components/ItemDetails';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/details/:id" component={ItemDetails} />
        <Route path="/search" component={SearchResults} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
