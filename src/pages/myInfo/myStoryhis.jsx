import React, { useState, useEffect} from "react";
import { reqStoryHistory } from "../../api";
import storage from "../../utils/storageUtil";
import { Pagination } from "antd";

export default function MyStoryhis() {
  const token = storage.getUser().token || "";
  const [historys, sethistorys] = useState([]);
  const [curpage, setcurpage] = useState(1);
  useEffect(() => {
    const getStoryHistory = async () => {
      const result = await reqStoryHistory(token, 1);
      if (result.status === 0) {
        sethistorys(result.data);
      } else {
        alert(result.msg);
      }
    };
    getStoryHistory();
  }, [token]);

  const onChange = (page) => {
    setcurpage(page)
  };
  return (
    <div className="box-user box">
      {historys.slice((curpage-1)*10,(curpage-1)*10+10).map((item) => {
        return (
          <div className="cell" key={item.path}>
            <div>
              小说： <a href={"/novel/" + item.storyid}>{item.name}</a>
            </div>
            <div>
              章节：
              <a href={"/novel/" + item.storyid + "/" + item.path}>
                {item.dir}
              </a>
            </div>
          </div>
        );
      })}
      <div className="sep5"></div>
      <Pagination defaultCurrent={1} hideOnSinglePage  current={curpage} onChange={onChange} total={historys.length} />
    </div>
  );
}
