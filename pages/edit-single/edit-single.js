// pages/edit-single/edit-single.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '/assets/images/single.png',
    arrow: '/assets/images/arrow-right.png',
    temperatureArray: ['25°↑', '15° ~ 20°', '4° ~ 10°', '0° ~ 8°', ' ~ 12°↓'],
    temperatureIndex: null,
    classArray: ['上身装', '下身装', '连身装', '鞋', '包、袋'],
    classIndex: null,
    step: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.src) {
      this.setData({
        src: options.src ? options.src : '',
        step: options.step ? options.step : -1
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 改变图片
   */
  changeImg: function(e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        var tempFilePaths = res.tempFilePaths
        wx.navigateTo({
          url: `/pages/editor-img/editor-img?path=${tempFilePaths}`,
        })
      }
    })
  },

  /**
   * 单品品类
   */
  bindClassChange: function(e) {
    this.setData({
      classIndex: e.detail.value
    })
  },

  /**
   * 适宜温度
   */
  bindPickerChange: function(e) {
    this.setData({
      temperatureIndex: e.detail.value
    })
  },

  complete: function(e) {
    console.log(e);
  }

})