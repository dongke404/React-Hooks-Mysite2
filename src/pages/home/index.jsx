import React, { useEffect, useState, useMemo } from 'react'
import { Row, Col, Pagination, Affix, Menu } from 'antd';
import "./index.less"
import { reqNews, reqTopicTypes } from '../../api/';
import Bulletin from './bulletin-board';
import Slideshow from '../../components/slideshow';
import PostBox from './postBox';
import AddressNav from './addressNav';



export const CurtypeId = React.createContext();

export default function Home() {
  const [newsData, setnewsData] = useState([])
  const [topicTypes, setTopicTypes] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const [typeId, setTypeId] = useState("0")

  useEffect(() => {
    let res = reqNews()
    res.then(result => {
      setnewsData(result.data);
    }).catch((error) => { console.log(error) })
  }, [])

  useEffect(() => {
    let res = reqTopicTypes()
    res.then(result => {
      setTopicTypes(result.data);
    }).catch((error) => { console.log(error) })
  }, [])

  const hotevents = newsData.length === 0 ? [] : newsData.hotevent
  const hoteventList = useMemo(() => hotevents.slice((currentpage - 1) * 10, currentpage * 10), [currentpage, hotevents]); //计算属性
  const pageonChange = page => {
    return setcurrentpage(page);
  }

  const handleclick = e => {
    setTypeId(e.key)
  }
  return (
    <div className='homeContainer'>
      <Row className='row1'>
        {/* 轮播图开始 */}
        <Col span={12}>
          <Slideshow bannerData={newsData.banner ? newsData.banner : []} />
        </Col>
        {/* 轮播图结束 */}
        {/* 侧边图开始 */}
        <Col span={6}>
          <div className='row1-top'>
            <a href={newsData.length === 0 ? "" : newsData.sideimg[0].sideUrl} target='_black' >
              <img src={newsData.length === 0 ? "" : newsData.sideimg[0].sideImgUrl} alt={newsData.length === 0 ? "" : newsData.sideimg[0].sidetitle} />
            </a>
            <div className='img-title'>{newsData.length === 0 ? "" : newsData.sideimg[0].sidetitle}</div>
          </div>
          <div className='row1-botton'>
            <a href={newsData.length === 0 ? "" : newsData.sideimg[1].sideUrl} target='_black' >
              <img src={newsData.length === 0 ? "" : newsData.sideimg[1].sideImgUrl}
                alt={newsData.length === 0 ? "" : newsData.sideimg[1].sidetitle} /></a>
            <div className='img-title'>{newsData.length === 0 ? "" : newsData.sideimg[1].sidetitle}</div>
          </div>
        </Col>
        {/* 侧边图结束 */}
        {/* 热点内容可开始 */}
        <Col span={6}>
          <div className='row1-right'>
            <div className='row1-right-title'>
              今日热点
            </div>
            <div className='row1-right-body'>
              {hoteventList.map((item, index) => {
                return (
                  <a key={index} href={item.link} target='_black' ><p className="hotevent">{(index + (currentpage - 1) * 10 + 1) + " . " + item.title}</p></a>
                )
              })}
              <div className='pagination'>
                <Pagination
                  size="small"
                  total={50}
                  defaultCurrent={1}
                  current={currentpage}
                  onChange={pageonChange}
                  defaultPageSize={10}
                />
              </div>
            </div>
          </div>
        </Col>
        {/* 热点内容可开始 */}
      </Row>
      <Row >
        {/* 左侧导航开始 */}
        <Col span={3} className='row2-left'>
          <Affix offsetTop={0}>
            <div className="row2-left" style={{ minHeight:  document.body.clientHeight-50+ 'px' }}>
              <Menu
                style={{ height: "100%" }}
                onClick={handleclick}
                defaultSelectedKeys={["0"]}
              >
                <Menu.Item key="0">全部</Menu.Item>
                {topicTypes.map((item) => {
                  return <Menu.Item key={item.id}>{item.type}</Menu.Item>
                })
                }
                
              </Menu>
            </div>
          </Affix>
        </Col>
        {/* 左侧导航结束 */}
        {/* 左边帖子开始 */}
        <Col span={15} className='row2-center'>
          <CurtypeId.Provider value={typeId}>
            <PostBox />
          </CurtypeId.Provider>
        </Col>
        {/* 左边帖子结束 */}
        {/* 右侧栏开始 */}
        <Col span={6} className='row2-right' style={{ float: 'right' }}>
          <Bulletin className="bulletin"></Bulletin>
          <Affix offsetTop={10}>
            <AddressNav />
          </Affix>
        </Col>
        {/* 右侧栏结束 */}
      </Row>
    </div>
  )
}
