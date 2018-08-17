// components/tags/tags.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array,
      value: [],

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // tags: ['标签1', '标签', '标签3'],
    inputText: '',
    activeIndex: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindConfirm: function($event) {
      let tags = this.data.tags;
      tags.push($event.detail.value);
      this.setData({
        tags: tags,
        inputText: ''
      })
      this.triggerChange();
    },
    /**
     * 删除标签
     */
    deleteTag: function($event) {
      const index = $event.currentTarget.dataset.index;
      if (this.data.activeIndex === index) { // 第二次点击删除
        let tags = this.data.tags;
        tags.splice(index, 1);
        this.setData({
          tags: tags,
          activeIndex: null
        })
        this.triggerChange();
      } else { // 第一次点击选中
        this.setData({
          activeIndex: index
        })
      }
    },

    /**
     * 取消选中
     */
    tapbox: function ($event) {
      this.setData({
        activeIndex: null
      })
    },

    triggerChange: function(){
      this.triggerEvent('change', {tags: this.data.tags});
    }
  }
})