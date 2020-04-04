import React, { useState, useContext } from "react";
import { pbReply } from "../../api";
import { message } from "antd";
import storage from "../../utils/storageUtil";
import { CommentContext } from "./index";
var dayjs = require("dayjs");

export default function Replys(props) {
  const comContext = useContext(CommentContext);
  const token = storage.getUser().token;
  const [replyTXT, setReplyTXT] = useState("");

  //提交回复
  const toPbReply = (e) => {
    const elem = e.target.dataset;
    const to_uid = elem.uid;
    const reply_content = replyTXT;
    uploadReply(token, to_uid, comContext.commentId, reply_content);
  };

  //显示回复框
  const showReply = (e) => {
    let flag = e.target.getAttribute("flag");
    hiddenInpBox();
    setReplyTXT("");
    document.getElementById(flag).style.display = "block";
  };

  //隐藏回复框
  const hiddenInpBox = () => {
    const replyBoxs = document.getElementsByClassName("replyBox");
    for (const iterator of replyBoxs) {
      iterator.style.display = "none";
    }
  };

  //input受控
  const onchangeTxt = (e) => {
    setReplyTXT(e.target.value);
  };
  //回复请求
  const uploadReply = async (token, to_uid, comment_id, reply_content) => {
    let result = await pbReply(token, to_uid, comment_id, reply_content);
    if (result.status === 0) {
      message.info("回复成功");
      hiddenInpBox();
      comContext.updateData();
    } else {
      message.error("失败的请求");
    }
  };

  return (
    <div className="replyModal">
      {props.replys.map((item, index) => {
        return (
          <div key={item.id}>
            <div className="cell">
              <table style={{width:'100%'}}>
                <tbody className="cmtTable">
                  <tr>
                    <td className="td1">
                      <img
                        className="avatar30"
                        src={item.authorHead}
                        alt=""
                        loading="lazy"
                      />
                    </td>
                    <td className="td2"></td>
                    <td className="td3">
                      <div className="fr">
                        <span
                          className="iconfont icon-icon_reply gray toreply"
                          onClick={showReply}
                          flag={"replys" + item.id}
                        ></span>
                      </div>
                      <div className="sep3"></div>
                      <strong>
                        {item.author}&nbsp;回复&nbsp;{item.to_nickname}{" "}
                      </strong>
                      <span className="ago">
                        {" "}
                        {dayjs(item.datetime).fromNow()}
                      </span>
                      &nbsp;&nbsp;
                      <div className="sep5"></div>
                      <div className="reply_content">{item.reply_content}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                className="replyBox"
                style={{ display: "none", width: 500, marginLeft: 50 }}
                id={"replys" + item.id}
              >
                <div className="sep5"></div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          placeholder={"回复" + item.author}
                          style={{ height: 30, width: 400 }}
                          value={replyTXT}
                          onChange={onchangeTxt}
                        />
                      </td>
                      <td>
                        <button
                          style={{ height: 30 }}
                          onClick={toPbReply}
                          id={"button" + item.id}
                          data-uid={item.author_id}
                        >
                          {" "}
                          回复
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
