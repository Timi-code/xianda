// components/waterfall/waterfall.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgs: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal, changedPath) {
        this.data.images = newVal;
        this.imgsChange();
      }
    },
    choice: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: null,
    leftImgs: [],
    rightImgs: [],
    choicedId: [],
    leftHeight: 0,
    rightHeight: 0
  },

  created: function() {},

  ready: function() {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片加载成功
     */
    loadImg: function(e) {
      this.calcHeight(() => {
        if (this.data.images.length <= 0) {
          return;
        }
        if (this.data.leftHeight <= this.data.rightHeight) {
          this.data.leftImgs.push(this.data.images.shift());
          this.setData({
            leftImgs: this.data.leftImgs
          })
        } else {
          this.data.rightImgs.push(this.data.images.shift());
          this.setData({
            rightImgs: this.data.rightImgs
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
    tapItem: function(e) {
      const id = e.currentTarget.dataset.id;
      if (this.properties.choice) {
        const arr1 = this.updateImgs(this.data.leftImgs, id);
        const arr2 = this.updateImgs(this.data.rightImgs, id);
        this.setData({
          leftImgs: arr1,
          rightImgs: arr2
        })
        this.triggerEvent('choiced', this.data.choicedId);
      } else {
        this.triggerEvent('todetail', id);
      }
    },

    /**
     * 选中后更新数据
     */
    updateImgs: function(data, id) {
      const arr = data.map(item => {
        if (item.id === id) {
          if (!item.choiced) {
            item.choiced = true;
            this.data.choicedId.push(id);
          } else {
            item.choiced = false;
            const index = this.data.choicedId.indexOf(id);
            this.data.choicedId.splice(index, 1);
          }
        }
        return item;
      })
      return arr;
    },

    /**
     * 有数据进入执行
     */
    imgsChange: function() {
      this.data.images.map(item => {
        item.choice = this.properties.choice;
        item.choiced = false;
      });

      this.data.leftImgs.push(this.data.images.shift());
      this.setData({
        leftImgs: this.data.leftImgs
      })
    }
  }
})