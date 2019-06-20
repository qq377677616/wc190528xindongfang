// pages/campDetail/campDetail.js
// pages/campDetail/campDetail.js
// pages/index_detail/index_detail.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // input默认是1
      num: 1,
      lists: [1, 2, 3, 4, 5],
      tripList: [
         { name: '第一天' }, { name: '第二天' }, { name: '第三天' }, { name: '第四天' }, { name: '第五天' }, { name: '第六天' }, { name: '第七天' }
      ],
      current: 0
   },
   /* 点击减号 */
   bindMinus: function () {
      var num = this.data.num;
      // 如果大于1时，才可以减
      if (num > 1) {
         num--;
      }
      // 将数值与状态写回
      this.setData({
         num: num
      });
   },
   /* 点击加号 */
   bindPlus: function () {
      var num = this.data.num;
      // 不作过多考虑自增1
      num++;
      // 将数值与状态写回
      this.setData({
         num: num
      });
   },
   /* 输入框事件 */
   bindManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回
      this.setData({
         num: num
      });
   },
   tab: function (event) {
      var index = event.currentTarget.dataset.index;
      console.log("indexxxxxx", index)
      this.setData({
         current: index
      })
   },
   //  写评论
   whiteComment: function () {
      wx.navigateTo({
         url: '../comment/comment'
      })
   },
   //  立即报名
   signUp: function () {
      wx.navigateTo({
         url: '../sign_up/sign_up'
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // let title ="瑞士国际游学";
      // wx.setNavigationBarTitle({
      //    title: title
      // })
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