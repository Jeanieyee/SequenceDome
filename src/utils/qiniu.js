import 'qiniu-js'
import store from '@/store'
const protocolStr = document.location.protocol

let baseApi = process.env.BASE_API + '.vip.ececloud.cn/puzzle/api'
if (protocolStr === 'https:') {
  baseApi = baseApi.replace('http:', 'https:')
}

export function qiniu(btnId, containerId, filters, handleSuccess, handleAdd, handleProgress) {
  var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4', // 上传模式,依次退化
    browse_button: btnId, // 上传选择的点选按钮，**必需**
    // uptoken_url: process.env.BASE_API + '/qiniu/uptoken/simple', // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
    uptoken_url: baseApi + '/organize/qiniu/uptoken/simple',            // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）

    // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
    // uptoken: store.getters.uploadToken,
    // 若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
    unique_names: true,
    // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
    // save_key: true,
    // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
    domain: 'https://oss.zhihanyun.com/', // bucket 域名，下载资源时用到，**必需**
    // bucket 域名，下载资源时用到，**必需**
    container: containerId, // 上传区域DOM ID，默认是browser_button的父元素，
    max_file_size: '100000mb', // 最大文件体积限制
    flash_swf_url: '/static/plupload/Moxie.swf', // 引入flash,相对路径
    filters: filters,
    max_retries: 3, // 上传失败最大重试次数
    dragdrop: true, // 开启可拖曳上传
    chunk_size: '4mb', // 分块上传时，每片的体积
    auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
    init: {
      'FilesAdded': function(up, files) {
        plupload.each(files, function(file) {
          // 文件添加进队列后，处理相关的事情
          handleAdd(file)
        })
      },
      'BeforeUpload': function(up, file) {
        // 每个文件上传前,处理相关的事情
      },
      'UploadProgress': function(up, file) {
        if (handleProgress) {
          handleProgress(file)
        }
        // 显示进度
      },
      'FileUploaded': function(up, file, info) {
        var domain = up.getOption('domain')
        var res = JSON.parse(info.response)
        var sourceLink = domain + res.key // 获取上传成功后的文件的Url
        handleSuccess(sourceLink, file)
      },
      'Error': function(up, err, errTip) {
        // 上传出错时,处理相关的事情
      },
      'UploadComplete': function() {
        // 队列文件处理完毕后,处理相关的事情
      }
    }
  })
}

export function editorUploadInit() {
  var editor = this
  var btnId = editor.customUploadBtnId
  var containerId = editor.customUploadContainerId
  const filters = [
      { title: '图片文件', extensions: 'jpg,gif,png,bmp,jpeg' }
  ]
    // 创建上传对象
  qiniu(btnId, containerId, filters, (sourceLink) => {
    editor.command(null, 'insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
  })
}
