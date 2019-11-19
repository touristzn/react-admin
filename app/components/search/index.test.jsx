import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Search from './index'

let wrapper

describe('<Search />', () => {
  const props = {
    placeholder: '请输入内容',
    onChange: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(
      <Search icon {...props} />
    )
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})