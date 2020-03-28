// //确定用户身份
// import React, {useState, useEffect } from 'react'
// import { reqCkuser } from '../api';
// import storage from "../utils/storageUtil"
// //验证用户身份是否过期或异常
// export function useIsUserLogin (){
//   const [user, setuser] = useState(storage.getUser())
//   //身份过期清除
//   useEffect(() => {
//     let res = reqCkuser(user.token)
//     res.then(result => {
//       if (result.status !== 0) {
//         storage.removeUser()
//         setuser("")
//       }
//     }).catch((error) => { console.log(error) })
//   }, [user])
//   return user
// }
