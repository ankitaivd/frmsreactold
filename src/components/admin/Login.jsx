import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
// import { Redirect, Route } from "react-router";
import { userData } from "../../actions/userData";
import { finalData } from "../../actions/finalData";
import { siteData } from "../../actions/siteData";

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
const  Login =()=> {
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

      const Axios = axios.create({
        baseURL: process.env.REACT_APP_ENV_URL
      });
      const style = {
        color: 'red',
        
      };

      
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
    let status = '';
    let err = 0;
    let id = 0;
    let message='';
    console.log(signIn);
      if(signIn.error_password==0 && signIn.error_email==0){
    
       if(signIn.signIn_email==='admin@gmail.com' && signIn.signIn_password==='admin'){

         message = "successfully login";        
        
         status = 'Success';
         err = 0;
         id = 1;
       }else{
         message = "Incorrect Email or Password ";        
      
         status = 'Fail';
         err = 1;
       }
    
      // alert(id);
      // alert(status);
      // alert(message);
               setSignin((preValue)=>{
              
                return {    
                        signIn_email:preValue.signIn_email,  
                        signIn_password:preValue.signIn_password,
                        error_password:preValue.error_password,             
                        error_email:preValue.error_email,         
                        signIn_err:err,     
                        signIn_mesage:message,
                        status:status,
                        id:id, 
                         };
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
         
          // return <Redirect to={`/home/${signIn.id}`} />;
          return <Redirect to={`/home`} />;
        }
      return (
      <React.Fragment>
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

{/* <p onClick={forgotPassword}>Forgot Your Password?</p> */}

{(signIn.signIn_err === 1) && <span style={style}><p style={style}>{signIn.signIn_mesage}</p></span> }

</div>

<div class="login-button" onClick={initiateSignIn} >


<a class="btn-button" style={{textDecoration: 'none'}}>Login</a>

</div>


{/* 
<div class="create-sec">

<p>Don't have an account? <span><a href="confirm-page.html" style={{textDecoration: 'none'}}>Create an Account</a></span>



</p>

</div> */}

</div>

</div>
</div>
</div>

</React.Fragment>
        
        
        )
    

  
}


export default Login;