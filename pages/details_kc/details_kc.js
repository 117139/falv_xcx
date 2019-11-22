// pages/details_kc/details_kc.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
var WxParse = require('../../vendor/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: 0,
    xqData: {},
    cur: 0,
    index_tab: [
      {
        title: '律所分类'
      },
      {
        title: '律所分类'
      },
      {
        title: '律所分类'
      },
    ],
    shareTempFilePath: '',
    actionSheetHidden: true,
    showcan:false,
    writePhotosAlbum:true,
    id:'',
    knob:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that =this
    if (options.id) {
      that.setData({
        id:options.id
      })
      if (options.knob){
        that.setData({
          knob: options.knob
        })
      }
     
    }
   
    //画图
    that.ctxc()
  },
  retry: function () {
    this.getDetails(this.data.goods_id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.getDetails()
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        var sdata = res.authSetting
        if (sdata['scope.writePhotosAlbum']) {
          that.setData({
            writePhotosAlbum: sdata['scope.writePhotosAlbum']
          })
        }
        
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.cur)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  zhifu() {
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    var that = this
    wx.request({
      url: app.IPurl + '/api/appletWePay',
      data: {
        token: wx.getStorageSync('tokenstr'),
        type: 1,
        "id": that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.doWxPay(res.data)
        } else {
          wx.showToast({
            icon: 'none',
            title: '支付失败'
          })
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '支付失败'
        })
      },
      complete() {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        // wx.setNavigationBarTitle({
        //   title: '详情页',
        // })
      }
    })
  },
  doWxPay(param) {
    // wx.showToast({
    // 	title:'doWxPay'
    // })
    console.log(param)
    //小程序发起微信支付
    wx.requestPayment({
      timeStamp: param.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
      nonceStr: param.data.nonceStr,//随机字符串
      package: param.data.prepay_id,
      signType: 'MD5',
      paySign: param.data.paySign,
      success: function (event) {
        // success
        console.log(event);

        wx.redirectTo({
          url: '/pages/index/index?id=-2'
        })
        wx.showToast({
          title: '支付成功',
          icon: 'none',
          duration: 1000
        });
      },
      fail: function (error) {
        // fail
        console.log("支付失败")

        wx.redirectTo({
          url: '/pages/OrderList/OrderList?id=0'
        })
        wx.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 1000
        });
        console.log(error)
      },
      complete: function () {
        // complete
        console.log("pay complete")
      }

    });
  },
  getDetails(id) {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/appletCourseDetail',
      data: {
        token: wx.getStorageSync('tokenstr'),
        "id": that.data.id,
        knob: that.data.knob
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (res.data.code == 1) {                           //数据不为空
          that.setData({
            xqData: res.data.data
          })
          var article = res.data.data.desc
          var subStr = new RegExp('<div>&nbsp;</div>', 'ig');
          article = article.replace(subStr, "<text style='margin-bottom:1em;'></text>");
          WxParse.wxParse('article', 'html', article, that, 5);
          wx.setNavigationBarTitle({
            title: res.data.data.title,
          })
          htmlStatus1.finish()    // 切换为finish状态
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
          htmlStatus1.error()    // 切换为error状态
        }
      },
      fail() {
        wx.setNavigationBarTitle({
          title: '在线课程',
        })
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        htmlStatus1.error()    // 切换为error状态
      },
      complete() {
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  ctxc() {
    var that = this;
    var query = wx.createSelectorQuery();

    query.select('.htoi').boundingClientRect(function (rect) {
      // console.log(rect.width)
      that.setData({
        width: rect.width
      })
      const ctx = wx.createCanvasContext('share');
      // console.log(ctx)
      // var goods = that.data.goods
      // var img = goods.goods_pic.split(",")
      var imgurl = app.IPurl1+"/static/uploads/law/20191122/32e4c32570f6326867721a322b200509.png"

      wx.getImageInfo({
        src: imgurl,
        success(res) {
          ctx.drawImage(res.path, 0, 0, 750, 1206)
          // ctx.fillStyle = "#fff";
          // ctx.fillRect(0, 750, 750, 150);
          // ctx.setFillStyle('#000000')//文字颜色：默认黑色
          // ctx.setFontSize(44)//设置字体大小，默认10
          // ctx.fillText('111', 38, 810)
          // ctx.save()
          // ctx.fillStyle = "#f2f2f2";
          // ctx.fillRect(0, 840, 750, 434);
          // ctx.save()
          // ctx.setFillStyle('#f75852')//文字颜色：默认黑色

          // // ctx.setFontSize(14)//设置字体大小，默认10
          // ctx.font = "bold 52px Arial";
          // ctx.fillText('￥', 38, 1060)
          // ctx.drawImage("../../static/images/banner.png", 432, 860, 270, 270)
          // ctx.save()
          // ctx.setFillStyle('#333333')//文字颜色：默认黑色

          // // ctx.setFontSize(14)//设置字体大小，默认10
          // ctx.font = "30px Arial";
          // ctx.fillText('扫码或长按小程序码', 432, 1180)
          ctx.draw()

        }
      })
    }).exec();
  },
  //获取临时路径
  getTempFilePath1: function () {
    var that = this
    wx.showLoading({
      title: '图片生成中'
    })
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        wx.hideLoading()
        console.log(res.tempFilePath)
        that.setData({
          shareTempFilePath: res.tempFilePath
        })
        setTimeout(function () {
          that.setData({
            showcan: true,
            actionSheetHidden: !that.data.actionSheetHidden

          });
        }, 0)

      }
    })


  },
  //下载
  getTempFilePath: function () {
    var that = this
    wx.showLoading({
      title: '正在保存'
    })
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareTempFilePath,
      success(res1) {
        console.log(res1)
        wx.hideLoading()
      },
      fail(err){
        wx.hideLoading()
        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
          wx.showModal({
            title: '提示',
            content: '需要您授权保存相册',
            showCancel: false,
            success: modalSuccess => {
              wx.openSetting({
                success(settingdata) {
                  console.log("settingdata", settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限成功,再次点击图片即可保存',
                      showCancel: false,
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限失败，将无法保存到相册哦~',
                      showCancel: false,
                    })
                  }
                },
                fail(failData) {
                  console.log("failData", failData)
                },
                complete(finishData) {
                  console.log("finishData", finishData)
                }
              })
            }
          })
        }
      }
    })
  },
  onClose() {
    this.setData({
      sheetshow: false
    })
  },
  onClosecanvas() {
    this.setData({ showcan: false });
  },
  listenerButton: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  listenerActionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  qhcur(e) {
    console.log(e.currentTarget.dataset.idx)
    var that = this
    var idx = e.currentTarget.dataset.idx
    that.setData({
      cur: idx
    })
  },

  yyfuc() {
    var xqData = this.data.xqData
    wx.navigateTo({
      url: '/pages/order1/order?id=' + xqData.id + '&groupid=' + xqData.groupid
    })
  },
  call(e) {
    var that = this
    app.call(e)
  },
  jump(e) {
    app.jump(e)
  },
})