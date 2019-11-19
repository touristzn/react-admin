import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Table, TableColumn } from './index'

// 使用方法
//-----------------------------
// 自适应效果
// 在Tabel上加width="100%"
// 不传宽则宽度等于所有列宽度的和
//-----------------------------
// 横向滚动条效果
// Tabel上如果不传width，子组件TableColumn则需要传固定width
// 如果想要某列自适应宽度，可以不传宽，或为空

let wrapper

describe('<Table />', () => {
  const props = {
    data: [
      {
        "id": 1,
        "title": "去云南旅游1",
        "price": 200,
        "date": "2018-08-01",
      },
      {
        "id": 2,
        "title": "去云南旅游2",
        "price": 300,
        "date": "2018-08-01",
      },
    ],
    width: '100%',
    className: 'custom',
  };

  beforeEach(() => {
    wrapper = shallow(
      <Table {...props}>
        <TableColumn prop="title" label="内容" />
        <TableColumn prop="price" width="100" label="日期" />
        <TableColumn
        label="创建时间"
        width="150"
        render={(data) => {
          return <span>{ data.date }</span>
        }}
        />
        <TableColumn>
          <span>修改</span>
          <span>查看</span>
        </TableColumn>
      </Table>
    )
  })

  it('should render the index', () => {
    const state = {
      page: 1,
      pageSize: 20,
    }

    const indexMethod = (index) => {
      const { page, pageSize } = state
      return index + (page - 1) * pageSize + 1;
    }

    const tree = shallow(
      <Table {...props}>
        <TableColumn index={indexMethod} width="30" label='序号' />
      </Table>
    )

    expect(tree.find('tbody td').at(1).text()).toBe('2')
  })

  it('should contain a custom class', () => {
    expect(wrapper.hasClass('custom')).toBeTruthy()
  })

  it('should render the correct items', () => {
    expect(wrapper.find('thead th')).toHaveLength(4)
    expect(wrapper.find('tbody tr')).toHaveLength(props.data.length)
    expect(wrapper.find('thead th').at(0).text()).toBe('内容')
    expect(Number(wrapper.find('tbody td').at(1).text())).toBe(props.data[0].price)
  })

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})