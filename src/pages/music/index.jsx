import React, { useState } from 'react'
import { Menu, Affix } from 'antd';
import SongList from './songlist';
import { Switch, Route, Link } from 'react-router-dom'
import "./index.less"
import SearchTool from './searchTool';
import { getMusicDetail } from "./getSongList"
import storage from "../../utils/storageUtil"

const { SubMenu } = Menu;
export const searchContext = React.createContext()

export default function Music(props) {
  const [currPage, setcurrPage] = useState(props.match.params.mid)
  const [songList, setsongList] = useState([])
  const handleClick = e => {
    //先把搜索的清除
    setcurrPage(e.key)
    if (e.keyPath[1] === "personal") {
      const music_like = storage.getUser().music_like
      if (music_like && music_like.length!==0) {
        const data = getMusicDetail(music_like)
        data.then(
          val => {
            setsongList(val)
          }
        ).catch(err => {})
      }
    } else {
      setsongList([])
    }
  };
  //设置默认展开
  const openSub = (key) => {
    const sub2 = ['24', '25', '6', '8', '26']
    const sub3 = ['10']
    if (sub2.includes(key)) { return "sub2" }
    if (sub3.includes(key)) { return "sub3" }
    else { return "sub1" }
  }

  //获取搜索结果的回调函数
  const getsearchList = (data) => {
    setsongList(data)
  }

  return (
    <div className="music-box" >
      <div className="music-side">
        <Affix>
          <Menu
            className="music-side-menu"
            onClick={handleClick}
            selectedKeys={[currPage]}
            defaultOpenKeys={[openSub(props.match.params.mid)]}
            mode="inline"
            theme="dark"
          >
            <SubMenu
              key="sub1"
              title={
                <span>特色榜</span>
              }
            >
              <Menu.Item key="3"><Link to="/music/3">飙升榜</Link></Menu.Item>
              <Menu.Item key="0"><Link to="/music/0">新歌榜</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/music/2">原创歌曲榜</Link></Menu.Item>
              <Menu.Item key="1"><Link to="/music/1">热歌榜</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>全球媒体榜</span>
              }
            >
              <Menu.Item key="24"><Link to="/music/24">古典音乐榜</Link></Menu.Item>
              <Menu.Item key="25"><Link to="/music/25">电音榜</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/music/6">美国Billboard周榜</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/music/8">iTunes榜</Link></Menu.Item>
              <Menu.Item key="26"><Link to="/music/26">抖音排行榜</Link></Menu.Item>

            </SubMenu>
            <SubMenu
              key="personal"
              title={<span>个人歌单</span>}
            >
              <Menu.Item key="userid"><Link to="/music/11111">我喜欢</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Affix>
      </div>
      <div className="music-main">

        <div >
          <h2 >歌曲列表
            <div style={{ float: "right" }}>
              <SearchTool getsearchList={getsearchList} />
            </div>
          </h2>
        </div>
        <Switch>
          <searchContext.Provider value={songList}>
            <Route path="/music/:mid" component={SongList} />
          </searchContext.Provider>
        </Switch>
      </div>
    </div >
  )
}



