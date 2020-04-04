import axios from 'axios'

export function request0(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000
  })
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
  })
  // 2.2.响应拦截
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      return { status: -999, msg: "请求错误" }
    })
  // 3.发送真正的网络请求
  return instance(config)
}

export function request1(config) {
  const instance = axios.create({
    baseURL: "",
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return { status: -999, msg: "请求错误" }
  })
  return instance(config)
}

