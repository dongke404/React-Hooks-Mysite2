import React from 'react'
import { LOGINBGURL } from '../../../config'

export default function Bulletin() {
  return (
    <div style ={{ boxShadow: "0 0 10px 0 rgba(31, 56, 88, 0.1)"}}>
      <div style={{ padding: "5px" }}>
        本站公告
      </div>
      <h4 style={{ marginLeft: "20px" }}>禁止发表不良言论，信息，图片</h4>
      <img style={{ marginBottom: "10px" }} src= {LOGINBGURL} alt="pic2" width={'100%'} />
      {/* <img style={{ marginBottom: "10px" }}src={img2} alt="pic1" width={'100%'} /> */}
    </div>
  )
}
