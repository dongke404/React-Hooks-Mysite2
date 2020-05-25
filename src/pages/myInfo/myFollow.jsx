import React, { useState, useEffect } from "react";
import storage from "../../utils/storageUtil";
import "./index.less";
import { reqFollowUser, reqFollow, reqRmFollow } from "../../api";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { BASEURL } from "../../config/index";

export default function MyFollow(props) {
  const flag = props.match.params.id;
  const token = storage.getUser().token || "";
  const [data, setdata] = useState([]);
  const [curpage, setcurpage] = useState(1);
  useEffect(() => {
    getFollowUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, token]);

  const getFollowUser = async () => {
    let result = await reqFollowUser(token, flag);
    if (result.status === 0) {
      setdata(result.data);
    }
  };
  const onChange = (page) => {
    setcurpage(page);
  };

  const cancelFollow = async (id) => {
    let result = await reqFollow(token, id);
    if (result.status === 0) {
      let newflw = [];
      let _ = storage.getFollow();
      for (const iterator of _) {
        if (iterator !== id) {
          newflw.push(iterator);
        }
      }
      storage.saveFollow(newflw);
      getFollowUser(); //实际状况建议本地操作data减少网络请求
    }
  };

  const removeFollowed = async (id) => {
    let result = await reqRmFollow(token, id);
    if (result.status === 0) {
      getFollowUser(); //实际状况建议本地操作data减少网络请求
    }
  };

  return (
    <div className="box-user box">
      {data.slice((curpage - 1) * 9, (curpage - 1) * 9 + 9).map((item) => {
        return (
          <div className="cell" key={item.id}>
            <table className="myFollow">
              <tbody>
                <tr>
                  <td className="td0">
                    <img src={BASEURL+item.head_link} className="avatar" alt="" />
                  </td>
                  <td className="td1">
                    <Link to={"/user/" + item.id}>{item.nickname}</Link>
                  </td>
                  <td className="td2">关注: {item.follow}</td>
                  <td className="td3">被关注: {item.followed}</td>
                  <td className="td4">赞: {item.voke_num}</td>
                  <td className="td5">简介: {item.introduction}</td>
                  {flag === "1" ? (
                    <td className="fr td6">
                      <button onClick={() => cancelFollow(item.id)}>
                        取消关注
                      </button>{" "}
                    </td>
                  ) : (
                    <td className="fr td6">
                      <button onClick={() => removeFollowed(item.id)}>
                        移除他
                      </button>{" "}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <div className="sep10"></div>
      <Pagination
        defaultCurrent={1}
        hideOnSinglePage
        pageSize={9}
        current={curpage}
        onChange={onChange}
        total={data.length}
      />
    </div>
  );
}
