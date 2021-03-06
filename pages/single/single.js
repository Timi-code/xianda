// pages/single/single.js

const network = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    notes: null,
    onPull: false,
    page: 1,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    if (this.data.reload) {
      this.setData({
        notes: null,
        page: 1
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
    this.setData({
      onPull: true
    })
    this.getLists();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      loading: true,
      page: ++this.data.page
    })
    this.getLists();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 搜索
   */
  search: function(e) {
    wx.navigateTo({
      url: '/pages/search/search?source=single',
    })
  },

  /**
   * 获取列表
   */
  getLists: function(e) {
    const _self = this;
    const data = this.data.active ? {
      category_id: this.data.active
    } : {};
    network.request({
      url: '/clothing',
      data: { ...data,
        page: _self.data.page
      },
      success: function(res) {
        if (_self.data.onPull) {
          _self.setData({
            onPull: false,
            notes: null
          })
          wx.stopPullDownRefresh();
        }

        if (res.code === 200 && res.meta.pagination.count) {
          _self.setData({
            notes: res.data
          })
        }

        const currentpage = res.meta.pagination.current_page;
        const totalpage = res.meta.pagination.total_pages;

        _self.setData({
          loading: false,
          page: _self.data.page >= totalpage ? totalpage : currentpage
        })
      }
    })
  },

  changeTab: function(e) {
    this.setData({
      active: parseInt(e.currentTarget.dataset.index),
      notes: null
    })
    this.getLists();
  },

  /**
   * 点击去往详情页面
   */
  toDetail: function(e) {
    wx.navigateTo({
      url: `/pages/single-detail/single-detail?id=${e.detail}`,
    })
  },

  addSingle: function(e) {
    wx.navigateTo({
      url: '/pages/add-single/add-single',
    })
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     console.log(res);
    //     var tempFilePaths = res.tempFilePaths
    //     wx.navigateTo({
    //       url: `/pages/editor-img/editor-img?path=${tempFilePaths}`,
    //     })
    //   }
    // })
  }
})