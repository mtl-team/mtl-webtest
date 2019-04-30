/**
 * 入口、导入组件样式、渲染
 */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Form, Icon, Button, Label, FormControl} from 'tinper-bee';

const FormItem = Form.FormItem;
import 'tinper-bee/assets/tinper-bee.css'
import 'static/others/mtl.ncc.js'

const appId = 'sso';
mtl.writeUCGConfig({
  appId,
  config: {
    // host: 'ma-gateway.test.app.yyuap.com',
    ishttps: false,
    default_tp: 'none'
  }
})

class Login extends Component {
  constructor(props) {
    super(props)
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('校验失败', values);
      } else {
        this.props.login(values)
      }
    });
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    return (
      <Form>
        <FormItem>
          <Label>用户名</Label>
          <FormControl placeholder="请输入用户名"
                       {...getFieldProps('user', {
                         validateTrigger: 'onBlur',
                         initialValue: 'a',
                         rules: [{
                           required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入用户名</span></span>,
                         }],
                       })}
          />
          <span className='error'>
            {getFieldError('user')}
                        </span>
        </FormItem>
        <FormItem>
          <Label>密码</Label>
          <FormControl placeholder="请输入密码" type='password'
                       {...getFieldProps('pass', {
                         validateTrigger: 'onBlur',
                         initialValue: 'a111111',
                         rules: [{
                           required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入密码</span></span>,
                         }],
                       })}
          />
          <span className='error'>
                            {getFieldError('pass')}
                        </span>
        </FormItem>
        <FormItem style={{'paddingLeft': '106px'}}>
          <Button shape="border" className="reset" style={{"marginRight": "8px"}}>取消</Button>
          <Button colors="primary" className="login" onClick={this.submit}>登录</Button>
        </FormItem>
      </Form>
    )
  }
}

const LoginForm = Form.createForm()(Login)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'a',
      pass: 'a111111'
    }
  }

  login = (params) => {
    mtl.login({
      params: params,
      success: (data) => {
        console.log(data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
  login1 = () => {
    const {user, pass} = this.state;
    mtl.callService({
      appId,
      params: {
        user,
        pass
      },
      success: (data) => {
        console.log(data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  render() {
    return (
      <div>
        <LoginForm
          login={this.login}
        />
      </div>
    )

  }
}

render(<App/>, document.getElementById('app'))