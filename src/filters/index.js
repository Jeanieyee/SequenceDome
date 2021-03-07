import moment from 'dayjs'
/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}
export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function enumsMap(code, objArr) {
  let str = ''
  if (code === undefined || code === null || !objArr) {
    // str = ''
  } else {
    const match = objArr.filter(item => {
      return item.value === code
    })[0]
    str = match ? match.label : ''
  }
  return str
}
export function Moment(date, format) {
  return date ? moment(date).format(format) : ''
}
export function price(value) {
  return ((value || 0)/100).toFixed(2)
}
export function secretPhone(value) {
  const out = value.substr(0, 3) + '****' + value.substr(7)
  return out
}
export function monthToAge(value) {
  let out = ''
  if (value) {
    out = Math.floor(value / 12) + '岁' + (value % 12) + '月'
  } else {
    out = value
  }
  return out
}
export function fixone(value) {
  let out = value
  out = (Math.floor(out / 10) / 10).toFixed(1)
  return out
}
