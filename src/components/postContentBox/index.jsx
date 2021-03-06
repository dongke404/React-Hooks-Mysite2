import React, { useState, useEffect, useContext } from "react";
import { Pagination, message } from "antd";

import "./index.less";
import { reqTopic } from "../.../../../api";
import { Link } from "react-router-dom";
import { CurtypeId } from "../../pages/home/index";
import { UserOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons";
import {BASEURL} from '../../config/index'
var dayjs = require('dayjs')

export default function PostContentBox(props) {
  const [topicList, setTopicList] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [total, setTotal] = useState(0);

  const typeId = useContext(CurtypeId);
  const curTag = props.curTag;

  useEffect(() => {
    const getTopic = async () => {
      let res = await reqTopic(1, 20, typeId, curTag);
      if (res.status === 0) {
        setTopicList(res.data);
        setTotal(res.total);
      } else {
        message.error(res.msg);
      }
    };
    getTopic();
  }, [typeId, curTag]);

  const onChange = (page) => {
    let res = reqTopic(page, 20);
    res
      .then((result) => {
        setTopicList(result.data);
        setTotal(result.total);
        setCurrentpage(page);
      })
      .catch((error) => {
        console.log(error);
      });
    document.body.scrollTop = document.documentElement.scrollTop = 550; //屏幕滚动
  };

  return (
    <div>
      {topicList.map((item, index) => {
        if (item.images.length > 1) {
          return (
            <div className="postContentBox2" key={item.id}>
              <div className="textBox">
                <Link to={"/post/" + item.id}>
                  <h2>{item.title}</h2>
                </Link>
                <div className="uimage">
                  {item.images.map((item1, index) => {
                    return <img src={(item1.indexOf("http://") !== -1?"":BASEURL)+item1} alt="" key={index} />;
                  })}
                </div>
                <div className="info ">
                  <span className="icons-list" style={{ color: "#555555" }}>
                    <UserOutlined />
                    &nbsp;&nbsp;
                    <Link to={"/user/" +item.user.id } >
                      {item.user.nickname}
                    </Link>
                    &nbsp;&nbsp;|
                  </span>
                  <span className="icons-list" style={{ color: "#555555" }}>
                    {" "}
                    &nbsp;&nbsp;
                    <EyeOutlined />
                    &nbsp;&nbsp;{item.read_num}&nbsp;&nbsp;|
                  </span>
                  <span className="icons-list" style={{ color: "#555555" }}>
                    {" "}
                    &nbsp;&nbsp;
                    <MessageOutlined />
                    &nbsp;&nbsp;{item.replytotal}&nbsp;&nbsp;|
                  </span>
                  <span style={{ color: "#555555" }}>
                    {" "}
                    &nbsp;&nbsp;{dayjs(item.pub_date).fromNow()}&nbsp;&nbsp;
                  </span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="postContentBox" key={item.id}>
              <div className="uimage">
                {item.images.map((item1, index) => {
                  return <img src={(item1.indexOf("http://") !== -1?"":BASEURL)+item1} alt="11" key={index} />;
                })}
              </div>
              <div className="textBox">
                <Link to={"/post/" + item.id}>
                  <h2>{item.title}</h2>
                </Link>
                <div className="summary">{item.content}</div>
                <div className="info ">
                  <span className="icons-list" style={{ color: "#555555" }}>
                    <UserOutlined />
                    &nbsp;&nbsp;
                    <Link to={"/user/" +item.user.id } >
                      {item.user.nickname}
                    </Link>
                    &nbsp;&nbsp;|
                  </span>
                  <span className="icons-list" style={{ color: "#555555" }}>
                    {" "}
                    &nbsp;&nbsp;
                    <EyeOutlined />
                    &nbsp;&nbsp;{item.read_num}&nbsp;&nbsp;|
                  </span>
                  <span className="icons-list" style={{ color: "#555555" }}>
                    {" "}
                    &nbsp;&nbsp;
                    <MessageOutlined />
                    &nbsp;&nbsp;{item.replytotal}&nbsp;&nbsp;|
                  </span>
                  <span style={{ color: "#555555" }}>
                    {" "}
                    &nbsp;&nbsp;{dayjs(item.pub_date).fromNow()}&nbsp;&nbsp;
                  </span>
                </div>
              </div>
            </div>
          );
        }
      })}
      <Pagination
        style={{ padding: "10px" }}
        current={currentpage}
        onChange={onChange}
        total={total}
        defaultPageSize={20}
      />
    </div>
  );
}
