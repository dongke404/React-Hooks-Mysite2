import React, { useEffect, useState } from "react";
import "./index.less";
import { Table } from "antd";
import { reqcltTopics, reqCollect } from "../../api";
import storage from "../../utils/storageUtil";
import { Link } from "react-router-dom";

export default function TopicClt() {
  const token = storage.getUser().token || "";
  const [data, setdata] = useState([]);
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: "50%",
      render: (text, record) => <Link to={"/post/" + record.key}>{text}</Link>,
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "最后回复",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span className="hangShape" onClick={() => cancelClt(record.key)}>
          取消收藏
        </span>
      ),
    },
  ];

  useEffect(() => {
    const getUserTopics = async () => {
      let result = await reqcltTopics(token);
      if (result.status === 0) {
        setdata(result.data);
      }
    };
    getUserTopics();
  }, [token]);
  const cancelClt = async (id) => {
    var r = window.confirm("确认取消收藏吗吗");
    if (r === true) {
      let result = await reqCollect(token, id);
      if (result.status === 0) {
        let ndata = [];
        for (const iterator of data) {
          if (iterator.key !== id) {
            ndata.push(iterator);
          }
        }
        setdata(ndata);
        let user = storage.getUser();
        let nclt_topic = [];
        let clt_topic = storage.getUser().clt_topic;
        for (const iterator of clt_topic) {
          if (iterator !== id.toString()) {
            nclt_topic.push(iterator);
          }
        }
        user.clt_topic = nclt_topic;
        storage.saveUser(user);
      }
    }
  };
  return (
    <div className="box-user box">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
