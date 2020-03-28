import React from 'react'
import { Switch, Route } from 'react-router-dom'
import "./index.less"
import Login from './login';
import Reg from './reg';

const login_reg = () => {
  return (
    <div className='lrContainer'>
      <img src='https://ae01.alicdn.com/kf/Ha219af65ace949dcaff109aab7bba5eav.jpg' alt="loginbg" />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/reg" component={Reg} />
      </Switch>
    </div>
  )
}





export default login_reg