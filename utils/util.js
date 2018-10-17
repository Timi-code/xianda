const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
}

const urlConfig = {
  host: 'https://xianda.yii2.tv/api', // 域名
  domain: 'http://image.yii2.tv', // 图片域名
  token: '/auth/wechat/access-token', // 获取token
  register: '/auth/wechat/register', // 注册
  systemConf: '/system/config', // 系统配置
  wear: '/wear', // 搭配
  clothing: '/clothing', // 单品
  uploadImg: '/file/token/images', // 获取上传图片token
}

function request(params) {
  const token = wx.getStorageSync('token');
  const {
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    success,
    fail,
    complete
  } = params;
  return wx.request({
    url: urlConfig.host + url,
    data: {
      ...data
    },
    header: { ...header,
      'Authorization': token
    },
    method: method,
    dataType: dataType,
    responseType: responseType,
    success: res => {
      if (res.data.code === 200) {
        success(res.data);
      } else {
        fail(res.data.message);
      }
    },
    fail: fail,
    complete: complete
  });
}

function register(cb) {
  wx.login({
    success: function(res) {
      wx.request({
        url: urlConfig.host + urlConfig.register,
        method: 'POST',
        data: {
          code: res.code,
          mobile: '15086883148',
          avatar: null,
          nickname: null
        },
        success: function(res) {
          console.log(res);
          cb();
        }
      })
    }
  })
}

/**
 * 登录
 */
function getToken(cb) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        url: urlConfig.host + urlConfig.token,
        data: {
          code: res.code
        },
        success: function(result) {
          if (result.data.code === 200) {
            wx.setStorageSync('token', 'Bearer ' + result.data.data.token);
            wx.setStorageSync('exprieDate', new Date(result.data.data.expire_at).getTime() - 60 * 60);
            if (cb) {
              cb();
            }
          }
        }
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  request: request,
  urlConfig: urlConfig,
  register: register,
  getToken: getToken
}