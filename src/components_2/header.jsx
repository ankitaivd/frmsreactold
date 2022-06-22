import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
// import { Redirect, Route } from "react-router";
import { userData } from "../actions/userData";
import { finalData } from "../actions/finalData";
import { siteData } from "../actions/siteData";

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


  const applicant_info = useSelector((state) => state.todoReducer.applicant_info);
  const dispatch=useDispatch();
  const applicant_id = useSelector((state) => state.todoReducer3.user_id);

  const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
     const applicant_info3 = useSelector((state) => state.todoReducer3.applicant_info);



     const siteData = useSelector((state) => state.todoReducer4);
     const lo = useLocation();
  useEffect(() => {
    // console.log(siteData);
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



  const submit=()=>{
    // console.log("Submit");
    if(login.error_organization===1 || login.error_name===1 || login.error_position===1 || login.error_phone===1  || login.error_email===1){
        setLogInfo((preValue)=>{
            return {        
                     organization : preValue.organization,
                     name : preValue.name,
                     position : preValue.position,
                     phone : preValue.phone,
                     email : preValue.email,         
                     
                     error_organization : preValue.error_organization,
                     error_name : preValue.error_name,
                     error_position : preValue.error_position,
                     error_phone : preValue.error_phone,
                     error_email : preValue.error_email, 
                 
                     err : 1
                     };
        });
    
    }else{

      //  alert("SUbmitted");

       

        // console.log(reducer2);

        Axios.post("signup",{userData:login})
        .then(res =>{
        //  console.log(res.data);
         setShowUP(false);

         dispatch(userData({
          user_id:res.data.id,
          user_info:res.data.response
         }));
        
                   setSignin((preValue)=>{
                  
                    return {    
                            signIn_email:res.data.email,  
                            signIn_password:res.data.password,
                            error_password:0,             
                            error_email:0,         
                            signIn_err:0,     
                            signIn_mesage:res.data.message,
                            status:res.data.status,
                            id:res.data.id, 
                             };
                    });
           
        });

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
 const initiateSignIn = () =>{
// console.log(signIn.error_password+' '+signIn.error_email)
  if(signIn.error_password==0 && signIn.error_email==0){

   Axios.post("loginCheck",{signIn:signIn})
    .then(res =>{

      // console.log(res.data);

      //  console.log(res.data.id);
      //  console.log(res.data.response);
      //  alert("dispatch");
// alert(res.data.message);

dispatch(userData({
  user_id:res.data.id,
  user_info:res.data.response
 }));

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
     
      return <Redirect to={`/profile/${signIn.id}`} />;
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
              <a href="facility-page-option.html" class="navbar-brand">
                  <img src="../image/logo.png" height="28" alt="CoolBrand"/><span class="version-sec">V1.0</span>
              </a>

             
      
              <div class="collapse navbar-collapse" id="navbarCollapse">
                  <div class="main-section">      
                     <div class="col-sm-12">
                        <h1 class="heading-top heading-ipad  text-center" style={{color:'#000000'}}>
                        FRMS</h1>
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
 
                          {applicant_id1 ?                          
                         <>{siteData.page==='profile' ? <Link to={`/`}><li>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Home</a></li></Link> :<Link to={`/profile/${applicant_id1}`}><li>  <a class="download-sec download-sec-view">Profile</a></li></Link>  }
                         
                         <Link to="/"><li onClick={signOut}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Logout</a></li></Link> 
                         </>
                          :<>
                          <li onClick={initiateSignup}>  <a class="download-sec download-sec-view" style={{cursor:'pointer'}}>Sign Up{applicant_id}</a></li>
                          <li  onClick={initiateLogin}><a  class="download-sec download-sec-view" style={{cursor:'pointer'}}>Login</a></li>
                          </>
                          }
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
    <input type="text" placeholder="Password" name="signIn_password" onChange={inputEventSignIn} value={signIn.signIn_password}/>
{(signIn.error_password === 1 && signIn.signIn_err===2) && <span style={style}>* Enter Password</span> }
</div>

<div class="form-login">

  <p onClick={forgotPassword}>Forgot Your Password?</p>

  {(signIn.signIn_err === 1) && <span style={style}><p style={style}>{signIn.signIn_mesage}</p></span> }

</div>

<div class="login-button" onClick={initiateSignIn} >


  <a class="btn-button" style={{textDecoration: 'none'}}>Login</a>

</div>



<div class="create-sec">

  <p>Don't have an account? <span><a href="confirm-page.html" style={{textDecoration: 'none'}}>Create an Account</a></span>



  </p>

</div>

</div>

</div>
      </div>
      </div>
      </div>


      
</Modal>

<Modal show={showR} onHide={handleCloseR}>
  <div>
        <Modal.Header closeButton>
        </Modal.Header>
        <div class="modal-dialog time-modal-dialog login-dialog modal-dialog-centered " role="document">

<div class="modal-content content-popup">

  <div class="modal-inner modal-login-inner">

<div class="modal-header modal-time-apply reset-apply" style={{paddingTop:'26px' }}>

    <h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" >Reset Password </h5>

    <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

      <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

    </button>

  </div>



<div class="modal-body modal-body-apply">

  <div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>

    

    <div class="form-sec" style={{marginTop:'0px',marginBottom: '15px'}}>

        

      <input type="text" placeholder="abc@gmail.com"/>

  </div>

  

  <div class="login-button">

    <a href="#" class="btn-button" style={{textDecoration: 'none'}}>Reset Password</a>

  </div>

  <div class="create-sec">

    <p style={{fontSize: '12px',fontStyle: 'normal'}}><span>We have send you an Email so you can reset your password</span>



    </p>

  </div>



  

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
                        <input class="floating-input floating-check" type="checkbox" placeholder=" "/>
                        <span style={{fontSize: '16px',lineHeight: '18px',position: 'relative',

        display: 'block',fontFamily: 'Heebo-Regular',marginTop: '6px',marginLeft:'22px'}}>Yes</span>
                    </div>
                </div>

             
                <div class="row" style={{marginLeft:'0px',marginRight:'0px'}} onClick={submit}>  
                    <div class="col-md-12" style={{marginTop: '40px'}}>
                        <a  class="btn-process btn-confirm btn-book" style={{textDecoration: 'none',color:'#ffffff'}}>Submit</a>
                    </div>
                </div>               

                </form>

            </div>





        </div>


</div>

</Modal>
</React.Fragment>
        
        
        )
    

  
}

export default Header;