(function(e){function t(t){for(var r,i,a=t[0],c=t[1],l=t[2],d=0,m=[];d<a.length;d++)i=a[d],o[i]&&m.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},s=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"15dd":function(e,t,n){"use strict";var r=n("44b0"),o=n.n(r);o.a},3683:function(e,t,n){"use strict";var r=n("a25b"),o=n.n(r);o.a},"44b0":function(e,t,n){},"533f":function(e,t,n){"use strict";var r=n("9ca3"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[this.$store.state.viewing?n("Viewer"):e._e(),e._m(0),n("section",[n("h2",[e._v("Upload an Image")]),n("ImagePicker")],1),0!=e.recentImages.length?n("section",[n("div",{staticClass:"flex"},[n("h2",[e._v("Recent Images")]),n("button",{staticClass:"button",on:{click:function(t){return t.preventDefault(),e.clearDB(t)}}},[e._v("Clear")])]),n("main",e._l(e.recentImages,function(t){return n("figure",{key:t.key},[n("button",{on:{click:function(n){return n.preventDefault(),e.removeImage(t.key)}}}),n("img",{attrs:{src:t.data},on:{click:function(n){return e.setImage(t.data)}}})])}),0)]):e._e()],1)},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",[r("div",{staticClass:"container flex"},[r("div",{staticClass:"logo"},[r("img",{attrs:{src:n("cf05"),alt:"Panoform Logo"}})]),r("nav")])])}],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panoform-container",attrs:{id:"panoform-viewer"}},[n("ViewerControls"),n("ViewerRenderer")],1)},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panoform-renderer",attrs:{id:"viewer-container"}})},l=[],u=n("5a89"),d=n("70f8"),m=n("37ca"),h=n.n(m),g=n("6397"),f=n.n(g);const v={controls:{ORBIT:0,DEVICEORIENTATION:1},modes:{NORMAL:0,STEREO:1},classes:{CONTAINER:"panoform-container",RENDERER:"panoform-renderer",CONTROLBAR:"panoform-controlbar",CONTROLBARBUTTON:"panoform-controlbar-button",buttons:{VR:"panoform-controlbar-button-VR",FULLSCREEN:"panoform-controlbar-button-fullscreen"}}};var w={name:"ViewerRenderer",data(){return{container:null,camera:null,controls:null,scene:null,normalRenderer:null,stereoRenderer:null,device:null}},computed:{currentImage(){return this.$store.state.viewer.currentImage},isStereo(){return this.$store.state.viewer.stereo},isFullscreen(){return this.$store.state.viewer.fullscreen},storeControls(){return this.$store.state.viewer.controls},webVRDevice(){return this.$store.state.viewer.webVRDevice},isWebVR(){return this.$store.state.viewer.webVR}},watch:{currentImage(e){this.loadImage(e)},isStereo(e){let t;t=e?v.modes.STEREO:v.modes.NORMAL,this.setMode(t)},isFullscreen(e){this.setFullscreen(e)},storeControls(e){this.setControls(e)},webVRDevice(e){this.device=e,this.normalRenderer.vr.setDevice(this.device)},isWebVR(e){e?(this.device.requestPresent([{source:this.container}]),this.normalRenderer.vr.enabled=!0):(this.device.exitPresent(),this.normalRenderer.vr.enabled=!1)}},methods:{init(){history.pushState(null,null,null),this.container=document.getElementById("viewer-container"),this.scene=new u["Scene"],this.camera=new u["PerspectiveCamera"](75,this.container.clientWidth/this.container.clientHeight,1,1100),this.camera.position.z=.5,this.normalRenderer=new u["WebGLRenderer"],this.normalRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.normalRenderer.setPixelRatio(window.devicePixelRatio),this.stereoRenderer=new d["a"](this.normalRenderer),this.stereoRenderer.eyeSeparation=0,this.stereoRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.setMode(v.modes.NORMAL),this.setControls(v.controls.ORBIT),window.addEventListener("resize",()=>this.onWindowResize()),window.addEventListener("orientationchange",()=>this.onOrientationChange()),window.addEventListener("fullscreenchange",()=>this.onFullscreenChange()),window.addEventListener("popstate",e=>{this.$store.state.viewing&&(e.preventDefault(),this.$store.commit("setViewing",!1))}),this.container.appendChild(this.normalRenderer.domElement),this.normalRenderer.setAnimationLoop(()=>{this.controls.update(),this.render(this.mode)})},render(e){e==v.modes.STEREO?this.stereoRenderer.render(this.scene,this.camera):this.normalRenderer.render(this.scene,this.camera)},onWindowResize(){this.camera.aspect=this.container.clientWidth/this.container.clientHeight,this.camera.updateProjectionMatrix(),this.normalRenderer.setSize(this.container.clientWidth,this.container.clientHeight)},onOrientationChange(){const e=()=>{const e=240;return new window.Promise(function(t){const n=(r,o)=>{window.innerHeight!=o||r>=e?t():window.requestAnimationFrame(()=>n(r+1,o))};n(0,window.innerHeight)})};e().then(()=>{this.onWindowResize()})},onFullscreenChange(){let e=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitFullscreenElement;this.$store.commit("setFullscreen",null!=e)},setMode(e){e==v.modes.STEREO?this.mode=v.modes.STEREO:this.mode=v.modes.NORMAL,this.onWindowResize()},setControls(e){switch(this.controls&&this.controls.dispose(),e){case 1:console.log("setting deviceorientation controls"),this.controls=new h.a(this.camera,this.container),this.controls.alphaOffset=1.5,this.controls.connect(),this.controls.update();break;default:console.log("setting orbit controls"),this.controls=new f.a(this.camera,this.normalRenderer.domElement),this.controls.enableZoom=!1,this.controls.rotateSpeed=-.05,this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.update();break}},setFullscreen(e){function t(){var e=document.getElementById("panoform-viewer");e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT):e.msRequestFullscreen&&e.msRequestFullscreen()}function n(){let e=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitFullscreenElement;null!=e&&(document.exitFullscreen&&document.exitFullscreen(),document.msExitFullscreen&&document.msExitFullscreen(),document.mozCancelFullScreen&&document.mozCancelFullScreen(),document.webkitExitFullscreen&&document.webkitExitFullscreen())}e?t():n()},clearScene(){this.scene.children.forEach(e=>this.scene.remove(this.scene.getObjectById(e.id)))},loadImage(e){if(null!=e){this.clearScene();const t=new u["TextureLoader"];t.load(e,e=>{const t=new u["SphereGeometry"](100,60,40),n=new u["MeshBasicMaterial"]({map:e,side:u["DoubleSide"]});t.scale(-1,1,1);const r=new u["Mesh"](t,n);this.scene.add(r),r.position.set(0,0,0),r.rotation.set(0,-1.5,0)})}}},mounted(){this.init(),this.loadImage(this.$store.state.viewer.currentImage)}},p=w,b=(n("3683"),n("2877")),R=Object(b["a"])(p,c,l,!1,null,null,null),I=R.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"controls"},[n("div",{staticClass:"controlbar top"},[n("button",{staticClass:"button close enabled",on:{click:function(t){return t.preventDefault(),e.closeViewer(t)}}})]),n("div",{staticClass:"controlbar"},[e.webVR?n("button",{staticClass:"button VR",class:{enabled:e.isWebVR},on:{click:function(t){return t.preventDefault(),e.toggleWebVR(t)}}}):e._e(),e.deviceOrientationVR?n("button",{staticClass:"button VR",class:{enabled:e.isStereo},on:{click:function(t){return t.preventDefault(),e.toggleVR(t)}}}):e._e()])])},V=[],O={name:"ViewerControls",data(){return{webVR:!1,deviceOrientationVR:!1}},computed:{isStereo(){return this.$store.state.viewer.stereo},isWebVR(){return this.$store.state.viewer.webVR}},methods:{init(){if("getVRDisplays"in navigator)navigator.getVRDisplays().then(e=>{this.$store.commit("setWebVRDevice",e[0]),this.webVR=!0});else{const e=()=>{this.deviceOrientationVR=!0,window.removeEventListener("deviceorientation",e,!1)};window.addEventListener("deviceorientation",e,!1)}},loadImage(){this.$store.commit("setCurrentImage",this.image),this.$store.dispatch("addRecentImage",this.image)},closeViewer(){this.$store.commit("setViewing",!1)},toggleVR(){let e=!this.$store.state.viewer.stereo;null!=screen.orientation&&(e?screen.orientation.lock("landscape-primary").catch(e=>{console.log("Orientation lock not supported on device")}):screen.orientation.unlock()),this.$store.commit("setControls",e?1:0),this.$store.commit("setStereo",e),this.$store.commit("setFullscreen",e)},toggleWebVR(){let e=!this.$store.state.viewer.webVR;this.$store.commit("setWebVR",e)}},mounted(){this.init()}},S=O,C=(n("b0c3"),Object(b["a"])(S,E,V,!1,null,"2e2ebd4b",null)),F=C.exports,$={name:"Viewer",components:{ViewerRenderer:I,ViewerControls:F}},k=$,y=(n("15dd"),Object(b["a"])(k,i,a,!1,null,null,null)),x=y.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",[n("input",{attrs:{id:"filepicker",type:"file",accept:"image/*"},on:{change:e.handleFileSelect}}),n("label",{attrs:{for:"filepicker"}},[e._v("Choose an image")])])},_=[],L={name:"ImagePicker",methods:{handleFileSelect(e){const t=e.target.files[0],n=4096,r=2048,o=new FileReader;o.onload=(e=>{const t=new Image;t.src=e.target.result,t.onload=(()=>{const e=document.createElement("canvas");e.width=n,e.height=r;const o=e.getContext("2d");o.drawImage(t,0,0,n,r);const s=o.canvas.toDataURL("image/jpeg");this.$store.commit("setCurrentImage",s),this.$store.dispatch("addRecentImage",s),this.$store.commit("setViewing",!0)}),o.onerror=(e=>console.log(e))}),o.readAsDataURL(t),e.target.value=null}}},j=L,W=(n("533f"),Object(b["a"])(j,D,_,!1,null,"ac9d7f52",null)),T=W.exports,P={name:"app",components:{Viewer:x,ImagePicker:T},computed:{recentImages(){return this.$store.state.recentImages}},methods:{clearDB(){this.$store.dispatch("clearRecentImages")},setImage(e){this.$store.commit("setCurrentImage",e),this.$store.commit("setViewing",!0)},removeImage(e){this.$store.dispatch("removeRecentImage",e)}}},N=P,A=(n("5c0b"),Object(b["a"])(N,o,s,!1,null,null,null)),B=A.exports,M=n("2f62");let z;r["a"].use(M["a"]);let q=new M["a"].Store({state:{viewing:!1,viewer:{fullscreen:!1,stereo:!1,webVR:!1,controls:0,webVRDevice:null,currentImage:null},recentImages:[]},mutations:{setViewing(e,t){e.viewing=t},clearRecentImages(e){e.recentImages=[]},setRecentImages(e,t){e.recentImages=t},addRecentImage(e,t){e.recentImages.unshift(t)},removeRecentImage(e,t){e.recentImages=e.recentImages.filter(e=>e.key!=t)},setCurrentImage(e,t){e.viewer.currentImage=t},setStereo(e,t){e.viewer.stereo=t},setFullscreen(e,t){e.viewer.fullscreen=t},setControls(e,t){e.viewer.controls=t},setWebVRDevice(e,t){e.viewer.webVRDevice=t},setWebVR(e,t){e.viewer.webVR=t}},actions:{clearRecentImages({commit:e}){let t=z.transaction(["images"],"readwrite").objectStore("images"),n=t.clear();n.onerror=(()=>{console.log("Error clearing database")}),n.onsuccess=(()=>{e("clearRecentImages")})},getRecentImages({commit:e}){let t=z.transaction(["images"]).objectStore("images"),n=t.index("created").getAll();n.onerror=(()=>{console.log("Error getting images")}),n.onsuccess=(()=>{e("setRecentImages",n.result)})},addRecentImage({commit:e},t){let n={created:(new Date).toJSON().slice(0,19).replace("T"," "),data:t},r=z.transaction(["images"],"readwrite").objectStore("images"),o=r.add(n);o.onerror=(()=>{console.log("Error adding image")}),o.onsuccess=(t=>{n.key=t.target.result,e("addRecentImage",n)})},removeRecentImage({commit:e},t){let n=z.transaction(["images"],"readwrite").objectStore("images"),r=n.delete(t);r.onerror=(()=>{console.log("Error removing image")}),r.onsuccess=(()=>{e("removeRecentImage",t)})}}});document.addEventListener("DOMContentLoaded",()=>{if(!("indexedDB"in window))return;const e="panoformDB",t=1;let n=window.indexedDB.open(e,t);n.onerror=(e=>{console.log(e)}),n.onsuccess=(e=>{console.log("Database created"),z=e.target.result,q.dispatch("getRecentImages")}),n.onupgradeneeded=(e=>{let t=e.target.result,n=t.createObjectStore("images",{keyPath:"key",autoIncrement:!0});n.createIndex("created","created",{unique:!1}),n.createIndex("data","data",{unique:!0})})});var H=q,U=n("9483");Object(U["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({store:H,render:function(e){return e(B)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("5e27"),o=n.n(r);o.a},"5e27":function(e,t,n){},"9ca3":function(e,t,n){},a25b:function(e,t,n){},b0c3:function(e,t,n){"use strict";var r=n("b684"),o=n.n(r);o.a},b684:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.ddbfae5a.png"}});
//# sourceMappingURL=app.731f2116.js.map