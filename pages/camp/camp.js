// pages/study/study.js
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
   data: {
      //  轮播图数组
      imgUrls: [
         '../../assets/images/b1.png',
         '../../assets/images/b2.png'
      ],
      city: '北京', //当前城市
      multiIndex: [0, 0, 0],
      region: ['北京市', '北京市', '全部'],
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 2000,
      duration: 500,
      //  是否显示搜索框
      isSerach: false,
      //  控制筛选弹框是否显示
      isShow: false,
      indexList: [0, 1, 2, 3],
      //  字数超过4个 显示两栏
      two_col: false,
      datas: [{
         arrList: [
            { name: '中国' }, { name: '美国' }, { name: '英国' }, { name: '加拿大' }, { name: '澳大利亚' }, { name: '亚洲' }, { name: '欧洲' }, { name: '其他' }
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
   //事件处理函数
   bindViewTap: function () {
      wx.navigateTo({
         url: '../logs/logs'
      })
   },
   //  省市县级联选择
   bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({
         region: e.detail.value,
         city: e.detail.value[1]
      })
      if (this.data.city == '全部') {
         this.setData({
            city: e.detail.value[0]
         })
      }
   },
   //  点击搜索框弹出
   inputFocus: function () {
      // this.setData({
      //    isSerach: true
      // })
      wx.navigateTo({
         url: '../searchDetail/searchDetail',
      })
   },
   closes: function () {
      this.setData({
         isSerach: false
      })
   },
   canel: function () {
      this.setData({
         isSerach: false
      })
   },
   //  点击弹出筛选页
   select: function () {
      this.setData({
         isShow: true
      })
   },
   //   点击关闭筛选页
   close: function () {
      this.setData({
         isShow: false
      })
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
   link_detail: function () {
      wx.navigateTo({
         url: '../campDetail/campDetail'
      })
   },
   onLoad: function () {
      console.log("this.datassssss11", this.data.datas)
      var that = this;
      // 新建百度地图对象 
      var BMap = new bmap.BMapWX({
         ak: '3bDBPLY6KSkLmuBE7QC0Xqi8LiSonqgj'
      });
      var success = function (data) {
         console.log("dataaaaaaaaaa", data)
         that.setData({
            city: data.originalData.result.addressComponent.city
         });
      }
      // 发起regeocoding检索请求 
      BMap.regeocoding({
         success: success
      });
   },
   clickTab: function (event) {
      var current = event.currentTarget.dataset.current;
      this.setData({
         current: current
      })
   },
   // getUserInfo: function(e) {
   //    console.log(e)
   //    app.globalData.userInfo = e.detail.userInfo
   //    this.setData({
   //       userInfo: e.detail.userInfo,
   //       hasUserInfo: true
   //    })
   // }
})