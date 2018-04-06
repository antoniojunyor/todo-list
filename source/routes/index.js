import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/login';
import CreateAccount from '../pages/create-account';
import CreateList from '../pages/create-list';
import MyLists from '../pages/my-lists';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/create-account" component={CreateAccount}/>
    <Route exact path="/create-list" component={CreateList}/>
    <Route exact path="/my-lists" component={MyLists}/>
  </Switch>
);

export default Routes;
