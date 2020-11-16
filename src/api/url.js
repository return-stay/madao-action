

let baseUrl = '', baseUrl2 = '', baseUrlApi = '', madaoBaseUrl = '';
if (process.env.NODE_ENV === "development") {
  baseUrl = ''  //本地代理求地址
  baseUrl2 = 'http://39.97.231.232:8805'
  baseUrlApi = 'http://120.27.62.181:8808'
  madaoBaseUrl = 'https://shop.madao100.com/api' //码道接口
} else {
  baseUrl = 'https://kszx.council.com.cn' //线上请求地址
  baseUrl2 = 'https://api.sczxpm.com/api'
  baseUrlApi = 'https://www.gzwmall.com/api'
  madaoBaseUrl = 'https://shop.madao100.com/api'
}


const getAuctionInfo = `${baseUrl}/auction/getPaipinById`,
  guessLike = 'https=//api.sczxpm.com/api/index/queryAnalogous',
  getRotation = `${baseUrl2}/megaEvents/getRotation`,
  getModule = `${baseUrl2}/megaEvents/getModule`,
  getCategory = `${baseUrl2}/megaEvents/getCategory`,
  getTodayAuction = `${baseUrl2}/megaEvents/getAuction`,
  getPageMessage = `${baseUrl2}/megaEvents/getPageMessage`,
  getAuctionCatalogue = `${baseUrl2}/megaEvents/getAuctionCatalogue`,
  ticketActivityIndex = `${baseUrl2}/ticketActivity/ticketActivityIndex`,
  receiveTicket = `${baseUrl2}/ticketActivity/receiveTicket`,
  attendShareActivity = `${baseUrl2}/ticketActivity/attendShareActivity`,
  inviteNow = `${baseUrl2}/ticketActivity/inviteNow`,
  queryRecAuction = `${baseUrl2}/index/queryRecAuction`,
  shareBillImage = `${baseUrl2}/ticketActivity/shareBillImage`,
  getSubjectTicket = `${baseUrl2}/ticketActivity/getSubjectTicket`,
  receiveSubjectTicket = `${baseUrl2}/ticketActivity/receiveSubjectTicket`,

  ActivityDetail = baseUrlApi + '/activity/v1/detail', //获取活动详情
  ActivityJoin = baseUrlApi + '/activity/v1/join', //参加活动
  ActivityInvitationRank = baseUrlApi + '/activity/v1/invitationRank', //邀请排行榜
  ActivityInvitationForMe = baseUrlApi + '/activity/v1/invitationForMe', //用户邀请记录
  ActivityShare = baseUrlApi +'/activity/v1/share', // 分享

  ActivityJoinActAndCoupon = baseUrlApi + '/activity/v1/joinActAndCoupon',
  ActivityCheckJoinAct = baseUrlApi + '/activity/v1/checkJoinAct',

  PrizeQueryCode = madaoBaseUrl + '/prize/v1/queryCode', //查询兑换码
  PrizeExchangeCode = madaoBaseUrl + '/prize/v1/exchangeCode', //兑换码 提交订单
  AddressDetail = madaoBaseUrl + '/address/v1/detail', //获取地址详情
  AddressList = madaoBaseUrl + '/address/v1/list', //获取地址列表
  TradePay = madaoBaseUrl + '/trade/v1/pay' //支付接口

export { 
  getAuctionInfo,
  guessLike,
  getRotation,
  getModule,
  getCategory,
  getTodayAuction,
  getPageMessage,
  getAuctionCatalogue,
  ticketActivityIndex,
  receiveTicket,
  attendShareActivity,
  inviteNow,
  queryRecAuction,
  shareBillImage,
  getSubjectTicket,
  receiveSubjectTicket,

  ActivityDetail,
  ActivityJoin,
  ActivityInvitationRank,
  ActivityInvitationForMe,
  ActivityShare,
  ActivityJoinActAndCoupon,
  ActivityCheckJoinAct,
  madaoBaseUrl,
  PrizeQueryCode,
  PrizeExchangeCode,
  AddressDetail,
  AddressList,
  TradePay,
}