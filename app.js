//app.js
const mta = require('./utils/mta_analysis.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
     mta.App.init({ 
        "appID": "wx9cb717d8151d8486", 
        "eventID": "500682174", 
        "autoReport": true, 
        "statParam": true, 
        "ignoreParams": [], 
        "statPullDownFresh": true, 
        "statShareApp": true, 
        "statReachBottom": true 
      });
     var appId='wx9cb717d8151d8486',
        appSecret='5ba546aa06533bacd28ade0ebaa1f3ca';
      var _this = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("resss",res)
         let code = res.code
         //  获取openid
         wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret +'&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
               'content-type': 'application/json'
            },
            success: function (res) {
               _this.globalData.openid = res.data.openid //返回openid
               wx.setStorageSync('openId', _this.globalData.openid)
            }
         })
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
               wx.setStorageSync('nickName', res.userInfo.nickName)
               wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
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
      userInfo: null,
      openid:0,
      apiUrl: 'http://192.168.1.106/wxf777bcadf6104cb1/zh_xdf'
  }
})