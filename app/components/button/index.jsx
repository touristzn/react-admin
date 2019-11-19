import React from 'react'
import PropTypes from 'prop-types'

import './style.less'

const Button = (props) => {
  const { label, type, size, onClick} = props;
  return (
    <button
      type="button"
      className={`btn ${type ? `btn-${type}` : 'btn-default'}${size ? ` btn-${size}` : ''}`}
      onClick={onClick}
      disabled={type === 'disabled'}
    >
      { label }
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
}

export default Button;