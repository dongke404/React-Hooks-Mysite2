import React, { useContext } from 'react'
import { Table, Tag, message } from 'antd';
import { handerTime, handersinger } from '../../utils/handSongs';
import { reqMusic, addmusicLike } from "../../api"
import { useEffect, useState } from 'react';
import { MusicContext } from "../../pages/index"
import { searchContext } from '.';
import storage from "../../utils/storageUtil"



function Songlist(props) {
  const music_like=storage.getUser().music_like
  const [data, setdata] = useState([])
  const [myMusic, setmyMusic] = useState(music_like?music_like:[])
  const MusicPlayer = useContext(MusicContext)
  const SearchedSongs = useContext(searchContext)
  
  
  //根据路由显示列表
  useEffect(() => {
    if (SearchedSongs.length === 0 && props.match.params.mid<200) {
      getMusicList(props.match.params.mid)
    }else{
      setdata(SearchedSongs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.mid])

  //根据搜索显示列表
  useEffect(() => {
    setdata(SearchedSongs)
  }, [SearchedSongs])

  //点击收藏
  const toLike = async(e) => {
    const result=await addmusicLike(e.target.getAttribute("sid"))
    if(result.status===0){
      setmyMusic(result.data)
      let user=storage.getUser()
      user.music_like=result.data
      storage.saveUser(user)
    }else{
      message.info(result.msg)
    }
  }



  //获取排行列表
  const getMusicList = async (id) => {
    const result = await reqMusic(id)
    if (result.code === 200) {
      const songList = result.playlist.tracks
      var data = []
      for (let index = 0; index < songList.length; index++) {
        const element = songList[index];
        const info = {
          'key': element.id,
          'id': index + 1,
          'songName': element,
          'time': handerTime(element.dt),
          'singer': handersinger(element.ar),
          'action': element,
          'pic': element.al.picUrl
        }
        data.push(info)
      }
      setdata(data)
    } else {
      message.error("请求失败")
    }
  }


  //点击添加
  const clickPlayMusic = (e) => {
    var song = {}
    song.id = e.target.getAttribute("sid")
    song.title = e.target.getAttribute('title')
    song.info = e.target.getAttribute('info')
    song.resource = 'https://music.163.com/song/media/outer/url?id=' + song.id
    song.time = e.target.getAttribute('time')
    song.img = e.target.getAttribute('img')
    //点击后是否播放
    const isplay = e.target.getAttribute('isplay')
    var newmusicList = MusicPlayer.playerList
    //用户点击同一首歌去重
    var flag = 0
    console.log(newmusicList)
    for (let index = 0; index < newmusicList.length; index++) {
      const element = newmusicList[index];
      // eslint-disable-next-line eqeqeq
      if (element.id == song.id) {
        flag = 1
        break
      }
    }
    if (flag === 0) {
      newmusicList.push(song)
    }
    MusicPlayer.getplayerList({ newmusicList, isplay })
  }

  const columns = [
    {
      width: '50px',
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: id => id >= 4 ? <Tag>{id}</Tag> : <Tag color="red">{id}</Tag>,
    },
    {
      width: '250px',
      title: '歌名',
      dataIndex: 'songName',
      key: 'songName',
      render: songinfo => <span>
        <span className="iconfont icon-bofang"
          sid={songinfo.id}
          title={songinfo.name}
          info={handersinger(songinfo.ar)}
          time={handerTime(songinfo.dt)}
          img={songinfo.al.picUrl}
          onClick={clickPlayMusic}
          style={{ cursor: "pointer" }}
          isplay="1"
        > </span>
        &nbsp;&nbsp;
        <span
          className={myMusic.includes(songinfo.id.toString()) ? "iconfont icon-xihuan2":"iconfont icon-xihuan"}
          sid={songinfo.id}
          onClick={toLike}
        > </span>
        &nbsp;&nbsp;{songinfo.name}
      </span>
    },
    {
      width: '100px',
      title: '时长',
      dataIndex: 'time',
      key: 'time',
    },
    {
      width: '300px',
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: songinfo => <span>
        <span
          className="iconfont icon-tianjiajiahaowubiankuang"
          sid={songinfo.id}
          title={songinfo.name}
          info={handersinger(songinfo.ar)}
          time={handerTime(songinfo.dt)}
          img={songinfo.al.picUrl}
          onClick={clickPlayMusic}
          style={{ cursor: "pointer" }}
          isplay="0"
        ></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="iconfont icon-icon--"></span>
        <a href={`https://music.163.com/song/media/outer/url?id=${songinfo.id}`} target='_blank' rel="noopener noreferrer">下载地址</a>
      </span>
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  )
}

export default Songlist