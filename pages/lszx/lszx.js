// pages/lszx/lszx.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
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
  getdata() {
    ///api/homeIndex
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/seekList',
      data: {
        page:1,
        strip:20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        htmlStatus1.finish()
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空

          that.setData({
            homeSeek: res.data.data.data,
          })
        } else {
          htmlStatus1.error()
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })

        }
      },
      fail() {
        htmlStatus1.error()
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })

      },
      complete() {
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
  jump(e) {
    app.jump(e)
  },
})