import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Icon, List } from 'antd';

class BindingView extends Component {
  getData = () => [
    {
      title: '支付宝',
      description: '当前账户已绑定支付宝账户',
      actions: [
        <a>
          已绑定
        </a>,
      ],
      avatar: <Icon type="alipay" className="alipay" />,
    },
    {
      title: '微信',
      description: '当前用户未绑定微信账户',
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="wechat" className="taobao" style={{color: 'forestgreen'}} />,
    },
    {
      title: 'QQ',
      description: '当前用户未绑定QQ账户',
      actions: [
        <a>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="qq" className="alipay" style={{color: 'rgb(10, 150, 206)'}} />,
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;
