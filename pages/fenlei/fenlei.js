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
    cate: '',
    BusinessModel: '',
    page: 1,
    pagesiz:20,
    catid:'',
    fl_cur:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page:1
    })
    this.getdata()
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
    console.log('下拉')

    this.retry()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
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
      url: app.IPurl + '/api/busList',
      data: {
        cate_id: that.data.catid,
        page:that.data.page,
      },
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
          if (that.data.page==1){
          that.setData({
            cate: res.data.data.cate,
            BusinessModel: res.data.data.BusinessModel.data
          })
        }else{
          that.data.BusinessModel = that.data.BusinessModel.concat(res.data.data.BusinessModel.data)
          that.setData({
            BusinessModel: res.data.data.BusinessModel.data
          })
        }
        if (res.data.data.BusinessModel.data.length>0){
          that.data.page++
          that.setData({
            page:that.data.page
          })
        }else{
          if(that.data.page>1){
            wx.showToast({
              icon:'none',
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
  qhcur(e){
    console.log(e.currentTarget.dataset.idx)
    var that =this
    that.setData({
      fl_cur: e.currentTarget.dataset.idx,
      catid: e.currentTarget.dataset.id
    })
    that.retry()
  },
  jump(e) {
    app.jump(e)
  },
})