// pages/kecheng_zx/kecheng_zx.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_tab: [
      {
        title: '全部'
      },
      {
        title: '司法考试阶段班'
      },
      {
        title: '司法考试全程班'
      },
    ],
    cur: 0,
    ffcur:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  qhcur(e) {
    var that = this
    var type = e.currentTarget.dataset.type
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
    if (type==1){
      that.setData({
        cur: idx
      })
    }else{
      that.setData({
        ffcur: idx
      })
    }
  },

  jump(e) {
    app.jump(e)
  },
})