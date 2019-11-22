// pages/fenxiao/fenxiao.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
    cate_id: '',
    page: '',
    cate: '',
    brochureModel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.retry()
  },

  retry() {
    this.setData({
      page: 1
    })
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
    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getdata()
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
      url: app.IPurl + '/api/brochureList',
      data: {
        cate_id: that.data.cate_id,
        page: that.data.page,
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
          if (that.data.page == 1) {
            that.setData({
              cate: res.data.data.cate,
              brochureModel: res.data.data.brochureModel.data
            })
          } else {
            
            that.data.brochureModel = that.data.brochureModel.concat(res.data.data.brochureModel.data)
            that.setData({
              brochureModel: res.data.data.brochureModel.data
            })
          }
          if (res.data.data.brochureModel.data.length > 0) {
            that.data.page++
            that.setData({
              page: that.data.page
            })
          } else {
            if (that.data.page > 1) {
              wx.showToast({
                icon: 'none',
                title: '到底了...',
              })
            } else {
              htmlStatus1.dataNull()    // 切换为空数据状态
            }
          }

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
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  qhcur(e) {
    var that = this
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
      that.setData({
        cur: idx,
        cate_id: e.currentTarget.dataset.id
      })
      that.retry()
  },
  jump(e){
    app.jump(e)
  }
})