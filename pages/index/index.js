//index.js
const mta = require('../../utils/mta_analysis.js')
//获取应用实例
const app = getApp()
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];

Page({
   data: {
      //  轮播图数组
      imgUrls: [
         'http://flynew.oss-cn-hangzhou.aliyuncs.com/game/wechat/zcc/pulicImage/b1.png',
         'http://flynew.oss-cn-hangzhou.aliyuncs.com/game/wechat/zcc/pulicImage/b2.png',
      ],
      city:'北京', //当前城市
      multiIndex: [0, 0, 0],
      region: ['北京市', '北京市', '全部'],
      // customItem: '全部',
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 2000,
      duration: 500,
      //  是否显示搜索框 
      isSerach: false,
      //  控制筛选弹框是否显示
      isShow: false,
      indexList: [0,1,2,3],
      //  字数超过4个 显示两栏
      two_col: false,
      allRegion:[], //存放所有的区域数据
      region:{
         arrList: [
            { BusinessAreaName: '中国' }, { BusinessAreaName: '美国' }, { BusinessAreaName: '英国' }, { BusinessAreaName: '加拿大' }, { BusinessAreaName: '澳大利亚' }, { BusinessAreaName: '亚洲' }, { BusinessAreaName: '欧洲' }, { BusinessAreaName: '其他' }
         ],
         title: '区域'
      },
      ages:{
         arrList: [
            { name: '小学生' }, { name: '中学生' }, { name: '大学生' }, { name: '研究生' }, { name: '亲子' },
         ],
         title: '年龄',
      },
      allTheme: [], //存放所有的主题数据
      theme:{
         arrList: [
            { name: '全球高端夏校' }, { name: '全球K12基础教育' }, { name: '世界名校精英教育' }, { name: '全球优质语言学校' }, { name: '全球用户主题营地' }
            ],
            title: '主题',
      },
      current1: 1000,
      current2: 1000,
      current3: 1000,
      BusinessAreaName:'',
      RouteCategoryID:'',
      AgeGrade:'',
      routeList: [], // 路线
      current_page: 1, //当前页数
      pageNum: 0, // 总页数
   },
   //  点击搜索框弹出
   inputFocus:function(){
      console.log("aaaaa")
      wx.navigateTo({
         url: '../searchDetail/searchDetail',
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
   //  点击弹出筛选页
   select: function() {
      this.setData({
         isShow:true
      })
   },
   //   点击关闭筛选页
   close:function(){
      this.setData({
         isShow:false
      })
   },
   //   选择区域
   btn1: function(event) {
      // 数组下标
      var index = event.currentTarget.dataset.index;
      if (this.data.region.arrList[index].BusinessAreaName == '其他'){
         this.setData({
            ['region.arrList']: this.data.allRegion
         })
      }else{
         let name = this.data.region.arrList[index].BusinessAreaName;
         this.setData({
            current1: index,
            BusinessAreaName: name
         })
      }
      
   },
   // 选择年龄
   btn2: function (event){
      // 数组下标
      var index = event.currentTarget.dataset.index;
      this.setData({
         current2: index,
         AgeGrade: index+1
      })
   },
   // 选择主题
   btn3: function (event) {
      // 数组下标
      var index = event.currentTarget.dataset.index;
      if (this.data.theme.arrList[index].RouteCategoryName == '其他') {
         this.setData({
            ['theme.arrList']: this.data.allTheme
         })
      }else{
         let rid = this.data.theme.arrList[index].RouteCategoryID;
         this.setData({
            current3: index,
            RouteCategoryID: rid
         })
      }
      
   },
   //  重置
   reset:function(){
      this.setData({
         current1: 1000,
         current2: 1000,
         current3: 1000
      })
   },
   //  确定
   submit:function(){
      console.log("thisssssssss==>",this.data)
      let _this = this;
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/product_list', // 获取区域列表
         method: 'get',
         data: {
            page: 1,
            BusinessAreaName: _this.data.BusinessAreaName,
            RouteCategoryID: _this.data.RouteCategoryID,
            AgeGrade: _this.data.AgeGrade
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               routeList: res.data.data,
               pageNum: res.data.last_page,
               isShow: false
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
   },
   link_detail:function(e){
      console.log("eeeeeeee",e)
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
         url: "../index_detail/index_detail?id="+id
      })
   },
   onLoad: function() {
      wx.showShareMenu()
      var _this = this;
      // 获取区域列表
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_area', // 获取区域列表
         method: 'get',
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>",res.data)
            _this.setData({
               allRegion:res.data
            })
            let arr = res.data.slice(0,5);
            let obj = { BusinessAreaName: '其他' };
            arr.push(obj)
            _this.setData({
               ['region.arrList']:arr
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      // 获取主题列表
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_route_category', // 获取主题列表
         method: 'get',
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               allTheme:res.data
            })
            let arr = res.data.slice(0, 5);
            let obj = { RouteCategoryName: '其他' };
            arr.push(obj)
            _this.setData({
               ['theme.arrList']: arr
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      //  路线详情
      // wx.request({
      //    url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/Product_detail', // 获取区域列表
      //    method: 'get',
      //    header: {
      //       'content-type': 'application/x-www-form-urlencoded'
      //    },
      //    success: function (res) {
      //       console.log("res.dataaaaaaaaa==>", res.data)
      //    },
      //    fail: function (erro) {
      //       console.log(erro)
      //    }
      // })
      //  产品路线列表
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/product_list', // 获取区域列表
         method: 'get',
         data: {
            page: 1,
            BusinessAreaName: _this.data.BusinessAreaName,
            RouteCategoryID: _this.data.RouteCategoryID,
            AgeGrade: _this.data.AgeGrade
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log("res.dataaaaaaaaa==>", res.data)
            _this.setData({
               routeList: res.data.data,
               pageNum: res.data.last_page
            })
         },
         fail: function (erro) {
            console.log(erro)
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
      wx.getSetting({
         success: (res) => {
            console.log('ressssssssssssss=>',res)
            if (!res.authSetting['scope.userInfo']) {
               wx.navigateTo({
                  url: '../login/login',
               })
            }
         }
      })
   },
   clickTab: function (event){
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
            url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/product_list', // 获取区域列表
            method: 'get',
            data: {
               page: _this.data.current_page
            },
            header: {
               'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
               console.log("res.dataaaaaaaaa==>", res.data)
               let arr = _this.data.routeList;
               arr = arr.concat(res.data.data)
               _this.setData({
                  routeList: arr,
                  pageNum: res.data.last_page
               })
            },
            fail: function (erro) {
               console.log(erro)
            }
         })
      }
   },
})