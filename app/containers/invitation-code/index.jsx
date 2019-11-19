import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router-dom';
import withI18n from '@/components/withI18n';
import Pagination from '@/components/pagination';
import { Table, TableColumn } from '@/components/table';
import Loading from '@/components/loading';
import { getInvitationCode } from '@/fetch/invitation-code';

class Feeds extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      loading: false,
      page: 1,
      pageSize: 20,
      total: 0,
      invitationCodeData: null,
    }

    this.getList = null;
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    this.searchList()
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {}
  }

  searchList() {
    this.setState({ page: 1 })
    this.updateList()
  }

  updateList() {
    const { page, pageSize } = this.state

    const params = {
      companyName: '',
      page,
      size: pageSize,
    }

    this.getList = getInvitationCode(params);

    this.getList.then((res) => {
      const data = res.data;

      this.setState({
        invitationCodeData: data.rows,
      })
    });
  }

  indexMethod = (index) => {
    const { page, pageSize } = this.state
    return index + (page - 1) * pageSize + 1;
  }

  render() {
    const { __ } = this.props;
    const { loading, invitationCodeData } = this.state;
    console.log('render')
    console.log(invitationCodeData, '===invitationCodeData===');
    return(
      <div className="page page-company">
      { loading && <Loading/> }

      { !loading && 
        <React.Fragment>
          <div className="page_header">
            <h2>{ __('公司管理') }</h2>
          </div>

          <div className="page-company_content">
          { invitationCodeData &&
            <React.Fragment>
              <input type="search" name="" id=""/>
              <Table data={invitationCodeData}>
                <TableColumn
                  index={this.indexMethod}
                  label={__('序号')}
                  width="20"
                />
                <TableColumn
                  label={__('公司')}
                  width="60"
                  render={(data) => {
                    return (
                      <span>{ data.companyFullName }</span>
                    )
                  }}
                />
                <TableColumn
                  label={__('公司简称')}
                  width="60"
                  render={(data) => {
                    return (
                      <span>{ data.companyShortName }</span>
                    )
                  }}
                />
                <TableColumn
                  label={__('邀请码')}
                  width="60"
                  render={(data) => {
                    return (
                      <span>{ data.invitationCode }</span>
                    )
                  }}
                />
                <TableColumn
                  label={__('类型')}
                  width="60"
                  render={(data) => {
                    return (
                      <span>{ data.type }</span>
                    )
                  }}
                />
                <TableColumn
                  label={__('状态')}
                  width="60"
                  render={(data) => {
                    return (
                      <span>{ data.status }</span>
                    )
                  }}
                />
                <TableColumn
                  label={__('操作')}
                  width="60"
                  render={(data) => {
                    return (
                      <button className="btn btn-default" type="button">{__('修改')}</button>
                    )
                  }}
                />
              </Table>
            </React.Fragment>
          }
          </div>
        </React.Fragment>
      }
      </div>
    )
  }
}

export default withI18n(Feeds);