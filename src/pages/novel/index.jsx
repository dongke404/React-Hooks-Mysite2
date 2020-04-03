import React, { useState } from 'react'
import { Menu, Layout, Affix } from 'antd';
import "./index.less"
import { reqStorys, reqStoryTypeList } from '../../api';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

const { SubMenu } = Menu;
const { Sider, Content } = Layout;


export default function Novel() {
  const [data, setdata] = useState([])
  const [storyTypeList, setstoryTypeList] = useState([])

  const handleClick = e => {
    getStorys(e.item.props.children)
  };

  useEffect(() => {
    getStorys("")
    getStoryTypeList()
  }, [])

  const getStorys = async (storyType) => {
    const result = await reqStorys(storyType)
    if (result.status === 0) {
      setdata(result.data)
    }
  }
  const getStoryTypeList = async () => {
    const result = await reqStoryTypeList()
    if (result.status === 0) {
      setstoryTypeList(result.data)
    }
  }
  return (
    <Layout>
      <Sider>
        <div className="novel-sider">
          <Affix>
            <Menu
              onClick={handleClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1', "sub2"]}
              mode="inline"
              theme="dark"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <span>热门小说</span>
                  </span>
                }
              >
                <Menu.Item key="1">全部小说</Menu.Item>
                {storyTypeList.map(item => <Menu.Item key={item}>{item}</Menu.Item>)}
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <span>文学名著</span>
                  </span>
                }
              >
                <Menu.Item key="7">全部</Menu.Item>
              </SubMenu>
            </Menu>
          </Affix>
        </div>
      </Sider>
      <Content style={{ backgroundColor: "white" }}>
        <div className="books" >
          {data.map((book, index) => {
            return (
              <div key={book.id} className="book-info">
                <Link to={"/novel/" + book.id} target="_blank" >
                  <div className="book-info-image">
                    <img src={book.images} alt={book.images} />
                  </div>
                </Link>
                <div className="book-info-text">
                  <Link to={"/novel/" + book.id} target="_blank" style={{ color: "#1a1a1a" }}>
                    <div className="book-info-title">
                      <div className="book-info-titlehead">{book.name}</div><span className="book-info-author">类型:{book.type} | 作者:{book.author}</span>
                    </div>
                  </Link>
                  <div >
                    <p>
                      {book.introduction}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Content>
    </Layout>
  )
}
