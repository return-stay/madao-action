let baseUrlApi = '', madaoBaseUrl = '';
if (process.env.NODE_ENV === "development") {
  baseUrlApi = 'http://39.97.231.232:9809'
  madaoBaseUrl = 'https://shop.madao100.com/api' //码道接口
} else {
  baseUrlApi = 'https://shop.madao100.com/api'
  madaoBaseUrl = 'https://shop.madao100.com/api'
}

const ActivityDetail = baseUrlApi + '/activity/v1/detail', //获取活动详情
  ActivityJoin = baseUrlApi + '/activity/v1/join', //参加活动
  ActivityInvitationRank = baseUrlApi + '/activity/v1/invitationRank', //邀请排行榜
  ActivityInvitationForMe = baseUrlApi + '/activity/v1/invitationForMe', //用户邀请记录
  ActivityShare = baseUrlApi +'/activity/v1/share', // 分享

  ActivityJoinActAndCoupon = baseUrlApi + '/activity/v1/joinActAndCoupon',
  ActivityCheckJoinAct = baseUrlApi + '/activity/v1/checkJoinAct',

  PrizeQueryCode = baseUrlApi + '/prize/v1/queryCode', //查询兑换码
  PrizeExchangeCode = baseUrlApi + '/prize/v1/exchangeCode', //兑换码 提交订单
  AddressDetail = baseUrlApi + '/address/v1/detail', //获取地址详情
  AddressList = baseUrlApi + '/address/v1/list', //获取地址列表
  TradePay = baseUrlApi + '/trade/v1/pay', //支付接口
  
  demo = madaoBaseUrl + '/demo'; //测试

export {
  ActivityDetail,
  ActivityJoin,
  ActivityInvitationRank,
  ActivityInvitationForMe,
  ActivityShare,
  ActivityJoinActAndCoupon,
  ActivityCheckJoinAct,
  PrizeQueryCode,
  PrizeExchangeCode,
  AddressDetail,
  AddressList,
  TradePay,

  demo,
}