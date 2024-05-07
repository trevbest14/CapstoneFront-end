import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import ItemDetails from '../components/ItemDetails';
import SearchResults from '../components/SearchResults';
import UserProfile from '../components/UserProfile';
import AdminDashboard from '../components/AdminDashboard';
import Listings from '../components/Listings';
import Login from '../components/Login'; // Import Login component
import SignUp from '../components/SignUp'; // Import SignUp component

function App() {
  console.log("App component loaded");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<ItemDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/whatsnew" element={<Listings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
      </Routes>
    </Router>
  );
}

export default App;
