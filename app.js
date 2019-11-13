//app.js
App({
	onLaunch: function() {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: res => {
				console.log(res.code)
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		})
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})
	},
	globalData: {
		userInfo: null
	},
	jump(e) {
		console.log(e)
		if(e.currentTarget.dataset.url){
			wx.navigateTo({
				url: e.currentTarget.dataset.url
			})
		}
		
	},
	pveimg(current, urls) {
		let urls1 = []
		if (urls) {
			urls1 = urls

		} else {
			urls1[0] = current
		}
		wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: urls1 // 需要预览的图片http链接列表
		})
	},
	call(e) {
		if (!wx.getStorageSync('userInfo')) {
			wx.navigateTo({
				url: '/pages/login/login',
			})
			return
		}
		console.log(e)
		if(e.currentTarget.dataset.tel){
			wx.makePhoneCall({
				phoneNumber: e.currentTarget.dataset.tel
			})
		}
		
	},
	data: {
		haveLocation: false,
		activity_lat: -1,
		activity_lng: -1,
		activity_location: ""
	}
})
