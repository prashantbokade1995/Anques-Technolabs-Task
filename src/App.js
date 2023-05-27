import React from 'react';
import UserForm from './components/UserForm';
import UserListing from './components/UserListing';
import Download from './components/Download';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from './components/TopBar';
import './App.css'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <TopBar/>
      <Routes>
      <Route path="/" element={<UserListing />} />
      <Route path="/add" element={<UserForm />} />
      <Route path="/Download" element={<Download />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};
export default App


