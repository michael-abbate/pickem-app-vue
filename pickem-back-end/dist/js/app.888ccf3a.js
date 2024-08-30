(function(){"use strict";var e={8160:function(e,s,t){var r=t(9242),a=t(3396),n=t(7139);const l={class:"app-header"},i={class:"app-header-logo"},o=(0,a.Uk)("Migs' Pick 'Em"),c={key:0},d=(0,a.Uk)("Games"),u=(0,a.Uk)("Group Picks"),p=(0,a.Uk)("Leaderboard"),g=(0,a.Uk)("Login"),k=(0,a.Uk)("Sign Up"),_={class:"app-header-nav"},m={key:0},f=(0,a.Uk)("Games"),w=(0,a.Uk)("Group Picks"),h=(0,a.Uk)("Leaderboard"),v={class:"router-view-div"};function b(e,s,t,r,b,y){const D=(0,a.up)("router-link"),U=(0,a.up)("Slide"),P=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",l,[(0,a._)("div",i,[(0,a._)("h1",null,[(0,a._)("nav",null,[(0,a.Wm)(D,{to:"/"},{default:(0,a.w5)((()=>[o])),_:1})])])]),(0,a.Wm)(U,{noOverlay:"",closeOnNavigation:!0},{default:(0,a.w5)((()=>[e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.iD)("a",c,"Hi, "+(0,n.zw)(e.$store.state.user.firstname),1)):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.j4)(D,{key:1,to:"/"},{default:(0,a.w5)((()=>[d])),_:1})):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.j4)(D,{key:2,to:"/group/picks"},{default:(0,a.w5)((()=>[u])),_:1})):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.j4)(D,{key:3,to:"/leaderboard"},{default:(0,a.w5)((()=>[p])),_:1})):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(D,{key:4,to:"/login"},{default:(0,a.w5)((()=>[g])),_:1})),e.$store.state.isUserLoggedIn?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(D,{key:5,to:"/register"},{default:(0,a.w5)((()=>[k])),_:1})),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.iD)("a",{key:6,onClick:s[0]||(s[0]=(...e)=>y.logout&&y.logout(...e))},"Log Out")):(0,a.kq)("",!0)])),_:1}),(0,a._)("div",_,[(0,a._)("nav",null,[e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.iD)("a",m,"Hi, "+(0,n.zw)(e.$store.state.user.firstname),1)):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.j4)(D,{key:1,to:"/"},{default:(0,a.w5)((()=>[f])),_:1})):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.j4)(D,{key:2,to:"/group/picks"},{default:(0,a.w5)((()=>[w])),_:1})):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.j4)(D,{key:3,to:"/leaderboard"},{default:(0,a.w5)((()=>[h])),_:1})):(0,a.kq)("",!0),e.$store.state.isUserLoggedIn?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("button",{key:4,onClick:s[1]||(s[1]=e=>y.navigateTo({name:"LoginUser"})),class:"navbar-but"},"Login")),e.$store.state.isUserLoggedIn?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("button",{key:5,onClick:s[2]||(s[2]=e=>y.navigateTo({name:"RegisterUser"}))},"Sign Up")),e.$store.state.isUserLoggedIn?((0,a.wg)(),(0,a.iD)("button",{key:6,onClick:s[3]||(s[3]=(...e)=>y.logout&&y.logout(...e))},"Log Out")):(0,a.kq)("",!0)])])]),(0,a._)("div",v,[(0,a.Wm)(P)])],64)}var y=t(7542),D={components:{Slide:y.Slide},methods:{navigateTo(e){this.$router.push(e)},logout(){this.$store.dispatch("setToken",null),this.$store.dispatch("setUser",null),this.$router.push({name:"LoginUser"})}}},U=t(89);const P=(0,U.Z)(D,[["render",b]]);var L=P,S=t(2483);const I=e=>((0,a.dD)("data-v-6110da35"),e=e(),(0,a.Cn)(),e),$={id:"show-picks"},N=I((()=>(0,a._)("div",{class:"grid-cell-1"},null,-1))),C={class:"grid-cell-2"},O={key:0,id:"all-game-tables"},z={rowspan:"2",class:"date-cell"},T={class:"matchup-cell"},j=["for"],E={class:"pickem-cell"},q=["id","value"],x=["for"],H={class:"pickem-cell"},F=["id","value"],V=["textContent"],W=["for"],M={class:"pickem-cell"},G=["id","value"],R=["for"],K={class:"pickem-cell"},Y=["id","value"],A=I((()=>(0,a._)("tr",null,[(0,a._)("td",{colspan:"4"},[(0,a._)("hr")])],-1))),Z={key:1,id:"all-game-tables"},J={key:0},B={class:"grid-cell-3",id:"selected-picks-wrapper"},Q={id:"selected-picks"},X=(0,a.Uk)(" Selected Picks: "),ee=["id"],se={class:"mobile-submit-button"},te=I((()=>(0,a._)("p",{class:"countpicks"},[(0,a._)("strong",null," Brother, these are locks.")],-1))),re={class:"actual-select-button"};function ae(e,s,t,l,i,o){return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",$,[N,(0,a._)("div",C,[(0,a._)("h2",null,(0,n.zw)(i.nflweek)+" Games ",1),Object.keys(i.games).length>0?((0,a.wg)(),(0,a.iD)("div",O,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.games,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{key:e.gameID,class:(0,n.C_)(e.gameID+"game-table")},[o.validGame(e.round,e.date)?((0,a.wg)(),(0,a.iD)("table",{key:0,class:(0,n.C_)(e.gameID+"game-table")},[(0,a._)("tr",{class:(0,n.C_)("away-row-"+t+"-"+e.gameID)},[(0,a._)("td",z,(0,n.zw)(o.epochToDate(e.date)),1),(0,a._)("td",T,(0,n.zw)(e.team1Name),1),(0,a._)("label",{for:e.gameID+"-away-label"},[(0,a._)("td",E,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>i.picks=e),type:"checkbox",id:e.gameID+"-away-label",value:o.jsonPick(e,"away")},null,8,q),[[r.e8,i.picks]]),(0,a._)("span",null,(0,n.zw)(o.jsonPick(e,"away").spread),1)])],8,j),(0,a._)("label",{for:e.gameID+"-over-label"},[(0,a._)("td",H,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":s[1]||(s[1]=e=>i.picks=e),type:"checkbox",id:e.gameID+"-over-label",value:o.jsonPick(e,"over")},null,8,F),[[r.e8,i.picks]]),(0,a._)("span",null,"o"+(0,n.zw)(o.jsonPick(e,"over").overUnder),1)])],8,x)],2),(0,a._)("tr",{class:(0,n.C_)("home-row-"+t+"-"+e.gameID)},[(0,a._)("td",{textContent:(0,n.zw)(e.team2Name),class:"matchup-cell"},null,8,V),(0,a._)("label",{for:e.gameID+"-home-label"},[(0,a._)("td",M,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":s[2]||(s[2]=e=>i.picks=e),type:"checkbox",id:e.gameID+"-home-label",value:o.jsonPick(e,"home")},null,8,G),[[r.e8,i.picks]]),(0,a._)("span",null,(0,n.zw)(o.jsonPick(e,"home").spread),1)])],8,W),(0,a._)("label",{for:e.gameID+"-under-label"},[(0,a._)("td",K,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":s[3]||(s[3]=e=>i.picks=e),type:"checkbox",id:e.gameID+"-under-label",value:o.jsonPick(e,"under")},null,8,Y),[[r.e8,i.picks]]),(0,a._)("span",null,"u"+(0,n.zw)(o.jsonPick(e,"under").overUnder),1)])],8,R)],2),A],2)):(0,a.kq)("",!0)],2)))),128))])):((0,a.wg)(),(0,a.iD)("div",Z,[0===Object.keys(i.games).length?((0,a.wg)(),(0,a.iD)("h2",J," No games to display! ")):(0,a.kq)("",!0)]))]),(0,a._)("div",B,[(0,a._)("div",Q,[(0,a._)("strong",null,[X,(0,a._)("ul",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.picks,((e,s)=>((0,a.wg)(),(0,a.iD)("li",{key:s,id:e+"selected-pick"},(0,n.zw)(e.render_value),9,ee)))),128))])]),(0,a._)("button",{onClick:s[4]||(s[4]=(...e)=>o.selectPicks&&o.selectPicks(...e))},"SELECT")])])]),(0,a._)("div",se,[te,(0,a._)("p",re,[(0,a._)("button",{onClick:s[5]||(s[5]=(...e)=>o.selectPicks&&o.selectPicks(...e))},"SELECT")])])],64)}var ne=t(6265),le=t.n(ne),ie=t(65),oe=t(2415);(0,r.ri)(L).use(ie.ZP);var ce=new ie.ZP.Store({strict:"prod"!=={NODE_ENV:"production",BASE_URL:"/"}.APP_ENV,state:{token:null,user:null,isUserLoggedIn:!1,picks:["test"]},mutations:{setToken(e,s){e.token=s,e.isUserLoggedIn=!!s},setUser(e,s){e.user=s},SELECT_PICKS(e,s){e.picks=s}},actions:{setToken({commit:e},s){e("setToken",s)},setUser({commit:e},s){e("setUser",s)}},plugins:[(0,oe.Z)()]}),de={store:ce,name:"ShowPicks",data(){return{nflweek:"",games:null,env:null,use_live_lines:null,picks:[],sample_spread:7,sample_ou:48.5,editIndex:-1,fontSize:15,textSizeControlStyle:{textAlign:"center",cursor:"pointer"}}},async created(){console.log("about to hit axios");const e=await le().get("/api/showpicks");console.log("hit axios");const s=e.data.results.slice(0,20);console.log("Here are the games!"),console.log(s),this.games=s,this.nflweek=s[0].round,s[1].round&&s[1].round.includes("Week")&&!this.nflweek.includes("Week")?this.nflweek=s[1].round:this.nflweek=this.nflweek.includes("Week")?this.nflweek:this.nflweek.split(" ").slice(1).join(" "),this.env=e.data.env,this.use_live_lines=e.data.use_live_lines,console.log(`Front-end ENV fetched from back-end env: ${this.env}`),console.log(`Using live lines: ${this.use_live_lines}`)},methods:{selectPicks(){this.picks.length>=5?(console.log(`selectPicks: ${this.picks}`),this.$store.commit("SELECT_PICKS",{picks:this.picks,nflweek:this.nflweek}),this.$router.push("/selected")):alert("Please review picks!")},validGame(e,s){if(this.nflweek===e)return!0;if("prod"===this.env||!0===this.use_live_lines){let e=new Date,t=e.setDate(e.getDate()+((9-e.getDay())%7||7)),r=Date.now();return!(r>s)&&!(s>t)}return!0},epochToDate(e){let s=new Date(e),t=s.toLocaleString("en-US",{timeStyle:"short",dateStyle:"short"});return t.replace(",","")},favOrDog(e){let s=new String(e.spread);return"pk"===s?["pk","pk"]:s.includes("-")?[s.replace("-","+"),s]:["-"+s,"+"+s]},useDraftkings(e){let s=e.length;for(var t=0;t<s;t++){var r=e[t].provider;if("DRAFTKINGS"===r)return e[t]}},jsonPick(e,s){let t=this.useDraftkings(e.odds),r=e.gameID,a=e.team1Name,n=e.team2Name,l=this.favOrDog(t)[0],i=this.favOrDog(t)[1],o=t.overUnder,c=e.round;return"away"===s?{render_value:a+" "+l,gameID:r,team1Name:a,team2Name:n,spread:l,team_selected:"team1",week:c}:"home"===s?{render_value:n+" "+i,gameID:r,team1Name:a,team2Name:n,spread:i,team_selected:"team2",week:c}:"over"===s?{render_value:a+" vs. "+n+" o"+o,gameID:r,team1Name:a,team2Name:n,overUnder:o,week:c}:"under"===s?{render_value:a+" vs. "+n+" u"+o,gameID:r,team1Name:a,team2Name:n,overUnder:o,week:c}:void 0}}};const ue=(0,U.Z)(de,[["render",ae],["__scopeId","data-v-6110da35"]]);var pe=ue;const ge=e=>((0,a.dD)("data-v-cd0b039c"),e=e(),(0,a.Cn)(),e),ke={class:"selected-picks-container"},_e={class:"select-picks-table"},me=["onUpdate:modelValue","onChange"],fe={value:"",selected:"",disabled:""},we=["id","value"],he={class:"message"},ve=ge((()=>(0,a._)("br",null,null,-1)));function be(e,s,t,l,i,o){return(0,a.wg)(),(0,a.iD)("div",ke,[(0,a._)("h2",null,(0,n.zw)(o.nflweek)+" Selections ",1),(0,a._)("table",_e,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(Object.keys(i.picks_form),(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e,class:(0,n.C_)(e+"-row")},[(0,a._)("td",null,[(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":s=>i.picks_form[e]=s,onChange:s=>o.updatePicksList(e)},[(0,a._)("option",fe,"Select "+(0,n.zw)(e),1),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.getValidPicks(i.originalPicks,e),((s,t)=>((0,a.wg)(),(0,a.iD)("option",{key:t,id:s.gameID+"-"+e+"-submitted-picks",value:s},(0,n.zw)(s.render_value),9,we)))),128))],40,me),[[r.bM,i.picks_form[e]]])])],2)))),128))]),(0,a._)("div",he,(0,n.zw)(i.msg),1),ve,(0,a._)("button",{onClick:s[0]||(s[0]=e=>o.submitPicks(o.nflweek))})])}var ye={submitPicks(e){return le().post("/api/selected/submit",e)},postGroupPicks(e,s){return le().post("/api/group/picks",e,s)},postDistinctWeeks(e){return le().post("/api/nflweeks",e)}},De={name:"SelectedPicks",data(){return{msg:"",picks_form:{Favorite:"",Underdog:"",Over:"",Under:"",Lock:""},originalPicks:[]}},methods:{async submitPicks(e){console.log("submit button"),console.log(this.picks_form);try{console.log(`${e} PICK FOR USER: ${this.$store.state.user.username}`),console.log(`Attempting to submit picks for user: ${this.$store.state.user.username}`);const t=new Date;let r=t.getFullYear();var s=r.toString().concat(e,this.$store.state.user.username);console.log("UNHASHED",s);const a=await ye.submitPicks({nflweek:e,username:this.$store.state.user.username,favorite:JSON.stringify(this.picks_form.Favorite),underdog:JSON.stringify(this.picks_form.Underdog),over:JSON.stringify(this.picks_form.Over),under:JSON.stringify(this.picks_form.Under),lock:JSON.stringify(this.picks_form.Lock),pick_id:s});console.log(`Submitted picks for user: ${this.$store.state.user.username}`),this.msg=a.data.message,setTimeout((()=>this.$router.push({name:"GroupPicks"})),3e3)}catch(t){console.log(`Failed to submit picks for user: ${this.$store.state.user.username}`),this.msg=t.response.data.message}},getValidPicks(e,s){var t;return"Favorite"===s?(t=e.filter((e=>e.render_value.includes("-")||"pk"===e.render_value)),t):"Underdog"===s?(t=e.filter((e=>e.render_value.includes("+")||"pk"===e.render_value)),t):"Over"===s?(t=e.filter((e=>/^(o\d{2}\.\d{1})|(o\d{2})|(o\d{1})/.test(e.render_value))),t):"Under"===s?(t=e.filter((e=>/^(u\d{2}\.\d{1})|(u\d{2})|(u\d{1})/.test(e.render_value))),t):e},updatePicksList(e){console.log(JSON.stringify(this.picks_form[e]),"index",this.originalPicks.indexOf(this.picks_form[e]))}},computed:{picks(){return this.$store.state.picks.picks},nflweek(){return this.$store.state.picks.nflweek}},created(){this.originalPicks=[...this.picks]}};const Ue=(0,U.Z)(De,[["render",be],["__scopeId","data-v-cd0b039c"]]);var Pe=Ue;const Le={id:"nfl-teams"},Se={class:"nfl-teams"},Ie=(0,a._)("th",null," Team ID ",-1),$e=(0,a._)("th",null," Team Name ",-1);function Ne(e,s,t,r,l,i){return(0,a.wg)(),(0,a.iD)("div",Le,[(0,a._)("table",Se,[Ie,$e,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.nflteams,(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e.team_id,class:"team-row"},[(0,a._)("td",null,(0,n.zw)(e.team_id),1),(0,a._)("td",null,(0,n.zw)(e.team_name),1)])))),128))])])}var Ce={name:"NFLTeams",data(){return{nflteams:[]}},async created(){console.log("getting nfl teams");const e=await le().get("/api/nflteams"),s=e.data;this.nflteams=s}};const Oe=(0,U.Z)(Ce,[["render",Ne]]);var ze=Oe;const Te=e=>((0,a.dD)("data-v-6b49c85c"),e=e(),(0,a.Cn)(),e),je=Te((()=>(0,a._)("h2",null,"Register",-1))),Ee={class:"registration-container"},qe={class:"registration-label-input"},xe=Te((()=>(0,a._)("label",null,"First Name",-1))),He=Te((()=>(0,a._)("br",null,null,-1))),Fe={class:"registration-label-input"},Ve=Te((()=>(0,a._)("label",null,"Last Name",-1))),We=Te((()=>(0,a._)("br",null,null,-1))),Me={class:"registration-label-input"},Ge=Te((()=>(0,a._)("label",null,"User Name",-1))),Re=Te((()=>(0,a._)("br",null,null,-1))),Ke={class:"registration-label-input"},Ye=Te((()=>(0,a._)("label",null,"Email",-1))),Ae=Te((()=>(0,a._)("br",null,null,-1))),Ze={class:"registration-label-input"},Je=Te((()=>(0,a._)("label",null,"Password",-1))),Be=Te((()=>(0,a._)("br",null,null,-1))),Qe=["innerHTML"],Xe=Te((()=>(0,a._)("br",null,null,-1)));function es(e,s,t,n,l,i){return(0,a.wg)(),(0,a.iD)("div",null,[je,(0,a._)("div",Ee,[(0,a._)("ul",null,[(0,a._)("li",null,[(0,a._)("div",qe,[xe,He,(0,a.wy)((0,a._)("input",{type:"text",name:"firstname","onUpdate:modelValue":s[0]||(s[0]=e=>l.firstname=e),placeholder:"First Name"},null,512),[[r.nr,l.firstname]])])]),(0,a._)("li",null,[(0,a._)("div",Fe,[Ve,We,(0,a.wy)((0,a._)("input",{type:"text",name:"lastname","onUpdate:modelValue":s[1]||(s[1]=e=>l.lastname=e),placeholder:"Last Name"},null,512),[[r.nr,l.lastname]])])]),(0,a._)("li",null,[(0,a._)("div",Me,[Ge,Re,(0,a.wy)((0,a._)("input",{type:"text",name:"username","onUpdate:modelValue":s[2]||(s[2]=e=>l.username=e),placeholder:"Username"},null,512),[[r.nr,l.username]])])]),(0,a._)("li",null,[(0,a._)("div",Ke,[Ye,Ae,(0,a.wy)((0,a._)("input",{type:"email",name:"email","onUpdate:modelValue":s[3]||(s[3]=e=>l.email=e),placeholder:"Email"},null,512),[[r.nr,l.email]])])]),(0,a._)("li",null,[(0,a._)("div",Ze,[Je,Be,(0,a.wy)((0,a._)("input",{type:"password",name:"password","onUpdate:modelValue":s[4]||(s[4]=e=>l.password=e),placeholder:"Password",autocomplete:"new-password"},null,512),[[r.nr,l.password]])])]),l.error?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"error",innerHTML:l.error},null,8,Qe)):(0,a.kq)("",!0),Xe,(0,a._)("button",{onClick:s[5]||(s[5]=(...e)=>i.register&&i.register(...e))},"Register")])])])}var ss={register(e){return le().post("/api/register",e)},login(e){return le().post("/api/login",e)}},ts={name:"RegisterUser",data(){return{firstname:"",lastname:"",username:"",email:"",password:"",error:null,success:null}},methods:{async register(){console.log("hit register button"),this.error=null;try{console.log(`Attempting to register user: ${this.username}`),await ss.register({firstname:this.firstname,lastname:this.lastname,username:this.username,email:this.email,password:this.password}),this.$router.push({name:"LoginUser"}),console.log(`Registered user: ${this.username}`)}catch(e){console.log(`Failed to register user: ${this.username}`),console.log("error:"),console.log(e),this.error=e.response.data.error}}}};const rs=(0,U.Z)(ts,[["render",es],["__scopeId","data-v-6b49c85c"]]);var as=rs;const ns=e=>((0,a.dD)("data-v-3f70d9c2"),e=e(),(0,a.Cn)(),e),ls=ns((()=>(0,a._)("h2",null,"Login",-1))),is={class:"registration-container"},os={class:"registration-label-input"},cs=ns((()=>(0,a._)("label",null,"Email",-1))),ds=ns((()=>(0,a._)("br",null,null,-1))),us={class:"registration-label-input"},ps=ns((()=>(0,a._)("label",null,"Password",-1))),gs=ns((()=>(0,a._)("br",null,null,-1))),ks=["innerHTML"],_s=["innerHTML"],ms=ns((()=>(0,a._)("br",null,null,-1)));function fs(e,s,t,n,l,i){return(0,a.wg)(),(0,a.iD)("div",null,[ls,(0,a._)("div",is,[(0,a._)("ul",null,[(0,a._)("li",null,[(0,a._)("div",os,[cs,ds,(0,a.wy)((0,a._)("input",{type:"email",name:"email","onUpdate:modelValue":s[0]||(s[0]=e=>l.email=e),placeholder:"Email"},null,512),[[r.nr,l.email]])])]),(0,a._)("li",null,[(0,a._)("div",us,[ps,gs,(0,a.wy)((0,a._)("input",{type:"password",name:"password","onUpdate:modelValue":s[1]||(s[1]=e=>l.password=e),placeholder:"Password"},null,512),[[r.nr,l.password]])])]),l.error?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"error",innerHTML:l.error},null,8,ks)):(0,a.kq)("",!0),l.success&&!l.error?((0,a.wg)(),(0,a.iD)("div",{key:1,class:"success",innerHTML:l.success},null,8,_s)):(0,a.kq)("",!0),ms,(0,a._)("button",{onClick:s[2]||(s[2]=(...e)=>i.login&&i.login(...e))},"Login")])])])}var ws={name:"LoginUser",data(){return{email:"",password:"",error:null,success:null}},methods:{async login(){this.error=null;try{const e=await ss.login({email:this.email,password:this.password});this.$store.dispatch("setToken",e.data.token),this.$store.dispatch("setUser",e.data.user),this.$router.push({name:"ShowPicks"})}catch(e){this.error=e.response.data.error}}}};const hs=(0,U.Z)(ws,[["render",fs],["__scopeId","data-v-3f70d9c2"]]);var vs=hs;const bs=e=>((0,a.dD)("data-v-9e77ea12"),e=e(),(0,a.Cn)(),e),ys={id:"user-leaderboard"},Ds=bs((()=>(0,a._)("h2",null,"Leaderboard",-1))),Us={class:"leaderboard"},Ps=bs((()=>(0,a._)("th",null," First Name ",-1))),Ls=bs((()=>(0,a._)("th",null," Last Name ",-1))),Ss=bs((()=>(0,a._)("th",null," Username ",-1))),Is=bs((()=>(0,a._)("th",null," Record ",-1)));function $s(e,s,t,l,i,o){return(0,a.wg)(),(0,a.iD)("div",ys,[Ds,(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>i.selected_season=e),onChange:s[1]||(s[1]=e=>o.getLeaderboard(i.selected_season))},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.nflseasons,(e=>((0,a.wg)(),(0,a.iD)("option",{key:e},(0,n.zw)(e),1)))),128))],544),[[r.bM,i.selected_season]]),(0,a._)("table",Us,[Ps,Ls,Ss,Is,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.users,(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e.email,class:"team-row"},[(0,a._)("td",null,(0,n.zw)(e.firstname),1),(0,a._)("td",null,(0,n.zw)(e.lastname),1),(0,a._)("td",null,(0,n.zw)(e.username),1),(0,a._)("td",null,(0,n.zw)(e.wins)+"-"+(0,n.zw)(e.losses)+"-"+(0,n.zw)(e.pushes),1)])))),128))])])}var Ns={postLeaderboard(e){return le().post("/api/leaderboard",e)}},Cs={name:"UserLeaderboard",data(){return{users:[],nflseasons:["2022-2023","2023-2024","2024-2025"],selected_season:"2024-2025",error:null}},async created(){try{const e=await Ns.postLeaderboard({selected_season:"2023-2024"}),s=e.data;this.users=s}catch(e){this.error=e.response.data.error}},methods:{getLeaderboard(e){console.log("getLeaderboard fct");try{var s={selected_season:e};Ns.postLeaderboard(s).then((e=>{var s=e.data;this.users=s})).catch((e=>{console.log("Some error occurred while retrieving the leaderboard."),this.error=e.response.data.error}))}catch(t){this.error=t.response.data.error}}}};const Os=(0,U.Z)(Cs,[["render",$s],["__scopeId","data-v-9e77ea12"]]);var zs=Os;const Ts=e=>((0,a.dD)("data-v-be3cedfe"),e=e(),(0,a.Cn)(),e),js={id:"group-picks"},Es={class:"pick-tables-wrapper"},qs={class:"username-row-header"},xs=Ts((()=>(0,a._)("br",null,null,-1))),Hs={class:"pick-record"},Fs={key:0},Vs=Ts((()=>(0,a._)("i",{class:"fa-regular fa-circle"},null,-1))),Ws=[Vs],Ms={key:1},Gs=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-check"},null,-1))),Rs=[Gs],Ks={key:2},Ys=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-xmark"},null,-1))),As=[Ys],Zs={key:3},Js=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-minus"},null,-1))),Bs=[Js],Qs=Ts((()=>(0,a._)("td",null," Favorite ",-1))),Xs={key:0},et=Ts((()=>(0,a._)("i",{class:"fa-regular fa-circle"},null,-1))),st=[et],tt={key:1},rt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-check"},null,-1))),at=[rt],nt={key:2},lt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-xmark"},null,-1))),it=[lt],ot={key:3},ct=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-minus"},null,-1))),dt=[ct],ut=Ts((()=>(0,a._)("td",null," Underdog ",-1))),pt={key:0},gt=Ts((()=>(0,a._)("i",{class:"fa-regular fa-circle"},null,-1))),kt=[gt],_t={key:1},mt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-check"},null,-1))),ft=[mt],wt={key:2},ht=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-xmark"},null,-1))),vt=[ht],bt={key:3},yt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-minus"},null,-1))),Dt=[yt],Ut=Ts((()=>(0,a._)("td",null," Over ",-1))),Pt={key:0},Lt=Ts((()=>(0,a._)("i",{class:"fa-regular fa-circle"},null,-1))),St=[Lt],It={key:1},$t=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-check"},null,-1))),Nt=[$t],Ct={key:2},Ot=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-xmark"},null,-1))),zt=[Ot],Tt={key:3},jt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-minus"},null,-1))),Et=[jt],qt=Ts((()=>(0,a._)("td",null," Under ",-1))),xt={key:0},Ht=Ts((()=>(0,a._)("i",{class:"fa-regular fa-circle"},null,-1))),Ft=[Ht],Vt={key:1},Wt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-check"},null,-1))),Mt=[Wt],Gt={key:2},Rt=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-xmark"},null,-1))),Kt=[Rt],Yt={key:3},At=Ts((()=>(0,a._)("i",{class:"fa-solid fa-circle-minus"},null,-1))),Zt=[At],Jt=Ts((()=>(0,a._)("td",null," Lock ",-1))),Bt=["innerHTML"];function Qt(e,s,t,l,i,o){return(0,a.wg)(),(0,a.iD)("div",js,[(0,a._)("div",null,[(0,a._)("h2",null,(0,n.zw)(i.nflweek)+" Picks ",1),(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>i.selected_season=e),onChange:s[1]||(s[1]=s=>{o.getWeeksPicks(e.nfl_week,i.selected_season),o.getSeasonsWeeks(i.selected_season)})},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.nflseasons,(e=>((0,a.wg)(),(0,a.iD)("option",{key:e},(0,n.zw)(e),1)))),128))],544),[[r.bM,i.selected_season]]),(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":s[2]||(s[2]=e=>i.nflweek=e),onChange:s[3]||(s[3]=e=>o.getWeeksPicks(i.nflweek,i.selected_season))},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.distinct_nflweeks,(e=>((0,a.wg)(),(0,a.iD)("option",{key:e},(0,n.zw)(e.nfl_week),1)))),128))],544),[[r.bM,i.nflweek]]),(0,a._)("div",Es,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.picks,(e=>((0,a.wg)(),(0,a.iD)("table",{key:e.username,class:"pick-table"},[(0,a._)("tr",qs,[(0,a._)("th",{colspan:"3",style:(0,n.j5)(o.checkForJonny(e.username))},[(0,a._)("span",null,(0,n.zw)(e.username),1),xs,(0,a._)("span",Hs,(0,n.zw)(o.generateRecord(e)),1)],4)]),(0,a._)("tr",null,[(0,a._)("td",null,[null===e.grade_pick.favorite_grade?((0,a.wg)(),(0,a.iD)("span",Fs,Ws)):1===e.grade_pick.favorite_grade?((0,a.wg)(),(0,a.iD)("span",Ms,Rs)):-1===e.grade_pick.favorite_grade?((0,a.wg)(),(0,a.iD)("span",Ks,As)):0===e.grade_pick.favorite_grade?((0,a.wg)(),(0,a.iD)("span",Zs,Bs)):(0,a.kq)("",!0)]),Qs,(0,a._)("td",null,(0,n.zw)(o.parsePick(e.favorite).render_value),1)]),(0,a._)("tr",null,[(0,a._)("td",null,[null===e.grade_pick.underdog_grade?((0,a.wg)(),(0,a.iD)("span",Xs,st)):1===e.grade_pick.underdog_grade?((0,a.wg)(),(0,a.iD)("span",tt,at)):-1===e.grade_pick.underdog_grade?((0,a.wg)(),(0,a.iD)("span",nt,it)):0===e.grade_pick.underdog_grade?((0,a.wg)(),(0,a.iD)("span",ot,dt)):(0,a.kq)("",!0)]),ut,(0,a._)("td",null,(0,n.zw)(o.parsePick(e.underdog).render_value),1)]),(0,a._)("tr",null,[(0,a._)("td",null,[null===e.grade_pick.over_grade?((0,a.wg)(),(0,a.iD)("span",pt,kt)):1===e.grade_pick.over_grade?((0,a.wg)(),(0,a.iD)("span",_t,ft)):-1===e.grade_pick.over_grade?((0,a.wg)(),(0,a.iD)("span",wt,vt)):0===e.grade_pick.over_grade?((0,a.wg)(),(0,a.iD)("span",bt,Dt)):(0,a.kq)("",!0)]),Ut,(0,a._)("td",null,(0,n.zw)(o.parsePick(e.over).render_value),1)]),(0,a._)("tr",null,[(0,a._)("td",null,[null===e.grade_pick.under_grade?((0,a.wg)(),(0,a.iD)("span",Pt,St)):1===e.grade_pick.under_grade?((0,a.wg)(),(0,a.iD)("span",It,Nt)):-1===e.grade_pick.under_grade?((0,a.wg)(),(0,a.iD)("span",Ct,zt)):0===e.grade_pick.under_grade?((0,a.wg)(),(0,a.iD)("span",Tt,Et)):(0,a.kq)("",!0)]),qt,(0,a._)("td",null,(0,n.zw)(o.parsePick(e.under).render_value),1)]),(0,a._)("tr",null,[(0,a._)("td",null,[null===e.grade_pick.lock_grade?((0,a.wg)(),(0,a.iD)("span",xt,Ft)):1===e.grade_pick.lock_grade?((0,a.wg)(),(0,a.iD)("span",Vt,Mt)):-1===e.grade_pick.lock_grade?((0,a.wg)(),(0,a.iD)("span",Gt,Kt)):0===e.grade_pick.lock_grade?((0,a.wg)(),(0,a.iD)("span",Yt,Zt)):(0,a.kq)("",!0)]),Jt,(0,a._)("td",{innerHTML:o.parsePick(e.lock).render_value},null,8,Bt)])])))),128))])])])}var Xt=t(3494);Xt.vz.watch();var er={name:"GroupPicks",data(){return{nflweek:"",distinct_nflweeks:[],picks:[],error:null,color:"white",nflseasons:["2022-2023","2023-2024","2024-2025"],selected_season:"2024-2025"}},async created(){try{const e=await ye.postDistinctWeeks({selected_season:this.selected_season});this.distinct_nflweeks=e.data;const s=await ye.postGroupPicks({nflweek:null,selected_season:this.selected_season}),t=s.data;this.picks=t,this.nflweek=t[0].nfl_week}catch(e){this.error=e.response.data.error}},methods:{parsePick(e){return JSON.parse(e)},getWeeksPicks(e,s){console.log("getWeeksPicks fct");try{var t={nflweek:e,selected_season:s};ye.postGroupPicks(t).then((e=>{var s=e.data;this.picks=s,this.nflweek=s[0].nfl_week})).catch((e=>{console.log("Some error occurred while retrieving group picks."),this.error=e.response.data.error}))}catch(r){this.error=r.response.data.error}},getSeasonsWeeks(e){try{var s={selected_season:e};ye.postDistinctWeeks(s).then((e=>{var s=e.data;this.distinct_nflweeks=s})).catch((s=>{console.log(`Some error occurred while retrieving NFL weeks for selected season ${e}.`),this.error=s.response.data.error}))}catch(t){this.error=t.response.data.error}},checkForJonny(e){let s="";return s="Breakfastbuffet"===e?"#F9629F":"cornsoupyellow"===e?"#512888":"white",{color:s}},generateRecord(e){var s=e.grade_pick,t=[];for(let i in s){var r=s[i];r&&t.push(r)}var a=t.filter((e=>1===e)).length,n=t.filter((e=>-1===e)).length,l=t.filter((e=>0===e)).length;return a+"-"+n+"-"+l}}};const sr=(0,U.Z)(er,[["render",Qt],["__scopeId","data-v-be3cedfe"]]);var tr=sr;const rr=[{path:"/about",name:"about",component:()=>t.e(443).then(t.bind(t,7381))},{path:"/register",name:"RegisterUser",component:as},{path:"/login",name:"LoginUser",component:vs},{path:"/leaderboard",name:"UserLeaderboard",component:zs},{path:"/group/picks",name:"GroupPicks",component:tr},{path:"/",redirect:{name:"ShowPicks"}},{path:"/showpicks",name:"ShowPicks",component:pe,props:!0},{path:"/selected",name:"SelectedPicks",component:Pe,props:!0},{path:"/nflteams",name:"NFLTeams",component:ze,props:!0}],ar=(0,S.p7)({mode:"history",history:(0,S.PO)("/"),routes:rr});console.log("Router:"),console.log("/");var nr=ar,lr=t(8539),ir=t(8429),or=t(7749);Xt.vI.add(lr.fV7,lr.W7v,ir.diR,lr.WA2),(0,r.ri)(L).use(nr).use(ce).component("font-awesome-icon",or.GN).mount("#app")}},s={};function t(r){var a=s[r];if(void 0!==a)return a.exports;var n=s[r]={exports:{}};return e[r](n,n.exports,t),n.exports}t.m=e,function(){var e=[];t.O=function(s,r,a,n){if(!r){var l=1/0;for(d=0;d<e.length;d++){r=e[d][0],a=e[d][1],n=e[d][2];for(var i=!0,o=0;o<r.length;o++)(!1&n||l>=n)&&Object.keys(t.O).every((function(e){return t.O[e](r[o])}))?r.splice(o--,1):(i=!1,n<l&&(l=n));if(i){e.splice(d--,1);var c=a();void 0!==c&&(s=c)}}return s}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,a,n]}}(),function(){t.n=function(e){var s=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(s,{a:s}),s}}(),function(){t.d=function(e,s){for(var r in s)t.o(s,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(s,r){return t.f[r](e,s),s}),[]))}}(),function(){t.u=function(e){return"js/about.52d52c6f.js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)}}(),function(){var e={},s="pickem-front-end-v2:";t.l=function(r,a,n,l){if(e[r])e[r].push(a);else{var i,o;if(void 0!==n)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==s+n){i=u;break}}i||(o=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,t.nc&&i.setAttribute("nonce",t.nc),i.setAttribute("data-webpack",s+n),i.src=r),e[r]=[a];var p=function(s,t){i.onerror=i.onload=null,clearTimeout(g);var a=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((function(e){return e(t)})),s)return s(t)},g=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),o&&document.head.appendChild(i)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e={143:0};t.f.j=function(s,r){var a=t.o(e,s)?e[s]:void 0;if(0!==a)if(a)r.push(a[2]);else{var n=new Promise((function(t,r){a=e[s]=[t,r]}));r.push(a[2]=n);var l=t.p+t.u(s),i=new Error,o=function(r){if(t.o(e,s)&&(a=e[s],0!==a&&(e[s]=void 0),a)){var n=r&&("load"===r.type?"missing":r.type),l=r&&r.target&&r.target.src;i.message="Loading chunk "+s+" failed.\n("+n+": "+l+")",i.name="ChunkLoadError",i.type=n,i.request=l,a[1](i)}};t.l(l,o,"chunk-"+s,s)}},t.O.j=function(s){return 0===e[s]};var s=function(s,r){var a,n,l=r[0],i=r[1],o=r[2],c=0;if(l.some((function(s){return 0!==e[s]}))){for(a in i)t.o(i,a)&&(t.m[a]=i[a]);if(o)var d=o(t)}for(s&&s(r);c<l.length;c++)n=l[c],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(d)},r=self["webpackChunkpickem_front_end_v2"]=self["webpackChunkpickem_front_end_v2"]||[];r.forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(8160)}));r=t.O(r)})();
//# sourceMappingURL=app.888ccf3a.js.map