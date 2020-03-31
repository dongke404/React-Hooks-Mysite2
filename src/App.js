import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login_reg from './pages/login_reg'
import Index from './pages/index'
import "./assets/css/iconfont.css"
import "./assets/css/main.css"
import "./assets/css/normailize.css"
import { Provider } from 'react-keep-alive';






export default function App() {
  return (
    <Router >
      <Provider  include="One">
        <Switch>
          <Route path="/login" component={Login_reg} />
          <Route path="/reg" component={Login_reg} />
          <Route path="/" component={Index} />
        </Switch>
      </Provider>
    </Router>
  )
}

