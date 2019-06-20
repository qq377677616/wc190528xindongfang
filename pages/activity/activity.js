//activity.js
const mta = require('../../utils/mta_analysis.js')
//获取应用实例
const app = getApp()
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];

Page({
   data: {
      current_page: 1, //当前页数
      pageNum: 0, // 总页数
      city: '北京', //当前城市
      lists: [],
      indexList: [0, 1, 2, 3],
      current: 1,
      // searName:'',
   },
   inputFocus:function(e){
      this.setData({
         searName: e.detail.value
      })
   },
   search:function(){
      let _this = this;
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_activity', // 获取区域列表
         method: 'get',
         data: {
            page: _this.data.current_page,
            type: _this.data.current,
            title: _this.data.searName
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               lists: res.data.data,
               pageNum: res.data.last_page,
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
   },
   link_detail: function (e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
         url: '../activeDetail/activeDetail?id='+id
      })
   },
   onLoad: function () {
      var _this = this;
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_activity', // 获取活动列表
         method: 'get',
         data: {
            page: 1,
            type: 1
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               lists: res.data.data,
               pageNum: res.data.last_page,
            })
         }
      })
      // 新建百度地图对象 
      var BMap = new bmap.BMapWX({
         ak: '3bDBPLY6KSkLmuBE7QC0Xqi8LiSonqgj'
      });
      var success = function (data) {
         console.log("dataaaaaaaaaa", data)
         _this.setData({
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
      let _this = this;
      this.setData({
         current: current
      })
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_activity', // 获取活动列表
         method: 'get',
         data: {
            page: 1,
            type: current
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               lists: res.data.data,
               pageNum: res.data.last_page,
            })
         }
      })
   },
   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {
      console.log("到底了")
      if (this.data.current_page < this.data.pageNum) {
         this.data.current_page++;
         console.log("aaaaaaaaaaa", this.data.current_page)
         let _this = this;
         wx.request({
            url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_activity', // 获取区域列表
            method: 'get',
            data: {
               page: _this.data.current_page,
               type: _this.data.current
            },
            header: {
               'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
               console.log("res.dataaaaaaaaa==>", res.data)
               _this.setData({
                  lists: res.data.data,
                  pageNum: res.data.last_page,
               })
            },
            fail: function (erro) {
               console.log(erro)
            }
         })
      }
   },
})