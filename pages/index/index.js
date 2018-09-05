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
    note: [{
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
    ],
    leftImgs: [],
    rightImgs: [],
    keywords: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    leftImgs.push(this.data.note.shift());
    this.setData({
      leftImgs: leftImgs
    })

    if (wx.getStorageSync('token')) {
      this.getLists();
    } else {
      network.login();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
   * 获取搭配列表
   */
  getLists: function() {
    const _self = this;
    network.request({
      url: '/wear',
      data: {
        page: 0,
        page_size: 20,
        keywords: _self.data.keywords
      },
      success: function(res) {
        console.log(res);
      }
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

  /**
   * 图片加载成功
   */
  loadImg: function(e) {
    this.calcHeight();
    if (this.data.note.length <= 0) {
      return;
    }
    if (this.data.leftHeight <= this.data.rightHeight) {
      leftImgs.push(this.data.note.shift());
      this.setData({
        leftImgs: leftImgs
      })
    } else {
      rightImgs.push(this.data.note.shift());
      this.setData({
        rightImgs: rightImgs
      })
    }
  },

  /**
   * 计算高度
   */
  calcHeight: function() {
    const _self = this;
    const query = wx.createSelectorQuery();
    query.select('.left').boundingClientRect(function(res) {
      _self.setData({
        leftHeight: res.height
      })
    }).exec();
    query.select('.right').boundingClientRect(function(res) {
      _self.setData({
        rightHeight: res.height
      })
    }).exec();
  },

  /**
   * 下拉
   */
  onPullDownRefresh: function() {
    console.log('下拉');
  },

  /**
   * 搭配详情页
   */
  toDetail: function(e) {
    wx.navigateTo({
      url: '/pages/group-detail/group-detail',
    })
  }
})