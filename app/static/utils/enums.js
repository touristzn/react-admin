import { __ } from '@/static/utils/i18n';

// 全局枚举数据

export default {
  // feed类型
  feedType: [
    ['ALL', __('所有')],
    ['DEFAULT', __('普通')],
    ['COMMERCIAL', __('商业需求')],
  ],

  // feed展示状态
  feedShowState: [
    ['ALL', __('所有')],
    ['USER', __('会员删除')],
    ['ADMIN', __('后台删除')],
    ['NONE', __('已发布')],
  ],

  // feed商业需求状态 Business Requirement State
  feedBRState: [
    ['ALL', __('所有')],
    ['DEMAND', __('需求中')],
    ['SOLVED', __('已解决')],
    ['HELPED', __('已处理')],
    ['CANCELED', __('已取消')],
  ],

  // feed商业需要类型
  feedBusinessCategory: [
    ['Design', 'Design'],
    ['Marketing', 'Marketing'],
    ['Tech', 'Tech'],
    ['Consulting', 'Consulting'],
    ['Education', 'Education'],
    ['Vendor', 'Vendor'],
    ['Intern', 'Intern'],
    ['Sales', 'Sales'],
    ['Startup', 'Startup'],
    ['Assistant', 'Assistant'],
    ['F&B', 'F&B'],
    ['BD', 'BD'],
    ['Research', 'Research'],
    ['Management', 'Management'],
    ['Performing', 'Performing'],
    ['Venue', 'Venue'],
    ['All', 'All'],
    ['Fashion', 'Fashion'],
    ['Others', 'Others'],
  ],

  // 会员类型

  memberStatus: [['active', 'Activate'], ['inactive', 'Deactivate']],
  orderProcess: [
    ['RUNNING', __('正在进行')],
    ['WAITING_FOR_PAY', __('等待支付')],
    ['COMPLETE', __('订单完成')],
    ['REFUNDED', __('已退款')],
    ['WAITING_FOR_COMPANY_PAY', __('公司代支付')],
    ['COMPANY_PAY_COMPLETE', __('公司支付完成')],
  ],
};
