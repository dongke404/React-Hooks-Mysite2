import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { reqImagesTypes } from "../../api";
import { useEffect, useState } from "react";
import Photos from "./photos";
import { Menu, Affix } from "antd";

export default function Photo(props) {
  const [ImageList, setImageList] = useState([]);

  useEffect(() => {
    getImagesTypes();
    props.history.push("/photo/1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImagesTypes = async () => {
    const result = await reqImagesTypes();
    if (result.status === 0) {
      setImageList(result.data);
    }
  };
  
  return (
    <div>
      <Affix>
        <Menu mode="horizontal">
          {ImageList.map((item) => {
            return (
              <Menu.Item key={item.id}>
                <Link to={"/photo/" + item.id}>{item.type}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Affix>
      <Switch>
        <Route path="/photo/:typeId" component={Photos} />
      </Switch>
    </div>
  );
}
