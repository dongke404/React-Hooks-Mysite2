import React from 'react';
import { Menu } from 'antd';
import './index.less'
import { Link, withRouter } from "react-router-dom";


function Navigate(props) {
  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={props.location.pathname.match(/[a-z|A-Z]+/)}
      >
        <Menu.Item className='menu_item' key='home'  >
          <Link to='/home'>首页</Link>
        </Menu.Item>
        <Menu.Item className='menu_item' key='music'>
          <Link to='/music/3'>音乐</Link>
        </Menu.Item>
        <Menu.Item className='menu_item' key='novel'>
          <Link to='/novel'>小说</Link>
        </Menu.Item>
        <Menu.Item className='menu_item' key='photo' >
          <Link to='/photo'>图片</Link>
        </Menu.Item>
        <Menu.Item className='menu_item' key='movie' >
          <Link to='/movie'>电影</Link>
        </Menu.Item>
        <Menu.Item className='menu_item' key='userInfo'>
          <Link to='/userInfo'>个人主页</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
export default withRouter(Navigate)