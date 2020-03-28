
import React from 'react'
import { Card, Row, Col } from 'antd';
import "./index.less"


export default function AddressNav() {
  return (
   
    <Card  className="addressNav" title="常用网址链接" size="small" bordered={false}  style={{boxShadow:' 0 0 15px 0 rgba(31,56,88,0.08)',marginBottom:"5px" }}>
      <h3>掉发联盟</h3>
      <Row type="flex" justify="space-between">
        <Col span={6} ><a href="https://github.com/">GitHub</a></Col>
        <Col span={6}><a href="https://www.csdn.net/">CSDN</a></Col>
        <Col span={6}><a href="https://www.w3cschool.cn/">w3cschool</a></Col>
        <Col span={6}><a href="https://www.runoob.com/">菜鸟教程</a></Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://gitee.com/">码云</a></Col>
        <Col span={6}><a href="https://developer.mozilla.org/zh-CN/">MDN</a></Col>
        <Col span={6}><a href="https://docschina.org/">印记中文</a></Col>
        <Col span={6}><a href="https://www.echartsjs.com/zh/index.html">Echars</a></Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://ant.design/index-cn">Antd</a></Col>
        <Col span={6}><a href="https://element.eleme.cn/#/zh-CN">Element</a></Col>
        <Col span={6}><a href="https://www.icourse163.org/">慕课网</a></Col>
        <Col span={6}><a href="https://www.coursera.org/">coursera</a></Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="http://www.xuetangx.com/">学堂在线</a></Col>
        <Col span={6}><a href="https://www.oschina.net/">开源中国</a></Col>
        <Col span={6}><a href="https://m.study.163.com/">网易云课堂</a></Col>
        <Col span={6}></Col>
      </Row>
      <h3>资讯</h3>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://www.thepaper.cn/">澎湃</a></Col>
        <Col span={6}><a href="https://www.toutiao.com/">头条</a></Col>
        <Col span={6}><a href="https://www.baidu.com/">百度</a></Col>
        <Col span={6}><a href="https://www.pearvideo.com/">梨视频</a></Col>
      </Row>
      <h3>娱乐</h3>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://www.bilibili.com/">bilibili</a></Col>
        <Col span={6}><a href="https://www.douyu.com/">斗鱼</a></Col>
        <Col span={6}><a href="http://www.dasai8.com/">大赛吧</a></Col>
        <Col span={6}><a href="http://www.lszhibo.com/">绿色直播</a></Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://www.youku.com/">优酷</a></Col>
        <Col span={6}><a href="https://v.qq.com/">腾讯</a></Col>
        <Col span={6}><a href="https://www.iqiyi.com/">爱奇艺</a></Col>
        <Col span={6}><a href="http://www.yyetss.com/">人人美剧</a></Col>
      </Row>
      <h3>社区</h3>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://www.v2ex.com/">V2EX</a></Col>
        <Col span={6}><a href="https://www.zhihu.com/">知乎</a></Col>
        <Col span={6}><a href="https://www.weibo.com/">新浪微博</a></Col>
        <Col span={6}><a href="https://www.weibo.com/">百度贴吧</a></Col>
      </Row>
      <h3>游戏资讯</h3>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://www.3dmgame.com/">3DM</a></Col>
        <Col span={6}><a href="https://www.17173.com/">17173</a></Col>
        <Col span={6}><a href="https://www.gamersky.com/">游明星空</a></Col>
        <Col span={6}><a href="https://www.ali213.net/">游侠</a></Col>
      </Row>
      <h3>生活</h3>
      <Row type="flex" justify="space-between">
        <Col span={6}><a href="https://www.taobao.com/">淘宝</a></Col>
        <Col span={6}><a href="https://www.jd.com/">京东</a></Col>
        <Col span={6}><a href="https://www.smzdm.com/">什么值得买</a></Col>
        <Col span={6}><a href="http://www.zol.com.cn/">中关村</a></Col>
      </Row>
    </Card>
   
  )
}
