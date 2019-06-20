// pages/userInfo/userInfo.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      datas: {
         userList: [{ name: '晓东', age: '小学 一年级', phone: '13022126370', company: '师大附中', city: '北京', card: '430281199501517535' }],
         guardianList: [{ name: '你爸', phone: '13022126370', card: '430281199501517535' }]
      }
   },
   addUser:function(){
      wx.navigateTo({
         url: '../userDetail/userDetail?adduser=true',
      })
   },
   addGuar:function(){
      wx.navigateTo({
         url: '../userDetail/userDetail?addguar=true',
      })
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

   }
})