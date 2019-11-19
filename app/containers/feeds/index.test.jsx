import React from 'react'
import { shallow, mount } from 'enzyme'
import withI18n from '@/components/withI18n'
import Pagination from '@/components/pagination'
import { Table, TableColumn } from '@/components/table'
import Button from '@/components/button'
import Loading from '@/components/loading'
import Feeds from '@/containers/feeds/index'
import FeedsEdit from '@/containers/feeds/edit'
import { getList } from '@/fetch/feeds'

// mock feeds page resquest
jest.mock('@/fetch/feeds', () => ({
  getList: () => {
    const feedsList = require('tests/response/feeds')
    return feedsList
  },
}))

describe('test Feeds container component', () => {
  const props = {
    loading: false,
    visible: false,
    page: 1,
    pageSize: 20,
    total: 0,
    feedsData: null
  }

  const wrapper = shallow(<Feeds {...props} />).dive()

  it('first render, without any data, return <Loading/>', () => {
    wrapper.setState({ loading: true })
    expect(wrapper.find(Loading)).toHaveLength(1)
  })

  it('get feeds list, render page', async () => {
    const res = await getList()

    wrapper.setState({
      loading: false,
      feedsData: res.feedsList.list,
      total: res.feedsList.count
    })

    // expect(wrapper.find(Table)).toHaveLength(1)
    // expect(wrapper.find(TableColumn)).toHaveLength(11)
    // expect(wrapper.find(TableColumn).find(Button)).toHaveLength(3)
    // expect(wrapper.find(Pagination)).toHaveLength(1)
  })
})