/**
 * 入口、导入组件样式、渲染
 */
import React, { Component } from 'react';
import {render} from 'react-dom';
import { Form, Icon, Button, Label, FormControl } from 'tinper-bee';
const FormItem = Form.FormItem;
import 'static/others/mtl.ncc.js'
const appId = 'sso';
mtl.writeUCGConfig(appId,{
  // host: 'ma-gateway.test.app.yyuap.com',
  ishttps: false,
  default_tp: 'none'
})

class Login extends Component{
  constructor(props) {
    super(props)
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('校验失败', values);
      } else {
        console.log('提交成功', values)
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <Form >
        <FormItem>
          <Label>用户名</Label>
          <FormControl placeholder="请输入用户名"
                       {...getFieldProps('user', {
                         validateTrigger: 'onBlur',
                         rules: [{
                           required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入用户名</span></span>,
                         }],
                       }) }
          />
          <span className='error'>
                            {getFieldError('username')}
                        </span>
        </FormItem>
        <FormItem>
          <Label>密码</Label>
          <FormControl placeholder="请输入密码" type='password'
                       {...getFieldProps('pass', {
                         validateTrigger: 'onBlur',
                         rules: [{
                           required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入密码</span></span>,
                         }],
                       }) }
          />
          <span className='error'>
                            {getFieldError('password')}
                        </span>
        </FormItem>
        <FormItem style={{'paddingLeft':'106px'}}>
          <Button shape="border" className="reset" style={{"marginRight":"8px"}}>取消</Button>
          <Button colors="primary" className="login" onClick={this.submit}>登录</Button>
        </FormItem>
      </Form>
    )
  }
}

const LoginForm = Form.createForm()(Login)

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: 'a',
      pass: 'a111111'
    }
  }
  login = () => {
    const { user, pass } = this.state;
    mtl.callService({
      appId: appId,
      params: {
        user,
        pass
      },
      callback: (res) => {
        console.log(res)
      }
    })
  }
  render() {
    return (
      <div>



        <div>
          <input
            type="text"
            value={this.state.user}
            onChange={e => {
              this.setState({user: e.target.value})
            }}
          />
        </div>
        <div>
          <input
            type="password"
            value={this.state.pass}
            onChange={e => {
              this.setState({pass: e.target.value})
            }}
          />
        </div>
        <div>
          <button onClick={this.login}>登陆</button>
        </div>
      </div>
    )

  }
}

render(<App/>, document.getElementById('app'))