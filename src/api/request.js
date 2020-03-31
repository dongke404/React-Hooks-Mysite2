import axios from 'axios'
import { BASEURL1, BASEURL2 } from '../config/config'
import { message } from 'antd'

export function request0(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 5000
  })
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  // 2.2.响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      message.error("请求错误")
      return {status:-999}
    })
  // 3.发送真正的网络请求
  return instance(config)
}

export function request1(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: BASEURL1,
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    if (res.data.status === 1) {
      message.error(res.data.msg)
    } else {
      return res.data
    }
  }, err => {
    message.error("请求错误")
    return {status:-999}
  })

  // 3.发送真正的网络请求
  return instance(config)
}

export function request2(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: BASEURL2,
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log('请求失败: ' + err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    if (res.data.status === 1) {
      message.error(res.data.msg)
    } else {
      return res.data
    }
  }, err => {
    message.error("请求错误")
    return {status:-999}
  })
  // 3.发送真正的网络请求
  return instance(config)
}