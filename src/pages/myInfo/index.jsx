import React from "react";
import { Menu } from "antd";
import "./index.less";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import MyInfmt from "./myInfmt";
import MyCltTopic from "./myCltTopic";
import Mytopic from "./myTopic";
import RepCmt from "./myRepCmt";
import MyFollow from "./myFollow";
import MyStoryhis from "./myStoryhis";
import storage from "../../utils/storageUtil";


export default function Myinfo(props) {
  return (
    <div className="userInfo-contain">
      <div className="userInfo-side">
        <div className="header">
          <div className="uavatar">
            <img src={storage.getUser().head_link} alt=""/>
          </div>
          <div className="sep10"></div>
          <p className="nickname">{storage.getUser().nickname}</p>
        </div>
        <div className="sep10"></div>
        <div className="menu">
          <Menu
            selectedKeys={[props.location.pathname]}
            mode="inline"
          >
            <Menu.Item key="/myinfo/myCltTopic">
              <Link to="/myinfo/myCltTopic">我的收藏</Link>
            </Menu.Item>
            <Menu.Item key="/myinfo/myTopic">
              <Link to="/myinfo/myTopic">发表的帖子</Link>
            </Menu.Item>
            <Menu.Item key="/myinfo/myRepCmt">
              <Link to="/myinfo/myRepCmt">我参与的</Link>
            </Menu.Item>
            <Menu.Item key="/myinfo/myFollow/1">
              <Link to="/myinfo/myFollow/1">关注的人</Link>
            </Menu.Item>
            <Menu.Item key="/myinfo/myFollow/2">
              <Link to="/myinfo/myFollow/2">关注我的</Link>
            </Menu.Item>
            <Menu.Item key="/myinfo/myStoryhis">
              <Link to="/myinfo/myStoryhis">小说历史</Link>
            </Menu.Item>
            <Menu.Item key="/myinfo/myInfmt">
              <Link to="/myinfo/myInfmt">个人信息</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="sepc10"></div>
      <Switch>
        <Route path="/myinfo/myCltTopic" component={MyCltTopic} />
        <Route path="/myinfo/myTopic" component={Mytopic} />
        <Route path="/myinfo/myRepCmt" component={RepCmt} />
        <Route path="/myinfo/myFollow/:id" component={MyFollow} />
        <Route path="/myinfo/myStoryhis" component={MyStoryhis} />
        <Route path="/myinfo/myInfmt" component={MyInfmt} />
        <Redirect from="/myinfo/*" to="/myinfo/myCltTopic" />
      </Switch>
    </div>
  );
}
