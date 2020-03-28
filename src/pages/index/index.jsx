import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import "./index.less"
import { Layout } from 'antd';

import Head from "../../components/header"
import Navigate from '../../components/navigate';
import Home from "../home"
import Music from '../music';
import Novel from '../novel';
import Photo from '../photo';
import Movie from '../movie';
import UserInfo from '../userInfo';
import Comment from '../comment';
import PubTheme from '../pubTheme';

const { Header, Content, Footer } = Layout;

export default function Index() {
  return (
    <Layout className="container" >
      <Header>
        <Head />
      </Header>
      <Navigate ></Navigate>
      <Content style={{ padding: '0', backgroundColor: 'white' }} >
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/publish" component={PubTheme} />
          <Route path="/post/:postId" component={Comment} />
          <Route path="/music/:mid" component={Music} />
          <Route path="/novel" component={Novel} />
          <Route path="/photo/:typeId" component={Photo} />
          <Route path="/movie" component={Movie} />
          <Route path="/userInfo" component={UserInfo} />
          <Redirect from="/*" to="/home/newest" />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Design ©2018 Created by Recursion</Footer>
    </Layout>
  )
}
