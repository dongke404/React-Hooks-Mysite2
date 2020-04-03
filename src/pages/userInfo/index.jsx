import React from "react";
import { Menu, Avatar } from "antd";
import "./index.less";

export default function UserInfo() {
  return (
    <div className="userInfo-contain">
      <div className="userInfo-side">
        <div className="header">
          <div className="avatar">
            <Avatar size={64}  />
          </div>
          <p className="nickname"></p>
        </div>
        <Menu
         
          style={{
            width: 200,
            minHeight: document.body.clientHeight,
            border: "none"
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="userInfo-Menu"
        >
          <Menu.Item key="9">个人信息</Menu.Item>
          <Menu.Item key="10">发表的帖子</Menu.Item>
          <Menu.Item key="13">查看回复</Menu.Item>
          <Menu.Item key="11">喜欢的音乐</Menu.Item>
          <Menu.Item key="12">小说历史记录</Menu.Item>
        </Menu>
      </div>

      <div className="userInfo-content"></div>
    </div>
  );
}
