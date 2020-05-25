import { request0, request1 } from './request'
import axios from "axios"
import storage from "../utils/storageUtil"
import {BASEURL} from '../config/index'
const utoken = storage.getUser().token

//用户名校验请求
export const reqCkLogname = (loginname) => request0({ url: '/reg', params: { loginname }, method: 'GET' })
//注册请求
export const reqReg = (loginname, email, password, nickname) => request0({ url: '/reg', data: { loginname, email, password, nickname }, method: 'POST' })
//登陆请求
export const reqLogin = (loginname, password) => request0({ url: '/login', data: { loginname, password }, method: 'POST' })

//发布页验证用户是否正常
export const reqCkuser = (token) => request0({ url: '/ckuser', data: { token }, method: 'POST' })

//获取用户基本信息
export const requbasicinfo = (uid) => request0({ url: '/userbasicinfo', params: { uid }, method: 'GET' })

//更改用户信息
export const reqModifyUser = (value, type, token) => request0({ url: '/modifyUser', data: { value, type, token }, method: 'POST' })

//获取帖子内容
export const reqTopic = (page, pageNum, typeId = "0", tag = "newest") => request0({ url: '/reqtopic', params: { page, pageNum, typeId, tag }, method: 'GET' })

//获取帖子分类
export const reqTopicTypes = () => request0('/topicTypes')

//上传头像
export const uploadHeadImg = (formdata) => {
  const config = { headers: { "encrypt": "multipart/form-data" } };
  return axios.post(BASEURL+"/api/uploadhead", formdata, config)
}
//获取帖子详情
export const reqPostDetail = (id) => request0({ url: '/reqpostdetail', params: { id }, method: 'GET' })

//收藏主题
export const reqCollect = (token, topicId) => request0({ url: '/reqCollect', data: { token, topicId }, method: 'POST' })

//获取收藏的帖子
export const reqcltTopics = (token) => request0({ url: '/cltTopic', data: { token }, method: 'POST' })

//获取我发布的的帖子
export const reqMyTopics = (token) => request0({ url: '/myTopics', data: { token }, method: 'POST' })

//获取用户发布的的帖子
export const reqUserTopics = (id) => request0({ url: '/myTopics', params: { id }, method: 'GET' })

//删除我发布的的帖子
export const reqDelTopics = (topicid, token) => request0({ url: '/delTopics', data: { topicid, token }, method: 'POST' })

//获取我的评论和回复和回复我的
export const reqMyRepCmt = (token) => request0({ url: '/myRepCmt', data: { token }, method: 'POST' })

//获取我关注的人或关注我的(1:关注 2，被关注)
export const reqFollowUser = (token, flag) => request0({ url: '/followUser', data: { token, flag }, method: 'POST' })

//获取用户关注的人或关注我的(1:关注 2，被关注)
export const reqUFollowUser = (uid, flag) => request0({ url: '/followUser', params: { uid, flag }, method: 'GET' })

//点击关注(取消关注)
export const reqFollow = (token, followed_uid) => request0({ url: '/reqFollow', data: { token, followed_uid }, method: 'POST' })

//移除关注我的
export const reqRmFollow = (token, rmid) => request0({ url: '/rmFollow', data: { token, rmid }, method: 'POST' })

//点赞
export const reqZan = (token, comment_id) => request0({ url: '/reqZan', data: { token, comment_id }, method: 'POST' })

//获取赞的个数
export const reqZanNum = (uid) => request0({ url: '/reqZanNum', params: { uid }, method: 'GET' })

//获取帖子的个数
export const reqTopicNum = (uid) => request0({ url: '/reqTopicNum', params: { uid }, method: 'GET' })

//获取被关注的个数
export const reqFollowNum = (uid) => request0({ url: '/reqFollowNum', params: { uid }, method: 'GET' })


//发布主题
export const reqUploadTopic = (token, type_id, title, content) => request0({ url: '/uploadtopic', data: { token, type_id, title, content }, method: 'POST' })

//评论
export const upComment = (token, topic_id, comment) => request0({ url: '/upComment', data: { token, topic_id, comment }, method: 'POST' })

//发表回复
export const pbReply = (token, to_uid, comment_id, reply_content) => request0({ url: '/pbReply', data: { token, to_uid, comment_id, reply_content }, method: 'POST' })

//获取新闻
export const reqNews = () => request0('/reqNews')

/*------------小说------------- */

//获取小说页小说
export const reqStorys = (stype) => request0({ url: "/story", params: { stype }, method: 'GET' })

//搜索小说
export const reqSearchBook = (name) => request0({ url: "/searchBook", params: { name }, method: 'GET' })

//获取小说类型
export const reqStoryTypeList = () => request0("/storyTypeList")

// //获取小说目录
export const reqStoryDirs = (storyid) => request0(`/storydirs?storyid=${storyid}`)

//获取小说内容
export const reqStoryContent = (storyid, path, token) => request0({ url: "/storyContent", data: { storyid, path, token }, method: 'POST' })

//获取下一页
export const reqStoryNextPage = (storyid, path, token) => request0({ url: "/storyNextPage", data: { storyid, path, token }, method: 'POST' })

//获取历史记录(默认获取10条 flag有值取全部)
export const reqStoryHistory = (token, flag = "") => request0({ url: "/storyHistory", data: { token, flag }, method: 'POST' })


/*------------电影------------- */
//获取电影列表
export const reqMovies = () => request0("/reqMovies")


/*------------图片------------- */
//获取图片类型列表
export const reqImagesTypes = () => request0("/imagesTypes")

//获取图片
export const reqimages = (typeId, curPage) => request0({ url: "/imagesInfo", params: { typeId, curPage }, method: 'GET' })


/*------------音乐------------- */
//获取音乐飙升榜
export const reqMusic = (idx) => request1({ url: '/top/list', params: { idx }, method: 'GET' })

//搜索自动补全音乐
export const seachSuggestMusic = (keywords) => request1({ url: "/search/suggest", params: { keywords }, method: 'GET' })

//搜索音乐
export const seachMusic = (keywords) => request1({ url: "/search", params: { keywords }, method: 'GET' })

//搜音乐详情
export const seachMusicDetail = (ids) => request1({ url: "/song/detail", params: { ids }, method: 'GET' })


//添加喜欢的音乐
export const addmusicLike = (musicId, token = utoken) => request0({ url: "/addmusicLike", data: { token, musicId }, method: 'POST' })

//获取用户喜欢的音乐
export const getUserMusic = (uid, token = utoken) => request0({ url: "/requsermusic", data: { token, uid }, method: 'POST' })