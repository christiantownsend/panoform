(function(e){function t(t){for(var r,i,c=t[0],a=t[1],l=t[2],d=0,m=[];d<c.length;d++)i=c[d],o[i]&&m.push(o[i][0]),o[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,c=1;c<n.length;c++){var a=n[c];0!==o[a]&&(r=!1)}r&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},s=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/panoform-vue/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],a=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=a;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"15dd":function(e,t,n){"use strict";var r=n("44b0"),o=n.n(r);o.a},3683:function(e,t,n){"use strict";var r=n("a25b"),o=n.n(r);o.a},"44b0":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[this.$store.state.viewing?n("Viewer"):e._e(),n("section",[n("button",{on:{click:function(t){return t.preventDefault(),e.clearDB(t)}}},[e._v("Clear DB")]),n("button",{on:{click:function(t){return t.preventDefault(),e.$store.commit("setViewing",!0)}}},[e._v("Load Image")])]),n("main",e._l(e.recentImages,function(t){return n("figure",{key:t.key},[n("img",{attrs:{src:t.data},on:{click:function(n){return e.setImage(t.data)}}})])}),0)],1)},s=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panoform-container",attrs:{id:"panoform-viewer"}},[n("ViewerControls"),n("ViewerRenderer")],1)},c=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panoform-renderer",attrs:{id:"viewer-container"}})},l=[],u=n("5a89"),d=n("70f8"),m=n("37ca"),h=n.n(m),g=n("6397"),f=n.n(g);const p={controls:{ORBIT:0,DEVICEORIENTATION:1},modes:{NORMAL:0,STEREO:1},classes:{CONTAINER:"panoform-container",RENDERER:"panoform-renderer",CONTROLBAR:"panoform-controlbar",CONTROLBARBUTTON:"panoform-controlbar-button",buttons:{VR:"panoform-controlbar-button-VR",FULLSCREEN:"panoform-controlbar-button-fullscreen"}}};var w={name:"ViewerRenderer",data(){return{container:null,camera:null,controls:null,scene:null,normalRenderer:null,stereoRenderer:null,device:null}},computed:{currentImage(){return this.$store.state.viewer.currentImage},isStereo(){return this.$store.state.viewer.stereo},isFullscreen(){return this.$store.state.viewer.fullscreen},storeControls(){return this.$store.state.viewer.controls},webVRDevice(){return this.$store.state.viewer.webVRDevice},isWebVR(){return this.$store.state.viewer.webVR}},watch:{currentImage(e){this.loadImage(e)},isStereo(e){let t;t=e?p.modes.STEREO:p.modes.NORMAL,this.setMode(t)},isFullscreen(e){this.setFullscreen(e)},storeControls(e){this.setControls(e)},webVRDevice(e){this.device=e,this.normalRenderer.vr.setDevice(this.device)},isWebVR(e){e?(this.device.requestPresent([{source:this.container}]),this.normalRenderer.vr.enabled=!0):(this.device.exitPresent(),this.normalRenderer.vr.enabled=!1)}},methods:{init(){this.container=document.getElementById("viewer-container"),this.scene=new u["Scene"],this.camera=new u["PerspectiveCamera"](75,this.container.clientWidth/this.container.clientHeight,1,1100),this.camera.position.z=.5,this.normalRenderer=new u["WebGLRenderer"],this.normalRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.normalRenderer.setPixelRatio(window.devicePixelRatio),this.stereoRenderer=new d["a"](this.normalRenderer),this.stereoRenderer.eyeSeparation=0,this.stereoRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.setMode(p.modes.NORMAL),this.setControls(p.controls.ORBIT),window.addEventListener("resize",()=>this.onWindowResize()),window.addEventListener("orientationchange",()=>this.onOrientationChange()),window.addEventListener("fullscreenchange",()=>this.onFullscreenChange()),this.container.appendChild(this.normalRenderer.domElement),this.normalRenderer.setAnimationLoop(()=>{this.controls.update(),this.render(this.mode)})},render(e){this.mode==p.modes.STEREO?this.stereoRenderer.render(this.scene,this.camera):this.normalRenderer.render(this.scene,this.camera)},onWindowResize(){this.camera.aspect=this.container.clientWidth/this.container.clientHeight,this.camera.updateProjectionMatrix(),this.normalRenderer.setSize(this.container.clientWidth,this.container.clientHeight)},onOrientationChange(){const e=()=>{const e=240;return new window.Promise(function(t){const n=(r,o)=>{window.innerHeight!=o||r>=e?t():window.requestAnimationFrame(()=>n(r+1,o))};n(0,window.innerHeight)})};e().then(()=>{this.onWindowResize()})},onFullscreenChange(){let e=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitFullscreenElement;this.$store.commit("setFullscreen",null!=e)},setMode(e){e==p.modes.STEREO?this.mode=p.modes.STEREO:this.mode=p.modes.NORMAL,this.onWindowResize()},setControls(e){switch(this.controls&&this.controls.dispose(),e){case 1:console.log("setting deviceorientation controls"),this.controls=new h.a(this.camera,this.container),this.controls.alphaOffset=1.5,this.controls.connect(),this.controls.update();break;default:console.log("setting orbit controls"),this.controls=new f.a(this.camera,this.normalRenderer.domElement),this.controls.enableZoom=!1,this.controls.rotateSpeed=-.05,this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.update();break}},setFullscreen(e){function t(){var e=document.getElementById("panoform-viewer");e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT):e.msRequestFullscreen&&e.msRequestFullscreen()}function n(){let e=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitFullscreenElement;null!=e&&(document.exitFullscreen&&document.exitFullscreen(),document.msExitFullscreen&&document.msExitFullscreen(),document.mozCancelFullScreen&&document.mozCancelFullScreen(),document.webkitExitFullscreen&&document.webkitExitFullscreen())}e?t():n()},clearScene(){this.scene.children.forEach(e=>this.scene.remove(this.scene.getObjectById(e.id)))},loadImage(e){if(null!=e){this.clearScene();const t=new u["TextureLoader"];t.load(e,e=>{const t=new u["SphereGeometry"](100,60,40),n=new u["MeshBasicMaterial"]({map:e,side:u["DoubleSide"]});t.scale(-1,1,1);const r=new u["Mesh"](t,n);this.scene.add(r),r.position.set(0,0,0),r.rotation.set(0,-1.5,0)})}}},mounted(){this.init(),this.loadImage(this.$store.state.viewer.currentImage)}},v=w,R=(n("3683"),n("2877")),b=Object(R["a"])(v,a,l,!1,null,null,null),E=b.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panoform-controls"},[n("div",{staticClass:"panoform-controlbar top"},[n("button",{on:{click:function(t){return t.preventDefault(),e.closeViewer(t)}}},[e._v("Close")])]),n("div",{staticClass:"panoform-controlbar"},[n("button",{on:{click:function(t){return t.preventDefault(),e.loadImage(t)}}},[e._v("Load Image")]),e.webVR?n("button",{on:{click:function(t){return t.preventDefault(),e.toggleWebVR(t)}}},[e._v("Toggle WebVR")]):e._e(),e.deviceOrientationVR?n("button",{on:{click:function(t){return t.preventDefault(),e.toggleVR(t)}}},[e._v("Toggle Stereo")]):e._e()])])},O=[],V={name:"ViewerControls",data(){return{webVR:!1,deviceOrientationVR:!1,image:n("fd4b")}},methods:{init(){if("getVRDisplays"in navigator)navigator.getVRDisplays().then(e=>{this.$store.commit("setWebVRDevice",e[0]),this.webVR=!0});else{const e=()=>{this.deviceOrientationVR=!0,window.removeEventListener("deviceorientation",e,!1)};window.addEventListener("deviceorientation",e,!1)}},loadImage(){this.$store.commit("setCurrentImage",this.image),this.$store.dispatch("addRecentImage",this.image)},closeViewer(){this.$store.commit("setViewing",!1)},toggleVR(){let e=!this.$store.state.viewer.stereo;null!=screen.orientation&&(e?screen.orientation.lock("landscape-primary").catch(e=>{console.log("Orientation lock not supported on device")}):screen.orientation.unlock()),this.$store.commit("setControls",e?1:0),this.$store.commit("setStereo",e),this.$store.commit("setFullscreen",e)},toggleWebVR(){let e=!this.$store.state.viewer.webVR;this.$store.commit("setWebVR",e)}},mounted(){this.init()}},S=V,F=Object(R["a"])(S,I,O,!1,null,null,null),C=F.exports,k={name:"Viewer",components:{ViewerRenderer:E,ViewerControls:C}},$=k,y=(n("15dd"),Object(R["a"])($,i,c,!1,null,null,null)),D=y.exports,x={name:"app",components:{Viewer:D},computed:{recentImages(){return this.$store.state.recentImages}},methods:{clearDB(){this.$store.dispatch("clearRecentImages")},setImage(e){this.$store.commit("setCurrentImage",e),this.$store.dispatch("addRecentImage",e),this.$store.commit("setViewing",!0)}}},_=x,L=(n("034f"),Object(R["a"])(_,o,s,!1,null,null,null)),T=L.exports,j=n("2f62");let W;r["a"].use(j["a"]);let N=new j["a"].Store({state:{viewing:!1,viewer:{fullscreen:!1,stereo:!1,webVR:!1,controls:0,webVRDevice:null,currentImage:null},recentImages:[]},mutations:{setViewing(e,t){e.viewing=t},clearRecentImages(e){e.recentImages=[]},setRecentImages(e,t){e.recentImages=t},addRecentImage(e,t){e.recentImages.push(t)},setCurrentImage(e,t){e.viewer.currentImage=t},setStereo(e,t){e.viewer.stereo=t},setFullscreen(e,t){e.viewer.fullscreen=t},setControls(e,t){e.viewer.controls=t},setWebVRDevice(e,t){e.viewer.webVRDevice=t},setWebVR(e,t){e.viewer.webVR=t}},actions:{clearRecentImages({commit:e}){let t=W.transaction(["images"],"readwrite").objectStore("images"),n=t.clear();n.onerror=(()=>{console.log("Error clearing database")}),n.onsuccess=(()=>{e("clearRecentImages")})},getRecentImages({commit:e}){let t=W.transaction(["images"]).objectStore("images"),n=t.index("created").getAll();n.onerror=(()=>{console.log("Error getting images")}),n.onsuccess=(()=>{console.log(n.result.reverse()),e("setRecentImages",n.result.reverse())})},addRecentImage({commit:e},t){let n={created:(new Date).toJSON().slice(0,19).replace("T"," "),data:t},r=W.transaction(["images"],"readwrite").objectStore("images"),o=r.add(n);o.onerror=(()=>{console.log("Error adding image")}),o.onsuccess=(()=>{e("addRecentImage",n)})}}});document.addEventListener("DOMContentLoaded",()=>{if(!1 in window)return;const e="panoformDB",t=1;let n=window.indexedDB.open(e,t);n.onerror=(e=>{console.log(e)}),n.onsuccess=(e=>{console.log("Database created"),W=e.target.result,N.dispatch("getRecentImages")}),n.onupgradeneeded=(e=>{let t=e.target.result,n=t.createObjectStore("images",{keyPath:"key",autoIncrement:!0});n.createIndex("created","created",{unique:!1}),n.createIndex("data","data",{unique:!0})})});var A=N,B=n("9483");Object(B["a"])("/panoform-vue/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({store:A,render:function(e){return e(T)}}).$mount("#app")},"64a9":function(e,t,n){},a25b:function(e,t,n){},fd4b:function(e,t,n){e.exports=n.p+"img/pic.69cfce8f.png"}});
//# sourceMappingURL=app.b4a7eb44.js.map