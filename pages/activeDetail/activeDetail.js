// pages/activeDetail/activeDetail.js
//获取应用实例
const app = getApp()
Page({
   /**
    * 页面的初始数据
    */
   data: {
      detail:{}
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      let _this = this;
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_activity_detail', // 获取活动详情
         method: 'get',
         data: {
            activity_id: options.id,
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               detail: res.data.data,
            })
         }
      })
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