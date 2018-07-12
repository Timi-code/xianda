// pages/group-detail/group-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
    tags: ['3行文字这就是一个很长', '3行文字这就是一个很长', '3行文字这就是一个很长', '3行文字这就是一个很长', '1232135', '123120000', '1123123', '1232135', '123120000'],
    moreImg: '/assets/images/more-circle.png',
    notes: [{
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        tags: ['1', '标签2', '标签3']
      },
      {
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        tags: ['2', '标签2', '标签3']
      },
      {
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        tags: ['3', '标签2', '标签3']
      }, {

        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        tags: ['4', '标签2', '标签3']
      },
      {
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        tags: ['5', '标签2', '标签3']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  actionSheet: function(e) {
    wx.showActionSheet({
      itemList: ['加入单品', '编辑'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  }
})