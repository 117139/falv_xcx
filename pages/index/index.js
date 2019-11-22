// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: '',
    homeSeek: '',
    homeTeacher: '',
    homeVideo: '',
    index_type:[
      {
        name:'业务分类',
        img: '../../static/images/ywfl.png',
        url: '/pages/fenlei/fenlei',
        type:'2'
      },
      {
        name:'预约报名',
        img: '../../static/images/yybm.png',
        url: '/pages/baoming/baoming',
        type: '1',
        quanxian:'1'
      },
      {
        name:'在线课程',
        img: '../../static/images/zxkc.png',
        url: '/pages/kecheng_zx/kecheng_zx',
        type: '1'
      },
      {
        name:'律师咨询',
        img:'../../static/images/lszx.png',
        url: '/pages/lszx/lszx',
        type: '1'
      },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    that.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
	retry() {
    this.getdata()
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
    this.getdata()
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
  getdata(){
    ///api/homeIndex
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl + '/api/homeIndex',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        htmlStatus1.finish()
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空

          that.setData({
            banner: res.data.data.homeBanner,
            homeSeek: res.data.data.homeSeek,
            homeTeacher: res.data.data.homeTeacher,
            homeVideo: res.data.data.homeVideo,
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
        // 停止下拉动作
        wx.stopPullDownRefresh();
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
  jump(e){
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type==2){
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else {
      app.jump(e)
    }
  },
	kffuc(e){
		console.log(e)
	}
})