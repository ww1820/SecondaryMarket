/* eslint-disable global-require */
import React, { PureComponent, Suspense } from 'react';
// import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  // Radio,
  Input,
  // Progress,
  Button,
  // Icon,
  // Dropdown,
  // Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './BasicList.less';

const FormItem = Form.Item;
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { TextArea } = Input;
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class BasicList extends PureComponent {
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

    // const editAndDelete = (key, currentItem) => {
    //   if (key === 'edit') this.showEditModal(currentItem);
    //   else if (key === 'delete') {
    //     Modal.confirm({
    //       title: '删除任务',
    //       content: '确定删除该任务吗？',
    //       okText: '确认',
    //       cancelText: '取消',
    //       onOk: () => this.deleteItem(currentItem.id),
    //     });
    //   }
    // };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

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
      total: 67,
    };

    const ListContent1 = ({ data: { Peer, txcnt, } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>节点</span>
          <p>{Peer}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>交易数量</span>
          <p>{txcnt}</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>xxx</p>
        </div> */}
        {/* <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div> */}
      </div>
    );

    const ListContent2 = ({ data: { from, to } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>From</span>
          <p>{from}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>To</span>
          <p>{to}</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>xxx</p>
        </div> */}
        {/* <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div> */}
      </div>
    );

    // const MoreBtn = props => (
    //   <Dropdown
    //     overlay={
    //       <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
    //         <Menu.Item key="edit">收藏</Menu.Item>
    //         {/* <Menu.Item key="delete">删除</Menu.Item> */}
    //       </Menu>
    //     }
    //   >
    //     <a>
    //       更多 <Icon type="down" />
    //     </a>
    //   </Dropdown>
    // );

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
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择任务负责人' }],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
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
          <div className={styles.twoColLayout}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <div className={styles.standardList}>
                    <Card
                      className={styles.listCard}
                      bordered={false}
                      title="区块"
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
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={require('../../../src/img/B.jpg')} shape="square" size="small" />}
                              title={<a href={item.href}>{item.blocknum}</a>}
                              description={item.subDescriptionB}
                            />
                            <ListContent1 style={{ textAlign: 'center' }} data={item} />
                          </List.Item>
                          )}
                      />
                    </Card>
                  </div>
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <div className={styles.standardList}>
                    <Card
                      className={styles.listCard}
                      bordered={false}
                      title="交易"
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
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={require('../../../src/img/T.jpg')} shape="square" size="small" />}
                              title={<a href={item.href}>{item.txid}</a>}
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
          </div>
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
          title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
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

export default BasicList;
