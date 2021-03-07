/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 17:26:43
 * @LastEditTime: 2019-09-11 17:26:43
 * @LastEditors: your name
 */
/* eslint-disable no-empty */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 深拷贝 【这种方法能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象，即那些能够被 json 直接表示的数据结构】
 * @param object
 */
import Moment from 'dayjs'
export function deepClone(object) {
  return JSON.parse(JSON.stringify(object))
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
export function downloadFile(url, filename) {
  /**
   * 获取 blob
   * @param  {String} url 目标文件地址
   * @return {Promise}
   */
  function getBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        }
      }
      xhr.send()
    })
  }

  /**
   * 保存
   * @param  {Blob} blob
   * @param  {String} filename 想要保存的文件名称
   */
  function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      const link = document.createElement('a')
      const body = document.querySelector('body')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      // fix Firefox
      link.style.display = 'none'
      body.appendChild(link)
      link.click()
      body.removeChild(link)

      window.URL.revokeObjectURL(link.href)
    }
  }

  getBlob(url).then(blob => {
    saveAs(blob, filename)
  })
}

/**
 * 生成唯随机字符串
 * @param length
 */
export function randomString(length) {
  const len = length || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = chars.length
  let randomStr = ''
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return randomStr
}
// 赋值
export function setVal(post, data) {
  for (const i in post) {
    for (const a in data) {
      if (i === a) {
        post[i] = data[a]
      }
    }
  }
}
export function parsePrice(price) {
  return parseInt((Math.floor(price * 100) / 100) * 100)
}
export function moment(data, format) {
  return Moment(data).format(format)
}
export default {
  setVal,
  parsePrice,
  deepClone,
  moment,
  downloadFile
}
