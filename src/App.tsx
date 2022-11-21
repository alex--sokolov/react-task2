import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Page404 from './components/page404/page404';
import AboutPage from './components/about/about';
import Main from './components/main/main';
import Forms from 'components/forms/forms';
import { CharactersProvider } from './components/Characters/CharacterContext';

function App() {
  return (
    <div className="app-container" data-testid="app">
      <CharactersProvider>
        <Header />
        <Routes>
          <Route index element={<Main />} />
          <Route path="main" element={<Main />} />
          <Route path="forms" element={<Forms />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </CharactersProvider>
    </div>
  );
}

export default App;
