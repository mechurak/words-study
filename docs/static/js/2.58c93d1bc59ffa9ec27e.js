webpackJsonp([2],{"/efR":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=s("mvHQ"),o=s.n(l),n=window.gapi,a={data:function(){return{items:[]}},methods:{listSheets:function(){var e=this;n.client.drive.files.list({pageSize:10,q:'mimeType = "application/vnd.google-apps.spreadsheet"',fields:"nextPageToken, files(id, name)"}).then(function(t){console.log(t),console.log("Files:");var s=t.result.files;if(console.log(s),s&&s.length>0){e.items=s;for(var l=0;l<s.length;l++){var o=s[l];console.log(o.name+" ("+o.id+")")}}else console.log("No files found.")})},selectSheet:function(e,t){var s=this;console.log("selectSheet ()",e),n.client.sheets.spreadsheets.values.get({spreadsheetId:e,range:"A:G"}).then(function(e){if(console.log(e),e.result.values.length>0){var l=o()(e.result.values);localStorage.setItem("lastLoadedSheetValues",l),localStorage.setItem("lastLoadedSheetName",t);var n=new Date;localStorage.setItem("lastLoadedTime",n.toLocaleString()),s.$store.dispatch("onSheetLoaded")}else console.log("No data found.")},function(e){console.log("Error: "+e.result.error.message)})}}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-container",{attrs:{fluid:""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:"","mt-5":""}},[s("h1",[e._v("Load page")])]),e._v(" "),s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:"","mt-3":""}},[s("p",[e._v("This is a page to import words data from google sheet")])]),e._v(" "),s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:"",sm6:"","offset-sm3":"","mt-5":""}},[s("v-btn",{attrs:{color:"primary"},on:{click:e.listSheets}},[e._v("list Sheets")])],1),e._v(" "),s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:"","mt-3":""}},[e.items.length>0?s("v-list",[e._l(e.items,function(t){return[s("v-list-tile",{key:t.name,on:{click:function(s){e.selectSheet(t.id,t.name)}}},[s("v-list-tile-content",[s("v-list-tile-title",{domProps:{textContent:e._s(t.name)}})],1)],1)]})],2):e._e()],1)],1)],1)},staticRenderFns:[]},r=s("VU/8")(a,i,!1,null,null,null);t.default=r.exports},mvHQ:function(e,t,s){e.exports={default:s("qkKv"),__esModule:!0}},qkKv:function(e,t,s){var l=s("FeBl"),o=l.JSON||(l.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}}});
//# sourceMappingURL=2.58c93d1bc59ffa9ec27e.js.map