// components/add-group-form/add-group-form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: null
    },
    temperature: {
      type: Array,
      value: null
    },
    temperatureArray: {
      type: Array,
      value: null
    },
    temperatureIndex: {
      type: null,
      value: null
    },
    tags: {
      type: Array,
      value: []
    },
    disabled: {
      type: Boolean,
      value: false
    },
    more: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: '/assets/images/single.png',
    arrow: '/assets/images/arrow-right.png',
    temperature: null,
    temperatureArray: null,
    temperatureIndex: null,
    tags: [],
    disabled: false,
    more: false
  },

  ready: function(e) {
    this.setData({
      src: this.properties.src || '/assets/images/single.png',
      temperature: this.properties.temperature,
      temperatureArray: this.properties.temperatureArray,
      temperatureIndex: this.properties.temperatureIndex,
      more: this.properties.more
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 选择图片
     */
    selectImg: function(e) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          wx.navigateTo({
            url: `/pages/editor-img/editor-img?path=${tempFilePaths}`,
          })
        }
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
     * 选择适宜温度
     */
    bindPickerChange: function(e) {
      this.setData({
        temperatureIndex: e.detail.value
      })
    },

    /**
     * 选择更多
     */
    selectMore: function() {
      const _self = this;
      wx.showActionSheet({
        itemList: ['删除搭配', '取消'],
        success: function(res) {
          if (res.tapIndex === 0) {
            wx.showModal({
              title: '确定删除？',
              content: '删除后搭配中的单品将全部移除',
              confirmText: '删除',
              success: function(result) {
                if (result.confirm) {
                  _self.triggerEvent('delete', {});
                }
              }
            })
          }
        }
      })
    },

    /**
     * 完成
     */
    complete: function(e) {
      const data = {
        images: this.data.src,
        temperature_id: this.data.temperatureIndex ? this.data.temperature[this.data.temperatureIndex].id : null,
        tags: this.data.tags
      }
      // 判断图片是否选择
      if (data.images === '/assets/images/single.png') {
        wx.showToast({
          title: '请选择图片',
          icon: 'none'
        })
        return;
      }

      // 判断是否添加标签
      if (!data.tags || data.tags.length < 1) {
        wx.showToast({
          title: '请添加标签',
          icon: 'none'
        })
        return;
      }

      // 判断是否选择适宜气温
      if (!data.temperature_id) {
        wx.showToast({
          title: '请选择适宜气温',
          icon: 'none'
        })
        return;
      }

      this.triggerEvent('save', data);
    }
  }
})