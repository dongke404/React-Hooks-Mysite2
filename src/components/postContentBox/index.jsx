import React, { useState, useEffect,useContext } from 'react'
import {Pagination} from 'antd';

import "./index.less"
import { reqTopic } from '../.../../../api';
import { Link } from "react-router-dom";
import moment from 'moment';
import {CurtypeId} from "../../pages/home/index"

import {
  UserOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons';

export default function PostContentBox(props) {
  const [topicList, setTopicList] = useState([])
  const [currentpage, setCurrentpage] = useState(1)
  const [total, setTotal] = useState(0)
  
  const typeId = useContext(CurtypeId);
  const curTag=props.curTag
  
  useEffect(() => {
    let res = reqTopic(1,20,typeId,curTag)
    res.then(result => {
      setTopicList(result.data);
      setTotal(result.total)
    }).catch((error) => { console.log(error) })
  }, [typeId,curTag])
  

  const onChange = page => {
    let res = reqTopic(page, 20)
    res.then(result => {
      setTopicList(result.data);
      setTotal(result.total)
      setCurrentpage(page)
    }).catch((error) => { console.log(error) })
    document.body.scrollTop = document.documentElement.scrollTop = 550; //屏幕滚动
  };

  return (
    <div>
      {topicList.map((item, index) => {
        if (item.images.length > 1) {
          return (
            <div className="postContentBox2" key={item.id}>

              <div className="textBox">
                <Link to={'/post/' + item.id} ><h2>{item.title}</h2></Link>
                <div className="uimage">
                  {item.images.map((item1, index) => {
                    return <img src={item1} alt="" key={index} />
                  })}
                </div>
                <div className="info " >
                  <span className="icons-list" style={{ color: "#555555" }}><UserOutlined />&nbsp;&nbsp;<Link to="" target="_blank" >{item.user.nickname}</Link>&nbsp;&nbsp;|</span>
                  <span className="icons-list" style={{ color: "#555555" }}> &nbsp;&nbsp;<EyeOutlined />&nbsp;&nbsp;{item.read_num}&nbsp;&nbsp;|</span>
                  <span className="icons-list" style={{ color: "#555555" }}> &nbsp;&nbsp;<MessageOutlined />&nbsp;&nbsp;{item.replytotal}&nbsp;&nbsp;|</span>
                  <span style={{ color: "#555555" }}> &nbsp;&nbsp;{moment(item.pub_date).fromNow()}&nbsp;&nbsp;</span>
                </div>
              </div>
            </div>)
        } else {
          return (
            <div className="postContentBox" key={item.id}>
              <div className="uimage">
                {item.images.map((item1, index) => {
                  return <img src={item1} alt="" key={index} />
                })}
              </div>
              <div className="textBox">
                <Link to={'/post/' + item.id}  ><h2>{item.title}</h2></Link>
                <div className="summary">{item.content}</div>
                <div className="info ">
                  <span className="icons-list" style={{ color: "#555555" }}><UserOutlined />&nbsp;&nbsp;<Link to="" target="_blank" >{item.user.nickname}</Link>&nbsp;&nbsp;|</span>
                  <span className="icons-list" style={{ color: "#555555" }}> &nbsp;&nbsp;<EyeOutlined />&nbsp;&nbsp;{item.read_num}&nbsp;&nbsp;|</span>
                  <span className="icons-list" style={{ color: "#555555" }}> &nbsp;&nbsp;<MessageOutlined />&nbsp;&nbsp;{item.replytotal}&nbsp;&nbsp;|</span>
                  <span style={{ color: "#555555" }}> &nbsp;&nbsp;{moment(item.pub_date).fromNow()}&nbsp;&nbsp;</span>
                </div>
              </div>
            </div>
          )
        }
      })
      }
      <Pagination style={{padding:"10px"}} current={currentpage} onChange={onChange} total={total} defaultPageSize={20}/>
    </div>
  )
}
