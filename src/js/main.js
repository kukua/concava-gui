import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './controller/app'
import Test from './view/test'
import NoMatch from './view/noMatch'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="test" component={Test}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'))
