import React, { useEffect, useState } from "react";
import { List } from "antd";
import { reqMyRepCmt } from "../../api";
import storage from "../../utils/storageUtil";
import { Link } from "react-router-dom";

var dayjs = require("dayjs");

export default function MyRepCmt() {
  const token = storage.getUser().token || "";
  const [data, setdata] = useState([]);

  useEffect(() => {
    const getMyCmtRep = async () => {
      let result = await reqMyRepCmt(token);
      if (result.status === 0) {
        let data = result.data;
        data.sort((a, b) => parseInt(b.time) - parseInt(a.time));
        setdata(data);
      }
    };
    getMyCmtRep();
  }, [token]);

  return (
    <div className="box-user box">
      <List
        itemLayout="horizontal"
        dataSource={data}
        pagination={{ defaultPageSize: 8 }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div style={{ fontSize: "16px" }}>
                  <strong>主题：</strong>{" "}
                  <Link to={"/post/" + item.topic_id}>{item.topic}</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="gray" style={{ fontSize: "14px" }}>
                    {dayjs(item.time).fromNow()}
                  </span>
                </div>
              }
              description={<DesText item={item}></DesText>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

const DesText = (props) => {
  const flag = props.item.flag;
  if (flag === 1) {
    return <div>我：{props.item.text}</div>;
  }
  if (flag === 2) {
    return (
      <div>
        我 回复{" "}
        <Link to={"/user/" + props.item.to_uid}>{props.item.to_uname}</Link>:{" "}
        {props.item.text}
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Link to={"/user/" + props.item.to_uid}>
          {props.item.to_uname}
        </Link>{" "}
        回复 我: {props.item.text}
      </div>
    );
  }
};
