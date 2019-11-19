import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Tabs, Tab } from './index'

let wrapper

describe('<Tabs />', () => {
  const props = {
    activeIndex: 0,
    onTabChange: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(
      <Tabs {...props}>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </Tabs>
    )
  })

  it('should render two Tab component, first one should be active', () => {
    expect(wrapper.find(Tab)).toHaveLength(2)
    expect(wrapper.find('.tab-link')).toHaveLength(2)
    expect(wrapper.state('activeIndex')).toEqual(0)
    expect(wrapper.find('.tab-link').first().hasClass('active')).toEqual(true)
  })

  it('click the 2nd Tab should change the active stauts and trigger the right function', () => {
    wrapper.find('.tab-link').last().simulate('click', { preventDefault: () => {}})
    expect(wrapper.find('.tab-link').first().hasClass('active')).toEqual(false)
    expect(wrapper.find('.tab-link').last().hasClass('active')).toEqual(true)
    expect(wrapper.state('activeIndex')).toEqual(1)
    expect(props.onTabChange).toHaveBeenCalledWith(1)
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
