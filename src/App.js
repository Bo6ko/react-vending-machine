import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages
import Products from './pages/products/Products';
import Error from './pages/error/Error';
// Header
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
