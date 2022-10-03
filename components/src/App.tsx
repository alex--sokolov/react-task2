import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Page404 from './components/page404/page404';
import AboutPage from './components/about/about';
import Main from './components/main/main';

function App() {
  return (
    <div className="app-container" data-testid="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
