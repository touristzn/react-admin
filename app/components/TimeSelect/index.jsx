import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import DatePicker from 'rc-calendar/lib/Picker'
import withI18n from '@/components/withI18n'
import 'rc-calendar/assets/index.css'

import zhCN from 'rc-calendar/lib/locale/zh_CN'
import enUS from 'rc-calendar/lib/locale/en_US'

import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'

import './style.less'

class Picker extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      hoverValue: [],
    }
  }

  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  }

  render() {
    const { showValue, onChange, disabledDate, value, placeholder } = this.props
    const format = 'YYYY-MM-DD'
    const cn = window.language.indexOf('cn') !== -1
    const now = moment()

    if (cn) {
      now.locale('zh-cn').utcOffset(8)
    } else {
      now.locale('en-gb').utcOffset(0)
    }

    const calendar = (
      <RangeCalendar
        hoverValue={this.state.hoverValue}
        onHoverChange={this.onHoverChange}
        type={this.props.type}
        locale={cn ? zhCN : enUS}
        defaultValue={now}
        format={format}
        onChange={onChange}
        disabledDate={disabledDate}
      />
    )
    return (
      <DatePicker
        open={this.props.open}
        onOpenChange={this.props.onOpenChange}
        calendar={calendar}
        value={value}
      >
        {
          (item) => {
            return (
              <span>
                <input
                  placeholder={placeholder}
                  readOnly
                  value={showValue && showValue.format(format) || ''}
                />
                </span>
            )
          }
        }
      </DatePicker>
    )
  }
}

class TimeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      startValue: null,
      endValue: null,
      startOpen: false,
      endOpen: false,
    }
  }

  onStartOpenChange = (startOpen) => {
    this.setState({
      startOpen,
    })
  }

  onEndOpenChange = (endOpen) => {
    this.setState({
      endOpen,
    })
  }

  onStartChange = (value) => {
    this.setState({
      startValue: value[0],
      startOpen: false,
      endOpen: true,
    })
  }

  onEndChange = (value) => {
    this.setState({
      endValue: value[1],
    })
  }

  disabledStartDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return endValue.diff(startValue, 'days') < 0;
  }

  render() {
    const { __ } = this.props
    const { startValue, endValue, startOpen, endOpen } = this.state
    return (
      <div className="time-select">
        <Picker
          onOpenChange={this.onStartOpenChange}
          type="start"
          placeholder={__('开始时间')}
          showValue={startValue}
          open={startOpen}
          value={[startValue, endValue]}
          onChange={this.onStartChange}
        />

        <span className="connect">{__('至')}</span>

        <Picker
          onOpenChange={this.onEndOpenChange}
          open={endOpen}
          type="end"
          placeholder={__('结束时间')}
          showValue={endValue}
          disabledDate={this.disabledStartDate}
          value={[startValue, endValue]}
          onChange={this.onEndChange}
        />
      </div>
    )
  }
}

export default withI18n(TimeSelect)