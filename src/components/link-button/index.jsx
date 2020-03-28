import React from 'react'
import './index.less'

//高阶组件
export default function LinkButton(props){
    return <button className= 'link-button' {...props}></button>
}