import React, { useEffect, useState } from "react";
import Xgplayer from "xgplayer-react";
import { Card, Popover, Tag } from "antd";
import "./index.less";
import { reqMovies } from "../../api";
import { MOVIEBASEURL } from "../../config";
import {BASEURL} from '../../config/index'

const gridStyle = {
  width: "12.5%",
  textAlign: "center",
  height: "200px",
  padding: 10,
  overflow: "hidden",
};

let config = {
  id: "mse",
  url: MOVIEBASEURL+"/static/videos/27010768.mp4",
  width: "960px",
  height: "540px",
};

export default function Movie() {
  const [movieList, setmovieList] = useState([]);
  const [curMovieInfo, setcurMovieInfo] = useState({});
  const [Player, setPlayer] = useState(null);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try{const result = await reqMovies();
      var curMovieInfo = {};
      curMovieInfo.title = result.data[0].subject.title;
      curMovieInfo.actors = result.data[0].subject.actors.reduce(
        (pre, cur) => pre + " " + cur
      );
      curMovieInfo.introduce = result.data[0].introduce;
      curMovieInfo.comment = result.data[0].subject.short_comment.content;
      if (result.status === 0) {
        setmovieList(result.data);
        setcurMovieInfo(curMovieInfo);
      }
    }catch{
      alert("请求错误")
    }
    
  };

  const onPlay = (e) => {
    var curMovieInfo = {};
    const title = e.target.getAttribute("title");
    const actors = e.target.getAttribute("actors");
    const introduce = e.target.getAttribute("introduce");
    const curPlay_url = e.target.getAttribute("flag");
    const comment = e.target.getAttribute("comment");
    curMovieInfo.title = title;
    curMovieInfo.actors = actors;
    curMovieInfo.introduce = introduce;
    curMovieInfo.comment = comment;
    Player.start(MOVIEBASEURL+"/static/videos/" + curPlay_url + ".mp4");
    Player.play();
    setcurMovieInfo(curMovieInfo);
    window.scrollTo(0, 0);
  };

  return (
    <div className="movie-box">
      <div className="movie-box-part1">
        <div className="movie-box-left">
          <div id="mse">
            <Xgplayer
              config={config}
              playerInit={(player) => {
                setPlayer(player);
              }}
            />
          </div>
        </div>
        <div className="movie-box-right">
          <Card title={curMovieInfo.title} className="movie-box-card">
            <p>演员：{curMovieInfo.actors}</p>
            <br />
            <p>简介：{curMovieInfo.introduce}</p>
            <br />
            <p>评论：{curMovieInfo.comment}</p>
          </Card>
        </div>
      </div>

      <Card
        className="movie-box-part2"
        title="点击播放(需要的请在首页发帖或联系站主)"
      >
        {movieList.map((item) => {
          return (
            <Popover
              key={item.subject.id}
              placement="top"
              title={<h2 style={{ width: 250 }}>{item.subject.title}</h2>}
              content={
                <Content info={item.subject} introduce={item.introduce} />
              }
              trigger="hover"
            >
              <Card.Grid style={gridStyle}>
                <img
                  className="movie-img"
                  src={BASEURL+"/static/images/movieImg/" + item.subject.id + ".jpg"}
                  alt={item.subject.id}
                  flag={item.subject.id}
                  title={item.subject.title}
                  actors={item.subject.actors.slice(0, 10).map((item) => item)}
                  introduce={item.introduce}
                  comment={item.subject.short_comment.content}
                  onClick={onPlay}
                />
                <p className="movie-namerate">
                  {item.name}
                  <span style={{ color: "green", marginLeft: 10 }}>
                    {item.subject.rate}
                  </span>
                </p>
              </Card.Grid>
            </Popover>
          );
        })}
      </Card>
    </div>
  );
}

const Content = (props) => {
  return (
    <div style={{ width: 250 }}>
      <div>评分：{props.info.rate}</div>
      <div>
        {props.info.actors.slice(0, 3).map((item, index) => {
          return (
            <Tag key={index} color="red" style={{ marginTop: 10 }}>
              {item}
            </Tag>
          );
        })}
        <Tag color="red" style={{ marginTop: 10 }}>
          {props.info.duration}
        </Tag>
        <Tag color="red" style={{ marginTop: 10 }}>
          {props.info.region}
        </Tag>
      </div>
      <div>简介：{props.introduce}</div>
    </div>
  );
};
