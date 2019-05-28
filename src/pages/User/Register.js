/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Tabs, message, Select, Row, Col, Popover, Divider, Progress, Steps, Icon } from 'antd';
import styles from './Register.less';
import Result from '@/components/Result';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const {Step} = Steps;
const {TabPane} = Tabs;
const QRCode = require('qrcode.react');

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};


@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    current: 0,
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    if (register.status === 'ok') {
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    message.warning(formatMessage({ id: 'app.login.verification-code-warning' }));
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  // eslint-disable-next-line react/sort-comp
  step1() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;

    return (
      <div className={styles.main} style={{width: "50%", marginTop: '50px'}}>
        <Form onSubmit={this.handleSubmit}>
          
          <FormItem>
            {getFieldDecorator('mail', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.email.required' }),
              },
              {
                type: 'email',
                message: formatMessage({ id: 'validation.email.wrong-format' }),
              },
            ],
          })(
            <Input size="large" placeholder={formatMessage({ id: 'form.email.placeholder' })} />
          )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="validation.password.strength.msg" />
                  </div>
                </div>
            }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
            rules: [
              {
                validator: this.checkPassword,
              },
            ],
          })(
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({ id: 'form.password.placeholder' })}
            />
          )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.confirm-password.required' }),
            },
            {
              validator: this.checkConfirm,
            },
          ],
        })(
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
          />
        )}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{ width: '20%' }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.phone-number.required' }),
              },
              {
                pattern: /^\d{11}$/,
                message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
              },
            ],
          })(
            <Input
              size="large"
              style={{ width: '80%' }}
              placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
            />
          )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.verification-code.required' }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                />
              )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({ id: 'app.register.get-verification-code' })}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {/* <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button> */}
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
      
    );
  }

  step2() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;

    return (
      <div className={styles.main} style={{width: "70%", marginTop: '50px'}}>
        <Form>
          {/* 定义onChange={} */}
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="alipay" />支付宝</span>} key="1">
              <div className={styles.twoColLayout}>
                <Row gutter={24}>
                  <Col xl={11} lg={24} md={24} sm={24} xs={24}>
                    <p>账号密码登录：</p>
                    <FormItem>
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账号!' }],
                      })(
                        <Input
                          size='large'
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="账号"
                        />,
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                      })(
                        <Input
                          size='large'
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="密码"
                        />,
                      )}
                    </FormItem>
                    {/* <FormItem>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                      绑定
                      </Button>
                    </FormItem> */}
                  </Col>
                  <Col xl={2} style={{height:'200px'}}>
                    <Divider type='vertical' style={{height: 'inherit'}} />
                  </Col>
                  <Col xl={11} lg={24} md={24} sm={24} xs={24}>
                    <p>扫码登录：</p>
                    <div style={{width: "50%", marginLeft:'auto', marginRight:'auto'}}>
                      <QRCode value="Alipay" size={120} />
                    </div>
                  </Col>
                </Row>                
              </div>
            </TabPane>
            <TabPane tab={<span><Icon type="wechat" />微信</span>} key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab={<span><Icon type="qq" />QQ</span>} key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Form>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  step3() {
    return (
      <div className={styles.main} style={{width: "50%", marginTop: '50px'}}>
        <Result
          type="success"
          title="绑定成功"
          description="欢迎使用二级交易市场！"
          // extra={information}
          // actions={actions}
          className={styles.result}
        />
      </div>
    );
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    const { current } = this.state;

    const steps = [
      {
        title: '填写用户信息',
        content: this.step1(),
      },
      {
        title: '绑定支付平台',
        content: this.step2(),
      },
      {
        title: '完成',
        content: this.step3(),
      },
    ];
    return (
      <div className={styles.main} style={{width:'80%', background:'white', padding:'50px'}}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        <div>
          <Steps current={current} className={styles.steps}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            <div style={{width: "50%", marginLeft:'auto', marginRight:'auto'}}>
              {current < steps.length - 1 && (
                <Button type="primary" size="large" onClick={() => this.next()}>
                  下一步
                </Button>
              )}
              {current === steps.length - 1 && (
                // <Button type="primary" size="large" onClick={() => message.success('绑定成功！')}>
                <Button type="primary" size="large">
                  <Link to="/homepage">完成</Link>
                </Button>
              )}
              {current > 0 && (
                <Button size="large" style={{float:'right'}} onClick={() => this.prev()}>
                  上一步
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
