import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { reqUserTopics } from "../../api";
import { Link } from "react-router-dom";

export default function Usertopic(props) {
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
  ];

  useEffect(() => {
    const getUserTopics = async () => {
      let result = await reqUserTopics(props.match.params.uid);
      if (result.status === 0) {
        setdata(result.data);
      }
    };
    getUserTopics();
  }, [props.match.params.uid]);


  return (
    <div className="box-user box">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
