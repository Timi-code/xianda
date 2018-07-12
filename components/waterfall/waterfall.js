// components/waterfall/waterfall.js

var leftImgs = [],
  rightImgs = [];

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftImgs: [],
    rightImgs: []
  },

  created: function() {
    leftImgs = [];
    rightImgs = [];
  },

  ready: function() {
    leftImgs.push(this.properties.imgs.shift());
    this.setData({
      leftImgs: leftImgs
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片加载成功
     */
    loadImg: function(e) {
      this.calcHeight(() => {
        if (this.properties.imgs.length <= 0) {
          return;
        }
        if (this.data.leftHeight <= this.data.rightHeight) {
          leftImgs.push(this.properties.imgs.shift());
          this.setData({
            leftImgs: leftImgs
          })
        } else {
          rightImgs.push(this.properties.imgs.shift());
          this.setData({
            rightImgs: rightImgs
          })
        }
      });
    },

    /**
     * 计算高度
     */
    calcHeight: function(cb) {
      const _self = this;
      const query = wx.createSelectorQuery().in(this);
      query.select('.left').boundingClientRect(function(res) {
        _self.setData({
          leftHeight: res.height
        })
      }).exec(
        query.select('.right').boundingClientRect(function(res) {
          _self.setData({
            rightHeight: res.height
          })
        }).exec(
          cb
        )
      );
    },

    /**
     * 点击单个item
     */
    toDetail: function(e) {
      console.log(e);
      this.triggerEvent("todetail", e);
    }
  }
})