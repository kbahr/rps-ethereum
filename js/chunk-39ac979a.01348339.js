(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39ac979a"],{2677:function(e,t,a){"use strict";var n=a("8654"),i=(a("7e63"),a("d9bd")),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},s={name:"v-textarea",extends:n["a"],props:{autoGrow:Boolean,noResize:Boolean,outline:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(e){return!isNaN(parseFloat(e))}},rows:{type:[Number,String],default:5,validator:function(e){return!isNaN(parseInt(e,10))}}},computed:{classes:function(){return r({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},n["a"].options.computed.classes.call(this,null))},dynamicHeight:function(){return this.autoGrow?this.inputHeight:"auto"},isEnclosed:function(){return this.textarea||n["a"].options.computed.isEnclosed.call(this)},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){!this.internalChange&&this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var e=this;setTimeout(function(){e.autoGrow&&e.calculateInputHeight()},0),this.autoGrow&&this.noResize&&Object(i["b"])('"no-resize" is now implied when using "auto-grow", and can be removed',this)},methods:{calculateInputHeight:function(){var e=this.$refs.input;if(e){e.style.height=0;var t=e.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);e.style.height=Math.max(a,t)+"px"}},genInput:function(){var e=n["a"].options.methods.genInput.call(this);return e.tag="textarea",delete e.data.attrs.type,e.data.attrs.rows=this.rows,e},onInput:function(e){n["a"].options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.internalChange=!0,this.$emit("keydown",e)}}},l=a("7cf7"),o=a("ab6d");a.d(t,"a",function(){return d});var d={functional:!0,$_wrapperFor:n["a"],props:{textarea:Boolean,multiLine:Boolean},render:function(e,t){var a=t.props,r=t.data,c=t.slots,u=t.parent;Object(o["a"])(r);var f=Object(l["a"])(c(),e);return a.textarea&&Object(i["d"])("<v-text-field textarea>","<v-textarea outline>",d,u),a.multiLine&&Object(i["d"])("<v-text-field multi-line>","<v-textarea>",d,u),a.textarea||a.multiLine?(r.attrs.outline=a.textarea,e(s,r,f)):e(n["a"],r,f)}}},"7dd7":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("referral-link-generator"),a("account-referral-stats")],1)},i=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("v-list",{staticClass:"mb-4",attrs:{"two-line":"",subheader:""}},[a("v-subheader",[e._v("Referral Links")]),a("v-list-tile",{class:{"red--text":!e.linkAddressValid}},[a("v-list-tile-action",[a("v-btn",{attrs:{flat:"",icon:"",disabled:!e.linkAddressValid},on:{click:function(t){return e.copyLink(e.baseLink)}}},[a("v-icon",[e._v("mdi-content-copy")])],1)],1),a("v-list-tile-content",[a("v-list-tile-title",[e._v(e._s(e.baseLink))]),a("v-list-tile-sub-title",[e._v("Links to the home page.")])],1)],1),a("v-list-tile",{class:{"red--text":!e.linkAddressValid}},[a("v-list-tile-action",[a("v-btn",{attrs:{flat:"",icon:"",disabled:!e.linkAddressValid},on:{click:function(t){return e.copyLink(e.playMoneyLink)}}},[a("v-icon",[e._v("mdi-content-copy")])],1)],1),a("v-list-tile-content",[a("v-list-tile-title",[e._v(e._s(e.playMoneyLink))]),a("v-list-tile-sub-title",[e._v("\n          Links a page giving free tokens to play with.\n        ")])],1)],1),a("v-list-tile",{class:{"red--text":!e.linkAddressValid}},[a("v-list-tile-action",[a("v-btn",{attrs:{flat:"",icon:"",disabled:!e.linkAddressValid},on:{click:function(t){return e.copyLink(e.createGameLink)}}},[a("v-icon",[e._v("mdi-content-copy")])],1)],1),a("v-list-tile-content",[a("v-list-tile-title",[e._v(e._s(e.createGameLink))]),a("v-list-tile-sub-title",[e._v("\n          Links to the game creation page.\n        ")])],1)],1),a("v-list-tile",{class:{"red--text":!e.linkAddressValid||!e.linkGameIdValid}},[a("v-list-tile-action",[a("v-btn",{attrs:{flat:"",icon:"",disabled:!e.linkAddressValid||!e.linkGameIdValid},on:{click:function(t){return e.copyLink(e.joinGameLink)}}},[a("v-icon",[e._v("mdi-content-copy")])],1)],1),a("v-list-tile-content",[a("v-list-tile-title",[e._v(e._s(e.joinGameLink))]),a("v-list-tile-sub-title",[e._v("\n          Links directly to game with gameId of "+e._s(e.referralGameId)+"\n        ")])],1)],1)],1),a("p",[e._v("\n    You can use/create a referral link using either your current address or\n    any other address.\n  ")]),a("v-text-field",{attrs:{placerholder:e.coinbase,label:"desired referral address",rules:e.addressRules},model:{value:e.referralAddress,callback:function(t){e.referralAddress=t},expression:"referralAddress"}}),a("p",[e._v("\n    For a bit of even more fine tuned control, you can also refer a player\n    directly to a game. Select a gameId below to create a link to a specific\n    game. The default with 0 below, creates a link to a game with gameId of 0\n    (this game doesn't exist).\n  ")]),a("v-text-field",{attrs:{label:"desired referral gameId",rules:e.gameIdRules,type:"number"},model:{value:e.referralGameId,callback:function(t){e.referralGameId=t},expression:"referralGameId"}}),a("v-btn",{on:{click:e.resetReferralAddress}},[e._v("\n    reset referral address to current address\n  ")])],1)},s=[],l=a("cebc"),o=a("e814"),d=a.n(o),c=a("2f62"),u={data:function(){var e=this;return{referralAddress:"",addressRules:[function(t){return e.isAddress(t)||"must be a valid address"}],gameIdRules:[function(e){return d()(e)>0||"must be a valid gameId which can be joined"}]}},computed:Object(l["a"])({},Object(c["d"])(["coinbase","game","selectedGameId"]),{gameData:function(){return this.game(this.referralGameId)},referralGameId:{get:function(){return this.selectedGameId},set:function(e){this.setSelectedGameId(e)}},referralSuffix:function(){return"?ref=".concat(this.referralAddress.toLowerCase())},baseLink:function(){return this.linkAddressValid?window.location.origin+this.referralSuffix:"Link is invalid. Make sure that the referral address is a properly formed address."},playMoneyLink:function(){return this.linkAddressValid?window.location.origin+"/play-money"+this.referralSuffix:"Link is invalid. Make sure that the referral address is a properly formed address."},createGameLink:function(){return this.linkAddressValid?window.location.origin+"/create-game"+this.referralSuffix:"Link is invalid. Make sure that the referral address is a properly formed address."},joinGameLink:function(){return this.linkGameIdValid&&this.linkAddressValid?window.location.origin+"/games/"+this.referralGameId+this.referralSuffix:"Link is invalid. Make sure that you are linking to a valid gameId and using a real address."},linkAddressValid:function(){return this.isAddress(this.referralAddress)},linkGameIdValid:function(){return"Created"===this.stageEnum[this.gameData.stage]}}),methods:Object(l["a"])({},Object(c["c"])(["createNotification","setSelectedGameId"]),{copyLink:function(e){var t=this;this.$copyText(e).then(function(){return t.onCopySuccess()}).catch(function(){return t.onCopyError()})},onCopySuccess:function(){this.createNotification("link copied to clipboard")},onCopyError:function(){this.createNotification("Could NOT copy link to clipboard")},resetReferralAddress:function(){this.referralAddress=this.coinbase}}),mounted:function(){this.referralAddress=this.coinbase}},f=u,m=a("2877"),h=a("6544"),p=a.n(h),v=a("8336"),b=a("132d"),k=a("8860"),y=a("ba95"),g=a("40fe"),x=a("5d23"),w=a("e0c7"),_=a("2677"),L=Object(m["a"])(f,r,s,!1,null,null,null),A=L.exports;p()(L,{VBtn:v["a"],VIcon:b["a"],VList:k["a"],VListTile:y["a"],VListTileAction:g["a"],VListTileContent:x["a"],VListTileSubTitle:x["b"],VListTileTitle:x["c"],VSubheader:w["a"],VTextField:_["a"]});var I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mt-4"},[a("p",{staticClass:"display-1"},[e._v("Referral Payment History")]),a("p",{staticClass:"headline"},[e._v("\n    Total Payments (all tokens/ether): "+e._s(e.weiToEth(e.referralPaymentTotal))+"\n  ")]),a("p",{staticClass:"headline"},[e._v("\n    Total Payments for selected items: "+e._s(e.weiToEth(e.sortedPaymentsTotal))+"\n  ")]),a("v-card",{staticClass:"mt-4"},[a("v-card-title",[e._v("\n      Past Referral Payments\n      "),a("v-spacer"),a("v-combobox",{attrs:{"append-icon":"search",label:"search for payments","single-line":"","hide-details":"",items:e.tokenDataArray,"item-text":"symbol","item-value":"address","return-object":!1},model:{value:e.paymentSearch,callback:function(t){e.paymentSearch=t},expression:"paymentSearch"}})],1),a("v-data-table",{staticClass:"elevation-1 mb-4",attrs:{headers:e.paymentHeaders,items:e.referralPayments,search:e.paymentSearch,pagination:e.pagination},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",{staticClass:"text-xs-left"},[e._v(e._s(t.item.blockNumber))]),a("td",{staticClass:"text-xs-left"},[e._v(e._s(e.weiToEth(t.item.value)))]),a("td",{staticClass:"text-xs-left"},[e._v("\n          "+e._s(e.shortenAddress(t.item.referred))+"\n        ")]),a("td",{staticClass:"text-xs-left"},[e._v("\n          "+e._s(e.shortenAddress(t.item.tokenAddress))+"\n        ")])]}}]),model:{value:e.sortedPayments,callback:function(t){e.sortedPayments=t},expression:"sortedPayments"}})],1)],1)},V=[],G=(a("6b54"),a("f5e0")),j={data:function(){return{pagination:{rowsPerPage:-1},paymentSearch:"",sortedPayments:[],paymentHeaders:[{text:"Block Number",value:"blockNumber"},{text:"Pay Amount",value:"value"},{text:"Referred Address",value:"referred"},{text:"Token Address",value:"tokenAddress"}]}},computed:Object(l["a"])({},Object(c["d"])(["referralPayments","referralPaymentTotal","tokenDataArray"]),{sortedPaymentsTotal:function(){return this.sortedPayments.reduce(function(e,t){return e.add(Object(G["toBN"])(t.value))},Object(G["toBN"])(0)).toString()}}),methods:Object(l["a"])({},Object(c["c"])(["getReferralPayments"])),mounted:function(){this.getReferralPayments()}},C=j,T=a("b0af"),P=a("12b2"),S=a("2b5d"),O=a("8fea"),R=a("9910"),N=Object(m["a"])(C,I,V,!1,null,null,null),H=N.exports;p()(N,{VCard:T["a"],VCardTitle:P["a"],VCombobox:S["a"],VDataTable:O["a"],VSpacer:R["a"]});var E={components:{ReferralLinkGenerator:A,AccountReferralStats:H}},B=E,z=Object(m["a"])(B,n,i,!1,null,null,null);t["default"]=z.exports},"7e63":function(e,t,a){}}]);
//# sourceMappingURL=chunk-39ac979a.01348339.js.map