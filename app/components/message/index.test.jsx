import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Message from './index'

/**
 * 引用path：@/static/utils/message.js
 */

let wrapper

describe('<Message />', () => {
  const props = {
    // options可以传对象，也可以直接传字符串
    options: {
      // success、info、warning、danger
      type: 'success', 
      message: '提示内容'
    }
  }

  beforeEach(() => {
    wrapper = shallow(
      <Message {...props} />
    )
  })

  it('renders the text and contain the class', () => {
    expect(wrapper.text()).toBe(props.options.message)
    expect(wrapper.hasClass('success')).toEqual(true)
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})