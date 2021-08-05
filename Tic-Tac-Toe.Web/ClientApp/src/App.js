import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Game } from './components/Game';
import { HistoryGames } from './components/HistoryGames';

import './custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/play' component={Game} />
        <Route path='/history' component={HistoryGames} />
      </Layout>
    );
  }
}
