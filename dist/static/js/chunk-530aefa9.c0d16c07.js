(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-530aefa9"],{5723:function(e,t,n){"use strict";n.d(t,"g",function(){return a}),n.d(t,"e",function(){return l}),n.d(t,"d",function(){return s}),n.d(t,"h",function(){return o}),n.d(t,"f",function(){return u}),n.d(t,"c",function(){return c}),n.d(t,"a",function(){return d}),n.d(t,"b",function(){return f});var i=n("b775"),r="/account";function a(e){return Object(i["a"])({url:r+"/worker-deposit",method:"get",params:e})}function l(e){return Object(i["a"])({url:r+"/user-deposit",method:"get",params:e})}function s(e){return Object(i["a"])({url:r+"/success-order",method:"get",params:e})}function o(e){return Object(i["a"])({url:r+"/worker-withdraw",method:"get",params:e})}function u(e){return Object(i["a"])({url:r+"/withdraw-audit",method:"post",data:e})}function c(e){return Object(i["a"])({url:r+"/coupon-index",method:"get",params:e})}function d(e){return Object(i["a"])({url:r+"/coupon-create",method:"post",data:e})}function f(e){return Object(i["a"])({url:r+"/coupon-destroy",method:"post",data:e})}},b2e8:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-row",{staticClass:"filter-container",attrs:{gutter:10}},[n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入客户手机号码搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.mobile,callback:function(t){e.$set(e.listQuery,"mobile",t)},expression:"listQuery.mobile"}})],1),e._v(" "),n("el-col",{attrs:{sm:3}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入客户姓名搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.nickname,callback:function(t){e.$set(e.listQuery,"nickname",t)},expression:"listQuery.nickname"}})],1),e._v(" "),n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入洗车工手机号码搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.worker_mobile,callback:function(t){e.$set(e.listQuery,"worker_mobile",t)},expression:"listQuery.worker_mobile"}})],1),e._v(" "),n("el-col",{attrs:{sm:3}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入洗车工姓名搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.worker_nickname,callback:function(t){e.$set(e.listQuery,"worker_nickname",t)},expression:"listQuery.worker_nickname"}})],1),e._v(" "),n("el-col",{attrs:{sm:6}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right",size:"medium","unlink-panels":"","range-separator":"-","start-placeholder":"发起订单开始日期","end-placeholder":"发起订单结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd",format:"yyyy年 MM月 dd日"},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}})],1),e._v(" "),n("el-col",{attrs:{sm:4}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"medium"},on:{click:e.handleFilter}},[e._v("\n        搜索\n      ")])],1)],1),e._v(" "),n("div",{staticClass:"table-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"mini"}},[n("el-table-column",{attrs:{label:"订单编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewOrder(i.id)}}},[e._v(e._s(i.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"客户手机号码",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewUser(i.user_id)}}},[e._v(e._s(i.mobile))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"客户姓名",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.nickname))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"洗车工手机号码",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewUser(i.worker_user_id)}}},[e._v(e._s(i.worker_mobile))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"洗车工姓名",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.worker_nickname))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车辆类型",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.size_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"客户支付金额",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.money))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"洗车工获取金额",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.worker_money))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"发起时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.created_at))])]}}])}),e._v(" "),n("el-table-column",{staticClass:"fixed-width",attrs:{label:"完成时间","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.finished_at))])]}}])})],1)],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("user-info",{attrs:{"user-id":e.userId,"info-visible":e.userVisible},on:{"update:infoVisible":function(t){e.userVisible=t},"update:info-visible":function(t){e.userVisible=t}}}),e._v(" "),n("order-info",{attrs:{"order-id":e.orderId,"info-visible":e.orderVisible},on:{"update:infoVisible":function(t){e.orderVisible=t},"update:info-visible":function(t){e.orderVisible=t}}})],1)},r=[],a=n("5723"),l=n("6724"),s=n("4381"),o=n("333d"),u=n("fa84"),c=n("c301"),d={components:{Pagination:o["a"],UserInfo:u["a"],OrderInfo:c["a"]},directives:{waves:l["a"],permission:s["a"]},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]},list:[],total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"-id"},userVisible:!1,userId:0,orderVisible:!1,orderId:0}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(a["d"])(this.listQuery).then(function(t){e.list=t.data.list,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleViewUser:function(e){this.userId=e,this.userVisible=!0},handleViewOrder:function(e){this.orderId=e,this.orderVisible=!0}}},f=d,p=n("2877"),m=Object(p["a"])(f,i,r,!1,null,null,null);t["default"]=m.exports}}]);