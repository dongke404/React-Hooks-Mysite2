import React from 'react'
import { Breadcrumb, message, Affix } from 'antd';
import { Link } from "react-router-dom"
import { reqStoryContent, reqStoryNextPage } from '../../api';
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from 'react';
import { useEffect } from 'react';
import storage from "../../utils/storageUtil"

export default function NovelContent(props) {
  const token = storage.getUser().token || ""
  const storyId = props.match.params.dir
  const [storypath, setstorypath] = useState(props.match.params.id)
  const [data, setdata] = useState("")
  const [contents, setcontents] = useState([])

  useEffect(() => {
    getStoryContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getStoryContent = async () => {
    const result = await reqStoryContent(storyId, storypath, token)
    if (result.status === 0) {
      setdata(result.data)
      setcontents([{ "dir": result.data.dir, "text": result.data.text }])
    }
  }
  const getStoryNextPage = async () => {
    const result = await reqStoryNextPage(storyId, storypath, token)
    if (result.status === 0) {
      const content = { "dir": result.data.dir, "text": result.data.text }
      contents.push(content)
      setstorypath(result.data.path)
      setdata(result.data)
      setcontents(contents)
    } else {
      message.info(result.msg)
    }
  }
  return (
    <div>
      <div className="story-text-body">
        <Affix>
          <div style={{ backgroundColor: "#e7e1d4" }}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item><Link to="/novel">小说页</Link></Breadcrumb.Item>
              <Breadcrumb.Item ><Link to={"/novel?type=" + data.type}>{data.type}</Link></Breadcrumb.Item>
              <Breadcrumb.Item ><Link to={"/novel/" + storyId}>目录</Link></Breadcrumb.Item>
              <Breadcrumb.Item >{data.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Affix>
        <InfiniteScroll
          pageStart={0}
          loadMore={getStoryNextPage}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >

          {contents.map((item, index) => {
            return <div className="story-text-body-content" key={index}>
              <h1>{item.dir}</h1>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: "20px", padding: 20 }}>
                {item.text}
              </div>
            </div>
          })}

        </InfiniteScroll>

      </div>
      <div className="story-text-foot">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

  )
}
