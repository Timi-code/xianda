// components/add-single-form/add-single-form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: null
    },
    classes: {
      type: Array,
      value: null
    },
    classArray: {
      type: Array,
      value: null
    },
    classIndex: {
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
    classes: null, // 分类数组
    classArray: null, // 分类名字数组
    classIndex: null,
    tags: [],
    disabled: false
  },

  ready: function(e) {
    this.setData({
      src: this.properties.src || '/assets/images/single.png',
      classes: this.properties.classes,
      classArray: this.properties.classArray,
      classIndex: this.properties.classIndex,
      disabled: this.properties.disabled,
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
     * 选择单品品类
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
     * 选择更多
     */
    selectMore: function() {
      const _self = this;
      wx.showActionSheet({
        itemList: ['删除单品', '取消'],
        success: function(res) {
          if (res.tapIndex === 0) {
            wx.showModal({
              title: '确定删除？',
              content: '删除后，此单品将从已加入的搭配中移除，并且无法恢复',
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
     * 保存单品
     */
    complete: function(e) {
      const data = {
        images: this.data.src,
        tags: this.data.tags,
        category_id: this.data.classIndex ? this.data.classes[this.data.classIndex].id : null
      }
      // 判断图片是否选择
      if (data.images === '/assets/images/single.png') {
        wx.showToast({
          title: '请选择图片',
          icon: 'none'
        })
        return;
      }

      // 判断是否选择分类
      if (!data.category_id) {
        wx.showToast({
          title: '请选择单品品类',
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

      this.triggerEvent('save', data);
    }
  }
})