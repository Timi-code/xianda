// pages/single-detail/single-detail.js

const network = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    src: null,
    tags: null,
    moreImg: '/assets/images/more-circle.png',
    notes: null,
    scrollTop: null, // 判断设置title的高度
    reload: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getDetail(options.id);
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
    const _self = this;
    const query = wx.createSelectorQuery().in(this);
    query.select('.single-info').boundingClientRect(function(res) {
      _self.setData({
        scrollTop: res.height
      })
    }).exec();

    if (this.data.reload) {
      _self.setData({
        notes: null,
        reload: false
      })
      this.getDetail(this.data.id);
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
   * 页面滚动监听事件
   */
  onPageScroll: function(e) {
    if (e.scrollTop >= this.data.scrollTop) {
      wx.setNavigationBarTitle({
        title: '加入的搭配',
      });
    }
  },

  /**
   * 获取详情
   */
  getDetail: function(id) {
    const _self = this;
    network.request({
      url: network.urlConfig.clothing + '/' + id,
      success: function(res) {
        _self.setData({
          src: res.data.images,
          tags: res.data.tags,
          notes: res.data.wear.data
        })
      }
    })
  },

  /**
   * 点击出现更多选项
   */
  actionSheet: function(e) {
    const _self = this;
    wx.showActionSheet({
      itemList: ['加入搭配', '编辑', '取消'],
      success: function(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: `/pages/single-group-add/single-group-add?id=${_self.data.id}`,
          })
        } else if (res.tapIndex === 1) {
          wx.navigateTo({
            url: `/pages/edit-single/edit-single?id=${_self.data.id}`,
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 预览图片
   */
  previewImg: function(e) {
    wx.previewImage({
      current: this.data.src, // 当前显示图片的http链接
      urls: [this.data.src] // 需要预览的图片http链接列表
    })
  }
})