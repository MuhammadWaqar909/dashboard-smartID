(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[15],{382:function(t,e,i){"use strict";i.r(e);var s=i(1),a=i.n(s),o=i(19),c=i(356),l=i.n(c),r=i(353),n=i(16);const h={headCells:{style:{fontWeight:600,fontSize:"14px"}}};let d;class p extends a.a.Component{constructor(t){super(t);const e=localStorage.getItem("token"),i=JSON.parse(localStorage.getItem("user"));d=[{key:"visitor_name",wrap:!0,minWidth:"120px",name:"Visitor Name",selector:t=>t.visitor_name},{key:"visitor_company",wrap:!0,minWidth:"150px",name:"Visitor Company",selector:t=>t.visitor_company},{key:"visitor_card_pic",name:"Card",wrap:!0,sorter:!1,filter:!1,selector:t=>Object(n.jsx)("button",{style:{width:"100%",height:"50px",background:"none",outline:"none",border:"none",cursor:"pointer"},onClick:()=>this.toggle(t.visitor_card_pic),children:Object(n.jsx)("img",{style:{width:"100%",height:"100%"},src:"".concat("https://smartid.smartmicros.com/api/public/images/"+t.visitor_card_pic),alt:"card/jpg"})})},{key:"visitor_face_pic",name:"Face",wrap:!0,sorter:!1,filter:!1,selector:t=>Object(n.jsx)("button",{style:{width:"100%",height:"50px",background:"none",outline:"none",border:"none",cursor:"pointer"},onClick:()=>this.toggle(t.visitor_face_pic),children:Object(n.jsx)("img",{style:{width:"100%",height:"100%"},src:"".concat("https://smartid.smartmicros.com/api/public/images/"+t.visitor_face_pic),alt:"card/jpg"})})},{key:"visiting_to",wrap:!0,name:"Visit To",selector:t=>t.visiting_to},{key:"visit_purpose",wrap:!0,name:"Visitor Purpose",minWidth:"140px",selector:t=>t.visit_purpose},{key:"time_in",wrap:!0,name:"Visit Date",selector:t=>t.time_in},{key:"time_out",wrap:!0,name:"Time Out",selector:t=>t.time_out},{key:"national_id",minWidth:"140px",wrap:!0,name:"National ID",selector:t=>t.national_id},{key:"nationality",wrap:!0,minWidth:"140px",name:"Nationality",selector:t=>t.nationality},{key:"user_id",wrap:!0,name:"Customer",selector:t=>t.customer_id},{key:"ocr_data",name:"Details",wrap:!0,sorter:!1,filter:!1,selector:t=>Object(n.jsx)("button",{onClick:()=>{this.toggleDetails(t.ocr_data)},children:"Show Data"})}];let s=e,a=!0;null==s&&(a=!1),this.state={auth:s,user:i,datatable:[],pmodal:!1,cmodal:!1,pic_url:"",pending:!0,details:[],setDetails:""},this.toggle=this.toggle.bind(this),this.toggleDetails=this.toggleDetails.bind(this),this.closeDetails=this.closeDetails.bind(this),this.closePictureModel=this.closePictureModel.bind(this)}componentDidMount(){null!=this.state.auth&&fetch("https://smartid.smartmicros.com/api/api/visitors/3",{headers:{Authorization:this.state.auth}}).then((t=>t.json())).then((t=>{this.setState({pending:!1,datatable:t})}))}toggle(t){this.setState({pmodal:!this.state.pmodal,pic_url:t})}toggleDetails(t){let e=JSON.parse(t);this.setState({cmodal:!this.state.cmodal,setDetails:Object.keys(e),setDetails:Object.keys(e).map((t=>"".concat(t," = ").concat(e[t]," , ")))}),console.log(this.state.setDetails)}closeDetails(){this.setState({cmodal:!1,details:""})}closePictureModel(){this.setState({pmodal:!1})}render(){if(null===this.state.auth)return Object(n.jsx)(o.a,{to:"/login"});const{datatable:t}=this.state;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(r.J,{children:Object(n.jsx)(r.k,{children:Object(n.jsxs)(r.g,{children:[Object(n.jsx)(r.j,{children:"Visitors"}),Object(n.jsxs)(r.h,{children:[Object(n.jsx)("div",{children:Object(n.jsx)("input",{type:"text",placeholder:"Enter Filter"})}),Object(n.jsx)(l.a,{columns:d,data:t,selectableRows:!0,direction:"auto",fixedHeaderScrollHeight:"300px",highlightOnHover:!0,pagination:!0,pointerOnHover:!0,responsive:!0,selectableRowsHighlight:!0,selectableRowsNoSelectAll:!0,selectableRowsRadio:"checkbox",striped:!0,subHeader:!0,progressPending:this.state.pending,subHeaderAlign:"right",subHeaderWrap:!0,customStyles:h})]})]})})}),Object(n.jsxs)(r.C,{visible:this.state.pmodal,onClose:this.closePictureModel,children:[Object(n.jsx)(r.F,{children:"Picture"}),Object(n.jsx)(r.D,{children:Object(n.jsx)(r.y,{src:"https://smartid.smartmicros.com/api/public/images/"+this.state.pic_url,fluid:!0,className:"mb-2",thumbnail:!0,width:"480",height:"200"})}),Object(n.jsx)(r.E,{children:Object(n.jsx)(r.e,{color:"secondary",onClick:this.toggle,children:"Cancel"})})]}),Object(n.jsxs)(r.C,{visible:this.state.cmodal,onClose:this.closeDetails,children:[Object(n.jsx)(r.F,{closeButton:!0,children:"Details"}),Object(n.jsx)(r.D,{children:Object(n.jsx)(r.l,{children:this.state.setDetails})}),Object(n.jsx)(r.E,{children:Object(n.jsx)(r.e,{color:"secondary",onClick:this.closeDetails,children:"Close"})})]})]})}}e.default=p}}]);
//# sourceMappingURL=15.26cf3f8e.chunk.js.map