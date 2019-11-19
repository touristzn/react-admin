import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DiaLog from './index'

let wrapper

describe('<DiaLog />', () => {
  const state = {
    // 适用场景：根据请求数据有值或无值，设置按钮能否点击
    isDisabled: false,
  }

  const props = {
    title: 'dialog',
    onClose: jest.fn(),
    buttons: [
      {
        text: 'cancel',
        onClick: jest.fn()
      },
      {
        text: 'save',
        type: state.isDisabled ? 'primary' : 'disabled',
        onClick: jest.fn()
      },
    ],
  }

  beforeEach(() => {
    wrapper = shallow(
      <DiaLog {...props}>内容...</DiaLog>
    )
  })

  it('render header', () => {
    expect(wrapper.find('h1').text()).toBe(props.title)
    wrapper.find('header button').simulate('click')
    expect(props.onClose).toHaveBeenCalled()
  })

  it('render the footer buttons', () => {
    expect(wrapper.find('footer Button')).toHaveLength(2)
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})