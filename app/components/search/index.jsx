import React from 'react'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MdClose from 'react-ionicons/lib/MdClose'

import './style.less'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState({ value })
    this.props.onChange(value)
  }

  cancelInput = () => {
    this.setState({ value: '' })
  }

  render() {
    const { type, placeholder, onChange, icon } = this.props
    const { value } = this.state

    return (
      <div className="input">
        <input
          className={icon ? 'hasIcon' : ''}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
        />
  
        {
          value !== '' &&
          <MdClose onClick={this.cancelInput} fontSize="12px" />
        }
      </div>
    )
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default Search