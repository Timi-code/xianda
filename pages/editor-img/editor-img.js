import WeCropper from '../../plugins/we-cropper/we-cropper.js'

const network = require('../../utils/util.js')
const qiniuUploader = require('../../plugins/qiniu/qiniuUploader.js')

const device = wx.getSystemInfoSync();
const width = device.windowWidth;
var height;

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      // height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 343) / 2,
        // y: (height - 343) / 2,
        width: 343,
        height: 343
      }
    },
    src: '',
    activeShape: 0,
    saving: false
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },

  /**
   * 生成新图
   */
  getCropperImage() {
    const _self = this;
    const pages = getCurrentPages();
    // 防止重复点击
    if (_self.data.saving) {
      return;
    }
    _self.setData({
      saving: true
    })
    this.wecropper.getCropperImage((src) => {
      if (src) {
        // 获取七牛token
        network.request({
          url: network.urlConfig.uploadImg,
          success: data => {
            wx.showLoading({
              title: '保存图片中'
            })

            // 上传到七牛
            qiniuUploader.upload(src, res => {
              pages[pages.length - 2].setData({
                src: res.imageURL
              });
              wx.hideLoading();
              wx.navigateBack();
            }, err => {
              wx.hideLoading();
              console.log('上传失败', err);
              _self.setData({
                saving: false
              })
            }, {
              region: 'ECN',
              domain: network.urlConfig.domain,
              uptoken: data.data.token
            }, res => {
              console.log('上传进度', res);
            })
          },
          fail: () => {
            _self.setData({
              saving: false
            })
          }
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },

  /**
   * 上传图片
   */
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.setData({
          src: src
        })
        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    height = wx.getSystemInfoSync().windowHeight - 120;
    if (option.path) {
      this.setData({
        'cropperOpt.src': option.path,
        'cropperOpt.height': height,
        'cropperOpt.cut.y': (height - 343) / 2,
        src: option.path
      })
    }
    this.initCropper();
  },
  /**
   * 初始化插件
   */
  initCropper: function() {
    const {
      cropperOpt
    } = this.data
    console.log(cropperOpt);

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas();
  },

  /**
   * 改变比例
   */
  changeRatio: function(e) {
    console.log(e);
    switch (e.currentTarget.dataset.ratio) {
      case '1':
        this.setData({
          'cropperOpt.src': this.data.src,
          'cropperOpt.cut': {
            x: (width - 343) / 2,
            y: (height - 343) / 2,
            width: 343,
            height: 343
          },
          activeShape: 0
        });
        break;
      case '2':
        this.setData({
          'cropperOpt.src': this.data.src,
          'cropperOpt.cut': {
            x: (width - 329) / 2,
            y: (height - 439) / 2,
            width: 329,
            height: 439
          },
          activeShape: 1
        });
        break;
      case '3':
        this.setData({
          'cropperOpt.src': this.data.src,
          'cropperOpt.cut': {
            x: (width - 247) / 2,
            y: (height - 439) / 2,
            width: 247,
            height: 439
          },
          activeShape: 2
        });
        break;
    }
    this.initCropper();
  }
})