import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Button,
  message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import { reqCkLogname, reqReg } from "../../api"
import storage from '../../utils/storageUtil'


// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8}
  },
};

const Reg = (props) => {
  const [isShow, setisShow] = useState(false);
  const [nameval, setnameval] = useState("");
  const [form] = Form.useForm();
 

  useEffect(() => {
    //防抖
    const timer = setTimeout(() => {
      if (nameval.length > 5) {
        const result = reqCkLogname(nameval)
        result.then(
          (val) => {
            if (val.status === 1) {
              setisShow(true)
            }
          }
        ).catch(err => message.error("未知错误"))
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [nameval])

  const onFinish = values => {
    const { loginname, email, password, nickname } = values
    const result = reqReg(loginname, email, password, nickname)
    result.then(
      (val) => {
        if (val.status === 0) {
          message.success("注册成功")
          storage.saveUser(val.data)
          props.history.push("/")
        } else {
          message.info(val.msg)
        }
      }
    ).catch(e => console.log(e))
  };
  return (
    <div className='login_reg'>
      <Form
        className="reg-form"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="loginname"
          label="登录名"
          rules={[
            { required: true, message: '请输入你的用户名' },
            { min: 6, message: '用户名需要大于6位' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由字母数字下划线组成' }
          ]}
        >
          <div className="nameIpt"><Input value={nameval} onChange={e => setnameval(e.target.value)} /> {isShow ? <span className="tip" >用户名已存在</span> : ""}</div>

        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!'},
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码需要大于6位' }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={
            <span>
              昵称&nbsp;
            <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: '昵称不能为空',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
        </Button>
          <Link to='login' style={{ 'marginLeft': '30px' }}> 返回登录</Link >
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Reg)