(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2024d11e"],{"09f4":function(e,t,n){"use strict";n.d(t,"a",function(){return s}),Math.easeInOutQuad=function(e,t,n,i){return e/=i/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function a(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(e,t,n){var s=r(),o=e-s,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var r=Math.easeInOutQuad(u,s,o,t);a(r),u<t?i(e):n&&"function"===typeof n&&n()};c()}},4381:function(e,t,n){"use strict";n("6762"),n("2fdb");var i=n("4360"),a={inserted:function(e,t,n){var a=t.value,r=i["a"].getters&&i["a"].getters.roles;if(!(a&&a instanceof Array&&a.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var s=a,o=r.some(function(e){return!!r.includes("super_admin")||s.includes(e)});o||e.parentNode&&e.parentNode.removeChild(e)}},r=function(e){e.directive("permission",a)};window.Vue&&(window["permission"]=a,Vue.use(r)),a.install=r;t["a"]=a},"5dbc":function(e,t,n){var i=n("d3f4"),a=n("8b97").set;e.exports=function(e,t,n){var r,s=t.constructor;return s!==n&&"function"==typeof s&&(r=s.prototype)!==n.prototype&&i(r)&&a&&a(e,r),e}},6724:function(e,t,n){"use strict";n("8d41");var i="@@wavesContext";function a(e,t){function n(n){var i=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),r=a.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var s=r.getBoundingClientRect(),o=r.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",r.appendChild(o)),a.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(n.pageY-s.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(n.pageX-s.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=a.color,o.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var r={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},s=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(s)),r.install=s;t["a"]=r},"7a63":function(e,t,n){"use strict";var i=n("8be6"),a=n.n(i);a.a},8194:function(e,t,n){"use strict";n.d(t,"f",function(){return r}),n.d(t,"d",function(){return s}),n.d(t,"c",function(){return o}),n.d(t,"b",function(){return l}),n.d(t,"e",function(){return u}),n.d(t,"h",function(){return c}),n.d(t,"l",function(){return d}),n.d(t,"k",function(){return f}),n.d(t,"j",function(){return p}),n.d(t,"i",function(){return m}),n.d(t,"g",function(){return v}),n.d(t,"a",function(){return h});var i=n("b775"),a="/user";function r(e){return Object(i["a"])({url:a+"/index",method:"get",params:e})}function s(e){return Object(i["a"])({url:a+"/edit",method:"post",data:e})}function o(e){return Object(i["a"])({url:a+"/create",method:"post",data:e})}function l(e){return Object(i["a"])({url:a+"/change-status",method:"post",data:e})}function u(e){return Object(i["a"])({url:a+"/info",method:"get",params:e})}function c(e){return Object(i["a"])({url:a+"/login-calculate",method:"get",params:e})}function d(e){return Object(i["a"])({url:a+"/validate-info",method:"get",params:e})}function f(e){return Object(i["a"])({url:a+"/store-info",method:"get",params:e})}function p(e){return Object(i["a"])({url:a+"/service-list",method:"get",params:e})}function m(e){return Object(i["a"])({url:a+"/publish-task",method:"get",params:e})}function v(e){return Object(i["a"])({url:a+"/join-task",method:"get",params:e})}function h(e){return Object(i["a"])({url:a+"/cases-list",method:"get",params:e})}},"8b97":function(e,t,n){var i=n("d3f4"),a=n("cb7c"),r=function(e,t){if(a(e),!i(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,i){try{i=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),i(e,[]),t=!(e instanceof Array)}catch(a){t=!0}return function(e,n){return r(e,n),t?e.__proto__=n:i(e,n),e}}({},!1):void 0),check:r}},"8be6":function(e,t,n){},"8d41":function(e,t,n){},aa77:function(e,t,n){var i=n("5ca1"),a=n("be13"),r=n("79e5"),s=n("fdef"),o="["+s+"]",l="​",u=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),d=function(e,t,n){var a={},o=r(function(){return!!s[e]()||l[e]()!=l}),u=a[e]=o?t(f):s[e];n&&(a[n]=u),i(i.P+i.F*o,"String",a)},f=d.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(c,"")),e};e.exports=d},c5f6:function(e,t,n){"use strict";var i=n("7726"),a=n("69a8"),r=n("2d95"),s=n("5dbc"),o=n("6a99"),l=n("79e5"),u=n("9093").f,c=n("11e9").f,d=n("86cc").f,f=n("aa77").trim,p="Number",m=i[p],v=m,h=m.prototype,g=r(n("2aeb")(h))==p,b="trim"in String.prototype,_=function(e){var t=o(e,!1);if("string"==typeof t&&t.length>2){t=b?t.trim():f(t,3);var n,i,a,r=t.charCodeAt(0);if(43===r||45===r){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(t.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+t}for(var s,l=t.slice(2),u=0,c=l.length;u<c;u++)if(s=l.charCodeAt(u),s<48||s>a)return NaN;return parseInt(l,i)}}return+t};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof m&&(g?l(function(){h.valueOf.call(n)}):r(n)!=p)?s(new v(_(t)),n,m):_(t)};for(var y,w=n("9e1e")?u(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;w.length>k;k++)a(v,y=w[k])&&!a(m,y)&&d(m,y,c(v,y));m.prototype=h,h.constructor=m,n("2aba")(i,p,m)}},cb29:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-row",{staticClass:"filter-container",attrs:{gutter:10}},[n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入手机号码搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.mobile,callback:function(t){e.$set(e.listQuery,"mobile",t)},expression:"listQuery.mobile"}})],1),e._v(" "),n("el-col",{attrs:{sm:4}},[n("el-input",{attrs:{size:"medium","prefix-icon":"el-icon-search",placeholder:"输入用户姓名搜索",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.true_name,callback:function(t){e.$set(e.listQuery,"true_name",t)},expression:"listQuery.true_name"}})],1),e._v(" "),n("el-col",{attrs:{sm:3}},[n("el-select",{attrs:{placeholder:"认证状态",size:"medium",clearable:""},model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},e._l(e.statusOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})}),1)],1),e._v(" "),n("el-col",{attrs:{sm:6}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right",size:"medium","unlink-panels":"","range-separator":"-","start-placeholder":"提交开始日期","end-placeholder":"提交结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd",format:"yyyy年 MM月 dd日"},model:{value:e.listQuery.date_range,callback:function(t){e.$set(e.listQuery,"date_range",t)},expression:"listQuery.date_range"}})],1),e._v(" "),n("el-col",{attrs:{sm:7}},[n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"medium"},on:{click:e.handleFilter}},[e._v("\n        搜索\n      ")])],1)],1),e._v(" "),n("div",{staticClass:"table-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"",size:"mini"}},[n("el-table-column",{attrs:{label:"手机号码",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",{staticClass:"link-type",on:{click:function(t){return e.handleView(i.uid)}}},[e._v(e._s(i.mobile))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"姓名",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.true_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"身份证号码",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.id_card))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"提交认证时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.created_at))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"审核时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.audit_at))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"审核人",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("span",[e._v(e._s(i.admin_name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"认证状态状态",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[1==i.status?n("el-tag",{attrs:{type:"warning",size:"small"}},[n("span",[e._v("待审核")])]):2==i.status?n("el-tag",{attrs:{type:"success",size:"small"}},[n("span",[e._v("认证通过")])]):3==i.status?n("el-popover",{attrs:{placement:"bottom",title:"审核未通过原因：",width:"200",trigger:"hover",content:i.msg}},[n("el-tag",{staticClass:"cursor-type",attrs:{slot:"reference",type:"danger",size:"small"},slot:"reference"},[n("span",[e._v("认证被驳回")])])],1):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"180","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/change-status"],expression:"['role/change-status']"}],attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.handlePreview(i)}}},[e._v("\n            查看\n          ")]),e._v(" "),1==i.status?n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/change-status"],expression:"['role/change-status']"}],attrs:{size:"mini",type:"success"},on:{click:function(t){return e.handleChangeStatus(i,2)}}},[e._v("\n            通过\n          ")]):e._e(),e._v(" "),1==i.status?n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"permission",rawName:"v-permission",value:["role/change-status"],expression:"['role/change-status']"}],attrs:{size:"mini",type:"warning"},on:{click:function(t){return e.confirmDeny(i)}}},[e._v("\n            驳回\n          ")]):e._e()]}}])})],1)],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("user-info",{attrs:{"user-id":e.userId,"info-visible":e.infoVisible},on:{"update:infoVisible":function(t){e.infoVisible=t},"update:info-visible":function(t){e.infoVisible=t}}}),e._v(" "),n("el-dialog",{attrs:{title:"查看认证信息",width:"900px",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("div",{staticClass:"preview-container"},[n("div",{staticClass:"idcard-pic"},[n("el-image",{attrs:{src:e.temp.card_pic,fit:"contain"}}),e._v(" "),n("el-image",{attrs:{src:e.temp.card_pic_back,fit:"contain"}}),e._v(" "),n("el-image",{attrs:{src:e.temp.card_pic_hand,fit:"contain"}})],1),e._v(" "),n("p",[e._v("\n        姓名: "+e._s(e.temp.true_name)+"\n      ")]),e._v(" "),n("p",[e._v("\n        身份证号码: "+e._s(e.temp.id_card)+"\n      ")])]),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer",align:"center"},slot:"footer"},[n("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("\n        取消\n      ")]),e._v(" "),1==e.temp.status?n("el-button",{attrs:{type:"success",size:"small"},on:{click:function(t){return e.handleChangeStatus(e.temp,2)}}},[e._v("\n        通过审核\n      ")]):e._e(),e._v(" "),1==e.temp.status?n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.confirmDeny(e.temp)}}},[e._v("\n        驳回审核\n      ")]):e._e()],1)])],1)},a=[],r=n("b775"),s="/worker-join";function o(e){return Object(r["a"])({url:s+"/index",method:"get",params:e})}function l(e){return Object(r["a"])({url:s+"/change-status",method:"post",data:e})}var u=n("6724"),c=n("4381"),d=n("333d"),f=n("fa84"),p={components:{Pagination:d["a"],UserInfo:f["a"]},directives:{waves:u["a"],permission:c["a"]},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]},statusOptions:[{name:"待审核",key:1},{name:"认证通过",key:2},{name:"认证被驳回",key:3}],dialogVisible:!1,dialogStatus:"",textMap:{update:"修改密码",create:"新增用户"},list:[],total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"-id"},infoVisible:!1,temp:{},userId:0}},created:function(){this.getList()},methods:{handlePreview:function(e){this.temp=e,this.dialogVisible=!0},getList:function(){var e=this;this.listLoading=!0,o(this.listQuery).then(function(t){e.list=t.data.list,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleView:function(e){this.userId=e,this.infoVisible=!0},confirmDeny:function(e){var t=this;this.$prompt("请填写驳回审核原因","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(n){var i=n.value;t.handleChangeStatus(e,3,i)})},handleChangeStatus:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=2===t?"通过审核成功":"驳回审核成功";l({id:e.id,status:t,msg:i}).then(function(e){n.dialogVisible=!1,n.$notify({title:"成功",message:a,type:"success",duration:2e3}),n.getList()})}}},m=p,v=(n("7a63"),n("2877")),h=Object(v["a"])(m,i,a,!1,null,null,null);t["default"]=h.exports},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);