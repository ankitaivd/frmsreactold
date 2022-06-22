import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
// import { Redirect, Route } from "react-router";
import { userData } from "../actions/userData";
import { finalData } from "../actions/finalData";
import { siteData } from "../actions/siteData";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// import '../assets/css/bootstrap.min.css';
// import '../assets/css/styleN.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory ,
  useLocation,
  useParams,
  withRouter
  }from 'react-router-dom'
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
const  Header =()=> {
    const [login,setLogInfo]=useState({
        name:"",
        organization:"",
        position:"",
        phone:"",
        email:"", 
         authorizedOrganization:"",
        error_name:1,
        error_organization:1,
        error_position:1,
        error_phone:1,
        error_email:1, 
    
        err:'0',
        // authorized:
      });


       const [signIn,setSignin]=useState({
        signIn_password:"",        
        signIn_email:"",        
        error_password:1,        
        error_email:1,     
        signIn_err:'0',
        signIn_mesage:'',
        status:'fail',
        id:''
      });
      const [Resetpassword,setResetpassword]=useState({
               
        Reset_email:"",        
            
        error_email:1,     
        Resetpassword_err:'0',
        Resetpassword_mesage:'',
        status:'fail',
        id:''
      });
      const { id } = useParams();
      const Axios = axios.create({
        baseURL: process.env.REACT_APP_ENV_URL
      });
      const style = {
        color: 'red',
        
      };
  const [showM, setShow1] = useState(false);
  const handleCloseM = () => setShow1(false);
  const handleShowM = () => setShow1(true);

  const [showR, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);


  const [showUP, setShowUP] = useState(false);
  const handleCloseUP = () => setShowUP(false);
  const handleShowUP = () => setShowUP(true);

  const [showalert, setShowalert] = useState(false);
  const handleClosealert = () => setShowalert(false);
  const handleShowalert = () => setShowalert(true);

  const applicant_info = useSelector((state) => state.todoReducer.applicant_info);
  const dispatch=useDispatch();
  const applicant_id = useSelector((state) => state.todoReducer3.user_id);

  const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
     const applicant_info3 = useSelector((state) => state.todoReducer3.applicant_info);



     const siteData = useSelector((state) => state.todoReducer4);
     const lo = useLocation();
    
     console.log(applicant_info3);
  
  useEffect(() => {
   
    // console.log(lo);
    // console.log("From user Reducer");
    // console.log(applicant_id1);
    // console.log(applicant_info3);
        },[]);
    
  const inputEvent =(event)=> {
      //setName(event.target.value);
      //console.log(event.target.value);
    //  console.log(event);
      setLogInfo((preValue)=>{
         if(event.target.name==='organization'){
  
          return {        
          organization : event.target.value,
          name : preValue.name,
          position : preValue.position,
          phone : preValue.phone,
          email : preValue.email,         
          authorizedOrganization: preValue.authorizedOrganization,
          error_organization : 0,
          error_name : preValue.error_name,
          error_position : preValue.error_position,
          error_phone : preValue.error_phone,
          error_email : preValue.error_email, 
      
          err : preValue.err
          };
         }
  
         if(event.target.name==='name'){
  
          return {        
          organization : preValue.organization,
          name : event.target.value,
          position : preValue.position,
          phone : preValue.phone,
          email : preValue.email,         
           authorizedOrganization: preValue.authorizedOrganization,
          error_organization : preValue.error_organization,
          error_name : 0,
          error_position : preValue.error_position,
          error_phone : preValue.error_phone,
          error_email : preValue.error_email, 
      
          err : preValue.err
          };
         }
  
  
         if(event.target.name==='position'){
  
          return {        
          organization : preValue.organization,
          name : preValue.name,
          position : event.target.value,
          phone : preValue.phone,
          email : preValue.email,         
           authorizedOrganization: preValue.authorizedOrganization,
          error_organization : preValue.error_organization,
          error_name : preValue.error_name,
          error_position : 0,
          error_phone : preValue.error_phone,
          error_email : preValue.error_email, 
      
          err : preValue.err
          };
         }
  
         if(event.target.name==='phone'){
  
          return {        
          organization : preValue.organization,
          name : preValue.name,
          position : preValue.position,
          phone :  event.target.value,
          email : preValue.email,         
           authorizedOrganization: preValue.authorizedOrganization,
          error_organization : preValue.error_organization,
          error_name : preValue.error_name,
          error_position : preValue.error_position,
          error_phone : 0,
          error_email : preValue.error_email, 
      
          err : preValue.err
          };
         }
  
         if(event.target.name==='email'){
  
          return {        
          organization : preValue.organization,
          name : preValue.name,
          position : preValue.position,
          phone : preValue.phone,
          email : event.target.value,         
           authorizedOrganization: preValue.authorizedOrganization,
          error_organization : preValue.error_organization,
          error_name : preValue.error_name,
          error_position : preValue.error_position,
          error_phone : preValue.error_phone,
          error_email : 0, 
      
          err : preValue.err
          };
         }
  
  
  
      
              });
  }
  
  const checkInput =(event)=> {
  }

  const forgotPassword = ()=>{
    //   alert("hello");
    setShow1(false);
    setShowR(true);
    setShowUP(false);
  }

  const initiateLogin = ()=>{
    //   alert("hello");
    setShow1(true);
    setShowR(false);
    setShowUP(false);
  }

  const initiateSignup = ()=>{
    setShowUP(true);
    setShow1(false);
    setShowR(false);
  }
 const inputEventapplication = ()=>{
   var checkBox = document.getElementById("authorizedOrganization");
    if (checkBox.checked == true){
   setLogInfo((preValue)=>{
       
  
          return {        
          organization : preValue.organization,

          name : preValue.name,
          position : preValue.position,
          phone : preValue.phone,
          email : preValue.email,         
          authorizedOrganization: 1,
          error_organization : preValue.error_organization,
          error_name : preValue.error_name,
          error_position : preValue.error_position,
          error_phone : preValue.error_phone,
          error_email : preValue.error_email, 
      
          err : preValue.err
          };
         
  
       
  
  
  
      
              });
  } else {
    setLogInfo((preValue)=>{
       
  
          return {        
          organization : preValue.organization,

          name : preValue.name,
          position : preValue.position,
          phone : preValue.phone,
          email : preValue.email,         
          authorizedOrganization: 0,
          error_organization : preValue.error_organization,
          error_name : preValue.error_name,
          error_position : preValue.error_position,
          error_phone : preValue.error_phone,
          error_email : preValue.error_email, 
      
          err : preValue.err
          };
         
  
       
  
  
  
      
              });
  }
  }



  const submit=()=>{
    // console.log("Submit");
    if(login.error_organization===1 || login.error_name===1 || login.error_position===1 || login.error_phone===1  || login.error_email===1 ){
        setLogInfo((preValue)=>{
            return {        
                     organization : preValue.organization,
                     name : preValue.name,
                     position : preValue.position,
                     phone : preValue.phone,
                     email : preValue.email,         
                      authorizedOrganization: preValue.email, 
                     error_organization : preValue.error_organization,
                     error_name : preValue.error_name,
                     error_position : preValue.error_position,
                     error_phone : preValue.error_phone,
                     error_email : preValue.error_email, 
                 
                     err : 1
                     };
        });
    
    }else{
      var phoneno = /^\d{10}$/;
      //  alert("SUbmitted");

      if(login.phone.match(phoneno))
      {


        Axios.post("newsignup",{userData:login})
        .then(res =>{
        //  console.log(res.data);
       if(res.data.status==='Success'){
        var appid=res.data.id;
        let text = appid.toString();
dispatch(userData({
  user_id:text,
  user_info:res.data.info
 }));
 setSignin((preValue)=>{
          
  return {    
          signIn_email:preValue.signIn_email,  
          signIn_password:preValue.signIn_password,
          error_password:preValue.error_password,             
          error_email:preValue.error_email, 
           authorizedOrganization: preValue.authorizedOrganization,         
          signIn_err:1,     
          signIn_mesage:res.data.message,
          status:res.data.status,
          id:res.data.id, 
           };
  });
}else{
  setLogInfo((preValue)=>{
    return {        
             organization : preValue.organization,
             name : preValue.name,
             position : preValue.position,
             phone : preValue.phone,
             email : preValue.email,         
               authorizedOrganization: preValue.authorizedOrganization,  
             error_organization : preValue.error_organization,
             error_name : preValue.error_name,
             error_position : preValue.error_position,
             error_phone : preValue.error_phone,
             error_email : preValue.error_email, 
         
             err :3
             };
});
}

       
           
        });
      }else{
  setLogInfo((preValue)=>{
          return {        
                   organization : preValue.organization,
                   name : preValue.name,
                   position : preValue.position,
                   phone : preValue.phone,
                   email : preValue.email,         
                    authorizedOrganization: preValue.authorizedOrganization,  
                   error_organization : preValue.error_organization,
                   error_name : preValue.error_name,
                   error_position : preValue.error_position,
                   error_phone : preValue.error_phone,
                   error_email : preValue.error_email, 
               
                   err :5
                   };
      });
      }

        // console.log(reducer2);

       

    }
    

    // setLogInfo((preValue)=>{
    //     if(login.error_organization===1){
 
    //      return {        
    //      organization : preValue.organization,
    //      name : preValue.name,
    //      position : preValue.position,
    //      phone : preValue.phone,
    //      email : preValue.email,         
         
    //      error_organization : 0,
    //      error_name : preValue.error_name,
    //      error_position : preValue.error_position,
    //      error_phone : preValue.error_phone,
    //      error_email : preValue.error_email, 
     
    //      err : preValue.err
    //      };
        }
 
// alert(applicant_id);
 
    
const initiateReset = () =>{
console.log(Resetpassword);
  if( Resetpassword.error_email==0){

   Axios.post("passwordCheck",{Resetpassword:Resetpassword})
    .then(res =>{   
      console.log(res.data);
      
    
if(res.data.status==='Success'){
  setShowalert(true);
 
  setResetpassword((preValue)=>{

    
    return {    
      Reset_email:"",        
            
      error_email:1,     
      Resetpassword_err:'0',
      Resetpassword_mesage:'',
      status:'fail',
      id:''
               
        
           
             };
    




    });
  setShowR(false);

}else{
  document.getElementById("Reset_email").value='';
  setResetpassword((preValue)=>{

  
    return {    
        Reset_email:'',  
                
            error_email:1,         
            Resetpassword_err:1,  
            Resetpassword_mesage:res.data.message,   
            status:'fail',
            id:preValue.id,  
               
        
           
             };
    




    });
}

       
         

    });
  }else{
    setResetpassword((preValue)=>{

    
        return {    
            Reset_email:preValue.Reset_email,  
                    
                error_email:1,         
                Resetpassword_err:2,  
                Resetpassword_mesage:'',   
                status:'fail',
                id:preValue.id,  
                   
            
               
                 };
        

   


        });
      
  }


    }
    const inputEventResetpassword =(event)=> {
      setResetpassword((preValue)=>{
  
        if(event.target.name==='Reset_email'){
          return {    
              Reset_email:event.target.value,  
                  signIn_password:preValue.signIn_password,
                        
                  error_email:0,         
                  Resetpassword_err:preValue.Resetpassword_err,  
                  Resetpassword_mesage:'',   
                  status:'fail',
                  id:preValue.id,  
                     
              
                 
                   };
          }
  
     
  
  
          });
   } 
    const signOut = () =>{
      dispatch(finalData({
        info:null
       }));
      dispatch(userData({
        id:null,
        info:null
       }));
      // return <Redirect to={'/'} />;
    }
     
   

    const inputEventSignIn =(event)=> {
        setSignin((preValue)=>{

          if(event.target.name==='signIn_email'){
            return {    
                    signIn_email:event.target.value,  
                    signIn_password:preValue.signIn_password,
                    error_password:preValue.error_password,             
                    error_email:0,         
                    signIn_err:preValue.signIn_err,  
                    signIn_mesage:'',   
                    status:'fail',
                    id:preValue.id,  
                     };
            }

            if(event.target.name==='signIn_password'){
            return {    
                    signIn_email:preValue.signIn_email,    
                    signIn_password:event.target.value,
                    error_password:0,             
                    error_email:preValue.error_email,         
                    signIn_err:preValue.signIn_err,   
                    signIn_mesage:'',
                    id:preValue.id,  
                     };
            }


            });
     }  



 const checkpasstype = () =>{

var valtype=document.getElementById('signIn_password').type ;
 var element = document.getElementById("ibtuton");
if(valtype=='password'){
document.getElementById("signIn_password").type="text";
 element.className = "fa fa-eye";
 document.getElementById("ibtuton").style.color = "#506172";
}else{
document.getElementById("signIn_password").type="password"; 
 element.className = "fa fa-eye-slash";
  document.getElementById("ibtuton").style.color = "gray"; 
}

 }     
 const initiateSignIn = () =>{

  if(signIn.error_password==0 && signIn.error_email==0){

   Axios.post("loginCheck",{signIn:signIn})
    .then(res =>{   
      console.log(res.data);
      
    
if(res.data.status==='Success'){
dispatch(userData({
  user_id:res.data.id,
  user_info:res.data.response
 }));
}

           setSignin((preValue)=>{
          
            return {    
                    signIn_email:preValue.signIn_email,  
                    signIn_password:preValue.signIn_password,
                    error_password:preValue.error_password,             
                    error_email:preValue.error_email,         
                    signIn_err:1,     
                    signIn_mesage:res.data.message,
                    status:res.data.status,
                    id:res.data.id, 
                     };
            });
         

    });
  }else{
    setSignin((preValue)=>{
          
      return {    
              signIn_email:preValue.signIn_email,  
              signIn_password:preValue.signIn_password,
              error_password:preValue.error_password,             
              error_email:preValue.error_email,         
              signIn_err:2,     
              signIn_mesage:"Empty Form",
              status:'fail',
              id:preValue.id,    
               };
      });
  }


    }

   
    if(signIn.status==="Success"){
      // return <Redirect to={'/profile/'+signIn.id} />;
     if(applicant_id1!='' && applicant_id1!=undefined && applicant_id1!='0000' && applicant_id1!='0001'  && applicant_id1!='0003'){
      
      return <Redirect to={`/profile`} />;
     }
     
    }

    // if(applicant_id1){
    //     console.log("userInfo");
    //     console.log(applicant_id1);
    //     // console.log(applicant_info);
    //    return <Redirect to={`/profile/${applicant_id1}`} />;
    // }
    
        return (
        <React.Fragment>
<header class="header-view">
      <div class="bs-example">
          <div class="main-section">
          <nav class="navbar navbar-expand-md navbar-light navber-padding  nav-img-responsive">
              <Link to="/"><a  class="navbar-brand">
                  <img src="../image/logo.png" height="28" alt="CoolBrand"/><span class="version-sec">V1.0</span>
              </a></Link>

             
      
              <div class="collapse navbar-collapse" id="navbarCollapse">
                  <div class="main-section">      
                     <div class="col-sm-12">
                        <h1 class="heading-top heading-ipad  text-center" style={{color:'#000000'}}>
                        FRMS</h1>
                        <p class="text-center" style={{"color":"rgb(12, 10, 10)","fontSize":"21px","fontWeight":"500","marginTop":"0px","lineHeight":"3px"}}>
                          Facility Rental Management System</p>
                    </div>                    
                 </div>
                  <div class="navbar-nav list-navbar ml-auto">                     
                      <ul>
                          {/* {applicant_info.name!==null?
                           <li> Hello {applicant_info.name}</li>
                          :<>
                          <li>  <a href="#" class="download-sec download-sec-view">Sign Up</a></li>
                          <li><a href="#" class="download-sec download-sec-view" >Login</a></li>
                          </>
} */}

 {applicant_id1 ?  <>
  { (applicant_id1.length <4) ?                          
    <>
    {applicant_id1!='0000' 
      ?    <>   
      {applicant_id1!='0001' 
     
     ? 
        
          <>   
     {applicant_id1!='0003' 
? 
<>   
{siteData.page==='profile' ? <Link to={`/`}><li>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Home</a></li></Link> :<Link to={`/profile`}><li>  <a class="download-sec download-sec-view">Profile</a></li></Link>  }
               
<Link to="/"><li onClick={signOut}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Logout</a></li></Link> 
</>

:<> <li onClick={initiateSignup}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Sign Up{applicant_id}</a></li>
<li  onClick={initiateLogin}><a  class="download-sec download-sec-view" style={{cursor:'pointer'}}>Login</a></li>
</>
}
      </>

      :<> <li onClick={initiateSignup}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Sign Up{applicant_id}</a></li>
      <li  onClick={initiateLogin}><a  class="download-sec download-sec-view" style={{cursor:'pointer'}}>Login</a></li>
      </>
        }
         </>
      :<> <li onClick={initiateSignup}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Sign Up{applicant_id}</a></li>
      <li  onClick={initiateLogin}><a  class="download-sec download-sec-view" style={{cursor:'pointer'}}>Login</a></li>
      </>
    }
   
  </>
     :<>
     <li onClick={initiateSignup}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Sign Up{applicant_id}</a></li>
     <li  onClick={initiateLogin}><a  class="download-sec download-sec-view" style={{cursor:'pointer'}}>Login</a></li>
    
     </>
     }
 
 </> : <>
 <li onClick={initiateSignup}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Sign Up{applicant_id}</a></li>
     <li  onClick={initiateLogin}><a  class="download-sec download-sec-view" style={{cursor:'pointer'}}>Login</a></li>
    
 
 </>}
                        
  
                      </ul>                     
                  </div>
              </div>
         
          </nav>
      </div>
      </div>
  </header>

  <Modal show={showM} onHide={handleCloseM} className='closelogin'>
    <div class="login-close">
        <Modal.Header closeButton >
        </Modal.Header>
       

    <div class="modal-content content-popup">

      <div class="modal-inner modal-login-inner">

      <div class=" login-apply modal-time-apply" style={{paddingTop:'0px', paddingBottom: '0px', paddingLeft: '0px', borderBottom: '1px solid #cccccc !important'}}>

<h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" >LOGIN </h5>

{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

</button> */}

</div>
     <div class="modal-body modal-body-apply">

<div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>

  <div class="form-sec" style={{marginTop:'12px'}}>

      

      <input type="text" placeholder="Email id" name="signIn_email" onChange={inputEventSignIn} value={signIn.signIn_email} />
 {(signIn.error_email === 1 && signIn.signIn_err===2) && <span style={style}>* Enter Email</span> }
  </div>

  <div class="form-sec" style={{marginTop:'13px'}}>
    <input type="password" placeholder="Password" id="signIn_password" name="signIn_password" onChange={inputEventSignIn} value={signIn.signIn_password} />
     <i class="fa fa-eye-slash" onClick={checkpasstype} id="ibtuton" aria-hidden="true"   style={{color:'grey',position:'relative',top:'-29px',right:'-265px',fontSize:'11px',cursor:'pointer'}}></i>

    {/* <div class="demo">
 <a href="#" data-tooltip="Password is your 10 digit phone number that you used to register yourself"><i class="fa fa-info-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  style={{color:'red',float:'right',position:'absolute',top:'-46px',cursor:'pointer',marginLeft:'5px',right:'-163px'}}></i></a>

</div> */}
        
{(signIn.error_password === 1 && signIn.signIn_err===2) && <span style={style}>* Enter Password</span> }
</div>

<div class="form-login">

  <p onClick={forgotPassword}>Forgot Your Password?</p>

  {(signIn.signIn_err === 1) && <>
    <span ><p style={{color:'#ff0000',fontSize:'15px',lineHeight:'15px'}}>{signIn.signIn_mesage}</p></span>
    {(signIn.signIn_mesage !='') ?
<p style={{fontSize: '10px',fontStyle: 'italic',color:'rgb(15 100 5)',lineHeight:'0px',marginBottom:'22px'}}><span>Try Forgot Your Password to retrieve your login details.</span></p>

: <></> }
  </>
  
  
  
  }

</div>

<div class="login-button" >


  <a class="btn-button" style={{textDecoration: 'none',cursor:'pointer'}} onClick={initiateSignIn} >Login</a>

</div>



<div class="create-sec" > 

<p>Don't have an account? <span><a href="#" style={{textDecoration: 'none'}}  onClick={initiateSignup}>Create an Account</a></span>



  </p>

</div>

</div>

</div>
      </div>
      </div>
      </div>


      
</Modal>

<Modal show={showR} onHide={handleCloseR} className='closelogin'>
    <div class="login-close">
        <Modal.Header closeButton >
        </Modal.Header>
       

    <div class="modal-content content-popup">

      <div class="modal-inner modal-login-inner">

      <div class=" login-apply modal-time-apply" style={{paddingTop:'0px', paddingBottom: '0px', paddingLeft: '0px', borderBottom: '1px solid #cccccc !important'}}>

<h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" >Forgot Password  </h5>

{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

</button> */}

</div>
     <div class="modal-body modal-body-apply">

<div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>

  <div class="form-sec" style={{marginTop:'12px'}}>

      

      <input type="text" placeholder="Email id" name="Reset_email" id="Reset_email"  onChange={inputEventResetpassword} value={Resetpassword.Reset_email} />
      {(Resetpassword.error_email === 1 && Resetpassword.Resetpassword_err===2) && <span style={style}>* Enter Email</span> }
 
  </div>

  <div class="form-sec" style={{marginTop:'12px'}}>

  
</div>



<div class="login-button"  >


  <a class="btn-button" style={{textDecoration: 'none',cursor:'pointer'}} onClick={initiateReset} >Reset Password</a>

</div>
<div class="form-login" style={{marginTop:'12px'}}>
{(Resetpassword.Resetpassword_err === 1) && <span style={style}><p style={style}>{Resetpassword.Resetpassword_mesage}</p></span> }

  
</div>


<div class="create-sec" > 
    <p style={{fontSize: '12px',fontStyle: 'normal'}}><span>We have send you an Email.</span>


  </p>

</div>

</div>

</div>
      </div>
      </div>
      </div>


      
</Modal>

<Modal show={showUP} onHide={handleCloseUP}>
  <div class="signupclose" style={{width:'660px'}}>
        <Modal.Header closeButton>
        </Modal.Header>
        <div class="col-md-12">
            <div class="timeslots-select form-details">
                <h2>Applicant Details</h2>
                <form>
                    <div class="row" style={{marginLeft:'0px',marginRight:'0px'}}>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec">
                            <label>Name of Applicant Organization</label>
                            <input type="text" value={login.organization} name="organization" onChange={inputEvent}  onBlur={checkInput} />
                        </div>

                        {(login.error_organization === 1 && login.err===1) && <span style={style}>* Applicant Organization Name</span> }
                    </div>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec">
                            <label>Name</label>
                            <input type="text" value={login.name} name="name" onChange={inputEvent}  onBlur={checkInput}/>
                        </div>
                        {(login.error_name === 1 && login.err===1) && <span style={style}>* Applicant Name</span> }
                    </div>
                </div>
                <div class="row" style={{marginLeft:'0px',marginRight:'0px'}}>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec">
                            <label>Position in Organization</label>
                            <input type="text" value={login.position} name="position" onChange={inputEvent}  onBlur={checkInput}/>
                        </div>
                        {(login.error_position === 1 && login.err===1) && <span style={style}>* Applicant Position</span> }
                    </div>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec">
                            <label>Phone no</label>
                            <input type="text" value={login.phone} name="phone" onChange={inputEvent}  onBlur={checkInput}/>
                        </div>
                        {(login.error_phone === 1 && login.err===1) && <span style={style}>* Applicant Phone No</span> }
                    </div>
                </div>
                <div class="row" style={{marginLeft:'0px',marginRight:'0px'}}>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec">
                            <label>Email id</label>
                            <input type="text" value={login.email} name="email" onChange={inputEvent}  onBlur={checkInput}/>
                        </div>
                        {(login.error_email === 1 && login.err===1) && <span style={style}>* Applicant Email</span> }
                    </div>

                    <div class="col-md-6" style={{paddingLeft:'0px',marginTop:'20px'}}>
                        <div class="form-sec">
                            <label>Are you authorized to make this application</label>
                        </div>
                        <input class="floating-input floating-check" type="checkbox" placeholder=" "  id="authorizedOrganization"   onChange={inputEventapplication}/>
                        <span style={{fontSize: '16px',lineHeight: '18px',position: 'relative',

        display: 'block',fontFamily: 'Heebo-Regular',marginTop: '6px',marginLeft:'22px'}}>Yes</span>
                    </div>
                </div>

             
                <div class="row" style={{marginLeft:'0px',marginRight:'0px'}} >  
                    <div class="col-md-12" style={{marginTop: '40px'}}>
                        <a  class="btn-process btn-confirm btn-book" style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}} onClick={submit}>Submit</a>
                      
                    </div>
                    <div class="col-md-12" style={{marginTop: '40px'}}>
                    {(login.err === 3) && <span style={style}><p style={style}>Email already exists</p></span> }
                    {(login.err === 5) && <span style={style}><p style={style}>Phone number must be ten digit number</p></span> }
                    </div>
                </div>               

                </form>

            </div>





        </div>


</div>

</Modal>
<Modal show={showalert} onHide={handleClosealert} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#007500'}}>Password send  successfully</p>

<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealert()}}>Ok </button>

</div>
</div>
      
</Modal>
</React.Fragment>
        
        
        )
    

  
}

export default Header;