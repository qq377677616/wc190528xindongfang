// pages/personal/personal.js
//获取应用实例
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      hidden: true, //提示框是否显示
      userInfo: {},
      canIUse: wx.canIUse('button.open-type.getUserInfo')
   },
   //  游学订单
   navAccount:function(){
      wx.navigateTo({
         url: '../studyOrder/studyOrder',
      })
   },
   //  活动订单
   myOrder:function(){
      wx.navigateTo({
         url: '../activityOrder/activityOrder',
      })
   },
   // 相册
   photo:function(){
      this.setData({
         hidden: false
      })
   },
   // 讲座
   jiangzuo:function(){
      this.setData({
         hidden: false
      })
   },
   confirm: function () {
      this.setData({
         hidden: !this.data.hidden
      });
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // let title = "新东方国际游学";
      // wx.setNavigationBarTitle({
      //    title: title
      // })
      if (app.globalData.userInfo) {
         console.log("aaaa",app)
         this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
         })
      } else if (this.data.canIUse) {
         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
         // 所以此处加入 callback 以防止这种情况
         app.userInfoReadyCallback = res => {
            console.log("resssssss1", res)
            this.setData({
               userInfo: res.userInfo,
               hasUserInfo: true
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
                  hasUserInfo: true
               })
            }
         })
      }
   },
   // getUserInfo: function (e) {
   //    console.log(e)
   //    app.globalData.userInfo = e.detail.userInfo
   //    this.setData({
   //       userInfo: e.detail.userInfo,
   //       hasUserInfo: true
   //    })
   // },
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

   }
})