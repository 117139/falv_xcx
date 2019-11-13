// pages/fenlei/fenlei.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[
      '九洲法考培训',
      '天运法硕培训',
      '同等学力法学硕士博士培训',
      '律师法官检察官实务培训',
      '高管法律风险规避培训',
      '美国英国香港律师资格考试',
      '华商法大专家 论证',
      '寰宇金牌律师楼',
      '法医鉴定和法 院书记员速录',
    ],
    fl_cur:0,
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
  qhcur(e){
    console.log(e.currentTarget.dataset.idx)
    var that =this
    that.setData({
      fl_cur: e.currentTarget.dataset.idx
    })
  },
  jump(e) {
    app.jump(e)
  },
})