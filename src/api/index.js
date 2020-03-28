import {request1,request0} from './request'
import axios from "axios"

//用户名校验请求
export const reqCkLogname= (loginname) =>request0({url:'/reg',params:{loginname},method:'GET'})
//注册请求
export const reqReg= (loginname, email,password,nickname) =>request0({url:'/reg', data:{loginname,email,password,nickname},method:'POST'})
//登陆请求
export const reqLogin= (loginname,password) =>request0({url:'/login', data:{loginname,password},method:'POST'})
//验证用户请求
export const reqCkuser= (token) =>request0({url:'/ckuser', data:{token},method:'POST'})

//获取帖子内容
export const reqTopic= (page,pageNum,typeId="0",tag="newest") =>request0({url:'/reqtopic',params:{page,pageNum,typeId,tag},method:'GET'})

//获取帖子分类
export const reqTopicTypes= () =>request0('/topicTypes')

//上传头像
export const uploadHeadImg=(formdata)=>{    
  const config = {headers: { "encrypt": "multipart/form-data"}};
  return axios.post("http://127.0.0.1:5000/uploadhead", formdata, config)
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
export const reqNews =() =>request1('/reqNews')

// //获取音乐飙升榜
// export const reqMusic=(id)=>ajax(Baseurl+`/top/list?idx=${id}`)

// //搜索自动补全音乐
// export const seachSuggestMusic=(keywords)=>ajax(Baseurl+`/search/suggest?keywords=${keywords}`)

// //搜索音乐
// export const seachMusic=(keywords)=>ajax(Baseurl+`/search?keywords=${keywords}`)

// //搜音乐详情
// export const seachMusicDetail=(keywords)=>ajax(Baseurl+`/song/detail?ids=${keywords}`)

// //获取小说页小说
// export const reqStorys=(stype)=>ajax(BASE+`/story?stype=${stype}`,)

// //获取小说类型
// export const reqStoryTypeList=()=>ajax(BASE+"/storyTypeList")

// //获取小说目录
// export const reqStoryDirs=(storyid)=>ajax(BASE+`/storydirs?storyid=${storyid}`)

// //获取小说内容
// export const reqStoryContent=(storyid,path)=>ajax(BASE+"/storyContent",{storyid,path})

// //获取下一页
// export const reqStoryNextPage=(storyid,path)=>ajax(BASE+"/storyNextPage",{storyid,path})


//获取图片类型列表
export const reqImagesTypes=()=>request1("/imagesTypes")

// //获取图片
// export const reqimages=(typeId,curPage)=>ajax(BASE+"/imagesInfo",{typeId,curPage})


// //获取电影列表
// export const reqMovies=()=>ajax(BASE+"/reqMovies")