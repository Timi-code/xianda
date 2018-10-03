// pages/index/index.js

var leftImgs = [],
  rightImgs = [];

const network = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftHeight: 0,
    rightHeight: 0,
    notes: null,
    leftImgs: [],
    rightImgs: [],
    keywords: '',
    reload: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 获取token过期时间
    const exprieDate = wx.getStorageSync('exprieDate');
    if (!exprieDate || exprieDate <= Date.now()) {
      network.getToken(() => {
        this.getLists();
      });
    } else {
      this.getLists();
    }

    setTimeout(() => {
      // this.setData({
      //   notes: []
      // })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.reload) {
      this.setData({
        reload: false,
        notes: null
      })
      this.getLists();
    }
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
    wx.startPullDownRefresh(() => {
      console.log('success');
    })
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
   * 获取搭配列表
   */
  getLists: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.wear,
      data: {
        page: 0,
        page_size: 20,
        keywords: _self.data.keywords
      },
      success: function(res) {
        _self.setData({
          notes: res.data
        })
      }
    })
  },

  /**
   * 搜索
   */
  search: function(e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  addGroup: function(e) {
    wx.navigateTo({
      url: '/pages/add-group/add-group',
    })
  },

  /**
   * 下拉
   */
  onPullDownRefresh: function() {
    console.log('下拉');
  },

  /**
   * 搭配详情页
   */
  toDetail: function(e) {
    wx.navigateTo({
      url: `/pages/group-detail/group-detail?id=${e.detail}`,
    })
  }
})