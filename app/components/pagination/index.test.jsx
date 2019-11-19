import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Pagination from './index'

let wrapper

describe('<Pagination />', () => {
  const props = {
    className: 'mt-20',
    currentChange: jest.fn(),
    currentPage: 1,
    pageSize: 20,
    total: 140,
  }

  beforeEach(() => {
    wrapper = mount(
      <Pagination {...props} />
    )
  })

  it('the custom class', () => {
    expect(wrapper.props().className).toContain(props.className)
  })

  it('click the page number should change the active stauts and trigger the function', () => {
    wrapper.find('.page li').at(3).simulate('click')
    // 元素索引是从0开始，所以要加1
    wrapper.setProps({ currentPage: 4 })
    expect(wrapper.find('.page li').at(3).props().className).toBe('active')
    expect(props.currentChange).toHaveBeenCalledWith(4)
  })

  it('up and down bottons', () => {
    wrapper.setProps({ currentPage: 1 })
    expect(wrapper.find('.btn-prev').props().className).toContain('disabled')
    // 总页数: props.total / props.pageSize
    wrapper.setProps({ currentPage: 7 })
    expect(wrapper.find('.btn-next').props().className).toContain('disabled')
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})