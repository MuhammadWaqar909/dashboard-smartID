(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[14,13],{366:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s.n(a),r=s(19),c=s(356),i=s.n(c),o=s(353),l=s(16);const d=[{name:"Name",selector:e=>e.name},{name:"Email",selector:e=>e.email},{name:"Type",selector:e=>e.type}];class h extends n.a.Component{constructor(e){super(e);const t=localStorage.getItem("token"),s=JSON.parse(localStorage.getItem("user"));let a=t,n=!0;null==a&&(n=!1),this.state={auth:a,user:s,pending:!0,datatable:[]}}componentDidMount(){fetch("https://smartid.smartmicros.com/api/api/customers",{headers:{Authorization:this.state.auth}}).then((e=>e.json())).then((e=>{this.setState({pending:!1,datatable:e})}))}render(){if(null===this.state.user)return Object(l.jsx)(r.a,{to:"/login"});if(!this.state.user.is_admin)return Object(l.jsx)(r.a,{to:"/dashboard"});const{datatable:e}=this.state;return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)(o.J,{children:Object(l.jsx)(o.k,{children:Object(l.jsxs)(o.g,{children:[Object(l.jsxs)(o.j,{children:[Object(l.jsx)("span",{className:"justify-content-start",children:"Customers"}),Object(l.jsx)(o.G,{variant:"pills",className:"card-header-pills justify-content-end",children:Object(l.jsx)(o.H,{children:Object(l.jsx)(o.I,{href:"#/customers/add",active:!0,children:"Add Customer"})})})]}),Object(l.jsx)(o.h,{children:Object(l.jsx)(i.a,{columns:d,data:e,selectableRows:!0,direction:"auto",fixedHeaderScrollHeight:"300px",highlightOnHover:!0,pagination:!0,pointerOnHover:!0,responsive:!0,selectableRowsHighlight:!0,selectableRowsNoSelectAll:!0,selectableRowsRadio:"checkbox",striped:!0,progressPending:this.state.pending,subHeader:!0,subHeaderAlign:"left"})})]})})})})}}t.default=h}}]);
//# sourceMappingURL=14.cc1fb7b1.chunk.js.map