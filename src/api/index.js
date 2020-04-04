import {request0,request1} from './request'
import axios from "axios"
import  storage from "../utils/storageUtil"
const utoken=storage.getUser().token
//用户名校验请求
export const reqCkLogname= (loginname) =>request0({url:'/reg',params:{loginname},method:'GET'})
//注册请求
export const reqReg= (loginname, email,password,nickname) =>request0({url:'/reg', data:{loginname,email,password,nickname},method:'POST'})
//登陆请求
export const reqLogin= (loginname,password) =>request0({url:'/login', data:{loginname,password},method:'POST'})

//提前验证用户是否正常
export const reqCkuser= (token) =>request0({url:'/ckuser', data:{token},method:'POST'})

//获取帖子内容
export const reqTopic= (page,pageNum,typeId="0",tag="newest") =>request0({url:'/reqtopic',params:{page,pageNum,typeId,tag},method:'GET'})

//获取帖子分类
export const reqTopicTypes= () =>request0('/topicTypes')

//上传头像
export const uploadHeadImg=(formdata)=>{    
  const config = {headers: { "encrypt": "multipart/form-data"}};
  return axios.post("/api/uploadhead", formdata, config)
}
//获取帖子详情
export const reqPostDetail= (id) =>request0( {url:'/reqpostdetail',params:{id},method:'GET'})

//发布主题
export const reqUploadTopic= (token,type_id,title,content) =>request0({url: '/uploadtopic', data:{token,type_id,title,content},method:'POST'})

//评论
export const upComment =(token,topic_id,comment) =>request0( {url:'/upComment',data:{token,topic_id,comment},method:'POST'})

//发表回复
export const pbReply =(token,to_uid,comment_id,reply_content) =>request0({url:'/pbReply',data:{token,to_uid,comment_id,reply_content},method:'POST'})

//获取新闻
export const reqNews =() =>request0('/reqNews')


//添加喜欢的音乐
export const addmusicLike=(musicId,token=utoken)=>request0({url:"/addmusicLike",data:{token,musicId},method:'POST'})

//获取用户喜欢的音乐
export const getUserMusic=(uid,token=utoken)=>request0({url:"/requsermusic",data:{token,uid},method:'POST'})

//获取小说页小说
export const reqStorys=(stype)=>request0({url:"/story",params:{stype},method:'GET'})

//获取小说类型
export const reqStoryTypeList=()=>request0("/storyTypeList")

// //获取小说目录
export const reqStoryDirs=(storyid)=>request0(`/storydirs?storyid=${storyid}`)

//获取小说内容
export const reqStoryContent=(storyid,path,token)=>request0({url:"/storyContent",data:{storyid,path,token},method:'POST'})

//获取下一页
export const reqStoryNextPage=(storyid,path,token)=>request0({url:"/storyNextPage",data:{storyid,path,token},method:'POST'})

//获取历史记录
export const reqStoryHistory=(token)=>request0({url:"/storyHistory",data:{token},method:'POST'})

//获取图片类型列表
export const reqImagesTypes=()=>request0("/imagesTypes")

//获取图片
export const reqimages=(typeId,curPage)=>request0({url:"/imagesInfo",params:{typeId,curPage},method:'GET'})

// //获取电影列表
export const reqMovies=()=>request0("/reqMovies")


//获取音乐飙升榜--------------------------------------------------------------------------------------
export const reqMusic=(idx)=>request1({url:'/top/list',params:{idx},method:'GET'})

//搜索自动补全音乐
export const seachSuggestMusic=(keywords)=>request1({url:"/search/suggest",params:{keywords},method:'GET'})

//搜索音乐
export const seachMusic=(keywords)=>request1({url:"/search",params:{keywords},method:'GET'})

//搜音乐详情
export const seachMusicDetail=(ids)=>request1({url:"/song/detail",params:{ids},method:'GET'})