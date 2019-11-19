import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@/components/button'

import './style.less'

const DiaLog = (props) => {
  const { children, title, buttons } = props;
  
  return (
    <div className="popup-box">
      <div className="dialog-win">
        <header>
          { title && (<h1>{ title }</h1>) }
          <button onClick={props.onClose}>Close</button>
        </header>

        <div className="dialog-win_content">
          { children }
        </div>

        <footer>
          {
            buttons && buttons.length > 0 && 
              buttons.map((item, index) => {
                return (
                  <Button
                    key={index}
                    label={item.text}
                    type={item.type && item.type}
                    onClick={item.onClick}
                  />
                )
              })
          }
        </footer>
      </div>
    </div>
  )
}

DiaLog.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  buttons: PropTypes.array,
}

export default DiaLog;