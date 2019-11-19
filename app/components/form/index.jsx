import React from 'react'
import PropTypes from 'prop-types'

import './style.less'

export const Form = (props) => {
  const { className, labelWidth, children } = props
  return (
    <div className={`form ${className}`}>
      { 
        React.Children.map(children, child => {
          const { label, children } = child.props
          return (
            <div className="form-item">
              {
                label &&
                <label className="form-item__label" style={{width: `${labelWidth}`}}>
                  { label }
                </label>
              }
              <div className="form-item__content">
                { children }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

Form.propTypes = {
  className: PropTypes.string,
  labelWidth: PropTypes.string,
}

export const FormItem = (children) => (
  <React.Fragment>{ children }</React.Fragment>
)

