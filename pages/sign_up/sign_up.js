// pages/sign_up/sign_up.js
var first = require('../../assets/js/first.js');
var second = require('../../assets/js/second.js');
var md5 = require('../../assets/js/md5.js');

//获取应用实例
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      hidden:true,   
      lists:[
         {
            studentName:'', //姓名
            phoneNum:'',  //手机号
            groupID:'', //团期ID
            province:'', //省
            city:'', //市
            aname: '',
            webSiteLoginId:'',
            sign:'1036gyopp2crm2df8e'
         }
      ],
      array: ['美国', '中国', '巴西', '日本'],
      proiveList: ['湖南省','湖北省','上海','北京'],
      cityList: ['长沙市','株洲市','醴陵市']
   },
   // 删除一个用户
   delInfo:function(){
      if (this.data.lists.length > 1) {
         let arr = this.data.lists;
         arr.pop();
         this.setData({
            lists: arr
         })
      }
   },
   //  新增一个用户
   addInfo:function(){
      let obj = { studentName: '', phoneNum: '', groupID: '', province: '', city: ''}
      let arr = this.data.lists;
      arr.push(obj);
      this.setData({
         lists: arr
      })
   },
   //  获取学生姓名
   InputName:function(e){
      console.log("eeeeeeeee",e)
      let index = e.target.dataset.index;
      let arr = "lists[" + index + "].studentName"
      this.setData({
         [arr]:e.detail.value
      })
   },
   //  获取手机号码
   InputTel: function (e) {
      let index = e.target.dataset.index;
      let arr = "lists[" + index + "].phoneNum"
      this.setData({
         [arr]: e.detail.value
      })
   },

   //  选择团
   bindPickerChange1(e) {
      console.log('picker发送选择改变，携带值为', e, e.detail.value)
      let index = e.target.dataset.index;
      let arr = "lists[" + index + "].groupID"
      let arrname = "lists[" + index + "].aname"
      console.log("arrrrr",arr)
      let _this = this;
      _this.setData({
         [arrname]: _this.data.array[e.detail.value].ProjectAttrName,
         [arr]: _this.data.array[e.detail.value].ProjectID
      })
   },
   //  选择省
   bindPickerChange2(e) {
      console.log('picker发送选择改变，携带值为', e, e.detail.value)
      console.log("aaaaaaaaaaa", this.data.proiveList[e.detail.value])
      let index = e.target.dataset.index;
      let arr = "lists[" + index + "].province"
      let _this = this;
      _this.setData({
         [arr]: _this.data.proiveList[e.detail.value]
      })
      let arrs = [];
      for(let i=0;i<second.postList.length;i++){
         if (_this.data.lists[index].province.regid == second.postList[i].parid){
            arrs.push(second.postList[i])
         }
      }
      _this.setData({
         cityList:arrs
      })
      console.log("tisssssssssssss==>",_this.data.lists[index].province)
   },
   //  选择市
   bindPickerChange3(e) {
      // console.log('picker发送选择改变，携带值为', e, e.detail.value)
      let index = e.target.dataset.index;
      let arr = "lists[" + index + "].city"
      let _this = this;
      _this.setData({
         [arr]: _this.data.cityList[e.detail.value]
      })
   },
   payment:function(){
      console.log("this.data.listssssssss",this.data.lists)
      let _this = this;
      for (let i = 0; i < this.data.lists.length; i++) {
         //  用户名（网站登录id）
         let arr1 = "lists["+i+"].webSiteLoginId";
         let arr2 = "lists["+i+"].sign";
         //  签名
         let sign = '1036gyopp2crm2df8e';
         sign += this.data.lists[i].phoneNum;
         //  本地存储的Id
         let uid = wx.getStorageSync('id');
         _this.setData({
            [arr1]:uid,
            [arr2]: sign
         })
         if (!this.data.lists[i].studentName) {
            this.setData({
               Prompt: '学生姓名不能为空！',
               hidden: false
            })
            return;
         }
         if (!this.data.lists[i].phoneNum) {
            this.setData({
               Prompt: '手机号码不能为空！',
               hidden: false
            })
            return;
         }
         var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
         if (!reg.test(this.data.lists[i].phoneNum)) {
            this.setData({
               Prompt: '请输入正确的手机号！',
               hidden: false
            })
            return;
         }
         if (!this.data.lists[i].groupID) {
            this.setData({
               Prompt: '请选择团！',
               hidden: false
            })
            return;
         }
         if (this.data.lists[0].groupID != this.data.lists[i].groupID){
            this.setData({
               Prompt: '选择的团不一致，请重新选择！',
               hidden: false
            })
            return;
         }
         delete this.data.lists[i].aname;
         if (!this.data.lists[i].province) {
            this.setData({
               Prompt: '省不能为空！',
               hidden: false
            })
            return;
         }
         this.data.lists[i].province = this.data.lists[i].province.regname;
         if (!this.data.lists[i].city) {
            this.setData({
               Prompt: '市不能为空！',
               hidden: false
            })
            return;
         }
         this.data.lists[i].city = this.data.lists[i].city.regname;
      }
      console.log("接口参数===》",_this.data.lists)
      // 使用md5加密
      let obj = _this.data.lists[0];
      obj.sign = md5.hex_md5(_this.data.lists[0].sign);
      console.log("objjjjjjjj",obj)
      // return ;
      wx.request({
         url: app.globalData.apiUrl + '/api.php?a=crm_order', // 创建CRM订单
         method: 'post',
         data: obj,
         header: {
            'content-type': 'application/x-www-form-urlencoded'
         },
         success: function (res) {
            console.log('添加成功！',res.data)
            wx.navigateTo({
               url: '../free_up/free_up?ProjectID=' + obj.groupID,
            })
         },
         fail: function (erro) {
            console.log(erro)
         }
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
      console.log("optionsssss",options)
      let _this = this;
      //  更新省市的数据
      _this.setData({
         proiveList: first.postList,
         cityList: second.postList
      })
      if(options.ids == "0"){
         console.log('立即报名/定金支付')
      }else{
         console.log("免费报名")
         //  根据详情传过来的人数 增加用户信息
         if (options.num){
            let nums = Number(options.num)
            let arr = [];
            for (let i = 0; i < nums; i++) {
               arr.push({ studentName: '', phoneNum: '', groupID: '', province: '', city: '' });
            }
            _this.setData({
               lists: arr
            })
         }
         
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
               let obj = { ProjectAttrName: '北京团', ProjectID:'asdfgg'};
               res.data.push(obj)
               _this.setData({
                  array: res.data
               })
               console.log("ttttttttttttt",_this.data.array)
            },
            fail: function (erro) {
               console.log(erro)
            }
         })
      }
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