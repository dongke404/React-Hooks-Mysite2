import React, { useEffect, useRef } from 'react'
import E from "wangeditor";
import { IMGUOLOADURL,UPLOADFILENAME } from '../../config';



export default function Editor() {
  const elem = useRef(null);
  useEffect(() => {
    let editor = new E(elem.current);
    editor.customConfig.uploadFileName =UPLOADFILENAME; //置上传接口的文本流字段
    editor.customConfig.uploadImgServer = IMGUOLOADURL; //服务器接口地址
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    // 限制一次最多上传 5 张图片
    editor.customConfig.uploadImgMaxLength = 5;
    editor.create();
    window.editor=editor
  },[])

  return (
    <div>
      <div ref={elem} id="weditor" style={{ textAlign: "left" }}></div>
    </div>
  )
}
