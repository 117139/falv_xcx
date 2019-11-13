// pages/index/index.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	bannerimg: [
		'../../static/images/banner.png',
		'../../static/images/banner.png',
		'../../static/images/banner.png',
	],
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
      type: '1'
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
	retry() {},
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