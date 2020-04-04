import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login_reg from './pages/login_reg'
import Index from './pages/index'
import NovelNav from "./pages/novel/novelNav"
import "./assets/css/iconfont.css"
import "./assets/css/main.css"
import "./assets/css/normailize.css"

var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

export default function App() {
  return (
    <Router >
      <Switch>
        <Route path="/login" component={Login_reg} />
        <Route path="/reg" component={Login_reg} />
        <Route path="/novel/:dir" component={NovelNav} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  )
}

