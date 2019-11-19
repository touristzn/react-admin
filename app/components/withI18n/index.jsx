import React from 'react'
import { __ } from '@/static/utils/i18n'

const withI18n = (Component) => {
  // 使用：__(key)或__(context.key)
  const ___ = (key, vars = {}) => {
    return __(key, vars) || key
  };

  return (props) => (
    <Component {...props} __={___} />
  )
}

export default withI18n;
