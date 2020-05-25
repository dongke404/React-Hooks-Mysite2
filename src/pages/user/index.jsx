import React ,{useEffect,useState}from "react";
import { Menu, Button, message } from "antd";
import { Switch, Route, Link ,Redirect} from "react-router-dom";
import storage from "../../utils/storageUtil";
import UserTopic from "./userTopic";
import UserFollow from "./userFollow";
import { requbasicinfo ,reqFollow} from "../../api";
import { BASEURL } from "../../config/index";

export default function Userinfo(props) {
  const token = storage.getUser().token || "";
  const uid= props.match.params.uid
  const [userbinfo, setuserbinfo] = useState({})
  const [myfollow, setmyfollow] = useState(storage.getFollow()||[]);
  useEffect(() => {
    const getubasicinfo = async () => {
      let result = await requbasicinfo(uid);
      if (result.status === 0) {
        setuserbinfo(result.data);
      }else{
        message.error(result.msg)
      }
    };
    getubasicinfo();
  }, [uid]);
  
  const tofollow = async () => {
    if (!token) {
      alert("请先登录");
    } else {
      const result = await reqFollow(token, uid);
      if (result.status === 0) {
        storage.saveFollow(result.data);
        setmyfollow(result.data);
      } else {
        message.info(result.msg);
      }
    }
  };

  return (
    <div className="userInfo-contain">
      <div className="userInfo-side">
        <div className="header">
          <div className="uavatar">
            <img src={BASEURL+userbinfo.head_link} alt="" />
          </div>
          <div className="sep10"></div>
          <p className="nickname">{userbinfo.nickname}</p>
          <div className="sep10"></div>
          {myfollow.includes(parseInt(uid)) ? (
                      <Button onClick={tofollow}>已关注</Button>
                    ) : (
                      <Button onClick={tofollow}>关注他</Button>
                    )}

        </div>
        <div className="sep10"></div>
        <div className="menu">
          <Menu selectedKeys={[props.location.pathname]} mode="inline">
            <Menu.Item key={"/user/" + props.match.params.uid + "/userTopic"}>
              <Link to={"/user/" + props.match.params.uid + "/userTopic"}>
                他的发表
              </Link>
            </Menu.Item>
            <Menu.Item key={"/user/" + props.match.params.uid + "/UserFollow/1"}>
              <Link to={"/user/" + props.match.params.uid + "/UserFollow/1"}>
                他的关注
              </Link>
            </Menu.Item>
            <Menu.Item key={"/user/" + props.match.params.uid + "/UserFollow/2"}>
              <Link to={"/user/" + props.match.params.uid + "/UserFollow/2"}>
                关注他的
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="sepc10"></div>
      <Switch>
        <Route path="/user/:uid/userTopic" component={UserTopic} />
        <Route path="/user/:uid/userFollow/:flag" component={UserFollow} />
        <Route path="/user/:uid/userFollowed/:flag" component={UserFollow} />
        <Redirect from="/user/:uid" to="/user/:uid/userTopic" />
      </Switch>
    </div>
  );
}
