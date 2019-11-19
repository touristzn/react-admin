import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import withI18n from '@/components/withI18n'
import DiaLog from '@/components/dialog'
import Button from '@/components/button'

class FeedsEdit extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isDisabled: false,
    }
  }

  onIsShow = (val) => {
    this.props.visible(val);
  }

  onSave = () => {
    console.log('save')
    this.onIsShow(false);
  }

  render () {
    const { __ } = this.props;
    const { isDisabled } = this.state;

    return (
      <DiaLog
        title="对话框"
        onClose={() => {this.onIsShow(false)}}
        buttons={
          [
            {
              text: __('取消'),
              onClick: () => {this.onIsShow(false)},
            },
            {
              text: __('保存'),
              type: isDisabled ? 'primary' : 'disabled',
              onClick: this.onSave,
            }
          ]
        }
      >
        <span onClick={() => {this.setState({ isDisabled: true })}}>sdfsdf</span>
      </DiaLog>
    )
  }
}

export default withI18n(FeedsEdit);