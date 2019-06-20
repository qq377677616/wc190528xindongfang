// pages/comment/comment.js
//获取应用实例
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      Fraction:10,
      hidden:true,
      //  图片列表
      imgList:[
         '../../assets/images/x3.png',
         '../../assets/images/x3.png',
         '../../assets/images/x3.png',
         '../../assets/images/x3.png',
         '../../assets/images/x3.png'
      ],
      obj:{
         content:'',
         star:0,
         openid:'',
         nickname:'',
         avatarurl:''
      }
   },
   onPageScroll(e) {
      console.log(e.scrollTop)
   },
   // touchStart(e) {
   //    console.log(e,'bbbbb')
   //    // this.setData({
   //    //    "touch.x": e.changedTouches[0].clientX,
   //    //    "touch.y": e.changedTouches[0].clientY
   //    // });
   // },
   touchEnd(e) {
      //  获取当前手指距离屏幕左侧的距离
      let x = e.changedTouches[0].clientX;
      let y = e.changedTouches[0].clientY;
      let _this = this;
      wx.createSelectorQuery().select('.div').boundingClientRect(function (rect) {
         // rect.id      // 节点的ID
         // rect.dataset // 节点的dataset
         // rect.left    // 节点的左边界坐标
         // rect.right   // 节点的右边界坐标
         // rect.top     // 节点的上边界坐标
         // rect.bottom  // 节点的下边界坐标
         // rect.width   // 节点的宽度
         // rect.height  // 节点的高度
         // 当前屏幕到手指滑动的距离=x 当前div宽度=rect.width   div距离左边坐标=rect.left  每半颗星的宽度=slide  滑动了多少像素=xing  滑到了几颗星=xnum/2
         console.log("当前div宽度===》",rect.width)
         console.log("距离左边坐标===》", rect.left)
         let slide = rect.width / 10;
         console.log("每半颗星多宽==》",slide)
         let xing = x - rect.left;
         console.log('aaaaaaaaa',xing)
         let xnum = parseInt(xing / slide + 1);
         xnum = xnum < 11 ? xnum : 10;
         console.log("数量===》", xnum);
         xnum = xnum>=0?xnum:0;
         _this.setData({
            Fraction: xnum
         })
         let arr = [];
         let num = Math.ceil(xnum / 2);
         for(let i = 1;i<= 5;i++){
            if(i < num){
               arr.push('../../assets/images/x1.png')
            } else if (i == num && xnum % 2 == 0){
               arr.push('../../assets/images/x1.png')
            }else if(i == num && xnum %2 != 0){
               arr.push('../../assets/images/x2.png')
            }else if(i == 5 && num == 5){
               arr.push('../../assets/images/x1.png')
            }else{
               arr.push('../../assets/images/x3.png')
            }
            // console.log("iii=>",i,"num=>",num)
         }
         _this.setData({
            imgList: arr
         })
         let stars = xnum/2;
         _this.setData({
            ['obj.star']: stars
         })
         // console.log(num,arr)
      }).exec()
      
   },
   InputContent:function(e){
      console.log("eeeee",e)
      this.setData({
         ['obj.content']:e.detail.value
      })
   },
   getUserInfo: function (e) {
      let reg = this.data.obj;
      reg.openid = wx.getStorageSync("openId");
      reg.nickname = wx.getStorageSync("nickName");
      reg.avatarurl = wx.getStorageSync("avatarUrl");
      let _this = this;
      wx.request({
         url: app.globalData.apiUrl + '/tp5/public/index.php/api/index/user_comment', // 提交评论
         method: 'post',
         data: reg,
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log(res.data)
            _this.setData({
               hidden: false
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
      })
      //  查看用户是否授权
      // wx.getSetting({
      //    success: (res) => {
      //       console.log("ressssssssss=>", res)
      //       if (res.authSetting['scope.userInfo']) {
      //          console.log("已授权")
      //       } else {
      //          console.log("未授权")
      //          app.globalData.userInfo = e.detail.userInfo
      //       }
      //    }
      // })
   },
   confirm: function () {
      this.setData({
         hidden: !this.data.hidden
      });
      wx.navigateBack({
         
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // if (app.globalData.userInfo) {
      //    console.log("aaaa",app)
      //    this.setData({
      //       userInfo: app.globalData.userInfo,
      //       hasUserInfo: true
      //    })
      // } else if (this.data.canIUse) {
      //    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //    // 所以此处加入 callback 以防止这种情况
      //    app.userInfoReadyCallback = res => {
      //       console.log("resssssss1", res)
      //       this.setData({
      //          userInfo: res.userInfo,
      //          hasUserInfo: true
      //       })
      //    }
      // } else {
      //    // 在没有 open-type=getUserInfo 版本的兼容处理
      //    wx.getUserInfo({
      //       success: res => {
      //          console.log("resssssss2", res)
      //          app.globalData.userInfo = res.userInfo
      //          this.setData({
      //             userInfo: res.userInfo,
      //             hasUserInfo: true
      //          })
      //       }
      //    })
      // }
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