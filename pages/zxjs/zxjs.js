// pages/details/details.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
var WxParse = require('../../vendor/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    xqData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '加载中'
      })
      this.setData({
        id: options.id
      })
      this.getDetails(options.id)
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getDetails(id) {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/seekDetail',
      data: {
        "id": that.data.id
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
            xqData:res.data.data
          })

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
          title: '咨询',
        })
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        htmlStatus1.error()    // 切换为error状态
      },
      complete() {
        // wx.setNavigationBarTitle({
        //   title: '详情页',
        // })
      }
    })
  },
  zhifu(){
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    var that=this
    wx.request({
      url: app.IPurl + '/api/appletWePay',
      data: {
        token: wx.getStorageSync('tokenstr'),
        type: 2,
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
  jump(e) {
    app.jump(e)
  },
})