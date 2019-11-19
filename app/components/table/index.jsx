import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.less'

export const Table = (props) => {
  const { children, data, width, className} = props;
  let totalW = 0;

  if(children.length !== undefined) {
    children.forEach((val, i) => {
      if (val.props.width) {
        totalW += Number(val.props.width);
      }
    });
  } else {
    totalW = '100%'; 
  }

  return (
    <div className={`table-list ${className || ''}`}>
        <table width={width || totalW} cellPadding="0" cellSpacing="0" border="0">
          <colgroup>
            {React.Children.map(children, (child, index) => {
              // 获取表格的宽度
              const w = child.props.width;
              return (
                <col width={w}/>
              )
            })}
          </colgroup>
          <thead>
            <tr>
              {React.Children.map(children, (child, index) => {
                const label = child.props.label;
                return (
                  <th className={child.props.fixed && 'fixed'}>
                    { label }
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  {React.Children.map(children, (child, j) => {
                    // 获取子元素的prop属性
                    const prop = child.props.prop
                    const render = child.props.render
                    const index = child.props.index

                    if (index) {
                      const sn = index(i)
                      return (
                        <td>{ sn }</td>
                      )
                    }

                    return (
                      <td className={child.props.fixed && 'fixed'}>
                        { prop
                          ? item[prop]
                          : render
                            ? render(item)
                            : child }
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
}

export const TableColumn = ({ children }) => {
  return children
}

TableColumn.propTypes = {
  prop: PropTypes.string,
  width: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  render: PropTypes.func,
}
