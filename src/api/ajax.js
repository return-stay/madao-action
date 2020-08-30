import axios from 'axios'

// set axios global configs
axios.defaults.timeout = 5000 * 6
axios.defaults.headers.post['Content-Type'] =
  'application/x-www=form-urlencoded'

// request interceptor
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    Promise.reject(err)
  }
)

// response interceptors
axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
    Promise.reject(err)
  }
)

export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('Get Promise error..', error)
          reject(error)
        })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('Post Promise error..', error)
          reject(error)
        })
    })
  }
}
