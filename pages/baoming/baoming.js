// pages/baoming/baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    date1:'',
    array: [
      {
        name: '项目1'
      },
      {
        name: '项目2'
      },
      {
        name: '项目3'
      },
    ],
    index:0
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  bindDateChange: function (e) {
    console.log(e.currentTarget.dataset.idx)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = e.currentTarget.dataset.idx
    if (idx == 1) {
      this.setData({
        date: e.detail.value
      })
    } else if (idx == 2) {
      this.setData({
        date1: e.detail.value
      })
    }else{
      this.setData({
        index: e.detail.value
      })
    }
    
  },
})