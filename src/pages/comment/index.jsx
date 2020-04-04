import React, { useState, useEffect, useRef } from 'react'
import { message, Button } from 'antd';
import "./index.less"
import { reqPostDetail, upComment, pbReply } from '../../api';
import storage from '../../utils/storageUtil';
import ReplayStyle from "./replayStyle"
var dayjs = require('dayjs')

export const CommentContext = React.createContext();


const Comment = (props) => {
  const postId = props.match.params.postId
  const token = storage.getUser().token
  const [theme, setTheme] = useState('')
  const [comments, setComments] = useState([])
  const [replyTXT, setReplyTXT] = useState("")
  const commentRef = useRef(null)

  //获取数据
  useEffect(() => {
    getPostDetail(postId)
  }, [postId])

  //请求数据函数
  const getPostDetail = async (postId) => {
    let result = await reqPostDetail(postId)
    try {
      if (result.status === 0) {
        setTheme(result.theme)
        setComments(result.comments)
      } else {
        message.error('失败的请求')
      }
    } catch (err) {
      alert("响应错误")
    }
  }


  //显示回复框
  const showReply = (e) => {
    let flag = e.target.getAttribute("flag")
    hiddenInpBox()
    setReplyTXT("")
    document.getElementById(flag).style.display = "block"
  }
  //隐藏回复框
  const hiddenInpBox=()=>{
    const replyBoxs = document.getElementsByClassName("replyBox")
    for (const iterator of replyBoxs) {
      iterator.style.display = "none"
    }
  }

  //提交评论
  const submitComment = async () => {
    const result = await upComment(token, postId, commentRef.current.value)
    if (result.status === 0) {
      message.success('提交成功')
      getPostDetail(postId)
    } else {
      message.error(result.msg)
    }
  }

  //提交回复
  const toPbReply = e => {
    const elem = e.target.dataset
    const to_uid = elem.uid
    const comment_id = elem.commentid
    const reply_content = replyTXT
    uploadReply(token, to_uid, comment_id, reply_content)
  }

  //回复请求
  const uploadReply = async (token, to_uid, comment_id, reply_content) => {
    let result = await pbReply(token, to_uid, comment_id, reply_content)
    if (result.status === 0) {
      message.info('回复成功')
      getPostDetail(postId)
      hiddenInpBox()
    } else {
      message.error('失败的请求')
    }
  }
  //input受控
  const onchangeTxt = e => {
    setReplyTXT(e.target.value)
  }
  const updateData = () => {
    getPostDetail(postId)
  }

  const gotoComment = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 100000;
  }

  return (
    <div className="postContainer" >
      <div id="Leftbar"></div>
      {/* 右侧作者框 */}
      <div id="Rightbar">
        {/* <div className="sep20"></div> */}
        <div className="box">
          <div className="cell">
            关于作者
          </div>
          <div className="cell">
            <table>
              <tbody>
                <tr>
                  <td >
                    <img src={theme.head_link} className="avatar" alt="" />
                  </td>
                  <td style={{ width: 10, verticalAlign: "top" }}></td>
                  <td>
                    <div className="authorName">{theme.user}</div>
                    <div>作者简介</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="sep10"></div>
            <table className="author-infos">
              <tbody>
                <tr>
                  <td >
                    <span >0</span>
                    <div className="sep3"></div>
                    <span >获赞</span>
                  </td>
                  <td >
                    <span >0</span>
                    <div ></div>
                    <span >主题</span>
                  </td>
                  <td >
                    <span >0</span>
                    <div className="sep3"></div>
                    <span >被关注</span>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="cell" style={{ textAlign: "center" }}>
            <Button type="primary " style={{ width: 200 }} >关注</Button>
          </div>
        </div>
      </div>
      {/* 右侧作者框 结束*/}
      <div className="main">
        {/* 主题内容开始 */}
        <div className="box">
          <div className="header">
            <span>{theme.type}</span>
            <div className="sep10"></div>
            <h1>{theme.title}</h1>
            <small className="gray"><a href="#sadsa">{theme.user}</a> · {dayjs(theme.pub_date).fromNow()} · {theme.read_num} 次点击 &nbsp; </small>
          </div>
          <div className="cell">
            <div className="topic_content">
              <div className="markdown_body" dangerouslySetInnerHTML={{ __html: theme.content }}>
              </div>
            </div>
          </div>
          <div className="topic_buttons">
            收藏
          </div>
        </div>
        {/* 主题内容结束 */}
        <div className="sep20"></div>
        <div className="box">
          <div className="cell">
            <span className="gray">{comments.length} 条评论 &nbsp;<strong className="snow">•</strong> &nbsp;2020-03-23 17:22:35 +08:00</span>
            <span className="fr gray" style={{ marginRight: 10, cursor: "pointer" }} onClick={gotoComment}>去评论</span>
          </div>
          {/* 循环体 */}
          {comments.map((item, index) => {
            return (
              <div key={item.id}>
                <div className="cell">
                  <table>
                    <tbody className="cmtTable" >
                      <tr>
                        <td className="td1">
                          <img className="avatar48" src={item.user.head_link} alt="" loading="lazy" />
                        </td>
                        <td className="td2">
                        </td>
                        <td className="td3">
                          <div className="fr">
                            <span className="iconfont icon-icon_reply gray toreply" onClick={showReply} flag={"comment" + item.id} ></span>
                            <span className="no">{index + 1}</span>
                          </div>
                          <div className="sep3"></div>
                          <strong>{item.user.nickname}</strong>
                          <span className="ago"> {dayjs(item.date).fromNow()}</span>
                              &nbsp;&nbsp;
                          <div className="sep5"></div>
                          <div className="reply_content">
                            {item.comment}
                          </div>
                          {/* 全部回复开始 */}
                          <div  >
                            <CommentContext.Provider value={{ commentId: item.id, updateData }}>
                              < ReplayStyle replys={item.replys} />
                            </CommentContext.Provider>
                          </div>
                           {/* 全部回复结束 */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* 回复框开始 */}
                  <div className="replyBox" style={{ display: "none", width: 500, marginLeft: 50 }} id={"comment" + item.id} >
                    <div className="sep5"></div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <input placeholder={"回复" + item.user.nickname} style={{ height: 30, width: 400 }} value={replyTXT} onChange={onchangeTxt} />
                          </td>
                          <td>
                            <button
                              style={{ height: 30 }}
                              onClick={toPbReply}
                              id={"button" + item.id}
                              data-uid={item.user.id}
                              data-commentid={item.id} > 回复</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* 回复框结束 */}
                </div>
              </div>
            )
          })}
        </div>

        <div className="sep20"></div>

        <div className="box reply-box-sticky" id="reply-box">
          <div className="cell">
            <div className="fr">
              <span>回到顶部</span>
            </div>
            添加一条新评论
          </div>
          <div className="cell">
            <textarea ref={commentRef} className="textbox" style={{
              overflow: ' hidden', overflowWrap: 'break-word', resize: 'none',
            }}>
            </textarea>
            <div className="sep10"></div>
            <input type="submit" value="回复" className="super normal button" onClick={submitComment}></input>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Comment


