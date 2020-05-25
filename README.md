#### 本项目主要采用react-hooks+antd开发,脚手架搭建，适合学习,也适合更改成毕业设计设或面试项目所使用。

##### 原react版本(没用react-hooks)的源码[https://github.com/dongke404/React-Mysite](https://github.com/dongke404/React-Mysite)此版缺少很多功能

##### 由于项目是作为初学者时写的，还需要自学与找工作,也没过多时间修改样式和多多规范化代码。自学没经验工作也是实在难找，喜欢的小伙伴可以帮我点个star。页面比较粗糙,有兴趣的可以自行修改样式或者重造结构。


**安装**

```
yarn
```

**运行**

```
yarn start
```
**yarn**

```
yarn build
```

项目接口:

在src/api 文件夹里查阅

接口我采用python+Flask所写,源码地址：
[https://github.com/dongke404/Flask-Mysite2API](https://github.com/dongke404/Flask-Mysite2API)

效果图
![image](http://www.dongkirk.xyz/static/images/uploadImg/202005251332348956469-24.jpg)
![image](http://www.dongkirk.xyz/static/images/uploadImg/202005251332417322780-12.jpg)
![image](http://www.dongkirk.xyz/static/images/uploadImg/202005251332481579270-28.jpg)


功能简述：

- 首页：登陆注册（采用jwt模块验证身份过期),截图上传头像
- 帖子页：发表，评论，回复，上传图片，关注，被关注，点赞
- 音乐页：点击播放，添加到播放列表，搜索音乐，点击我喜欢，播放器全局播放等
- 小说页：搜索，滚动加载，自动添加历史记录，
- 图片页：flex布局，点击放大
- 个人信息页：查看我的收藏，我参与的回复，我的发表，相关关注功能
