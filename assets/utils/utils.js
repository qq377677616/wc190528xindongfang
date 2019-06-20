function httpRequest(url, callBack) {
   var _self = this;
   wx.request({
      url: url,
      data: {},
      header: {
         'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         callBack(res.data);  // 成功后回调方法
      },
      fail: function (erro) {
         console.log(erro)
      }
   })
}

// 导出
module.exports = {
   httpRequest: httpRequest
}