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
    page: 1,
    keywords: '',
    reload: false,
    loading: false
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
    this.getLists('restart');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
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
   * 获取搭配列表
   */
  getLists: function(type) {
    const _self = this;
    this.setData({
      loading: true
    })
    network.request({
      url: network.urlConfig.wear,
      data: {
        page: _self.data.page,
        page_size: 20,
        keywords: _self.data.keywords
      },
      success: function(res) {
        // 如果type === restart 说明是下拉加载=》即需要停止
        if (type && type === 'restart') {
          wx.stopPullDownRefresh();
          _self.setData({
            notes: null
          })
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

  /**
   * 搜索
   */
  search: function(e) {
    wx.navigateTo({
      url: '/pages/search/search?source=index',
    })
  },
  addGroup: function(e) {
    wx.navigateTo({
      url: '/pages/add-group/add-group',
    })
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