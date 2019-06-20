// components/alerts/alerts.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      show: {
         type: Boolean,
         value: true,
      },
      data:{
         type: String,
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      
   },
   attached() {
   },
   /**
    * 组件的方法列表
    */
   methods: {
      tapyes:function(){
         this.triggerEvent('yes', {});
      }
   }
})
