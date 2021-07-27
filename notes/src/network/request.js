import axios from 'axios'

axios.defaults.withCredentials = true //允许跨域
//Content-Type响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export function request(config) {
  const install = axios.create({
    // baseURL:'http://115.159.209.160:8080/note',
    // baseURL:'http://120.77.206.88:80/notes',
      baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return install(config);
}
