import React, { useState } from 'react'
import "./index.less"
import { withRouter, Link } from "react-router-dom";

export const Tagflag = React.createContext()
function NavDiy(props) {
  const [activeTag, setActive] = useState(props.tags[0].name)
  const activeStyle = { color: props.diycolor, borderBottom: props.diycolor + ' 2px solid' }
  function clickTag(e) {
    setActive(e.target.innerHTML)
    props.getCurTag(e.target.title)
  }

  return (
    <div className="navbox " >
      <div className="tags ">
        {props.tags.map((item, index) => {
          return (
            <span
              style={activeTag === item.name ? activeStyle : {}}
              className="navtag" onClick={clickTag}
              key={item.name}
              title={item.flag}
            >
              {item.name}
            </span>
          )
        })}
      </div>
      <Link to="/publish">
        <div className="publishBtn">
          发表
      </div>
      </Link>

    </div>

  )
}

export default withRouter(NavDiy)

