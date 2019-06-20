// pages/index_detail/index_detail.js
//获取应用实例
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      isLogins:'',
      isShow:false, //显示web-view
      detailId: '',
      current_page:1, //当前评论页数
      pageNum: 0, // 总页数
      userInfo: {},
      isLogin: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      // input默认是1
      num: 1,
      lists:[1,2,3,4,5],
      datas:{},
      tripList:[
         { name: '第一天' }, { name: '第二天' }, { name: '第三天' }, { name: '第四天' }, { name: '第五天' }, { name: '第六天' }, { name: '第七天' }
      ],
      current:0,
      commentList:[]
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
   tab: function (event){
      var index = event.currentTarget.dataset.index;
      console.log("indexxxxxx", index)
      this.setData({
         current: index
      })
   },
   //  写评论
   whiteComment:function(){
      wx.navigateTo({
         url: '../comment/comment'
      })
   },
   // 点赞
   give:function(e){
      console.log("eeeeeee",e)
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/submit_agree', // 评论点赞
         method: 'post',
         data: {
            comment_id: e.target.dataset.commentid,
            openid: app.globalData.openid,
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res.data)
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      
   },
   //  免费报名
   freeUp:function(e){
      if (!this.data.isLogins) {
         wx.setStorageSync('id', this.data.detailId)
         this.setData({
            isShow: true
         })

         // wx.navigateTo({
         //    url: '../login/login',
         // })
      } else {
         let id = e.currentTarget.dataset.id;
         wx.navigateTo({
            url: '../sign_up/sign_up?id='+id+'&num='+this.data.num
         })
      }
   },
   //  立即报名
   signUp: function(e){
      if(!this.data.isLogins){
         wx.setStorageSync('id', this.data.detailId)
         this.setData({
            isShow: true
         })
         
         // wx.navigateTo({
         //    url: '../login/login',
         // })
      }else{
         let id = e.currentTarget.dataset.id;
         console.log("isdddddddddd",id)
         wx.navigateTo({
            url: '../sign_up/sign_up?ids=0&id=' + id + '&num=' + this.data.num
         })
      }
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      let did = wx.getStorageSync('id');
      console.log("optionssssssssss", options)
      //  跳转H5页面 本地存储路线ID
      this.setData({
         detailId: options.id,
         isLogins: did
      })
      //  H5返回小程序 判断本地存储的路线ID是否为空
      if(did){
         options.id = did;
      }
      
      let _this = this;
      // 获取路线详情
      wx.request({
         method: 'post',
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/Product_detail', // 获取路线详情
         data: {
            RouteID: options.id
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res.data);
            _this.setData({
               datas:res.data
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      // 根据路线ID查找团
      wx.request({
         method: 'post',
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/get_project', // 根据路线ID查找团
         data: {
            // RouteID: options.id
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res.data);
            _this.setData({
               lists: res.data
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      // 获取评论列表
      wx.request({
         method: 'post',
         url: app.globalData.apiUrl +'/tp5/public/index.php/api/index/comment_list', // 获取评论列表
         data: {
            page: _this.data.current_page
         },
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res.data);
            _this.setData({
               commentList:res.data.data,
               pageNum: res.data.last_page
            })
            console.log("thissssssssss",_this.data.commentList)
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      console.log("apppppppppppppppp", app)
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
   bindmessage(e) {
      console.log("【从h5传到小程序的内容：】")
      console.log(e)
   },
   getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
         userInfo: e.detail.userInfo,
         isLogin: true
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
      console.log("到底了")
      if (this.data.current_page < this.data.pageNum){
         this.data.current_page++;
         console.log("aaaaaaaaaaa", this.data.current_page)
         let _this = this;
         wx.request({
            method: 'post',
            url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/comment_list', // 获取评论列表
            data: {
               page: _this.data.current_page
            },
            header: {
               'content-type': 'application/json'
            },
            success: function (res) {
               console.log(res.data);
               let arr = _this.data.commentList;
               arr = arr.concat(res.data.data) 
               _this.setData({
                  commentList: arr,
                  pageNum: res.data.last_page
               })
               console.log("thissssssssss", _this.data.commentList)
            },
            fail: function (erro) {
               console.log(erro)
            }
         })
      }
      
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {
      
      
   }
})