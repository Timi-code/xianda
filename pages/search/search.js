// pages/search/search.js

const network = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: null,
    activeTabIndex: 0,
    page: 1,
    loading: false,
    data: null,
    keywords: null,
    noneResult: false,
    dirty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      source: options['source']
    })

    if (this.data.source === 'single') {
      this.setData({
        activeTabIndex: 1
      })
    }
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
    this.setData({
      page: ++this.data.page,
      loading: true
    })
    if (this.data.activeTabIndex === 0) {
      this.searchGroup();
    } else if (this.data.activeTabIndex === 1) {
      this.searchSingle();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 切换tab
   */
  changeTab: function(e) {
    this.setData({
      activeTabIndex: parseInt(e.currentTarget.dataset.index),
      data: null,
      page: 1,
      loading: true
    })

    if (this.data.activeTabIndex === 0) {
      this.searchGroup();
    } else if (this.data.activeTabIndex === 1) {
      this.searchSingle();
    }
  },

  /**
   * 搜索
   */
  confirm: function(e) {
    this.setData({
      keywords: e.detail.value,
      dirty: true,
      page: 1,
      loading: true
    })
    if (this.data.activeTabIndex === 0) {
      this.searchGroup();
    } else if (this.data.activeTabIndex === 1) {
      this.searchSingle();
    }
  },

  /**
   * 搜索搭配
   */
  searchGroup: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.wear,
      data: {
        page: _self.data.page,
        page_size: 20,
        keywords: this.data.keywords
      },
      success: function(res) {
        if (res.code === 200 && res.meta.pagination.count) {
          _self.setData({
            data: res.data,
            noneResult: false,
            loading: false
          })
        } else if (!res.meta.pagination.total) {
          _self.setData({
            data: null,
            noneResult: true,
            loading: false
          })
        }

        _self.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 搜索单品
   */
  searchSingle: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.clothing,
      data: {
        page: _self.data.page,
        page_size: 20,
        keywords: this.data.keywords
      },
      success: function(res) {
        if (res.code === 200 && res.meta.pagination.count) {
          _self.setData({
            data: res.data,
            noneResult: false,
            loading: false
          })
        } else if (!res.meta.pagination.total) {
          _self.setData({
            data: null,
            noneResult: true,
            loading: false
          })
        }

        _self.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 点击去往详情页面
   */
  toDetail: function(e) {
    if (this.data.activeTabIndex === 0) {
      wx.navigateTo({
        url: `/pages/group-detail/group-detail?id=${e.detail}`,
      })
    } else if (this.data.activeTabIndex === 1) {
      wx.navigateTo({
        url: `/pages/single-detail/single-detail?id=${e.detail}`,
      })
    }
  },

  /**
   * 取消搜索
   */
  cancel: function(e) {
    wx.navigateBack();
  }
})