import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
// import { Redirect, Route } from "react-router";
import { userData } from "../../actions/userData";
import { finalData } from "../../actions/finalData";
import { siteData } from "../../actions/siteData";

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory ,
  useLocation,
  withRouter
  }from 'react-router-dom'
// import '../../assetsAdmin/admincss/style1.css';
// import '../../assetsAdmin/admincss/dashforge.css';
// import '../../assetsAdmin/admincss/dashforge.dashboard.css';


const Header = () => {
  /*** for menu active start code */
  const [clicked, setClicked] = useState('');
  const [clicked1, setClicked1] = useState('');
  const [clicked2, setClicked2] = useState('');
   const [clicked3, setClicked3] = useState('');
   const [clicked9, setClicked9] = useState('');
   
   const [clicked4, setClicked4] = useState('');
   
  const [tgdiv, settgdiv] = useState('false');
  const dispatch=useDispatch();

const handleClick = () => {
 setClicked('active-tab');
   setClicked1('');
 setClicked2('');
 setClicked3('');
   setClicked4('');
    setClicked9('');
  
};
const handleClick1 = () => {
   setClicked1('active-tab');
   setClicked('');
  setClicked2('');
  setClicked3('');
    setClicked4('');
      setClicked9('');
  
};
const handleClick2 = () => {
 setClicked2('active-tab');
  setClicked1('');
  setClicked('');
    setClicked3('');
      setClicked4('');
        setClicked9('');
  
};
const handleClick3 = () => {
 setClicked3('active-tab');
  setClicked1('');
  setClicked('');
    setClicked2('');
      setClicked4('');
        setClicked9('');
  
};
const handleClick4 = () => {
 setClicked4('active-tab');
  setClicked1('');
  setClicked('');
    setClicked2('');
      setClicked3('');
        setClicked9('');
  
};
const handleClick9 = () => {
 setClicked4('');
  setClicked1('');
  setClicked('');
    setClicked2('');
      setClicked3('');
        setClicked9('active-tab');
  
};

  /*** for menu active start code */
  
  const a = useSelector((state) => state.todoReducer);
  const a1 = useSelector((state) => state.todoReducer1);
  const a2 = useSelector((state) => state.todoReducer2);
  const a3 = useSelector((state) => state.todoReducer3);
  const a4 = useSelector((state) => state.todoReducer4);
  const [user, setUserInfo] = useState('');
  const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
  // const type = useSelector((state) => state.todoReducer3.applicant_info.type);
  const anew = useSelector((state) => state);
  const signOut = () =>{
    dispatch(finalData({
      info:null
     }));
    dispatch(userData({
      id:null,
      info:null
     }));
     dispatch(siteData({
      page:null
     
     }));
     dispatch(siteData({
      page:'/admin'
     }));
    return <Redirect to={'/admin'} />;
  }
  const signOutglobal = () =>{
    dispatch(finalData({
      info:null
     }));
    dispatch(userData({
      id:null,
      info:null
     }));
     dispatch(siteData({
      page:null
     
     }));
     dispatch(siteData({
      page:'/globaladmin'
     }));
    return <Redirect to={'/globaladmin'} />;
  }
  const checkSignout = () =>{
    var val = document.getElementById("checksign");
    if(window.getComputedStyle(val).display === "none"){
      document.getElementById("checksign").style.display = "block";
    }else{
      document.getElementById("checksign").style.display = "none";
    }

    
  }
  
  document.title='FRMS ADMIN';
  useEffect(() => {

    
if(a3){
  var urllink=window.location.pathname;

  console.log(urllink);
  console.log(a4.page);
 
  if(a4.page=='/Viewrequest'){
    dispatch(siteData({
      page:'/Viewrequest'
     }));
    handleClick();
    
  }
  if(a4.page=='/Applicationstatus'){
    dispatch(siteData({
      page:'/Applicationstatus'
     }));
    handleClick1();
  }
  if(a4.page=='/home'){
    dispatch(siteData({
      page:'/home'
     }));
    handleClick2();
  }
  if(a4.page=='/BookingCalender'){
    dispatch(siteData({
      page:'/BookingCalender'
     }));
    handleClick3();
  }
  if(a4.page=='/Facilityadmin'){
    dispatch(siteData({
      page:'/Facilityadmin'
     }));
    handleClick9();
  }
  if(urllink=='/home'){
    dispatch(siteData({
      page:'/home'
     }));
    handleClick2();
  }
  if(urllink=='/Viewrequest'){
    dispatch(siteData({
      page:'/Viewrequest'
     }));
    handleClick();
  }
  if(urllink=='/Applicationstatus'){
    dispatch(siteData({
      page:'/Applicationstatus'
     }));
    handleClick1();
  }
   if(urllink=='/BookingCalender'){
    dispatch(siteData({
      page:'/BookingCalender'
     }));
    handleClick3();
  }
   if(urllink=='/Facilityadmin'){
    dispatch(siteData({
      page:'/Facilityadmin'
     }));
    handleClick9();
  }
 var  ourSubstring='/Createestimate/';
if (urllink.includes(ourSubstring)) {
  dispatch(siteData({
    page:'/Applicationstatus'
   }));
  handleClick1();
} 
var  ourSubstring='/Viewdetails/';
if (urllink.includes(ourSubstring)) {
  dispatch(siteData({
    page:'/Viewrequest'
   }));
   handleClick();
} 
var  ourSubstring='/Applicationstatusdetails/';
if (urllink.includes(ourSubstring)) {
  dispatch(siteData({
    page:'/Applicationstatus'
   }));
  handleClick1();
} 

 if(urllink=='/BookingList'){
    dispatch(siteData({
      page:'/BookingList'
     }));
    handleClick3();
  }
  if(urllink=='/BookingDetails'){
    dispatch(siteData({
      page:'/BookingDetails'
     }));
    handleClick3();
  }
  if(urllink=='/Locationadminview'){
    dispatch(siteData({
      page:'/Locationadminview'
     }));
    handleClick4();
  }
 if(urllink=='/Locationviewdetails'){
    dispatch(siteData({
      page:'/Locationviewdetails'
     }));
    handleClick4();
  }


console.log("HEADER");
console.log(a3);
console.log(urllink);
setUserInfo(a3);
}else{
  setUserInfo("fail");
}

  },[])
  if(a4.page=='/globaladmin'){

 
    return <Redirect to={`/globaladmin`} />;
  }
  if(!applicant_id1 ){
        
    return <Redirect to={`/admin`} />;
 }
 if(applicant_id1!='' &&  applicant_id1.length <4){
  return <Redirect to={`/admin`} />;
}


/*** for menu active end code */
return (
  <React.Fragment>
   {/* <Link to="/">Home</Link>
   <Link to="/Viewenquiries">View Enquiries</Link>
   <Link to="/Applicationstatus">Application Status</Link> */}
   <header className="navbar navbar-header navbar-header-fixed">
      <a href="" id="mainMenuOpen" className="burger-menu"><i data-feather="menu"></i></a>
      <div className="navbar-brand">
      {a3.applicant_info.type==='admin' &&
        <Link to="/home" className="df-logo"> <img src="../image/logo.png" /> </Link>
      }
      {a3.applicant_info.type==='globaladmin' &&
        <Link to="/home" className="df-logo"> <img src="../image/logo.png" /> </Link>
      }
       {a3.applicant_info.type==='sub' &&
        <Link to="/Locationadminview" className="df-logo"> <img src="../image/logo.png" /> </Link>
      }
      </div>
      {/* <div id="navbarMenu" className="navbar-menu-wrapper">
        <div className="navbar-menu-header">
          <a href="#" className="df-logo"><img src="logo.svg"  alt="CoolBrand" /></a>
          <a id="mainMenuClose" href=""><i data-feather="x"></i></a>
        </div>
       
      </div> */}
      <div className="navbar-right" style={{width:'281px'}}> 
       
      
        <div className="dropdown dropdown-notification dropdown-list">
      {a3.applicant_info.type==='admin' &&
            <ul style={{width:'632px'}}>
              
              <li><Link to="/Viewrequest" className={clicked || 'base-state' } onClick={handleClick} >View Request</Link></li>
              <li><Link to="/Applicationstatus" className={clicked1 || 'base-state' } onClick={handleClick1}>Application Status</Link></li>
              <li><Link to="/home" className={clicked2 || 'base-state' } onClick={handleClick2}>Admin Dashboard</Link></li>
<li> <Link to="/BookingCalender" className={clicked3 || 'base-state' }  onClick={handleClick3}>Booking Calendar</Link></li>
            </ul>
}

{a3.applicant_info.type==='globaladmin' &&
            <ul style={{width:'632px'}}>
              
             
              <li><Link to="/Applicationstatus" className={clicked1 || 'base-state' } onClick={handleClick1}>Application Status</Link></li>
              <li><Link to="/home" className={clicked2 || 'base-state' } onClick={handleClick2}>Admin Dashboard</Link></li>
              <li> <Link to="/BookingCalender" className={clicked3 || 'base-state' }  onClick={handleClick3}>Booking Calendar</Link></li>
            <li> <Link to="/Facilityadmin" className={clicked9 || 'base-state' }  onClick={handleClick9}>Facility Admin</Link></li>
           
            </ul>
}
{a3.applicant_info.type==='sub' &&
      <>
          <ul style={{width:'250px'}}>
              
              <li> <Link to="/Locationadminview"  className={clicked4 || 'base-state' }  onClick={handleClick4} style={{fontSize:'15px',fontWeight:'400'}}>My Task</Link></li>
       
       <li><Link to="/BookingCalender" className={clicked3 || 'base-state' }  onClick={handleClick3} >Booking Calendar</Link></li>
             
            </ul>     
      
</>
      }

        

          
        
        </div>
        
        <div className="dropdown dropdown-profile" >
          <a href="#" className="dropdown-link" data-toggle="dropdown" data-display="static"  style={{width:'137px'}}>
            <p className="avatar-name">{a3.applicant_info.firstName}</p>
            <div className="avatar avatar-sm" title="SignOut" >
                <img src="https://via.placeholder.com/500" className="rounded-circle" alt="" onClick={() => {checkSignout()}} /></div>
            
          </a>
       

          {a3.applicant_info.type==='admin' &&
               <div className="dropdown-menu dropdown-menu-right dropdown-top tx-13"  id="checksign"    onClick={() => {checkSignout()}}>
        

           
               <a href="#"  onClick={() => {signOut()}} className="dropdown-item dropdown-sign"><i className="fa fa-sign-out" aria-hidden="true"></i>
                 Sign Out</a>
             </div>
   
}
{a3.applicant_info.type==='sub' &&
               <div className="dropdown-menu dropdown-menu-right dropdown-top tx-13"  id="checksign"    onClick={() => {checkSignout()}}>
        

           
               <a href="#"  onClick={() => {signOut()}} className="dropdown-item dropdown-sign"><i className="fa fa-sign-out" aria-hidden="true"></i>
                 Sign Out</a>
             </div>
   
}

{a3.applicant_info.type==='globaladmin' &&
             <div className="dropdown-menu dropdown-menu-right dropdown-top tx-13"  id="checksign"    onClick={() => {checkSignout()}}>
        

           
             <a href="#"  onClick={() => {signOutglobal()}} className="dropdown-item dropdown-sign"><i className="fa fa-sign-out" aria-hidden="true"></i>
               Sign Out</a>
           </div>
 
}
        </div>
      </div>
      
    </header>
    </React.Fragment>
)
}
export default Header