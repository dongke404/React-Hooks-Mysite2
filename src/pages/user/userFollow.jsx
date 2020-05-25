import React, { useState, useEffect } from "react";
import storage from "../../utils/storageUtil";
import { reqUFollowUser, reqFollow } from "../../api";
import { Pagination, message } from "antd";
import { Link } from "react-router-dom";
import {BASEURL} from "../../config/index"

export default function UserFollow(props) {
  const flag = props.match.params.flag;
  const uid = props.match.params.uid;
  const token = storage.getUser().token || "";

  const [data, setdata] = useState([]);
  const [curpage, setcurpage] = useState(1);
  const [myfollow, setmyfollow] = useState(storage.getFollow() || []);
  useEffect(() => {
    getFollowUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, uid]);

  const getFollowUser = async () => {
    let result = await reqUFollowUser(uid, flag);
    if (result.status === 0) {
      setdata(result.data);
    }
  };
  const onChange = (page) => {
    setcurpage(page);
  };
  //关注
  const tofollow = async (id) => {
    if (!token) {
      alert("请先登录");
    } else {
      const result = await reqFollow(token, id);
      if (result.status === 0) {
        storage.saveFollow(result.data);
        setmyfollow(result.data);
      } else {
        message.info(result.msg);
      }
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
                  <td className="fr td6">
                    {myfollow.includes(item.id) ? (
                      <button onClick={() => tofollow(item.id)}>已关注</button>
                    ) : (
                      <button onClick={() => tofollow(item.id)}>关注他</button>
                    )}{" "}
                  </td>
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
