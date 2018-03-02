let env = process.env.NODE_ENV;
const baseUrl = {
  'development': 'https://devops-support-incu.daimler.com.cn:7999/api',
  'production': 'https://www.car2go-china.cn/api'
}
export default {
  baseUrl: baseUrl[env],
}
