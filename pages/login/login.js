// pages/login/login.js
//获取应用实例
const app = getApp()
Page({
   /**
    * 页面的初始数据
    */
   data: {

   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // wx.request({
      //    url: 'https://game.flyh5.cn/game/wuhui/wxapplet/applet/public/api/aiers/worksList', //仅为示例，并非真实的接口地址
      //    data: {
      //       page:1,
      //       pagesize: 10,
      //       sort: 2
      //    },
      //    header: {
      //       'content-type': 'application/json'
      //    },
      //    success: function (res) {
      //       console.log(res.data)
      //    }
      // })
      if (app.globalData.userInfo) {
         console.log("aaaa", app)
         this.setData({
            userInfo: app.globalData.userInfo,
            isLogin: true
         })
      } else if (this.data.canIUse) {
         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
         // 所以此处加入 callback 以防止这种情况
         app.userInfoReadyCallback = res => {
            console.log("resssssss1", res)
            this.setData({
               userInfo: res.userInfo,
               isLogin: true
            })
         }
      } else {
         // 在没有 open-type=getUserInfo 版本的兼容处理
         wx.getUserInfo({
            success: res => {
               console.log("resssssss2", res)
               app.globalData.userInfo = res.userInfo
               this.setData({
                  userInfo: res.userInfo,
                  isLogin: true
               })
            }
         })
      }
      
   },
   getUserInfo: function (e) {
      console.log('授权成功',e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
         userInfo: e.detail.userInfo,
         isLogin: true
      })
      wx.navigateBack({
         
      })
   },
   bindmessage(e) {
      console.log("【从h5传到小程序的内容：】")
      console.log(e.detail)
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})