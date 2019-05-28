/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, BackTop, Input, Select, Carousel, Card, Modal } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
// import PageLoading from '@/components/PageLoading';
import Center from '../Account/Center/Applications';

// const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
// const SalesCard = React.lazy(() => import('./SalesCard'));
// const TopSearch = React.lazy(() => import('./TopSearch'));
// const ProportionSales = React.lazy(() => import('./ProportionSales'));
// const OfflineData = React.lazy(() => import('./OfflineData'));
const {Search} = Input;
const {Option} = Select;
const QRCode = require('qrcode.react');
// const { Meta } = Card;

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    // loading: true,
    // salesType: 'all',
    // currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    key: 'tab1',
    visible: false,

  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
    setTimeout(() => {
      this.setState({
        // loading: false,
      });
    }, 2000);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.success();
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  // 支付二维码
  // eslint-disable-next-line class-methods-use-this
  success() {
    Modal.success({
      title: '认证成功',
      content: (
        <div>
          <h3>该账号已由<b>腾讯游戏天美工作室群</b>认证。</h3>
          <p>账号拥有：英雄93/93，皮肤179/252。</p>
          <p>您可以点击“<Icon type="ellipsis" />”来查看证书详情。</p>
          <p>请扫描下方二维码进行购买，或者按“ESC”退出支付。</p>
          <div>
            <p>扫码支付：</p>
            <QRCode value="pay for it" size={120} />
          </div>
        </div>
      ),
    });
  };



  render() {

    

    const tabList = [
      {
        key: 'tab1',
        tab: '游戏账号',
      },
      {
        key: 'tab2',
        tab: '证券',
      },
      {
        key: 'tab3',
        tab: '虚拟货币',
      },
      {
        key: 'tab4',
        tab: '其他',
      },
    ];

    const selectBefore = (
      <Select defaultValue="gameAccount" style={{ width: 150 }}>
        <Option value="gameAccount">游戏账号</Option>
        <Option value="security">证券</Option>
        <Option value="virtualcurrency">虚拟货币</Option>
        <Option value="others">其他</Option>
      </Select>
    );
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };
    
    const Content1 = (
      <Card
        // style={{ width: 300 }}
        cover={
          <img
            alt="example"
            // eslint-disable-next-line global-require
            src={require('../../../src/img/v8.jpg')}
            height="150px"
          />
        }
        actions={[
          <Icon type="shopping" title="购买" onClick={this.showModal} />, 
          <Icon type="star" title="收藏" />, 
          <Icon type="ellipsis" title="证书详情" />
        ]}
      >
        <div
          style={{height:"100px", textAlign: "left", padding: "10px"}}
        >
          <b>王者荣耀V8账号</b><br />
          安卓，全英雄，179皮肤，限定。<br />
          <strong><Icon type="dollar" />标价：</strong>13000￥
        </div>
      </Card>
    );

    const Content2 = (
      <Card
        // style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={require('../../../src/img/qwlr.jpg')}
            height="150px"
          />
        }
        actions={[
          <Icon type="shopping" title="购买" />, 
          <Icon type="star" title="收藏" />, 
          <Icon type="ellipsis" title="详情" />
        ]}
      >
        <div
          style={{height:"100px", textAlign: "left", padding: "10px"}}
        >
          <b>王者荣耀内测皮肤账号</b><br />
          安卓，包含蔷薇恋人、优雅恋人及另外26款皮肤。<br />
          <strong><Icon type="dollar" />标价：</strong>1000￥
        </div>
      </Card>
    );

    const Content3 = (
      <Card
        // style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={require('../../../src/img/alin.jpg')}
            height="150px"
          />
        }
        actions={[
          <Icon type="shopping" title="购买" />, 
          <Icon type="star" title="收藏" />, 
          <Icon type="ellipsis" title="详情" />
        ]}
      >
        <div
          style={{height:"100px", textAlign: "left", padding: "10px"}}
        >
          <b>王者荣耀满级账号</b><br />
          iOS，全铭文，艾琳。<br />
          <strong><Icon type="dollar" />标价：</strong>1000￥
        </div>
      </Card>
    );

    const goodslist1 = (
      <Card>
        <Card.Grid style={gridStyle}>{Content1}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content2}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content3}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content1}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content2}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content3}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content1}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content2}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content3}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content1}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content2}</Card.Grid>
        <Card.Grid style={gridStyle}>{Content3}</Card.Grid>
      </Card>
    );

        
    const contentList = {
      tab1: <p>{goodslist1}</p>,
      tab2: <p>{goodslist1}</p>,
      tab3: <p>{goodslist1}</p>
    };

    const ads = [
      <div>
        <img
          src={require('../../../src/img/ad1.jpg')}
          height="340px"
          width="100%"
        />
      </div>,
      <div>
        <img
          src={require('../../../src/img/ad2.jpg')}
          height="340px"
          width="100%"
        />
      </div>,
      <div>
        <img
          src={require('../../../src/img/ad3.png')}
          height="340px"
          width="100%"
        />
      </div>,
    ];

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    return (
      <GridContent>  
        {/* <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense> */}
        <Modal
          title="验证证书"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input size="large" placeholder="输入游戏商公钥" />
        </Modal>
        <div style={{alignItems:Center,marginTop:50, marginBottom:50, marginLeft:200, marginRight:200 }}>
          <Search
            addonBefore={selectBefore}
            placeholder="请输入搜索内容"
            enterButton
            size="large"
            // onSearch={value => console.log(value)}
          />
        </div>
        <Carousel
          autoplay
        >
          {ads}
        </Carousel>
        <div>
          <Card
            style={{ width: '100%' }}
            title="热销商品"
            extra={<a href="#">更多</a>}
            tabList={tabList}
            activeTabKey={this.state.key}
            onTabChange={key => {
              this.onTabChange(key, 'key');
            }}
          >
            {contentList[this.state.key]}
          </Card>
          <br />
        </div>
        <BackTop />
      </GridContent>
    );
  }
}

export default Analysis;
