import React,{useState} from 'react'
import { Affix } from 'antd';
import PostContentBox from '../../../components/postContentBox';
import NavDiy from "../../../components/navDiy"

const tags = [{ name: "最新", flag: 'newest' }, { name: "最热", flag: "hotest" }]
const PostBox = () => {
  const [curTag, setgetCurTag] = useState('newest')
  const getCurTag=(flag)=>{
    setgetCurTag(flag)
  }
  return (
    <div>
      <Affix offsetTop={0}>
        <NavDiy tags={tags} diycolor="slateblue" getCurTag={getCurTag}></NavDiy>
      </Affix>
      < PostContentBox   curTag={curTag}/>
    </div>
  )
}
export default PostBox