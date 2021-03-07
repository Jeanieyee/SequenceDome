/**
 * Created by jiachenpan on 16/11/18.
 */

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/*手机号码*/
export function isvalidatePhone(str) {
  const reg = /^1[0-9]{10}$/
  return reg.test(str)
}

/*手机与电话号码*/
export function isvalidatePhoneOrTel(str) {
  const reg = /^([0-9]+)([-]*)([0-9]+)$/
  return reg.test(str)
}
/*邮箱*/
export function isvalidateEmail(str) {
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return reg.test(str)
}
/*正整数*/
export function isvalidateNumber (value) {
  const reg = /^[1-9]\d*$/
  return reg.test(value)
}
/*价格*/
export function isvalidatePrice (value) {
  const reg =/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
  return reg.test(value)
}
/*非负浮点数*/
export function isvalidateFloatNumber (value) {
  const reg = /^\d+(\.\d+)?$/
  return reg.test(value)
}
/*银行卡校验*/
export function isValidateBankNumber(value) {
  const reg = /^([1-9]{1})(\d{15}|\d{18})$/
  return reg.test(value)
}
/*数字字符串*/
export function isValidateNumberStr (value) {
  const reg = /^[0-9]*$/
  return reg.test(value)
}
