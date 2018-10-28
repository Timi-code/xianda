// components/header/header.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    leftType: {
      type: String, // back: true  默认返回  back、close 默认返回
      value: '',
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    title: String, // 中间title
    back: { // 直接返回
      type: Boolean,
      value: true
    },
    bgGray: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftType: '',
    title: '',
    back: 1,
    bgGray: false
  },
  ready: function() {
    const _self = this;
    this.setData({
      leftType: _self.properties.leftType,
      title: _self.properties.title,
      back: _self.properties.back,
      bgGray: _self.properties.bgGray
    })
    console.log(this.data);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back: function() {
      if (this.data.back) {
        wx.navigateBack();
      } else {
        this.triggerEvent('back', {});
      }
    }
  }
})