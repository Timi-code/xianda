// pages/group-single-add/group-single-add.js

const network = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    notes: null,
    selected: [],
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getLists();
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
   * 获取单品列表
   */
  getLists: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.clothing,
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
   * 选中触发的事件
   */
  choiced: function(e) {
    this.setData({
      selected: e.detail
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

  submit: function() {
    const _self = this;

    // 获取页面信息
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    network.request({
      url: `/clothing-wear/${_self.data.id}`,
      method: 'POST',
      data: {
        wear_ids: _self.data.selected
      },
      success: function(res) {
        wx.showToast({
          title: '添加成功',
        });
        // 设置前页刷新
        prevPage.setData({
          reload: true
        })
        setTimeout(() => {
          wx.navigateBack();
        }, 1500)
      },
      fail: function(res) {
        console.log(res);
      }
    })
  }
})