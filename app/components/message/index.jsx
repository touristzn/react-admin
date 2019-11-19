import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      param: null,
      duration: 3000, // 显示时间, 毫秒。设为 0 则不会自动关闭
      slide: true,
    }
    this.timer = null;
  }

  componentWillMount() {
    this.modifyOptions();
  }

  componentDidMount() {
    this.startTimer();
  }

  // 鼠标进入消息提示弹窗时，定时器清空，弹窗一直显示
  clearTimer = () => {
    clearTimeout(this.timer);
  }

  // 鼠标离开消息提示弹窗时，设置定时器，弹窗在duration后关闭
  startTimer = () => {
    const { duration } = this.state;
    const { close } = this.props;

    if (duration > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          slide: false
        }, () => {
          setTimeout(() => {
            close();
          }, 500);
        })
      }, duration);
    }
  }

  modifyOptions = () => {
    const { options } = this.props;
    let param;

    if (typeof options === 'string') {
      param = {
        message: options
      };
      this.setState({ param })
    } else {
      this.setState({ param: options })
    }
  }

  render() {
    const { param, slide } = this.state;

    return (
      <div
        className={`message ${slide ? 'slideInDown' : 'slideOutUp'} ${param.type ? param.type : 'info'}`}
        onMouseEnter={this.clearTimer}
        onMouseLeave={this.startTimer}
      >
        { param && param.message }
      </div>
    )
  }
}

export default Message;