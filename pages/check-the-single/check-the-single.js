// pages/check-the-single/check-the-single.js

const network = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: null,
    more: '/assets/images/more.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id,
      wearid: options.wearid,
      src: options.src,
      tags: options.tags.split(',')
    })
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

  more: function() {
    const _self = this;
    wx.showActionSheet({
      itemList: ['从搭配中移除', '取消'],
      success: function(e) {
        if (e.tapIndex === 0) {
          wx.showModal({
            title: '确定移除？',
            content: '移除后，此单品将不在搭配中显示',
            confirmText: '移除',
            success: function(res) {
              if (res.confirm) {
                _self.deleteSingle();
              }
            },
            fail: function() {},
            complete: function() {}
          })
        }
      },
      fail: function(e) {},
      complete: function(e) {}
    })
  },

  deleteSingle: function() {
    const _self = this;
    network.request({
      url: `/clothing-wear/${_self.data.id}/${_self.data.wearid}`,
      method: 'DELETE',
      success: function(res) {
        if (res.code === 200) {
          wx.showToast({
            title: '操作成功!',
          })
        }
      },
      fail: function(err) {
        wx.showToast({
          title: '操作失败!',
        })
      }
    })
  }
})