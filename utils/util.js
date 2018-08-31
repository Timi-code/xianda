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
  n = n.toString()
  return n[1] ? n : '0' + n
}

const urlConfig = {
  wear: '/wear',
  clothing: '/clothing',
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
    url: 'http://101.200.56.63/api' + url,
    data: {
      ...data
    },
    header: { ...header,
      'Authorization': token
    },
    method: method,
    dataType: dataType,
    responseType: responseType,
    success: success,
    fail: fail,
    complete: complete
  });
}

module.exports = {
  formatTime: formatTime,
  request: request
}