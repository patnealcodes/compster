import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header/Header';

import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import TeamsPage from './pages/TeamsPage';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/pokemon">
          <PokemonPage />
        </Route>
        <Route path="/Teams">
          <TeamsPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
