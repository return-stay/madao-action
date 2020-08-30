import moment from "moment";
import http from '@/api/ajax'
// 获取服务器时间
var now;
(()=> {
  let url = 'http://39.97.231.232:8805/common/queryCurrentTime'
  http.fetchGet(url, {}).then(res => {
    now = res.data
  })

})();
// 计算倒计时时间
const countdown = (start, end) => {
  now = now + 1000;
  let time;
  if (now > end) {
    return {
      label: "已结束",
      time: moment(end, "x").format("MM-DD HH:mm"),
    }
  } else if (now >= start) {
    const duration = moment.duration(end - now, 'milliseconds')
    const day =`${duration.days()}`;
    const hour =
        duration.hours() < 10 ? `0${duration.hours()}` : duration.hours();
    const minutes =
      duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
    const seconds =
      duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();
    // countdownTime = `距结拍 ${duration.days()}天${hour}时${minutes}分${seconds}秒`;
    // time = `${day} ${hour} : ${minutes} : ${seconds}`;
    // time = `${day} ${hour} : ${minutes} : ${seconds}`;
    time = {
      D: day,
      H: hour,
      M: minutes,
      S: seconds
    }
    return {
      label: "距结拍还有：",
      time
    }
  } else {
    const duration = moment.duration(start - now, 'milliseconds')
    const day =`${duration.days()}`;
    const hour =
        duration.hours() < 10 ? `0${duration.hours()}` : duration.hours();
    const minutes =
      duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
    const seconds =
      duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();
      // time = `${day} ${hour}:${minutes}:${seconds}`;
      time = {
        D: day,
        H: hour,
        M: minutes,
        S: seconds
      }
    return {
      label: "距开拍还有：",
      time
    }
  }
};
export {
  countdown
}
