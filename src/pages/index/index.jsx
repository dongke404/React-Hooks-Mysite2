import React, { useState, useEffect } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import "./index.less"
import { Layout } from 'antd';
import AudioPlay from "../../components/audioPlay/audioPlay"
import Head from "../../components/header"
import Navigate from '../../components/navigate';
import Home from "../home"
import Music from '../music';
import Novel from '../novel';
import Photo from '../photo';
import Movie from '../movie';
import Myinfo from '../myInfo';
import Comment from '../comment';
import PubTheme from '../pubTheme';
import User from "../user"

import storage from "../../utils/storageUtil"
import { seachMusicDetail } from "../../api"
import { songs2player } from '../../utils/handSongs';


const { Header } = Layout;
export const MusicContext = React.createContext()

export default function Index(props) {
  const music_like = storage.getUser().music_like
  const [flash, setflash] = useState(0)
  const [playerList, setplayerList] = useState([])
  const [isplay, setisplay] = useState(0)


  useEffect(() => {
    if (music_like && music_like.length !== 0) {
      const data = getInitPlayerMusic(music_like)
      data.then(
        val => {
          setplayerList(val)
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //获取音乐列表

  const getInitPlayerMusic = async (music_like) => {
    try {
      const result = await seachMusicDetail(music_like.join(","))
      if (result.code === 200) {
        return songs2player(result.songs)
      }
    } catch{
      storage.removeUser()
    }
  }


  const getplayerList = (data) => {
    setisplay(data.isplay)
    setplayerList(data.newmusicList)
    setflash(flash + 1)
  }
  //删除全部歌曲
  const deleteAllmusic = () => {
    setplayerList([])
  }
  //删除指定歌曲
  const deleteOnemusic = (id, musicList) => {
    const newMusicList = [];
    musicList.forEach(item => {
      if (item.id !== id) {
        newMusicList.push(item);
      }
    });
    setplayerList(newMusicList)
    return newMusicList
  }



  return (
    <MusicContext.Provider value={{ getplayerList, playerList }}>
      <div className="container" >
        <Header>
          <Head />
        </Header>
        <Navigate ></Navigate>
        <div style={{ padding: '0', backgroundColor: 'white' }} >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/publish" component={PubTheme} />
            <Route path="/post/:postId" component={Comment} />
            <Route path="/music/:mid" component={Music} />
            <Route path="/novel" component={Novel} />
            <Route path="/photo" component={Photo} />
            <Route path="/movie" component={Movie} />
            <Route path="/myinfo" component={Myinfo} />
            <Route path="/user/:uid" component={User} />
            <Redirect from="/*" to="/home/newest" />
          </Switch>
        </div>
        <AudioPlay
          playerList={playerList}
          isplay={isplay}
          flash={flash}
          deleteAllmusic={deleteAllmusic}
          deleteOnemusic={deleteOnemusic}
        />
        <div className="footer">Design ©2018 Created by Recursion</div>
      </div>
    </MusicContext.Provider>

  )
}
