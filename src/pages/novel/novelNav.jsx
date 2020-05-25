import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import NovelDirs from "./novelDirs";
import NovelContent from "./novelContent";
import storage from "../../utils/storageUtil";
import { useState } from "react";
import { BASEURL } from "../../config/index";
import { reqStoryHistory } from "../../api";

export default function NoverNav() {
  const token = storage.getUser().token || "";
  const [historys, sethistorys] = useState([]);
  const [user, setuser] = useState(storage.getUser());
  const logout = () => {
    setuser("");
    storage.removeUser();
  };

  const getStoryHistory = async () => {
    const result = await reqStoryHistory(token);
    if (result.status === 0) {
      sethistorys(result.data);
    } else {
      alert(result.msg);
    }
  };

  return (
    <div className="story-detail">
      <div className="story-detail-head">
        <div className="story-detail-head-total">
          <div className="story-detail-head-left">Mysite</div>
          <div className="story-detail-head-right">
            {user ? (
              <div>
                <Avatar size="large" src={BASEURL+user.head_link}></Avatar>
                <Popover
                  title="历史记录"
                  trigger="hover"
                  onVisibleChange={getStoryHistory}
                  content={<History historys={historys}></History>}
                >
                  <span className="iconfont icon-lishijilu"></span>
                </Popover>
                <Popover
                  title=""
                  trigger="click"
                  content={<Content logout={logout}></Content>}
                >
                  <div className="pulldownicon">
                    {user.nickname}
                    <CaretDownOutlined />
                  </div>
                </Popover>
              </div>
            ) : (
              <div>
                <Link to="/login" style={{ color: "grey" }}>
                  登录
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/reg" style={{ color: "grey" }}>
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/novel/:dir/:id" component={NovelContent} />
        <Route path="/novel/:dir" component={NovelDirs} />
      </Switch>
    </div>
  );
}

const Content = props => {
  return (
    <div>
      <div>我的书签</div>
      <div>我的收藏</div>
      <div onClick={props.logout}>退出登录</div>
    </div>
  );
};

const History = props => {
  return (
    <div>
      {props.historys.map(item => {
        return (
          <div key={item.path}>
            <a href={"/novel/" + item.storyid + "/" + item.path}>
              <span>{item.name}</span>
              <span>{item.dir}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
};
