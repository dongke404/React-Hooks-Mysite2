import React, { useState, useEffect } from "react";
import "./index.less";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "antd";
import storage from "../../utils/storageUtil";
import { CaretDownOutlined } from "@ant-design/icons";
import Cavatar from "../cAvatar";
import { reqCkuser } from "../../api";

const Header = () => {
  const [ishow, setishow] = useState(false);
  const [user, setuser] = useState(storage.getUser());
  const [avatarSrc, setAvatarSrc] = useState(storage.getUser().head_link);
  // 身份过期清除
  useEffect(() => {
    const toCkuser = async () => {
      let res = await reqCkuser(user.token);
      if (res.status !== 0) {
        storage.removeUser();
        setuser("");
      } 
    };
    toCkuser();
  }, [user]);

  const logout = () => {
    storage.removeUser();
    setuser((v) => "");
  };
  const setModalHidden = () => {
    setishow(false);
  };
  const setModalShow = () => {
    setishow(true);
  };
  const setAvatar = (src) => {
    setAvatarSrc(src);
  };

  return (
    <div>
      <span className="header-left">Mysite</span>
      <div className="header-right">
        {user ? (
          <div>
            <Avatar
              size="large"
              src={avatarSrc}
              onClick={() => setishow((ishow) => !ishow)}
            ></Avatar>
            <Popover
              title=""
              trigger="click"
              content={
                <Content logout={logout} setModalShow={setModalShow}></Content>
              }
            >
              <div className="pulldownicon">
                {user.nickname}
                <CaretDownOutlined />
              </div>
            </Popover>
          </div>
        ) : (
          <div>
            <Link to="/login" style={{ color: "white" }}>
              登录
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/reg" style={{ color: "white" }}>
              注册
            </Link>
          </div>
        )}
      </div>
      <Cavatar
        ishow={ishow}
        setModalHidden={setModalHidden}
        setAvatar={setAvatar}
      />
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <div className="pulldownBox">
        <p onClick={props.setModalShow}>更换头像</p>
        <p onClick={props.logout}>退出登陆</p>
      </div>
    </div>
  );
};
export default Header;
