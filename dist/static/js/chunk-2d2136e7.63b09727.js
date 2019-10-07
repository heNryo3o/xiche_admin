(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2136e7"],{ad3a:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-row",{staticClass:"filter-container",attrs:{gutter:10}},[i("el-col",{attrs:{sm:4}},[i("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入客户手机号码搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.mobile,callback:function(t){e.$set(e.listQuery,"mobile",t)},expression:"listQuery.mobile"}})],1),e._v(" "),i("el-col",{attrs:{sm:4}},[i("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入洗车工手机号码搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.worker_mobile,callback:function(t){e.$set(e.listQuery,"worker_mobile",t)},expression:"listQuery.worker_mobile"}})],1),e._v(" "),i("el-col",{attrs:{sm:3}},[i("el-select",{attrs:{size:"medium",placeholder:"订单状态",clearable:""},model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},e._l(e.statusOptions,function(e){return i("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})}),1)],1),e._v(" "),i("el-col",{attrs:{sm:6}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right",size:"medium","unlink-panels":"","range-separator":"-","start-placeholder":"发起订单开始日期","end-placeholder":"发起订单结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd",format:"yyyy年 MM月 dd日"},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}})],1),e._v(" "),i("el-col",{attrs:{sm:2}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"medium"},on:{click:e.handleFilter}},[e._v("\n        搜索\n      ")])],1)],1),e._v(" "),i("div",{staticClass:"table-container"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"mini"}},[i("el-table-column",{attrs:{label:"订单编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewOrder(a.id)}}},[e._v(e._s(a.id))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"客户手机号码",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewUser(a.user_id)}}},[e._v(e._s(a.mobile))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"客户姓名",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.nickname))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"洗车工手机号码",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewUser(a.worker_user_id)}}},[e._v(e._s(a.worker_mobile))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"洗车工姓名",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.worker_nickname))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"状态",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[1==a.status?i("el-tag",{attrs:{size:"small",type:"warning"}},[e._v("待接单")]):e._e(),e._v(" "),2==a.status?i("el-tag",{attrs:{size:"small"}},[e._v("已接单")]):e._e(),e._v(" "),3==a.status?i("el-tag",{attrs:{size:"small"}},[e._v("开始洗车")]):e._e(),e._v(" "),4==a.status?i("el-tag",{attrs:{size:"small",type:"success"}},[e._v("已完成")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"车辆类型",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.size_name))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"客户支付金额",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.money))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"洗车工获取金额",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.worker_money))])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"发起时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.created_at))])]}}])}),e._v(" "),i("el-table-column",{staticClass:"fixed-width",attrs:{label:"完成时间","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[i("span",[e._v(e._s(a.finished_at))])]}}])})],1)],1),e._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),i("user-info",{attrs:{"user-id":e.userId,"info-visible":e.userVisible},on:{"update:infoVisible":function(t){e.userVisible=t},"update:info-visible":function(t){e.userVisible=t}}}),e._v(" "),i("order-info",{attrs:{"order-id":e.orderId,"info-visible":e.orderVisible},on:{"update:infoVisible":function(t){e.orderVisible=t},"update:info-visible":function(t){e.orderVisible=t}}})],1)},n=[],s=i("b775"),l="/order";function r(e){return Object(s["a"])({url:l+"/index",method:"get",params:e})}var o=i("6724"),u=i("4381"),c=i("333d"),d=i("fa84"),p=i("c301"),f={components:{Pagination:c["a"],UserInfo:d["a"],OrderInfo:p["a"]},directives:{waves:o["a"],permission:u["a"]},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-6048e5),e.$emit("pick",[i,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-2592e6),e.$emit("pick",[i,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-7776e6),e.$emit("pick",[i,t])}}]},list:[],total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"-id"},statusOptions:[{name:"待接单",key:1},{name:"已接单",key:2},{name:"开始洗车",key:3},{name:"已完成",key:4}],userVisible:!1,userId:0,orderVisible:!1,orderId:0}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,r(this.listQuery).then(function(t){e.list=t.data.list,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleViewUser:function(e){this.userId=e,this.userVisible=!0},handleViewOrder:function(e){this.orderId=e,this.orderVisible=!0}}},m=f,_=i("2877"),v=Object(_["a"])(m,a,n,!1,null,null,null);t["default"]=v.exports}}]);