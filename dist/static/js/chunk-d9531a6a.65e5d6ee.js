(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9531a6a"],{"1c64":function(t,e,a){},"1cc6":function(t,e,a){"use strict";var i=a("1c64"),s=a.n(i);s.a},"333d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},s=[];a("c5f6");Math.easeInOutQuad=function(t,e,a,i){return t/=i/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,a){var i=r(),s=t-i,l=20,c=0;e="undefined"===typeof e?500:e;var f=function t(){c+=l;var r=Math.easeInOutQuad(c,i,s,e);o(r),c<e?n(t):a&&"function"===typeof a&&a()};f()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},f=c,u=(a("1cc6"),a("2877")),d=Object(u["a"])(f,i,s,!1,null,"f3b72548",null);e["a"]=d.exports},4381:function(t,e,a){"use strict";a("6762"),a("2fdb");var i=a("4360"),s={inserted:function(t,e,a){var s=e.value,n=i["a"].getters&&i["a"].getters.roles;if(!(s&&s instanceof Array&&s.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var o=s,r=n.some(function(t){return!!n.includes("super_admin")||o.includes(t)});r||t.parentNode&&t.parentNode.removeChild(t)}},n=function(t){t.directive("permission",s)};window.Vue&&(window["permission"]=s,Vue.use(n)),s.install=n;e["a"]=s},"5dbc":function(t,e,a){var i=a("d3f4"),s=a("8b97").set;t.exports=function(t,e,a){var n,o=e.constructor;return o!==a&&"function"==typeof o&&(n=o.prototype)!==a.prototype&&i(n)&&s&&s(t,n),t}},6724:function(t,e,a){"use strict";a("8d41");var i="@@wavesContext";function s(t,e){function a(a){var i=Object.assign({},e.value),s=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),n=s.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var o=n.getBoundingClientRect(),r=n.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(o.width,o.height)+"px",n.appendChild(r)),s.type){case"center":r.style.top=o.height/2-r.offsetHeight/2+"px",r.style.left=o.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(a.pageY-o.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(a.pageX-o.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=s.color,r.className="waves-ripple z-active",!1}}return t[i]?t[i].removeHandle=a:t[i]={removeHandle:a},a}var n={bind:function(t,e){t.addEventListener("click",s(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[i].removeHandle,!1),t.addEventListener("click",s(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[i].removeHandle,!1),t[i]=null,delete t[i]}},o=function(t){t.directive("waves",n)};window.Vue&&(window.waves=n,Vue.use(o)),n.install=o;e["a"]=n},"71ac":function(t,e,a){"use strict";var i=a("c327"),s=a.n(i);s.a},8194:function(t,e,a){"use strict";a.d(e,"e",function(){return n}),a.d(e,"c",function(){return o}),a.d(e,"b",function(){return r}),a.d(e,"a",function(){return l}),a.d(e,"d",function(){return c});var i=a("b775"),s="/user";function n(t){return Object(i["a"])({url:s+"/index",method:"get",params:t})}function o(t){return Object(i["a"])({url:s+"/edit",method:"post",data:t})}function r(t){return Object(i["a"])({url:s+"/create",method:"post",data:t})}function l(t){return Object(i["a"])({url:s+"/change-status",method:"post",data:t})}function c(t){return Object(i["a"])({url:s+"/info",method:"get",params:t})}},"8b97":function(t,e,a){var i=a("d3f4"),s=a("cb7c"),n=function(t,e){if(s(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=a("9b43")(Function.call,a("11e9").f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(s){e=!0}return function(t,a){return n(t,a),e?t.__proto__=a:i(t,a),t}}({},!1):void 0),check:n}},"8d41":function(t,e,a){},aa77:function(t,e,a){var i=a("5ca1"),s=a("be13"),n=a("79e5"),o=a("fdef"),r="["+o+"]",l="​",c=RegExp("^"+r+r+"*"),f=RegExp(r+r+"*$"),u=function(t,e,a){var s={},r=n(function(){return!!o[t]()||l[t]()!=l}),c=s[t]=r?e(d):o[t];a&&(s[a]=c),i(i.P+i.F*r,"String",s)},d=u.trim=function(t,e){return t=String(s(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(f,"")),t};t.exports=u},c301:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-drawer",{attrs:{title:"订单信息",size:"65%",visible:t.infoVisible,"before-close":t.handleClose},on:{"update:visible":function(e){t.infoVisible=e},open:t.handleOpen}},[a("el-card",{staticClass:"box-card user-wrapper"},[a("div",[a("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold"}},[t._v("基本信息")])]),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("订单编号：")]),t._v(t._s(t.info.id))]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("客户手机号码：")]),t._v(t._s(t.info.mobile))]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("洗车工编号：")]),t._v(t._s(t.info.worker_user_id))])],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("地址："+t._s(t.info.address))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("详细地址："+t._s(t.info.address_detail))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("发起时间："+t._s(t.info.created_at))])])],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("车牌号："+t._s(t.info.licence_plate))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("车型："+t._s(t.info.size_name))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("订单类型："+t._s(t.info.type_name))])])],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:12}},[a("span",{staticClass:"info-label"},[t._v("洗车工接单/系统派单时间："+t._s(t.info.take_at))])]),t._v(" "),a("el-col",{attrs:{sm:12}},[a("span",{staticClass:"info-label"},[t._v("开始洗车时间："+t._s(t.info.wash_at))])])],1)],1),t._v(" "),a("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold"}},[t._v("订单状态")])]),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("当前状态："+t._s(t.info.state))])]),t._v(" "),t.info.wash_at?a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("洗车开始时间："+t._s(t.info.wash_at))])]):t._e(),t._v(" "),t.info.finish_at?a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("完成时间："+t._s(t.info.finish_at))])]):t._e(),t._v(" "),2==t.info.is_start?a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("预约开始时间："+t._s(t.info.start_at))])]):t._e(),t._v(" "),t.info.cancel_at?a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("取消时间："+t._s(t.info.cancel_at))])]):t._e(),t._v(" "),t.info.cancel_reason?a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("取消原因："+t._s(t.info.cancel_reason))])]):t._e(),t._v(" "),a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("支付金额："+t._s(t.info.money))])]),t._v(" "),a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("洗车工报酬："+t._s(t.info.worker_money))])]),t._v(" "),a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("支付方式："+t._s(1==t.info.pay_type?"余额支付":"微信支付"))])]),t._v(" "),a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("洗车工报酬："+t._s(t.info.worker_money))])]),t._v(" "),a("el-col",{staticClass:"info-col",attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("是否由后台派单："+t._s(1==t.info.is_dispatch?"是":"不是"))])])],1)],1),t._v(" "),1==t.info.status&&1==t.info.is_start?a("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold"}},[t._v("指派订单")])]),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,stripe:""}},[a("el-table-column",{attrs:{prop:"worker_user_id",label:"洗车工编号",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"洗车工号码",width:"250"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"名字",width:"220"}}),t._v(" "),a("el-table-column",{attrs:{prop:"distance",label:"距离",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"worker_user_id",label:"指派订单"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(a){return t.dispatch(e.row.worker_user_id)}}},[t._v("派单")])]}}],null,!1,1519287995)})],1)],1)])],1):t._e(),t._v(" "),t.info.detail.before_qianbaoxian?a("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold"}},[t._v("洗车前照片")])]),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.before_qianbaoxian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_qianbaoxian,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_zuoqian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_zuoqian,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_youqian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_youqian,fit:"contain"}}):t._e()],1)],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.before_zuohou?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_zuohou,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_youhou?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_youhou,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_zuoce?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_zuoce,fit:"contain"}}):t._e()],1)],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.before_youce?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_youce,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_houbaoxian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_houbaoxian,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_qianpai?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_qianpai,fit:"contain"}}):t._e()],1)],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.before_houpai?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_houpai,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_zhongkong?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_zhongkong,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.before_houbei?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.before_houbei,fit:"contain"}}):t._e()],1)],1)],1):t._e(),t._v(" "),t.info.detail.after_qianbaoxian?a("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold"}},[t._v("洗车前照片")])]),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.after_qianbaoxian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_qianbaoxian,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_zuoqian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_zuoqian,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_youqian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_youqian,fit:"contain"}}):t._e()],1)],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.after_zuohou?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_zuohou,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_youhou?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_youhou,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_zuoce?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_zuoce,fit:"contain"}}):t._e()],1)],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.after_youce?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_youce,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_houbaoxian?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_houbaoxian,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_qianpai?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_qianpai,fit:"contain"}}):t._e()],1)],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[t.info.detail.after_houpai?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_houpai,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_zhongkong?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_zhongkong,fit:"contain"}}):t._e()],1),t._v(" "),a("el-col",{attrs:{sm:8}},[t.info.detail.after_houbei?a("el-image",{staticStyle:{width:"100%"},attrs:{src:t.info.detail.after_houbei,fit:"contain"}}):t._e()],1)],1)],1):t._e()],1)])],1)],1)},s=[],n=a("f8b7"),o={name:"OrderInfo",props:["infoVisible","orderId"],data:function(){return{info:{detail:{}},list:[]}},methods:{handleClose:function(){this.$emit("update:infoVisible",!1)},handleOpen:function(){this.getInfo()},getInfo:function(){var t=this;Object(n["c"])({id:this.orderId}).then(function(e){t.info=e.data,1==e.data.status&&1==e.data.is_start&&t.getWorkers()})},getWorkers:function(){var t=this;Object(n["e"])({id:this.orderId}).then(function(e){t.list=e.data.list})},dispatch:function(t){var e=this;console.log(t),Object(n["a"])({worker_user_id:t,id:this.orderId}).then(function(t){e.$notify({title:"成功",message:"派发订单成功",type:"success",duration:2e3}),e.getInfo()})}}},r=o,l=(a("71ac"),a("2877")),c=Object(l["a"])(r,i,s,!1,null,null,null);e["a"]=c.exports},c327:function(t,e,a){},c5f6:function(t,e,a){"use strict";var i=a("7726"),s=a("69a8"),n=a("2d95"),o=a("5dbc"),r=a("6a99"),l=a("79e5"),c=a("9093").f,f=a("11e9").f,u=a("86cc").f,d=a("aa77").trim,_="Number",p=i[_],m=p,v=p.prototype,b=n(a("2aeb")(v))==_,h="trim"in String.prototype,g=function(t){var e=r(t,!1);if("string"==typeof e&&e.length>2){e=h?e.trim():d(e,3);var a,i,s,n=e.charCodeAt(0);if(43===n||45===n){if(a=e.charCodeAt(2),88===a||120===a)return NaN}else if(48===n){switch(e.charCodeAt(1)){case 66:case 98:i=2,s=49;break;case 79:case 111:i=8,s=55;break;default:return+e}for(var o,l=e.slice(2),c=0,f=l.length;c<f;c++)if(o=l.charCodeAt(c),o<48||o>s)return NaN;return parseInt(l,i)}}return+e};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof p&&(b?l(function(){v.valueOf.call(a)}):n(a)!=_)?o(new m(g(e)),a,p):g(e)};for(var w,y=a("9e1e")?c(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;y.length>C;C++)s(m,w=y[C])&&!s(p,w)&&u(p,w,f(m,w));p.prototype=v,v.constructor=p,a("2aba")(i,_,p)}},d1ae:function(t,e,a){},d7a5:function(t,e,a){"use strict";var i=a("d1ae"),s=a.n(i);s.a},f8b7:function(t,e,a){"use strict";a.d(e,"d",function(){return n}),a.d(e,"b",function(){return o}),a.d(e,"c",function(){return r}),a.d(e,"e",function(){return l}),a.d(e,"a",function(){return c});var i=a("b775"),s="/order";function n(t){return Object(i["a"])({url:s+"/index",method:"get",params:t})}function o(t){return Object(i["a"])({url:s+"/export",method:"get",params:t})}function r(t){return Object(i["a"])({url:s+"/info",method:"get",params:t})}function l(t){return Object(i["a"])({url:s+"/workers",method:"get",params:t})}function c(t){return Object(i["a"])({url:s+"/dispatch",method:"post",data:t})}},fa84:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-drawer",{attrs:{title:"用户信息",size:"65%",visible:t.infoVisible,"before-close":t.handleClose},on:{"update:visible":function(e){t.infoVisible=e},open:t.handleOpen}},[a("el-card",{staticClass:"box-card user-wrapper"},[a("div",[a("el-card",{staticClass:"box-card mb-30",attrs:{shadow:"hover"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold"}},[t._v("基本信息")])]),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("用户编号：")]),t._v(t._s(t.info.id))]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("手机号码：")]),t._v(t._s(t.info.mobile))]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("注册倾向：")]),t._v(t._s(1==t.info.prefer?"洗车工":"客户"))])],1),t._v(" "),a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("注册时间：")]),t._v(t._s(t.info.created_at))]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("昵称：")]),t._v(t._s(t.info.nickname))]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("状态：")]),t._v(t._s(1==t.info.status?"正常":"禁止登录"))])],1),t._v(" "),1==t.info.prefer?a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("评分："+t._s(t.info.rate))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("完成订单数："+t._s(t.info.completed))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("今日收入："+t._s(t.info.today_money))])])],1):t._e(),t._v(" "),2==t.info.prefer?a("el-row",{staticClass:"mb-20",attrs:{gutter:10}},[a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("下单数："+t._s(t.info.order_num))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("余额："+t._s(t.info.remain_money))])]),t._v(" "),a("el-col",{attrs:{sm:8}},[a("span",{staticClass:"info-label"},[t._v("消费金额："+t._s(t.info.total_money))])])],1):t._e()],1)],1)])],1)],1)},s=[],n=a("8194"),o={name:"UserInfo",props:["infoVisible","userId"],data:function(){return{info:{}}},methods:{handleClose:function(){this.$emit("update:infoVisible",!1)},handleOpen:function(){this.getInfo()},getInfo:function(){var t=this;Object(n["d"])({id:this.userId}).then(function(e){t.info=e.data})}}},r=o,l=(a("d7a5"),a("2877")),c=Object(l["a"])(r,i,s,!1,null,null,null);e["a"]=c.exports},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);