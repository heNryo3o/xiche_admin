(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54b3d005"],{"1c64":function(e,t,n){},"1cc6":function(e,t,n){"use strict";var a=n("1c64"),i=n.n(a);i.a},"333d":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},i=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,n){var a=s(),i=e-a,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var s=Math.easeInOutQuad(c,a,i,t);o(s),c<t?r(e):n&&"function"===typeof n&&n()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(n("1cc6"),n("2877")),f=Object(d["a"])(u,a,i,!1,null,"f3b72548",null);t["a"]=f.exports},4381:function(e,t,n){"use strict";n("6762"),n("2fdb");var a=n("4360"),i={inserted:function(e,t,n){var i=t.value,r=a["a"].getters&&a["a"].getters.roles;if(!(i&&i instanceof Array&&i.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=i,s=r.some(function(e){return!!r.includes("super_admin")||o.includes(e)});s||e.parentNode&&e.parentNode.removeChild(e)}},r=function(e){e.directive("permission",i)};window.Vue&&(window["permission"]=i,Vue.use(r)),i.install=r;t["a"]=i},5723:function(e,t,n){"use strict";n.d(t,"g",function(){return r}),n.d(t,"e",function(){return o}),n.d(t,"d",function(){return s}),n.d(t,"h",function(){return l}),n.d(t,"f",function(){return c}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return d}),n.d(t,"b",function(){return f});var a=n("b775"),i="/account";function r(e){return Object(a["a"])({url:i+"/worker-deposit",method:"get",params:e})}function o(e){return Object(a["a"])({url:i+"/user-deposit",method:"get",params:e})}function s(e){return Object(a["a"])({url:i+"/success-order",method:"get",params:e})}function l(e){return Object(a["a"])({url:i+"/worker-withdraw",method:"get",params:e})}function c(e){return Object(a["a"])({url:i+"/withdraw-audit",method:"post",data:e})}function u(e){return Object(a["a"])({url:i+"/coupon-index",method:"get",params:e})}function d(e){return Object(a["a"])({url:i+"/coupon-create",method:"post",data:e})}function f(e){return Object(a["a"])({url:i+"/coupon-destroy",method:"post",data:e})}},"5dbc":function(e,t,n){var a=n("d3f4"),i=n("8b97").set;e.exports=function(e,t,n){var r,o=t.constructor;return o!==n&&"function"==typeof o&&(r=o.prototype)!==n.prototype&&a(r)&&i&&i(e,r),e}},6724:function(e,t,n){"use strict";n("8d41");var a="@@wavesContext";function i(e,t){function n(n){var a=Object.assign({},t.value),i=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=i.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",r.appendChild(s)),i.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=i.color,s.className="waves-ripple z-active",!1}}return e[a]?e[a].removeHandle=n:e[a]={removeHandle:n},n}var r={bind:function(e,t){e.addEventListener("click",i(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[a].removeHandle,!1),e.addEventListener("click",i(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[a].removeHandle,!1),e[a]=null,delete e[a]}},o=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;t["a"]=r},8194:function(e,t,n){"use strict";n.d(t,"f",function(){return r}),n.d(t,"d",function(){return o}),n.d(t,"c",function(){return s}),n.d(t,"b",function(){return l}),n.d(t,"a",function(){return c}),n.d(t,"e",function(){return u});var a=n("b775"),i="/user";function r(e){return Object(a["a"])({url:i+"/index",method:"get",params:e})}function o(e){return Object(a["a"])({url:i+"/edit",method:"post",data:e})}function s(e){return Object(a["a"])({url:i+"/deposit",method:"post",data:e})}function l(e){return Object(a["a"])({url:i+"/create",method:"post",data:e})}function c(e){return Object(a["a"])({url:i+"/change-status",method:"post",data:e})}function u(e){return Object(a["a"])({url:i+"/info",method:"get",params:e})}},"854f":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-row",{staticClass:"filter-container",attrs:{gutter:10}},[n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入手机号码搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.mobile,callback:function(t){e.$set(e.listQuery,"mobile",t)},expression:"listQuery.mobile"}})],1),e._v(" "),n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入姓名搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.nickname,callback:function(t){e.$set(e.listQuery,"nickname",t)},expression:"listQuery.nickname"}})],1),e._v(" "),n("el-col",{attrs:{sm:6}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right",size:"medium","unlink-panels":"","range-separator":"-","start-placeholder":"支付开始日期","end-placeholder":"支付结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd",format:"yyyy年 MM月 dd日"},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}})],1),e._v(" "),n("el-col",{attrs:{sm:5}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"medium"},on:{click:e.handleFilter}},[e._v("\n        搜索\n      ")])],1)],1),e._v(" "),n("div",{staticClass:"table-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"mini"}},[n("el-table-column",{attrs:{label:"手机号码",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleViewUser(a.user_id)}}},[e._v(e._s(a.mobile))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"姓名",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.nickname))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"支付时间",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.created_at))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"支付金额",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.money))])]}}])}),e._v(" "),n("el-table-column",{staticClass:"fixed-width",attrs:{label:"支付方式","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[1==a.type?n("span",[e._v("微信支付")]):e._e()]}}])})],1)],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("user-info",{attrs:{"user-id":e.userId,"info-visible":e.userVisible},on:{"update:infoVisible":function(t){e.userVisible=t},"update:info-visible":function(t){e.userVisible=t}}})],1)},i=[],r=n("5723"),o=n("6724"),s=n("4381"),l=n("333d"),c=n("fa84"),u={components:{Pagination:l["a"],UserInfo:c["a"]},directives:{waves:o["a"],permission:s["a"]},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]},list:[],total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"-id"},userVisible:!1,userId:0}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(r["e"])(this.listQuery).then(function(t){e.list=t.data.list,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleViewUser:function(e){this.userId=e,this.userVisible=!0}}},d=u,f=n("2877"),p=Object(f["a"])(d,a,i,!1,null,null,null);t["default"]=p.exports},"8b97":function(e,t,n){var a=n("d3f4"),i=n("cb7c"),r=function(e,t){if(i(e),!a(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,a){try{a=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),a(e,[]),t=!(e instanceof Array)}catch(i){t=!0}return function(e,n){return r(e,n),t?e.__proto__=n:a(e,n),e}}({},!1):void 0),check:r}},"8d41":function(e,t,n){},aa77:function(e,t,n){var a=n("5ca1"),i=n("be13"),r=n("79e5"),o=n("fdef"),s="["+o+"]",l="​",c=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),d=function(e,t,n){var i={},s=r(function(){return!!o[e]()||l[e]()!=l}),c=i[e]=s?t(f):o[e];n&&(i[n]=c),a(a.P+a.F*s,"String",i)},f=d.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(u,"")),e};e.exports=d},c5f6:function(e,t,n){"use strict";var a=n("7726"),i=n("69a8"),r=n("2d95"),o=n("5dbc"),s=n("6a99"),l=n("79e5"),c=n("9093").f,u=n("11e9").f,d=n("86cc").f,f=n("aa77").trim,p="Number",m=a[p],v=m,h=m.prototype,b=r(n("2aeb")(h))==p,g="trim"in String.prototype,_=function(e){var t=s(e,!1);if("string"==typeof t&&t.length>2){t=g?t.trim():f(t,3);var n,a,i,r=t.charCodeAt(0);if(43===r||45===r){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(t.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+t}for(var o,l=t.slice(2),c=0,u=l.length;c<u;c++)if(o=l.charCodeAt(c),o<48||o>i)return NaN;return parseInt(l,a)}}return+t};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof m&&(b?l(function(){h.valueOf.call(n)}):r(n)!=p)?o(new v(_(t)),n,m):_(t)};for(var y,w=n("9e1e")?c(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;w.length>k;k++)i(v,y=w[k])&&!i(m,y)&&d(m,y,u(v,y));m.prototype=h,h.constructor=m,n("2aba")(a,p,m)}},d1ae:function(e,t,n){},d7a5:function(e,t,n){"use strict";var a=n("d1ae"),i=n.n(a);i.a},fa84:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-drawer",{attrs:{title:"用户信息",size:"65%",visible:e.infoVisible,"before-close":e.handleClose},on:{"update:visible":function(t){e.infoVisible=t},open:e.handleOpen}},[n("el-card",{staticClass:"box-card user-wrapper"},[n("div",[n("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",{staticStyle:{"font-weight":"bold"}},[e._v("基本信息")])]),e._v(" "),n("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("用户编号：")]),e._v(e._s(e.info.id))]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("手机号码：")]),e._v(e._s(e.info.mobile))]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("注册倾向：")]),e._v(e._s(1==e.info.prefer?"洗车工":"客户"))])],1),e._v(" "),n("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("注册时间：")]),e._v(e._s(e.info.created_at))]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("昵称：")]),e._v(e._s(e.info.nickname))]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("状态：")]),e._v(e._s(1==e.info.status?"正常":"禁止登录"))])],1),e._v(" "),1==e.info.prefer?n("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("评分："+e._s(e.info.rate))])]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("完成订单数："+e._s(e.info.completed))])]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("今日收入："+e._s(e.info.today_money))])])],1):e._e(),e._v(" "),2==e.info.prefer?n("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("下单数："+e._s(e.info.order_num))])]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("余额："+e._s(e.info.remain_money))])]),e._v(" "),n("el-col",{attrs:{sm:8}},[n("span",{staticClass:"info-label"},[e._v("消费金额："+e._s(e.info.total_money))])])],1):e._e()],1)],1)])],1)],1)},i=[],r=n("8194"),o={name:"UserInfo",props:["infoVisible","userId"],data:function(){return{info:{}}},methods:{handleClose:function(){this.$emit("update:infoVisible",!1)},handleOpen:function(){this.getInfo()},getInfo:function(){var e=this;Object(r["e"])({id:this.userId}).then(function(t){e.info=t.data})}}},s=o,l=(n("d7a5"),n("2877")),c=Object(l["a"])(s,a,i,!1,null,null,null);t["a"]=c.exports},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);