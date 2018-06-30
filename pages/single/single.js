// pages/single/single.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    notes: [{
      url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
      tags: ['1', '标签2', '标签3', '标签4标签4标签4标签4标签4标签4', 'a']
    },
    {
      url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
      tags: ['2', '标签2', '标签3']
    },
    {
      url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
      tags: ['3', '标签2', '标签3']
    }, {

      url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
      tags: ['4', '标签2', '标签3']
    },
    {
      url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
      tags: ['5', '标签2', '标签3']
    },
    {
      url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
      tags: ['6', '标签2', '标签3']
    },
    {
      url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
      tags: ['7', '标签2', '标签3']
    }, {

      url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
      tags: ['8', '标签2', '标签3']
    },
    {
      url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
      tags: ['9', '标签2', '标签3']
    }, {

      url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
      tags: ['10', '标签2', '标签3']
    },
    {
      url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
      tags: ['11', '标签2', '标签3']
    }, {

      url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
      tags: ['12', '标签2', '标签3']
    },
    {
      url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
      tags: ['13', '标签2', '标签3']
    }, {

      url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
      tags: ['14', '标签2', '标签3']
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

  /**
   * 搜索
   */
  search: function(e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  changeTab: function(e) {
    this.setData({
      active: parseInt(e.currentTarget.dataset.index)
    })
  }
})