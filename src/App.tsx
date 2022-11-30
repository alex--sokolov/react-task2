import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import CharactersProvider from './components/Characters/CharacterContext';
import Main from './components/pages/Main/Main';
import Header from './components/layout/Header/Header';
import Character from './components/ui/Character/Character';
import Forms from './components/pages/Forms/Forms';
import AboutPage from './components/pages/About/About';
import Page404 from './components/pages/Page404/page404';
import FormProvider from './components/Form/FormContext';
import CardsProvider from './components/Cards/CardsContext';

function App() {
  return (
    <div className="app-container" data-testid="app">
      <CharactersProvider>
        <CardsProvider>
          <FormProvider>
            <Header />
            <Routes>
              <Route index element={<Main />} />
              <Route path="/">
                <Route index element={<Main />} />
                <Route path="/character/:id" element={<Character />} />
              </Route>
              <Route path="/forms" element={<Forms />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </FormProvider>
        </CardsProvider>
      </CharactersProvider>
    </div>
  );
}

export default App;
