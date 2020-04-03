import React,{useState,useEffect } from 'react'
import { Breadcrumb } from 'antd';
import { reqStoryDirs } from '../../api';
import {Link} from "react-router-dom" 


export default function NovelDirs(props) {
const storyId= props.match.params.dir

const [data, setdata] = useState("")


useEffect(() => {
  getStoryDirs(storyId)
}, [storyId])

const getStoryDirs=async(storyId)=>{
    const result=await reqStoryDirs(storyId)
    if (result.status===0){
      setdata(result.data)
    }
}
  return (
    <div className="story-dirs-contain">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item ><Link to="/novel">小说页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/novel?type="+data.type}>{data.type}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item >{data.name}</Breadcrumb.Item>
                </Breadcrumb>
                <h1>{data.name}</h1>
                <div className="story-dirs-info">
                    <div className="story-dirs-tai">
                        <span className="story-dirs-tai-t" >类型:{data.type}</span>
                        <span>作者:{data.author}</span>
                        <p className="story-dirs-tai-i">简介:{data.introduction}</p>
                    </div>
                </div>
                
                <div className="story-dirs-main">
                    {data?data.dirs.map((dir)=>{
                        return (
                        <div key={dir.id}><Link to={"/novel/"+data.id+"/"+dir.path}>{dir.dir}</Link></div>
                        )
                    }):""}
                </div>
            </div>
  )
}
