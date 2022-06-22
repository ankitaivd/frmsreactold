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
const  AdminLogin =()=> {
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

      document.title='FRMS ADMIN';
    
      const [signIn,setSignin]=useState({
        signIn_password:"",        
        signIn_email:"", 
        signIn_role:"",        
        error_password:1,        
        error_email:1,  
        error_role:1,    
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
      const dispatch=useDispatch();
      const [errorreport,setErrorreport]=useState();

      const [statusBooking, setStatusBooking] = useState('submit');
    const inputEventSignIn =(event)=> {
     
      setSignin((preValue)=>{

        if(event.target.name==='signIn_email'){
          return {    
                  signIn_email:event.target.value,  
                  signIn_password:preValue.signIn_password,
                  signIn_role:preValue.signIn_role,   
                  error_password:preValue.error_password,   
                  error_role:preValue.error_role,     
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
                  signIn_role:preValue.signIn_role, 
                  error_role:preValue.error_role,     
                  error_password:0,             
                  error_email:preValue.error_email,         
                  signIn_err:preValue.signIn_err,   
                  signIn_mesage:'',
                  id:preValue.id,  
                   };
          }
          if(event.target.name==='signIn_role'){
          
            return {    
                    signIn_email:preValue.signIn_email,    
                    signIn_password:preValue.signIn_password,
                    signIn_role:event.target.value, 
                    error_role:0,   
                    error_password:preValue.error_password,             
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
    let status = '';
    let err = 0;
    let id = 0;
    let message='';
    console.log(signIn);
      if(signIn.error_password==0 && signIn.error_email==0 ){

        Axios.post("loginCheckLocationAdmin",{email:signIn.signIn_email,password:signIn.signIn_password,admin:'globaladmin',signInLocationAdmin:true})
        .then(res =>{
          console.log("request");
          console.log(res.data); 


         // return 0;
        
          if(res.data.status==='Success'){
            setStatusBooking('assigned');

            dispatch(userData({
              user_id:res.data.id,
              user_info:res.data.response
             }));
             dispatch(siteData({
              page:'/Applicationstatus'
             }));


            setSignin((preValue)=>{
              
              return {    
                      signIn_email:res.data.response.email,  
                      signIn_password:res.data.response.password,  
                      signIn_role:res.data.response.type, 
                      error_role:0,   
                      error_password:0,             
                      error_email:0,         
                      signIn_err:0,     
                      signIn_mesage:res.data.message,
                      status:res.data.status,
                      id:id, 
                       };
              });


              
          }else{
            setErrorreport('Fail');
          }
             
        });


    
      //  if(signIn.signIn_email==='admin@gmail.com' && signIn.signIn_password==='admin'){

      //    message = "successfully login";        
        
      //    status = 'Success';
      //    err = 0;
      //    id = 1;
      //  }else{
      //    message = "Incorrect Email or Password ";        
      
      //    status = 'Fail';
      //    err = 1;
      //  }
    
      // alert(id);
      // alert(status);
      // alert(message);
             
             
    
       
      }else{
        setSignin((preValue)=>{
              
          return {    
                  signIn_email:preValue.signIn_email,  
                  signIn_password:preValue.signIn_password,
                  error_password:preValue.error_password,             
                  error_email:preValue.error_email, 
                  signIn_role:preValue.signIn_role, 
                  error_role:0,          
                  signIn_err:2,     
                  signIn_mesage:"Empty Form",
                  status:'fail',
                  id:preValue.id,    
                   };
          });
      }
    
    
        }
        const handleKeypress = e => {
         
          //it triggers by pressing the enter key
        if (e.which ===13) {
          initiateSignIn();
        }
      };
        const a = useSelector((state) => state.todoReducer);
        const a1 = useSelector((state) => state.todoReducer1);
        const a2 = useSelector((state) => state.todoReducer2);
        const a3 = useSelector((state) => state.todoReducer3);
      
        useEffect(() => {

       
      console.log(a);
      console.log(a1);
      console.log(a2);
      console.log(a3);

        },[])
    
       
        if(signIn.status==="Success"){     
          
          console.log("Success");
          if(a3.applicant_info.type==='sub'){
              return <Redirect to={`/Locationadminview`} />;
          }else if(a3.applicant_info.type==='globaladmin'){
            return <Redirect to={`/Applicationstatus`} />;
        }else{
            return <Redirect to={`/Viewrequest`} />;
          }
          
        }
      return (
      <React.Fragment>
<div class="modal-content content-popup admin-login">

<div class="modal-inner modal-login-inner" style={{padding:'6px 10px'}}>
<div class="">
<img src="../image/logo.png" height="28" alt="CoolBrand" style={{height:'100px',marginTop:'-160px'}}/>
  </div>
<div class="modal-time-apply" style={{paddingTop:'0px', paddingBottom: '0px', paddingLeft: '0px'}}>
{/* <div class="">
<img src="../image/logo.png" height="28" alt="CoolBrand" style={{height:'100px'}}/>
  </div> */}

<h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" style={{borderBottom:'none',color:'#686868',fontFamily:'Heebo-Regular',fontWeight:'700'}}>FRMS GLOBAL ADMIN</h5>

{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

<span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

</button> */}

</div>
<div class="modal-body modal-body-apply" style={{paddingTop:'5px'}}>

<div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>
{ errorreport  ?<span style={style}>* Email or Password is Wrong</span> :''}
<form  method="post">
<div class="form-sec" style={{marginTop:'12px'}}>
{/* <select class="select-sec" onChange={inputEventSignIn} name="signIn_role">
<option value="Choose your role">Choose your role</option>
    <option value="admin">Facility Admin</option>
    <option value="sub">Location Admin</option>
    
  </select> */}
  {(signIn.error_role === 1 && signIn.signIn_err===2) && <span style={style}>* Select your role</span> }
  </div>
<div class="form-sec" style={{marginTop:'12px'}}>


<input type="text" placeholder="Email id" name="signIn_email" onChange={inputEventSignIn} value={signIn.signIn_email} />
{(signIn.error_email === 1 && signIn.signIn_err===2) && <span style={{color:'red',textAlign:'left',position:'relative',display:'block',fontSize:'13px',marginTop:'4px'}}>* Enter Email</span> }
</div>

<div class="form-sec" style={{marginTop:'13px',marginBottom:'12px'}}>
<input type="password" placeholder="Password" name="signIn_password" id="signIn_password" onChange={inputEventSignIn} value={signIn.signIn_password}  onKeyPress={handleKeypress}/>
  <i class="fa fa-eye-slash" onClick={checkpasstype} id="ibtuton" aria-hidden="true"   style={{color:'grey',float:'right',position:'relative',top:'-23px',right:'6px',fontSize:'11px',cursor:'pointer'}}></i>

{(signIn.error_password === 1 && signIn.signIn_err===2) && <span style={{color:'red',textAlign:'left',position:'relative',display:'block',fontSize:'13px',marginTop:'4px'}}>* Enter Password</span> }
</div>

<div class="form-login">

{/* <p onClick={forgotPassword}>Forgot Your Password?</p> */}

{(signIn.signIn_err === 1) && <span style={style}><p style={style}>{signIn.signIn_mesage}</p></span> }

</div>

<div class="login-button" onClick={initiateSignIn} style={{margin:'4px 0px 14px 0px'}}>


<a class="btn-button" style={{textDecoration: 'none',marginBottom:'0px',cursor:'pointer'}} type="submit">Login</a>

</div>

</form>
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


export default AdminLogin;