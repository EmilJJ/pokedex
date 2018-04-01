import React from 'react';
import { Router, Route } from 'react-router';
import PokemonsList from './containers/PokemonsList';
import PokemonProfile from './containers/PokemonProfile';

const NotFound = () => (
  <div>
    <h1>NotFound</h1>
  </div>
);

const MainRouter = props => (
  <Router {...props}>
    <Route path="/" component={PokemonsList} />
    <Route path="/pokemon/:id" component={PokemonProfile} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default MainRouter;
