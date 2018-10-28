// pages/group-detail/group-detail.js

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
    clothing: [],
    reload: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getDetail();
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
        src: null,
        tags: null,
        clothing: [],
        reload: false
      })
      this.getDetail();
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
   * 获取详情
   */
  getDetail: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.wear + '/' + _self.data.id,
      success: function(res) {
        const data = res.data;
        _self.setData({
          src: data.images,
          tags: data.tags,
          clothing: data.clothing.data
        })
      }
    })
  },

  /**
   * 添加单品
   */
  actionSheet: function(e) {
    const _self = this;
    wx.showActionSheet({
      itemList: ['添入单品', '编辑', '取消'],
      success: function(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: `/pages/group-single-add/group-single-add?id=${_self.data.id}`,
          })
        } else if (res.tapIndex === 1) {
          wx.navigateTo({
            url: `/pages/edit-group/edit-group?id=${_self.data.id}`,
          })
        }
      },
      fail: function() {}
    })
  },

  /**
   * 查看照片
   */
  checkTheSingle: function(e) {
    const _self = this;
    wx.navigateTo({
      url: `/pages/check-the-single/check-the-single?id=${e.currentTarget.dataset.id}&wearid=${_self.data.id}&src=${e.currentTarget.dataset.src}&tags=${e.currentTarget.dataset.tags}`
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