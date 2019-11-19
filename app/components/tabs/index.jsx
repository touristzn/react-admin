import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.less'

export class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      activeIndex: props.activeIndex
    }
  }

  tabChange = (event, index) => {
    event.preventDefault()
    this.setState({
      activeIndex: index
    })
    this.props.onTabChange(index)
  }

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;

    return (
      <ul className="nav-tabs">
        {React.Children.map(children, (child, index) => {
          const activeClassName = (activeIndex === index) ? 'tab-link active' : 'tab-link';
          return (
            <li className="tabs-item">
              <a
                onClick={(event) => {this.tabChange(event, index)}}
                className={activeClassName}
              >
                {child}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

export const Tab = ({ children }) => 
<React.Fragment>{children}</React.Fragment>