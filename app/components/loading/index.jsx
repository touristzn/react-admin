import React from 'react'

import './style.less'

const Loading = () => {
  return (
    <div className="loading">
      <img src={require('@/static/images/loading-page.svg')} alt="" />
    </div>
  )
}

export default Loading;