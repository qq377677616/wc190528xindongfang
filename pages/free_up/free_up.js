// pages/free_up/free_up.js
var first = require('../../assets/js/first.js');
var second = require('../../assets/js/second.js');
//获取应用实例
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      hidden: true, //提示框是否显示
      PID: '', //传过来的团ID
      Prompt: '',
      dates: {
         date: '2016-09-01',
         time: '12:01'
      },
      datas: {
         //  学生信息
         lists: [
            {
               CityName:'',
               OrderUserID: '', //订单销售ID
               ProjectID: 'a2eaae94-5f4c-bc33-a57d-4d012b2706d8', //报名团ID
               CustomerName: '', //姓名
               NationalityID:'01', //国籍
               IdCardNum: '', //身份证号
               CustomerPhone: '',  //手机号
               Birthday:'', //出生日期
               UbietySchool: '', //学校名称
               GradeID: 63,
               GradeName:'初三',
               Email: '', //电子邮箱
               province: '', //省
               city: '', //市
               // grade1: '', //年级1
               // grade2: '', //年级2
               // price: 4000, //支付定金
               VisitorsRelationID:''
            }
         ],
         // 监护人信息
         guar: {
            GuardianName: '', //姓名
            GuardianIDNum: '', //身份证号
            GuardianPhone: '' //手机号码
         },
      },
      array: ['美国', '中国', '巴西', '日本'],
      proiveList: ['湖南省', '湖北省', '上海', '北京'],
      cityList: ['长沙市', '株洲市', '醴陵市']
   },
   //  新增一个用户
   addInfo: function () {
      let obj = { CustomerName: '', CustomerPhone: '', province: '', city: '', IdCardNum: '', Email: '', UbietySchool: '', grade1: '', grade2: '', money: 4000, VisitorsRelationID:'' }
      let arr = this.data.datas.lists;
      arr.push(obj);
      this.setData({
         ['datas.lists']: arr
      })
   },
   // 删除一个用户
   delInfo: function () {
      if (this.data.datas.lists.length > 1) {
         let arr = this.data.datas.lists;
         arr.pop();
         this.setData({
            ['datas.lists']: arr
         })
      }
   },
   //  获取学生姓名
   InputName: function (e) {
      console.log("eeeeeeeee", e)
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].CustomerName"
      this.setData({
         [arr]: e.detail.value
      })
   },
   //  获取手机号码
   InputTel: function (e) {
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].CustomerPhone"
      this.setData({
         [arr]: e.detail.value
      })
   },
   //  获取身份证号
   InputNumber: function (e) {
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].IdCardNum"
      this.setData({
         [arr]: e.detail.value
      })
   },
   //  获取电子邮箱
   InputEmail: function (e) {
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].Email"
      this.setData({
         [arr]: e.detail.value
      })
   },
   //  获取学校名称
   InputSname: function (e) {
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].UbietySchool"
      this.setData({
         [arr]: e.detail.value
      })
   },
   bindDateChange: function (e) {
      console.log("eeeeeeeeeeee",e)
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].Birthday"
      this.setData({
         date: e.detail.value,
         [arr]:e.detail.value
      })
      console.log("thisssssssssssssss",this.data.dates)
   },
   //  选择省
   bindPickerChange1(e) {
      console.log('picker发送选择改变，携带值为', e, e.detail.value)
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].province"
      let _this = this;
      _this.setData({
         [arr]: _this.data.proiveList[e.detail.value]
      })
      let arrs = [];
      for (let i = 0; i < second.postList.length; i++) {
         if (_this.data.datas.lists[index].province.regid == second.postList[i].parid) {
            arrs.push(second.postList[i])
         }
      }
      _this.setData({
         cityList: arrs
      })
   },
   //  选择市
   bindPickerChange2(e) {
      // console.log('picker发送选择改变，携带值为', e, e.detail.value)
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].city"
      let _this = this;
      _this.setData({
         [arr]: _this.data.cityList[e.detail.value]
      })
   },
   //  选择年级1
   bindPickerChange3(e) {
      // console.log('picker发送选择改变，携带值为', e, e.detail.value)
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].grade1"
      let _this = this;
      _this.setData({
         [arr]: _this.data.array[e.detail.value]
      })
   },
   //  选择年级2
   bindPickerChange4(e) {
      // console.log('picker发送选择改变，携带值为', e, e.detail.value)
      let index = e.target.dataset.index;
      let arr = "datas.lists[" + index + "].grade2"
      let _this = this;
      _this.setData({
         [arr]: _this.data.array[e.detail.value]
      })
   },
   //  获取监护人信息
   InputGname: function (e) {
      let obj = "datas.guar.GuardianName"
      this.setData({
         [obj]:e.detail.value
      })
   },
   InputGnumber: function (e) {
      let obj = "datas.guar.GuardianIDNum"
      this.setData({
         [obj]: e.detail.value
      })
   },
   InputGtel: function (e) {
      let obj = "datas.guar.GuardianPhone"
      this.setData({
         [obj]: e.detail.value
      })
   },
   payment: function () {
      console.log("this.data.datas.listssssssss", this.data.datas.lists, this.data.datas.guar)
      for (let i = 0; i < this.data.datas.lists.length;i++){
         if (!this.data.datas.lists[i].CustomerName){
            this.setData({
               Prompt:'学生姓名不能为空！',
               hidden:false
            })
            return ;
         }
         if (!this.data.datas.lists[i].CustomerPhone) {
            this.setData({
               Prompt: '手机号码不能为空！',
               hidden: false
            })
            return;
         }
         var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
         if (!reg.test(this.data.datas.lists[i].CustomerPhone)){
            this.setData({
               Prompt: '请输入正确的手机号！',
               hidden: false
            })
            return;
         }
         if (!this.data.datas.lists[i].province) {
            this.setData({
               Prompt: '省不能为空！',
               hidden: false
            })
            return;
         }
         if (!this.data.datas.lists[i].city) {
            this.setData({
               Prompt: '市不能为空！',
               hidden: false
            })
            return;
         }
         this.data.datas.lists[i].CityName = this.data.datas.lists[i].city.regname;
         if (!this.data.datas.lists[i].Birthday) {
            this.setData({
               Prompt: '出生日期不能为空！',
               hidden: false
            })
            return;
         }
         if (!this.data.datas.lists[i].IdCardNum) {
            this.setData({
               Prompt: '身份证号不能为空！',
               hidden: false
            })
            return;
         }
         if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.data.datas.lists[i].IdCardNum))) {
            this.setData({
               Prompt: '请输入正确的身份证号！',
               hidden: false
            })
            return;
         }
         if (!this.data.datas.lists[i].Email) {
            this.setData({
               Prompt: '电子邮箱不能为空！',
               hidden: false
            })
            return;
         }
         var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
         if (!regEmail.test(this.data.datas.lists[i].Email)){
            this.setData({
               Prompt: '请输入正确的邮箱！',
               hidden: false
            })
            return;
         }
         if (!this.data.datas.lists[i].UbietySchool) {
            this.setData({
               Prompt: '学校名称不能为空！',
               hidden: false
            })
            return;
         }
         // if (!this.data.datas.lists[i].grade1) {
         //    this.setData({
         //       Prompt: '年级不能为空！',
         //       hidden: false
         //    })
         //    return;
         // }
         // if (!this.data.datas.lists[i].grade2) {
         //    this.setData({
         //       Prompt: '年级不能为空！',
         //       hidden: false
         //    })
         //    return;
         // }
         //  修改报名团ID
         let arr = "datas.lists[" + index + "].ProjectID"
         this.setData({
            [arr]: PID
         })
      }
      //  校验监护人信息
      if (!this.data.datas.guar.GuardianName) {
         this.setData({
            Prompt: '监护人姓名不能为空！',
            hidden: false
         })
         return;
      }
      if (!this.data.datas.guar.GuardianIDNum) {
         this.setData({
            Prompt: '监护人身份证号不能为空！',
            hidden: false
         })
         return;
      }
      if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.data.datas.guar.GuardianIDNum))) {
         this.setData({
            Prompt: '请输入正确的身份证号！',
            hidden: false
         })
         return;
      }
      if (!this.data.datas.guar.GuardianPhone) {
         this.setData({
            Prompt: '监护人手机号码不能为空！',
            hidden: false
         })
         return;
      }
      var regs = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
      if (!regs.test(this.data.datas.guar.GuardianPhone)) {
         this.setData({
            Prompt: '请输入正确的手机号！',
            hidden: false
         })
         return;
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      });
      console.log("uuuuuuuuuuuuuuuuuid", uuid)
      // 删除省市
      // delete this.data.datas.lists[0].province;
      // delete this.data.datas.lists[0].city;
      // 订单销售ID
      this.data.datas.lists[0].OrderUserID = uuid;
      this.data.datas.lists[0].VisitorsRelationID = uuid;
      this.data.datas.lists[0].VisitorsRelationID += '[% GUANWANG %]';
      console.log("this.dataaaaaaaaaaaaa",this.data.datas)
      let aa = this.data.datas.lists[0];
      aa.GuardianIDNum = this.data.datas.guar.GuardianIDNum;
      aa.GuardianName = this.data.datas.guar.GuardianName;
      aa.GuardianPhone = this.data.datas.guar.GuardianPhone;
      let objs = aa;
      console.log("objssssssssss",objs)
      wx.request({
         url: app.globalData.apiUrl + '/api.php?a=order_create', // 创建CRM订单
         method: 'post',
         data: objs,
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
   confirm: function () {
      this.setData({
         hidden: !this.data.hidden
      });
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log("optionssssss",options)
      let _this = this;
      //  更新省市的数据
      _this.setData({
         proiveList: first.postList,
         cityList: second.postList,
         PID: options.ProjectID
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