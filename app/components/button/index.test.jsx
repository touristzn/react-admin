import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Button from './index'

let wrapper

describe('<Button />', () => {
  const props = {
    label: 'edit',
    // type和size都可自定义值，style.less中加入样式即可
    // 目前type有: primary / secondary / disabled
    type: 'secondary',
    onClick: jest.fn(),
    // 不传为默认大小
    size: 'small'
  }

  beforeEach(() => {
    wrapper = shallow(
      <Button {...props} />
    )
  })

  it('renders the text of the label', () => {
    expect(wrapper.find('button').text()).toBe(props.label)
  })

  it('property type and size are rendered correctly', () => {
    expect(wrapper.hasClass('btn-secondary')).toEqual(true)
    expect(wrapper.hasClass('btn-small')).toEqual(true)
  })

  it('click the Button should trigger the function', () => {
    wrapper.simulate('click')
    expect(props.onClick).toHaveBeenCalled()
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})