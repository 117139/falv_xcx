// pages/fb_pl/fb_pl.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    type: '',
    msg: '',
    num:0,
    pf:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    console.log(options)
    if(options.id){
      that.setData({
        id: options.id,
        type: options.type,
      })
      
    }
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
  setpf(e){
    console.log(e.currentTarget.dataset.num)
    this.setData({
      pf: e.currentTarget.dataset.num
    })
  },
  getint(e){
    console.log(e.detail)
    var that =this
    that.setData({
      msg:e.detail.value,
      num: e.detail.cursor
    })
  },
  sub() {
    var that =this
    if (that.data.pf==0) {
      wx.showToast({
        title: '请先进行评分',
      })
      return
    }
    if (!that.data.msg) {
      wx.showToast({
        title: '评论不能为空',
      })
      return
    }
    wx.request({
      url: app.IPurl + '/api/appletPublishComment',
      data: {
        token: wx.getStorageSync('tokenstr'),
        type: that.data.type,
        "object_id": that.data.id,
        "score": that.data.pf,
        "comment": that.data.msg,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
         wx.showToast({
           title: '操作成功',
         })
         setTimeout(function(){
           wx.navigateBack()
         },1000)
        } else {
          wx.showToast({
            icon: 'none',
            title: '操作失败'
          })
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
      },
      complete() {
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  }
})