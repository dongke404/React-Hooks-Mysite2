import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import './index.less'
import { Link, withRouter } from "react-router-dom";
import { reqImagesTypes } from '../../api';


const { SubMenu } = Menu;
function Navigate(props) {
  const [imageList, setImageList] = useState([])
  useEffect(() => {
    let res = reqImagesTypes()
    res.then(result => {
      setImageList(result.data);
    }).catch((error) => { console.log(error) })
  }, [])
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
        <Menu.Item className='menu_item' key='story'>
          <Link to='/novel'>小说</Link>
        </Menu.Item>
        <SubMenu
          className='menu_item'
          title={<span className="submenu-title-wrapper">图片</span>}
        >
          {imageList.map((item) => {
            return <Menu.Item key={item.id}><Link to={'/photo/' + item.id}>{item.type}</Link></Menu.Item>
          })}
        </SubMenu>
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