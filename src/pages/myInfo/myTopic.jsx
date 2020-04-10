import React, { useEffect, useState } from "react";
import "./index.less";
import { Table } from "antd";
import { reqMyTopics,reqDelTopics } from "../../api";
import storage from "../../utils/storageUtil";
import { Link } from "react-router-dom";

export default function Mytopic() {
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
      title: "最后回复",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "发布时间",
      dataIndex: "pubtime",
      key: "pubtime",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span className="hangShape" onClick={()=>{delTopic(record.key)}}>
          删除
        </span>
      ),
    },
  ];

  useEffect(() => {
    const getMyTopics = async () => {
      let result = await reqMyTopics(token);
      if (result.status === 0) {
        setdata(result.data);
      }
    };
    getMyTopics();
  }, [token]);

  const delTopic = async (id) => {
    var r = window.confirm("确认删除吗");
    if (r === true) {
      let result = await reqDelTopics(id,token);
      if (result.status === 0) {
        let ndata = [];
        for (const iterator of data) {
          if (iterator.key !== id) {
            ndata.push(iterator);
          }
        }
        setdata(ndata);
      }
    }
  };

  return (
    <div className="box-user box">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}