import React, { useState, useRef } from 'react'
import "./index.less"
import { Modal, Slider, message } from 'antd';
import { uploadHeadImg } from "../../api"
import base64toFile from "../../utils/base64toFile"
import AvatarEditor from 'react-avatar-editor'
// import {useIsUserLogin} from "../../hooks/hooks"
import storage from "../../utils/storageUtil"

export default function Cavatar(props) {
  const ishow = props.ishow
  const handleCancel = e => { props.setModalHidden() };

  const [scale, setScale] = useState(1)
  const [image, setImage] = useState("#")
  const [imageURL, setImageURL] = useState("")
  const inputImg = useRef(null);
  const editor = useRef(null)

  const changeImg = () => {
    let f = inputImg.current.files[0]
    let reads = new FileReader();
    reads.readAsDataURL(f);
    reads.onload = function () {
      let url = reads.result // 拿到读取结果;
      setImage(url)
      setImageURL(url)
    }
  }

  //预览显示
  const previewImg = () => {
    const canvas = editor.current.getImageScaledToCanvas().toDataURL();
    fetch(canvas)
      .then(res => res.blob())
      .then(blob => { setImageURL(window.URL.createObjectURL(blob)) });
  }
  //变换大小
  const onChange = (value) => {
    setScale(value)
    previewImg()
  }
  const onMouseUp = () => {
    previewImg()
  }
  //存图片
  const upload = () => {
    const canvas = editor.current.getImageScaledToCanvas().toDataURL();//base64
    // const filename
    const token = storage.getUser().token
    const email = storage.getUser().email
    const date = Date.now()
    const file = base64toFile(canvas, date + email.slice(0, 3) + ".png")
    var formdata = new FormData();
    formdata.append("avatar", file);
    formdata.append("token", token);
    let res = uploadHeadImg(formdata)
    res.then((val) => {
      if (val.data.status !== 0) {
        message.info(val.data.msg)
      }
      else {
        message.info("上传成功")
        console.log(val.data.avatarPath)
        const user=storage.getUser()
        user.head_link=val.data.avatarPath
        storage.saveUser(user)
        props.setAvatar(val.data.avatarPath)

      }
    })
  }
  return (
    <div>
      <Modal
        title="更换头像"
        visible={ishow}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认上传"
        onOk={upload}

      >
        <div className="avatarEditor">
          <div className="avatarImg">
            <AvatarEditor
              ref={editor}
              image={image}
              width={100}
              height={100}
              border={30}
              color={[220, 220, 220, 0.6]} 
              scale={scale}
              rotate={0}
              onMouseUp={onMouseUp}
            />
            <div>
              <div>
                预览
              </div>
              <img src={imageURL} alt="" />
            </div>
          </div>
          <div>
            <span>缩放</span>
            <Slider style={{ width: 200 }} defaultValue={1} min={0.5}
              max={3}
              step={0.01}
              onChange={onChange}
            />
          </div>
          <input type="file" onChange={changeImg} ref={inputImg} />
        </div>
      </Modal>

    </div>
  )
}
