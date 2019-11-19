import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router-dom';
import withI18n from '@/components/withI18n'
import { formatTime } from '@/static/utils/site'
import Pagination from '@/components/pagination'
import { Table, TableColumn } from '@/components/table'
import Button from '@/components/button'
import FeedsEdit from './edit'
import { getList } from '@/fetch/feeds'
import Loading from '@/components/loading'
import TimeSelect from '@/components/TimeSelect'
import Search from '@/components/search'
import { Form, FormItem } from '@/components/form'

class Feeds extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      loading: false,
      visible: false,
      page: 1,
      pageSize: 20,
      total: 0,
      feedsData: null,

      // search
      form: {
        userMessage: '',
        keywords: '',
      },
    }
  }

  componentDidMount = () => {
    this.searchList()
  }

  componentWillUnmount = () => {
    // 避免异步请求在已卸载的组件中调用 setState()
    this.setState = (state, callback) => {}
    this.getList.abort()
  }

  searchList() {
    this.setState({ page: 1 })
    this.updateList()
  }

  async updateList() {
    const { page, pageSize } = this.state
    const params = {
      page,
      size: pageSize,
    }
    
    this.setState({ loading: true })
    this.getList = getList(params)
    const request = await this.getList

    if (request && request.code === 0) {
      const feedsData = request.data;
      if (feedsData) {
        this.setState({
          loading: false,
          total: feedsData.count,
          feedsData: feedsData.list,
        })
      }
    }
    
    this.setState({ loading: false })
  }

  // 初始化搜索
  getInitData = () => {
    return {
      keywords: '',
      userMessage: '',
      feedType: 'ALL',
      cityId: null,
      hubId: null,
      startTime: '',
      endTime: '',
      reported: null,
      feedDeletedBy: 'ALL',
      feedStatus: 'ALL',
      businessCategory: null,
    };
  }

  /* ================form============== */
  searchVal = (value) => {
    const { form } = this.state
    form.userMessage = value
    this.setState(form)
  }

  /* ================弹窗============== */
  show = (val) => {
    this.setState({ visible: val });
  }

  /* ================分页============== */
  handleCurrentChange = (val) => {
    this.setState({
      page: val
    }, () => {
      this.updateList();
    })
  }

  render() {
    const { __ } = this.props;
    const { visible, page, pageSize, total, feedsData, loading, form } = this.state;

    return (
      <div className="page page-feeds">
        { loading && <Loading/> }

        { !loading && 
          <React.Fragment>
            <div className="page_header">
              <h2>{ __('动态管理') }</h2>
            </div>

            <div className="page-feeds_content">
              {
                feedsData &&
                <React.Fragment>
                  <div className="form">
                    <Form className="inline" labelWidth="100px">
                      <FormItem label={__('商业需求状态')}>
                        <TimeSelect />
                      </FormItem>

                      <FormItem label={__('商业需求类型')}>
                        <Search
                          icon
                          placeholder={__('昵称') + ' / ' + __('手机')}
                          onChange={this.searchVal}
                        />
                      </FormItem>

                      <FormItem>
                        <button>1214</button>
                      </FormItem>
                    </Form>
                  </div>
                  
                  <Table data={feedsData}>
                    <TableColumn prop="likeCount" width="60" label={__('点赞')} />
                    <TableColumn
                      label={__('评论')}
                      width="60"
                      render={(data) => {
                        return (
                          <Link to={`/comments/${data.feedId}`}>
                            { data.commentCount }
                          </Link>
                        )
                      }}
                    />
                    <TableColumn
                      label={__('创建时间')}
                      width="150"
                      render={(data) => {
                        return formatTime(data.createTime)
                      }}
                    />
                    <TableColumn
                      label={__('动态内容')}
                      width="200"
                      render={(data) => {
                        return <Link to='/feeds'>{data.contentDetails}</Link>
                      }}
                    />
                    <TableColumn prop="feedType" label={__('动态类型')} width="120" />
                    <TableColumn prop="nickName" label={__('昵称')} width="180" />
                    <TableColumn prop="mobile" label={__('手机')} width="150" />
                    <TableColumn prop="mobile" label={__('手机')} width="150" />
                    <TableColumn prop="mobile" label={__('手机')} width="150" />
                    <TableColumn prop="mobile" label={__('手机')} width="150" />
                    <TableColumn width="250" fixed>
                      <Button
                        label={__('修改')}
                        size="small"
                        onClick={() => {this.show(true)}}
                      />
                      <Button
                        label={__('显示')}
                        type="secondary"
                        size="small"
                        onClick={() => {}}
                      />
                      <Button
                        label={__('日志')}
                        type="primary"
                        onClick={() => {}}
                      />
                    </TableColumn>
                  </Table>

                  <Pagination
                    className="mt-20"
                    currentChange={this.handleCurrentChange}
                    currentPage={page}
                    pageSize={pageSize}
                    total={total}
                  />
                </React.Fragment>
              }
            </div>

            {
              visible && <FeedsEdit visible={this.show} />
            }
          </React.Fragment>
        }
      </div>
    )
  }
}

export default withI18n(Feeds);