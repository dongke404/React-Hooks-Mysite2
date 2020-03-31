import React, { useState } from 'react'
import { seachSuggestMusic } from '../../api';
import { AutoComplete, Button } from 'antd';
import { useEffect } from 'react';
import getSongList from "./getSongList"


export default function SearchTool(props) {
  const [value, setvalue] = useState("")
  const [dataSource, setdataSource] = useState([])
  const onChange = value => {
    setvalue(value)
  }

  //防抖
  useEffect(() => {
    const timer = setTimeout(toreqsuggest(value), 800)
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  //闭包传参
  function toreqsuggest(value) {
    async function reqsuggest() {
      //去空格
      var newValue = value.replace(/(\s*$)/g, "");
      if (newValue) {
        const result = await seachSuggestMusic(value)
        // var SuggestMusics=[]
        if (result.code === 200) {
          const songs = result.result.songs
          if (songs) {
            var dataSource = songs.map((item, index) => {
              let a = {}
              a["value"] = item.name + " " + item.artists[0].name
              a["key"] = index
              return a
            })
            setdataSource(dataSource)
          }
        }
      }
    };
    return reqsuggest
  }


  //选择推荐
  const onSelect = async value => {
    if (value) {
      const data = await getSongList(value)
      props.getsearchList(data)

    }
  }
  //点击按钮搜索
  const getseachResult = async () => {
    const data = await getSongList(value)
    props.getsearchList(data)
  }

  return (
    <div className="searchTool">
      <AutoComplete
        value={value}
        options={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder=""
      >
      </AutoComplete>
      <Button
        className="search-btn"
        size="small"
        type="primary"
        onClick={getseachResult}
      >
        搜索
        </Button>
    </div>
  )
}
