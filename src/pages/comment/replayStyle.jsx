import React, { useState} from 'react'
import { Modal } from 'antd';
import Replys from "./replys"

const ReplyBox = (props) => {
  const [isshow, setIsshow] = useState("none")
  const [isvisible, setIsvisible] = useState(false)

  const handleCancel = e => {
    setIsvisible(false)
  };


  const num = props.replys.length
  if (num > 0 && num < 5) {
    return (
      <div  >
        <div className="sep5"></div>
        <span  className='moreReply' onClick={()=>{isshow==="none"?setIsshow("block"):setIsshow("none")}}>更多回复({num})</span>
        <div style={{display:isshow}}>
        <Replys replys={props.replys} />
        </div>
      </div>
    )
  }
  if (num >= 5) {
    return <div className="moreReply" >
      <div className="sep5"></div>
      <span  className='moreReply' onClick={()=>{setIsvisible(!isvisible)}} >更多回复({num})</span>
      <Modal
          title="更多回复"
          visible={isvisible}
          cancelText="关闭"
          onCancel={handleCancel}
          footer={null}
          width={720}
        >
          <Replys replys={props.replys}/>
      </Modal>
    </div>
  }
  else {
    return <div></div>
  }

}

export default ReplyBox