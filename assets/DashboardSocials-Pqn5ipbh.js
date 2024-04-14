import{i as Q,r as i,e as X,a as q,j as e,L as J,f as K,B as Y,R as Z,g as C,k as ee,Q as x}from"./index-g7zPiIaF.js";import{S as ae,A as w}from"./index.esm-s96I5nnh.js";Q.register();const re=()=>{const _=["Icono","Red Social","Tipo","Enlace","Acciones"],[h,g]=i.useState({show:!1,type:"add",id:""}),[E,v]=i.useState(""),[l,d]=i.useState({}),{dataSocialMedia:N,handleGetData:P,handleUpdateData:I,handleAddData:R,handleDeleteData:A}=X(),[u,j]=i.useState([]),[r,c]=i.useState([]),[S,p]=i.useState(!1),{register:F,handleSubmit:k,setValue:T,reset:se}=q([{}]),[n,m]=i.useState({name:"",icon:"",link:"",type_link:""}),[y,O]=i.useState(1),L=Math.ceil(r.length/5),B=y*5,D=(y-1)*5,U=r.slice(D,B),$=async()=>{try{await P()}catch(a){console.error("Error fetching data:",a)}},G=a=>{var s;return u[a]?u[a]:(s=r[a])!=null&&s.icon?r[a].icon:null},M=(a,s)=>{const t=a.target.files[0];if(t){const o=new FileReader;o.onloadend=()=>{j(f=>{const b=[...f];return b[s]=o.result,b}),(f=>{s===(r==null?void 0:r.length)?m(b=>({...b,icon:f})):T(`[${s}].icon`,f)})(t)},o.readAsDataURL(t)}},V=async a=>{try{p(!0);const s=new FormData;s.append("socialMediaData[0][name]",n.name),s.append("socialMediaData[0][link]",n.link),s.append("socialMediaData[0][type_link]",E),s.append("SocialIcon_0",n.icon);const{ok:t,response:o}=await R(s);t&&(x.success("Se agregó la red social con éxito"),p(!1),m({name:"",icon:"",link:"",type_link:""}),j([]),c([]),c(o.data))}catch(s){console.error("Error al agregar la red social:",s),x.error("Ocurrió un error al agregar la red social"),p(!1)}},W=async a=>{try{p(!0);const s=new FormData;s.append("socialMediaData[0][_id]",l._id),s.append("socialMediaData[0][name]",l.name),s.append("socialMediaData[0][link]",l.link),s.append("socialMediaData[0][type_link]",l.type_link),s.append("SocialIcon_0",l.icon);const{ok:t,response:o}=await I(s);t&&(x.success("Se agregó la red social con éxito"),p(!1),d({}),j([]),c([]),c(o.data),g({show:!1,type:"",id:""}))}catch{x.error("Ocurrió un error al agregar la red social"),p(!1)}},H=async a=>{try{const s=(r||[]).filter(z=>z._id!==a);c(s);const{ok:t,response:o}=await A(a);t&&(x.success("Se eliminó la red social con éxito"),c(o.data))}catch{x.error("Ocurrió un error al actualizar las redes sociales")}};return i.useEffect(()=>{c(N||[])},[N]),i.useEffect(()=>{$()},[]),r.length===0?e.jsx(J,{}):e.jsxs("div",{className:"relative",children:[e.jsx(ae,{}),e.jsx("div",{className:"p-4 mt-8 md:ml-64 md:mt-0 ",children:e.jsx("div",{className:"p-4 border-gray-200 rounded-lg",children:e.jsx("div",{className:"flex flex-col gap-y-16",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("h3",{className:"text-3xl font-bold",children:"Redes sociales"}),e.jsx("button",{className:"px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400",type:"button",onClick:()=>g({show:!0,type:"add",id:""}),children:"Agregar red social"}),e.jsx("div",{className:"flex flex-col gap-4",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("div",{className:"flex flex-wrap gap-4 overflow-x-auto",children:e.jsxs("table",{className:"min-w-full overflow-hidden divide-y divide-gray-200",children:[e.jsx("thead",{className:"bg-gray-50",children:e.jsx("tr",{children:_.map((a,s)=>e.jsx("th",{scope:"col",className:"px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase",children:a},s))})}),e.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:U.map((a,s)=>{const t=D+s;return e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsxs("div",{className:"relative flex items-center justify-center h-20 m-auto overflow-hidden w-fit",children:[e.jsxs("label",{htmlFor:`dropzone-file-social-media-${t}`,className:"flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center h-20 pt-5 pb-6",children:[e.jsx(w,{size:40}),e.jsx("p",{className:"mb-2 text-sm text-gray-500",children:"Subir icono"})]}),e.jsx("input",{type:"file",className:"hidden",src:a.icon})]}),e.jsx("div",{className:"absolute object-contain pointer-events-none w-max-60 h-max-60",children:e.jsx("img",{src:G(t),alt:"imagePreview",className:"w-full h-20 bg-white",...F(`[${t}].icon`)})})]})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("span",{className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",children:a.name})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("span",{className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",children:a.type_link})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("span",{className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",children:a.link})}),e.jsxs("td",{className:"px-6 py-4 text-center whitespace-nowrap",children:[e.jsx("button",{type:"button",className:"pr-4 cursor-pointer",onClick:()=>{g({show:!0,type:"edit",id:a._id}),d(a)},children:e.jsx(K,{size:20,className:"transition-all duration-300 hover:text-red-500"})}),e.jsx("button",{type:"button",className:"cursor-pointer",onClick:()=>H(a._id),children:e.jsx(Y,{size:20,className:"transition-all duration-300 hover:text-red-500"})})]})]},t)})})]})}),e.jsx(Z,{current:y,total:L,onPageChange:O})]})})]})})})}),h.show&&h.type==="add"&&e.jsx("div",{className:"absolute top-0 bottom-0 left-0 right-0 z-[100] bg-[#00000073] h-screen w-screen flex justify-center items-center overflow-hidden",children:e.jsxs("div",{className:"absolute p-4 bg-white rounded-lg",children:[e.jsx("div",{className:"flex justify-end w-full",children:e.jsx(C,{className:"cursor-pointer top-4",onClick:()=>g({show:!1,type:"",id:""}),size:20})}),e.jsxs("form",{className:"flex flex-col justify-center p-3 mb-4 transition-all duration-300 w-[18rem] gap-y-2 gap-x-8",onSubmit:k(V),children:[e.jsxs("div",{className:"relative flex items-center justify-center overflow-hidden h-fit",children:[e.jsxs("label",{htmlFor:"dropzone-file-social-media-new",className:"flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer h-36 ",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[e.jsx(w,{size:40}),e.jsx("p",{className:"mb-2 text-sm text-gray-500",children:"Subir icono"})]}),e.jsx("input",{id:"dropzone-file-social-media-new",type:"file",className:"hidden",defaultValue:n.icon,onChange:a=>M(a,r.length)})]}),u[r.length]&&e.jsx("div",{className:"absolute object-cover pointer-events-none w-fit h-fit",children:e.jsx("img",{src:u[r.length],alt:"imagePreview",className:"w-full h-full bg-white"})})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Red Social",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",value:n.name,onChange:a=>m({...n,name:a.target.value})}),e.jsxs("select",{value:"",onChange:a=>v(a.target.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",children:[e.jsx("option",{value:"",disabled:!0,children:"Tipo de enlace"}),e.jsx("option",{value:"email",children:"Email"}),e.jsx("option",{value:"social",children:"Red Social"}),e.jsx("option",{value:"tel",children:"Teléfono"}),e.jsx("option",{value:"whatsapp",children:"Whatsapp"})]}),e.jsx("input",{type:"text",placeholder:"Enlace / Teléfono / Email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",value:n.link,onChange:a=>m({...n,link:a.target.value})})]}),e.jsx("button",{className:"w-full px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400",type:"submit",children:S?e.jsx("l-ring",{size:"19",speed:"2",color:"white",stroke:4}):"Agregar red social"})]})]})}),h.show&&h.type==="edit"&&e.jsx("div",{className:"absolute top-0 bottom-0 left-0 right-0 z-[100] bg-[#00000073] h-screen w-screen flex justify-center items-center overflow-hidden",children:e.jsxs("div",{className:"absolute p-4 bg-white rounded-lg",children:[e.jsx("div",{className:"flex justify-end w-full",children:e.jsx(C,{className:"cursor-pointer top-4",onClick:()=>g({show:!1,type:"",id:""}),size:20})}),e.jsxs("form",{className:"flex flex-col justify-center p-3 mb-4 transition-all duration-300 w-[18rem] gap-y-2 gap-x-8",onSubmit:k(W),children:[e.jsxs("div",{className:"relative flex items-center justify-center overflow-hidden h-fit",children:[e.jsxs("label",{htmlFor:"dropzone-file-social-media-edit",className:"flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer h-36 ",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[e.jsx(w,{size:40}),e.jsx("p",{className:"mb-2 text-sm text-gray-500",children:"Subir icono"})]}),e.jsx("input",{id:"dropzone-file-social-media-edit",type:"file",className:"hidden",onChange:a=>{M(a,0),d({...l,icon:a.target.files?a.target.files[0]:""})}})]}),u[0]?e.jsx("div",{className:"absolute object-cover pointer-events-none w-fit h-fit",children:e.jsx("img",{src:u[0],alt:"imagePreview",className:"w-full h-full bg-white"})}):e.jsx("div",{className:"absolute object-cover pointer-events-none w-fit h-fit",children:e.jsx("img",{src:l.icon,alt:"imagePreview",className:"w-full h-full bg-white"})})]}),e.jsxs("div",{className:"flex flex-col gap-y-2",children:[e.jsx("input",{type:"text",placeholder:"Red Social",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",value:l.name,onChange:a=>d({...l,name:a.target.value})}),e.jsxs("select",{value:(l==null?void 0:l.type_link)||"",onChange:a=>{v(a.target.value),d({...l,type_link:a.target.value})},className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",children:[e.jsx("option",{value:"",disabled:!0,children:"Tipo de enlace"}),e.jsx("option",{value:"email",children:"Email"}),e.jsx("option",{value:"social",children:"Red Social"}),e.jsx("option",{value:"tel",children:"Teléfono"}),e.jsx("option",{value:"whatsapp",children:"Whatsapp"})]}),e.jsx("input",{type:"text",placeholder:"Enlace / Teléfono / Email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",value:l.link,onChange:a=>d({...l,link:a.target.value})})]}),e.jsx("button",{className:"w-full px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400",type:"submit",children:S?e.jsx("l-ring",{size:"19",speed:"2",color:"white",stroke:4}):"Actualizar red social"})]})]})}),e.jsx(ee,{})]})};export{re as default};
