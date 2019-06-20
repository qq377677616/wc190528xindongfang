// pages/searchDetail/searchDetail.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      datas: [{
         arrList: [
            { name: '中国' }, { name: '美国' }, { name: '英国' }, { name: '加拿大' }, { name: '澳大利亚' }, { name: '亚洲' }, { name: '欧洲' }
         ],
         title: '区域',
         index: 100
      },
      {
         arrList: [
            { name: '小学生' }, { name: '中学生' }, { name: '大学生' }, { name: '亲子' },
         ],
         title: '年龄',
         index: 100
      },
      {
         arrList: [
            { name: '全球高端夏校' }, { name: '全球K12基础教育' }, { name: '世界名校精英教育' }, { name: '全球优质语言学校' }, { name: '全球用户主题营地' }
         ],
         title: '主题',
         index: 100
      }
      ],
      current: 0
   },
   //   选择区域、年龄、主题
   btn1: function (event) {
      // 外层数组下标
      var index = event.currentTarget.dataset.index;
      // 内层数组下标
      var indexs = event.currentTarget.dataset.indexs;
      var mText = 'datas[' + index + '].index';
      this.setData({
         [mText]: indexs
      })
   },
   reset: function () {
      this.setData({
         'datas[0].index': 100,
         'datas[1].index': 100,
         'datas[2].index': 100
      })
   },
   canel:function(){
      wx.navigateBack({

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