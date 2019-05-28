/* eslint-disable global-require */
import React, { Component, Suspense } from 'react';
// import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Tooltip,
  Upload,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
// import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import Yuan from '@/utils/Yuan';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import styles from './Transaction.less';

const FormItem = Form.Item;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { TextArea } = Input;


@connect(({ list, loading }) => ({
  list,
  // loading: loading.models.list,
  loading: loading.effects['list/fetch'],
}))
@Form.create()
class MyTransaction extends Component {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };
  
  render() {
    const {
      list: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '挂售', onOk: this.handleSubmit, onCancel: this.handleCancel };

    // const Info = ({ title, value, bordered }) => (
    //   <div className={styles.headerInfo}>
    //     <span>{title}</span>
    //     <p>{value}</p>
    //     {bordered && <em />}
    //   </div>
    // );

    // const extraContent = (
    //   <div className={styles.extraContent}>
    //     <RadioGroup defaultValue="all">
    //       <RadioButton value="all">全部</RadioButton>
    //       <RadioButton value="progress">进行中</RadioButton>
    //       <RadioButton value="waiting">等待中</RadioButton>
    //     </RadioGroup>
    //     <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    //   </div>
    // );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 29,
    };

    const ListContent1 = ({ data: { tx, createdAt } }) => (
      // console.log(tx.from)
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>From</span>          
          <p>{tx.from}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>To</span>
          <p>{tx.to}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>交易类型</span>
          <p>{tx.type}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>交易金额</span>
          <p>{tx.amount}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>成交时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );

    const ListContent2 = ({ data: { title } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>商品名称</span>
          <p>游戏账号</p>
        </div>
        <div className={styles.listContentItem}>
          <span>简介</span>
          <p>游戏账号，blablabla</p>
        </div>
        <div className={styles.listContentItem}>
          <span>标价</span>
          <p>{title}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>交易类型</span>
          <p>待售</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div> */}
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">详情</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const Cards = ([
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title='买入'
          action={
            <Tooltip
              title='在本平台的花费'
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={() => <Yuan>116</Yuan>}
          footer={
            <Field
              label='日买入'
              value={`￥${numeral(49).format('0,0')}`}
            />
          }
          contentHeight={46}
        >
          <Trend flag="stable" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}> </span>
          </Trend>
          <Trend flag="down">
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>
      ,
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title='卖出'
          action={
            <Tooltip
              title='在本平台的收入'
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={() => <Yuan>45</Yuan>}
          footer={
            <Field
              label='日出售'
              value={`￥${numeral(15).format('0,0')}`}
            />
          }
          contentHeight={46}
        >
          <Trend flag="stable" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}> </span>
          </Trend>
          <Trend flag="up">
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>12%</span>
          </Trend>
        </ChartCard>
      </Col>,
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title='净利润'
          action={
            <Tooltip
              title='收入-支出'
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={() => <Yuan>-71</Yuan>}
          footer={
            <Field
              label='日收入'
              value={`￥${numeral(-34).format('0,0')}`}
            />
          }
          contentHeight={46}
        >
          <Trend flag="stable" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}> </span>
          </Trend>
          <Trend flag="up">
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>56%</span>
          </Trend>
        </ChartCard>
      </Col>,
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title='交易数'
          action={
            <Tooltip
              title='在本平台成交的交易数'
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total='29'
          footer={
            <Field
              label='日交易量'
              value={`${numeral(15).format('0,0')}`}
            />
          }
          contentHeight={46}
        >
          <Trend flag="stable" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}> </span>
          </Trend>
          <Trend flag="up">
            <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>6%</span>
          </Trend>
        </ChartCard>
      </Col>,
    ]);

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button onClick={this.handleDone}>
                退出
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="商品名称" {...this.formLayout}>
            {/* {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)} */}
            <Input placeholder="请输入商品名称" />
          </FormItem>
          <FormItem label="标价" {...this.formLayout}>
            {/* {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )} */}
            <Input placeholder="请输入价格" />
          </FormItem>
          <FormItem label="封面" {...this.formLayout}>
            {/* {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择任务负责人' }],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )} */}
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {uploadButton}
            </Upload>
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };


    return (
      <PageHeaderWrapper>
        <GridContent>
          <div>
            <Row gutter={24}>
              {Cards}
            </Row>
          </div>
          {/* <div className={styles.twoColLayout}> */}
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <div className={styles.standardList}>
                  <Card
                    className={styles.listCard}
                    bordered={false}
                    title="已成交"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                  // extra={extraContent}
                  >
                    <List
                      size="small"
                      rowKey="id"
                      loading={loading}
                      pagination={paginationProps}
                      dataSource={list}
                      renderItem={item => (
                        <List.Item
                          actions={[
                            <a
                              onClick={e => {
                                e.preventDefault();
                                this.showEditModal(item);
                              }}
                            >
                              查看详情
                            </a>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={require('../../../src/img/T.jpg')} shape="square" size="small" />}
                            title={<a href={item.href}>{item.txid}</a>}
                            description={item.subDescriptionT}
                          />
                          <ListContent1 style={{ textAlign: 'center' }} data={item} />
                        </List.Item>
                      )}
                    />
                  </Card>
                </div>
              </Suspense>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <div className={styles.standardList}>
                  <Card
                    className={styles.listCard}
                    bordered={false}
                    title="未成交"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                  // extra={extraContent}
                  >
                    <Button
                      type="dashed"
                      style={{ width: '100%', marginBottom: 8 }}
                      icon="plus"
                      onClick={this.showModal}
                      ref={component => {
                        /* eslint-disable */
                        this.addBtn = findDOMNode(component);
                        /* eslint-enable */
                      }}
                    >
                      添加
                    </Button>
                    <List
                      size="small"
                      rowKey="id"
                      loading={loading}
                      pagination={paginationProps}
                      dataSource={list}
                      renderItem={item => (
                        <List.Item
                          actions={[
                            <a
                              onClick={e => {
                                e.preventDefault();
                                this.showEditModal(item);
                              }}
                            >
                              编辑
                            </a>,
                            <MoreBtn current={item} />,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={require('../../../src/img/T.jpg')} shape="square" size="small" />}
                            title={<a href={item.href}>{item.txid2}</a>}
                            description={item.subDescriptionT}
                          />
                          <ListContent2 style={{ textAlign: 'center' }} data={item} />
                        </List.Item>
                      )}
                    />
                  </Card>
                </div>
              </Suspense>
            </Col>
          </Row>
          {/* </div> */}
        </GridContent>
        
        <div className={styles.standardList}>
          {/* <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card> */}

         
        </div>
        <Modal
          title={done ? null : `${current.id ? '编辑' : '挂售'}商品`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default MyTransaction;
