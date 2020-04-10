/* 
操作local数据的工具函数模块
*/
import store from 'store'  //github的第三方库store
const USER_KEY = 'user_key'
const LOGIN_KEY = 'login_key'
const FOllOW_KEY = 'follow_key'
const NUM_INFO= 'num_info'

export default {
  //保存user
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
  },

  //返回一个user对象, 如果没有返回一个{}
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || ''
  },

  //删除保存的user
  removeUser() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  },

  //存储是否记住密码的信息
  saveLogInfo(info) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(LOGIN_KEY, info)
  },

  getLogInfo() {
    return store.get(LOGIN_KEY) || ''
  },

  removeLogInfo() {
    store.remove(LOGIN_KEY)
  },

  //存储用户关注
  saveFollow(info) {
    store.set(FOllOW_KEY, info)
  },

  getFollow() {
    return store.get(FOllOW_KEY) || ''
  },

  removeFollow() {
    store.remove(FOllOW_KEY)
  },
  
  
  //存储用户的各数量信息
  saveNuminfo(info) {
    store.set(NUM_INFO, info)
  },

  getNuminfo() {
    return store.get(NUM_INFO) || ''
  },

  removeNuminfo() {
    store.remove(NUM_INFO)
  },

}