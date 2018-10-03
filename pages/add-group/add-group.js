// pages/add-group/add-group.js

const network = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: null,
    temperature: null,
    temperatureArray: null,
    temperatureIndex: null,
    tags: [],
    saving: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSysConfig();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 获取系统配置
   */
  getSysConfig: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.systemConf,
      success: res => {
        const data = res.data;
        const temperatureArray = data.temperature.map(item => item.name);
        _self.setData({
          temperature: data.temperature,
          temperatureArray: temperatureArray
        })
      }
    })
  },

  /**
   * 完成事件
   */
  save: function(e) {
    const _self = this;
    this.setData({
      saving: true
    })
    // 获取页面信息
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    wx.showLoading({
      title: '保存搭配',
    })
    network.request({
      url: network.urlConfig.wear,
      method: 'POST',
      data: e.detail,
      success: function(data) {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功!',
          duration: 2000
        })
        // 设置前页刷新
        prevPage.setData({
          reload: true
        })
        setTimeout(() => {
          // wx.navigateBack()
          wx.redirectTo({
            url: `/pages/group-detail/group-detail?id=${data.data.id}`,
          })
        }, 2000)
      },
      fail: function(err) {
        wx.showToast({
          title: err,
          icon: 'none'
        })
        _self.setData({
          saving: false
        })
      }
    })
  }
})