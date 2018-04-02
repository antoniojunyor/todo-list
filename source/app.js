import React, { Component } from 'react';
import Routes from './routes';

import './assets/stylesheets/app.sass';

export default class App extends Component {
  render() {
    return (
      <main className="as-main">
        <Routes />
      </main>
    );
  }
}
