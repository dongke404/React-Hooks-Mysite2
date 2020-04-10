import React, { useRef, useEffect, useState } from "react";
import "./index.less";
import Editor from "../../components/editor";
import { reqUploadTopic, reqTopicTypes, reqCkuser } from "../../api";
import storage from "../../utils/storageUtil";
import { message } from "antd";

export default function PubTheme(props) {
  const user = storage.getUser();
  const titleRef = useRef(null);
  const themeType = useRef(null);
  const [topicTypes, setTopicTypes] = useState([]);
  const [numdata, setnumdata] = useState({});

  useEffect(() => {
    const toCkuser = async () => {
      const token = user.token || "";
      let res = await reqCkuser(token);
      if (res.status !== 0) {
        props.history.push("/login");
      } else {
        storage.saveNuminfo(res.data);
        setnumdata(res.data);
      }
    };
    toCkuser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getTopicTypes = async () => {
      let res = await reqTopicTypes();
      if (res.status === 0) {
        setTopicTypes(res.data);
      } else {
        message.error(res.msg);
      }
    };
    getTopicTypes();
  }, []);

  function publish() {
    if (titleRef.current.value.replace(/(\s*$)/g, "") === "") {
      alert("请确定一个主题");
    } else {
      reqUploadTopic(
        storage.getUser().token,
        themeType.current.value,
        titleRef.current.value,
        window.editor.txt.html()
      )
        .then((res) => {
          if (res.status === 0) {
            message.info("发布成功");
            props.history.push("/home");
          } else {
            message.error(res.msg);
          }
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <div className="pubContain">
      <div id="Leftbar"></div>
      {/* 右侧作者框 */}
      <div id="Rightbar">
        {/* <div className="sep20"></div> */}
        <div className="box">
          <div className="cell">关于作者</div>
          <div className="cell">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={user.head_link} className="avatar" alt="" />
                  </td>
                  <td style={{ width: 10, verticalAlign: "top" }}></td>
                  <td>
                    <div className="authorName">{user.nickname}</div>
                    <div>作者简介: {user.introduction} </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="sep10"></div>
            <table className="author-infos">
              <tbody>
                <tr>
                  <td>
                    <span>{numdata.voke_num}</span>
                    <div className="sep3"></div>
                    <span>获赞</span>
                  </td>
                  <td>
                    <span>{numdata.topic_num}</span>
                    <div></div>
                    <span>主题</span>
                  </td>
                  <td>
                    <span>{numdata.followed_num}</span>
                    <div className="sep3"></div>
                    <span>被关注</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* 右侧作者框 结束*/}
      <div className="main">
        <div className="box">
          <div className="cell">
            <span>&nbsp;&nbsp;</span> 创作新主题
          </div>
          <div className="cell">
            <div className="fr fade" id="title_remaining">
              120
            </div>
            <span>&nbsp;&nbsp;</span> 主题标题
          </div>
          <div className="cell">
            <textarea
              className="msl"
              rows="1"
              maxLength="120"
              id="topic_title"
              name="title"
              autoFocus="autofocus"
              placeholder="请输入主题标题，如果标题能够表达完整内容，则正文可以为空"
              ref={titleRef}
            ></textarea>
          </div>
          <div className="cell">
            <div className="fr fade" id="content_remaining">
              20000
            </div>
            正文
          </div>
          <div className="cell">
            {" "}
            <Editor></Editor>
          </div>

          <div className="cell">
            <select id="themeType" ref={themeType} style={{ width: 300 }}>
              {topicTypes.map((item, index) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="cell" style={{ height: 50 }}>
            <div className="fr">
              {" "}
              &nbsp;{" "}
              <button type="button" onClick={publish}>
                {" "}
                &nbsp;发布主题
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
