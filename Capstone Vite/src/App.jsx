import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import ItemDetails from '../components/ItemDetails';
import SearchResults from '../components/SearchResults';
import UserProfile from '../components/UserProfile';
import AdminDashboard from '../components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/details/:id" element={<ItemDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
