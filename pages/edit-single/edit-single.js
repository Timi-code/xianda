// pages/edit-single/edit-single.js

const network = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    src: null,
    classes: null,
    classArray: null,
    classIndex: null,
    tags: [],
    saving: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 获取id
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.getSingleDetail();
    }
    this.getSysConf();
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
    console.log(this.data.tags);
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
   * 获取系统配置
   */
  getSysConf: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.systemConf,
      success: function(res) {
        if (res.code === 200) {
          const data = res.data;
          const classArray = data.clothing_category.map(item => item.name);
          _self.setData({
            classes: data.clothing_category,
            classArray: classArray
          })
        }
      }
    })
  },

  // 获取单品详情
  getSingleDetail: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.clothing + '/' + _self.data.id,
      success: function(res) {
        if (res.code === 200) {
          _self.setData({
            src: res.data.images,
            tags: res.data.tags,
            classIndex: _self.data.classes.findIndex(item => item.id === res.data.category_id)
          })
        }
      }
    })
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
        console.log('选择的文件：', res);
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
   * 设置标签
   */
  setTags: function($event) {
    wx.setStorageSync('tags', this.data.tags);
    wx.navigateTo({
      url: '/pages/edit-tags/edit-tags',
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

  /**
   * 保存单品
   */
  complete: function(e) {
    const _self = this;
    const data = {
      images: this.data.src,
      tags: this.data.tags,
      category_id: this.data.clothing_category[this.data.classIndex].id
    }
    wx.showLoading({
      title: '修改单品中',
    })
    network.request({
      url: network.urlConfig.clothing + '/' + _self.data.id,
      method: 'PUT',
      data: data,
      success: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            setTimeout(function() {
              wx.navigateBack();
            }, 2000)
          }
        })
      }
    })
  },

  /**
   * 完成事件
   */
  save: function(e) {
    const _self = this;
    this.setData({
      saving: true
    })
    // 获取页面信息
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    wx.showLoading({
      title: '修改单品中',
    })
    network.request({
      url: network.urlConfig.clothing + '/' + _self.data.id,
      method: 'PUT',
      data: e.detail,
      success: function(data) {
        wx.hideLoading();
        wx.showToast({
          title: '修改成功',
          duration: 1500
        })
        // 设置前页刷新
        prevPage.setData({
          reload: true
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      },
      fail: function(err) {
        wx.showToast({
          title: err,
          icon: 'none'
        })
        this.setData({
          saving: true
        })
      }
    })
  },

  /**
   * 删除单品
   */
  deleteSingle: function() {
    const _self = this;
    network.request({
      url: network.urlConfig.clothing + '/' + _self.data.id,
      method: 'DELETE',
      success: function(res) {
        if (res.code === 200) {
          wx.showToast({
            title: '删除成功',
          })

          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/single/single'
            })
          }, 1500);
        }
      }
    })
  }
})