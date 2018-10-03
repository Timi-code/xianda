// components/none/none.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    target: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    target: null,
    src: null
  },

  /**
   * 设置显示内容
   */
  attached: function() {
    if (this.properties.target === 'single') {
      this.setData({
        target: '单品',
        src: '/assets/images/single.png'
      })
    } else if (this.properties.target === 'group') {
      this.setData({
        target: '搭配',
        src: '/assets/images/groups.png'
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})