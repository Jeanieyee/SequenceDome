console.log('node_env', process.env.NODE_ENV)
const protocolStr = document.location.protocol
let domainMap = {
  development: `${protocolStr}//testapi.mondoq.cn`,
  test: `${protocolStr}//testapi.mondoq.cn`,
  beta: `${protocolStr}//api.mondoq.cn`,
  production: `${protocolStr}//api.mondoq.cn`,
  pre: `${protocolStr}//testapi.mondoq.cn`,
}
const domain = domainMap[process.env.VUE_APP_DOMAIN_ENV]
export default {
  qiniuUrl      : 'https://up.qbox.me/',
  domain        : 'https://oss.zhihanyun.com/',
  dialogPageSize: 5,
  BASE_API: `${domain}`,
  mode: process.env.VUE_APP_DOMAIN_ENV === 'production' ? 'prod' : 'test'
}

