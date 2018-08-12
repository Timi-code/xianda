// pages/single/single.js

const network = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        note: [{
            url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
            tags: ['1', '标签2', '标签3', '标签4标签4标签4标签4标签4标签4', 'a']
        }],
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
        ],
        keywords: '',
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

    getList: function() {
        const _self = this;
        network.request({
            url: 'clothing',
            data: {
                page: 0,
                page_size: 20,
                category_id: '',
                keywords: _self.data.keywords
            },
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

    changeTab: function(e) {
        this.setData({
            active: parseInt(e.currentTarget.dataset.index)
        })
    },

    toDetail: function(e) {
        console.log(e);
        wx.navigateTo({
            url: '/pages/single-detail/single-detail',
        })
    },

    addSingle: function(e) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res);
                var tempFilePaths = res.tempFilePaths
                wx.navigateTo({
                    url: `/pages/editor-img/editor-img?path=${tempFilePaths}`,
                })
            }
        })
        wx.navigateTo({
                url: '/pages/edit-single/edit-single',
            })
            // wx.chooseImage({
            //   count: 1, // 默认9
            //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            //   sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            //   success: function (res) {
            //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            //     console.log(res);
            //     var tempFilePaths = res.tempFilePaths
            //     wx.navigateTo({
            //       url: `/pages/editor-img/editor-img?path=${tempFilePaths}`,
            //     })
            //   }
            // })
    }
})