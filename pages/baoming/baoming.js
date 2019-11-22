// pages/baoming/baoming.js
const app=getApp(0)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate_id: '',

    date: '',
    date1:'',
    cate: [
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
    BusinessModel: [],
    index: 0,
    index1: 0,
    id: '',
    pid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id: options.id,
        pid:options.pid,
      })
      
    }
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
    wx.request({
      url: app.IPurl + '/api/busList',
      data: {
        cate_id: that.data.pid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {  //数据为空
          that.setData({
            cate: res.data.data.cate,
            BusinessModel: res.data.data.BusinessModel.data
          })
          if(that.data.pid){
            var cate = that.data.cate
            for(var i=0;i<that.data.cate.length;i++){
              if (that.data.pid == cate[i].id){
                that.setData({
                  index:i
                })
                
              }
            }
            var BusinessModel = res.data.data.BusinessModel.data
            for (var j = 0; j < BusinessModel[i].length; j++) {
              if (that.data.id == BusinessModel[i].id) {
                that.setData({
                  index1: i
                })
              }
            }
          }
        } else {
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var fdata = e.detail.value
    var that = this
    if (!fdata.name) {
      wx.showToast({
        icon: 'none',
        title: '请输入真实姓名',
      })
      return
    }
    if (!(/^1\d{10}$/.test(fdata.tel))) {
      wx.showToast({
        icon: 'none',
        title: '手机号有误'
      })
      return
    }
    if (!fdata.time1) {
      wx.showToast({
        icon: 'none',
        title: '请选择时间',
      })
      return
    }
    if (!fdata.xm2) {
      wx.showToast({
        icon: 'none',
        title: '请选择项目',
      })
      return
    }
    wx.request({
      url: app.IPurl + '/api/enrollSubmit',
      data: {
        token: wx.getStorageSync('tokenstr'),
        name: fdata.name,
        desc: fdata.other,
        phone: fdata.tel,
        appointment_time: fdata.time1,
        bus_id: fdata.xm2,
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
            title: '提交成功',
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '/pages/my_yy/my_yy'
            })
          },1000)
        } else {
          wx.showToast({
            icon: 'none',
            title: '操作失败'
          })
        }
      },
      fail(err) {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
        console.log(err)
      },
      complete() {
        // wx.setNavigationBarTitle({
        //   title: '详情页',
        // })
      }
    })
  },
  bindDateChange: function (e) {
    var that =this
    console.log(e.currentTarget.dataset.idx)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx = e.currentTarget.dataset.idx
    if (idx == 1) {
      that.setData({
        date: e.detail.value
      })
    } else if (idx == 2) {
      that.setData({
        date1: e.detail.value
      })
    } else if (idx == 3) {
      that.setData({
        index: e.detail.value,
        cate_id: that.data.cate[e.detail.value].id,
        index1:0
      })
      that.getdata()
    }else{
      that.setData({
        index1: e.detail.value
      })
    }
    
  },
})