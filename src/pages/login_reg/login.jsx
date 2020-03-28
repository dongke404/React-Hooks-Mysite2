import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import storage from '../../utils/storageUtil'
import { reqLogin } from "../../api"


const Login = (props) => {
  const rname = storage.getLogInfo().loginname
  const rpwd = storage.getLogInfo().password

  if (storage.getUser()) {
    props.history.push("/home")
  }


  const onFinish = values => {
    const { loginname, password, remember } = values
    const result = reqLogin(loginname, password)
    result.then(
      (val) => {
        if (val.status === 0) {
          message.success("登陆成功")
          storage.saveUser(val.data)
          if (remember === true) {
            storage.saveLogInfo({ loginname, password })
          } else {
            storage.removeLogInfo()
          }
          props.history.go(-1)
        } else {
          message.info(val.msg)
        }
      }
    ).catch(e => console.log(e))
  };

  return (
    <div className="login_reg">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          loginname: rname,
          password: rpwd
        }}
        onFinish={onFinish}
      >
        <Form.Item

          name="loginname"
          rules={[
            { required: true, message: 'Please input your username!' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由字母数字下划线组成' }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { min: 4, message: '用户名需要大于4位' },
            { required: true, message: 'Please input your Password!' },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"

          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to="#">
            忘记密码?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
        </Button>
          <Link to='reg'><Button type="primary" htmlType="submit" className="login-form-button">
            注册
        </Button></Link >
        </Form.Item>
      </Form>
    </div>
  );
};
export default withRouter(Login)