import moment from "moment";
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " + [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
const getStatusAndTime = (start, end) => {
  var now = new Date().valueOf()
  now = now + 1000;
  let countdownTime
  if (now > end) {
    return {
      countdownLabel: '已结束',
      countdownTime: moment(end, 'x').format('YYYY/MM/DD HH:mm')
    }
  } else if (now >= start) {
    const duration = moment.duration(end - now, 'milliseconds')
    if (duration.days() >= 1) {
      countdownTime = `距结拍 >${duration.days()}天`
    } else {
      // const hour =
      //   duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
      const hour = duration.hours() < 1 ? `` : `${duration.hours()}时`
      const minutes =
        duration.minutes() < 10 ? `0${duration.minutes()}分` : `${duration.minutes()}分`
      // const seconds =
      //   duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
      countdownTime = `距结拍 ${hour}${minutes}`
    }
    return {
      countdownLabel: '竞拍中',
      countdownTime
    }
  } else {
    const duration = moment.duration(start - now, 'milliseconds')
    if (duration.days() >= 1) {
      countdownTime = `距开拍 >${duration.days()}天`
    } else {
      // const hour =
      //   duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
      const hour = duration.hours() < 1 ? `` : `${duration.hours()}时`
      const minutes =
        duration.minutes() < 10 ? `0${duration.minutes()}分` : `${duration.minutes()}分`
      // const seconds =
      //   duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
      countdownTime = `距开拍 ${hour}${minutes}`
    }
    return {
      countdownLabel: '预展中',
      countdownTime
    }
  }
};

/* 计算数据拉取倒计时使用级别
* 0 为数据不进行倒计时拉取
* 1 为数据进行秒级倒计时拉取
* 2 为数据进行分级倒计时拉取
* 3 为数据进行时级倒计时拉取
* 4 为数据进行天级倒计时拉取
*/
const getLevel = (start, end) => {
  const now = new Date().valueOf();
  let level;
  if (now > end) {
    level = 0;
    return {
      level
    }
  } else if (now >= start) {
    const duration = moment.duration(end - now, 'milliseconds')
    if (duration.days() >= 1) {
      level = 4;
    } else {
      // 大于一小时，小时级倒计时，显示多少小时
      if(duration.hours() >= 1){
        level = 3;
      } else {
        // 小于一小时，分钟级倒计时，显示多少分钟
        if(duration.minutes() >= 1){
          // 大于一分钟，分钟级倒计时，显示多少分钟
          level = 2;
        } else {
          level = 1;
        }
      }
    }
    return {
      level,
    }
  } else {
    const duration = moment.duration(start - now, 'milliseconds')
    if (duration.days() >= 1) {
      level = 4;
    } else {
      // 大于一小时，小时级倒计时，显示多少小时
      if(duration.hours() >= 1){
        level = 3;
      }else{
        // 小于一小时，分钟级倒计时，显示多少分钟
        if(duration.minutes() >= 1){
          // 大于一分钟，分钟级倒计时，显示多少分钟
          level = 2;
        } else {
          level = 1;
        }
      }
    }
    return {
      level,
    }
  }
};
const getEndTimeDiff = end => {
  const now = new Date().valueOf();
  if (now < end) {
    return {
      countdownLabel: "竞拍中",
      countdownTime: moment
        .utc(moment(end, "x").diff(moment(now, "x")))
        .format("HH:mm:ss")
    };
  } else if (now > end) {
    return {
      countdownLabel: "已结束",
      countdownTime: moment(end, "x").format("MM/DD HH:mm")
    };
  }
};

const getCookie = (name) =>{
  return sessionStorage.getItem(name)
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
const formatDate = (value, fmt)=> {
  if (!value) return
  var regPos = /^\d+(\.\d+)?$/;
  if (regPos.test(value)) {
    //如果是数字
    let getDate = new Date(value);
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+|D+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    };
    if (/(y+|Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt;
  } else {
    value = value.trim();
    return value.substr(0, fmt.length);
  }
}


const mobileType = (callback) => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
      wx.miniProgram.getEnv((res)=>{
        if (res.miniprogram) {        //在小程序
          callback&& callback('wx')                  
        } else {                   //在公众号
        }
      })
  }else{     //都不在
    if (isAndroid) {
      callback&& callback('android')     
    } else if (isiOS) {
      callback&& callback('ios')     
    }
  }
}

export {
  mobileType,
  getCookie,
  formatTime,
  getStatusAndTime,
  getEndTimeDiff,
  formatDate,
  getLevel
};
