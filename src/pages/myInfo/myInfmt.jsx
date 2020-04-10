import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { reqModifyUser } from "../../api";
import storage from "../../utils/storageUtil";

const { TextArea } = Input;

export default function Myinfmt() {
  const user = storage.getUser();
  const [isShow1, setisShow1] = useState(true);
  const [isShow2, setisShow2] = useState(true);
  const [isShow3, setisShow3] = useState(true);
  const [value1, setvalue1] = useState(user.nickname);
  const [value2, setvalue2] = useState(user.email);
  const [value3, setvalue3] = useState(user.introduction);

  const saveNickname = async () => {
    let result = await reqModifyUser(value1, "nickname", user.token);
    if (result.status === 0) {
      user.nickname = result.data;
      storage.saveUser(user);
      message.info(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  const saveEmail = async () => {
    let result = await reqModifyUser(value2, "email", user.token);
    if (result.status === 0) {
      user.email = result.data;
      storage.saveUser(user);
      message.info(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  const saveItd = async () => {
    let result = await reqModifyUser(value3, "introduction", user.token);
    if (result.status === 0) {
      user.introduction = result.data;
      storage.saveUser(user);
      message.info(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  return (
    <div className="box box-user">
      <div className="infobox">
        用户昵称:&nbsp;&nbsp;&nbsp;&nbsp;{value1}
        <span
          className="iconfont icon-xiugai hangShape"
          onClick={() => setisShow1(!isShow1)}
        ></span>
      </div>
      <div style={{ display: isShow1 ? "none" : "" }}>
        <Input
          style={{ width: 200 }}
          value={value1}
          onChange={(e) => setvalue1(e.target.value)}
        />{" "}
        &nbsp;
        <span>
          <Button type="primary" onClick={saveNickname}>
            保存
          </Button>
        </span>
      </div>

      <div className="infobox">
        邮箱:&nbsp;&nbsp;&nbsp;&nbsp;{value2}
        <span
          className="iconfont icon-xiugai hangShape"
          onClick={() => setisShow2(!isShow2)}
        ></span>
      </div>
      <div style={{ display: isShow2 ? "none" : "" }}>
        <Input
          style={{ width: 200 }}
          value={value2}
          onChange={(e) => setvalue2(e.target.value)}
        />
        &nbsp;
        <span>
          <Button type="primary" onClick={saveEmail}>
            保存
          </Button>
        </span>
      </div>
      <div className="infobox">
        个人简介:&nbsp;&nbsp;&nbsp;&nbsp;{value3}
        <span
          className="iconfont icon-xiugai hangShape"
          onClick={() => setisShow3(!isShow3)}
        ></span>
      </div>
      <div style={{ display: isShow3 ? "none" : "" }}>
        <TextArea
          value={value3}
          onChange={(e) => {
            setvalue3(e.target.value);
          }}
        ></TextArea>
        <div className="sep10"></div>
        <Button type="primary" onClick={saveItd}>
          保存
        </Button>
      </div>
      <div className="infobox">头像：点击右上方头像可修改</div>
    </div>
  );
}
