import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";
import { userData } from "../actions/userData";
// import { addTodo } from "../actions/index";
import { facility } from "../actions/facility";
// import { final } from "../actions/final";
import { booking } from "../actions/booking";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory ,
  useLocation,
  withRouter,
  useParams
  }from 'react-router-dom'
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}

const  Signup =()=> {
    const { id } = useParams();
  const [login,setLogInfo]=useState({
    oldpasswo:"",
    newpass:"",
    confirmpass:"",
   err_msg:"",
    error_oldpasswo:1,
    error_newpass:1,
    error_confirmpass:1,
    

    err:'0',
    // authorized:
  });
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const style = {
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '6px',
    fontSize: '13px'
    
  };
  const style1 = {
    color: '#007500',
    textAlign: 'left',
    display: 'block',
    marginTop: '6px',
    fontSize: '13px'
    
  };
  
  const dispatch=useDispatch();

const inputEvent =(event)=> {
    //setName(event.target.value);
    //console.log(event.target.value);
   console.log(event);
    setLogInfo((preValue)=>{
       if(event.target.name==='oldpasswo'){

        return {        
            oldpasswo : event.target.value,
            newpass : preValue.newpass,
            confirmpass : preValue.confirmpass,
            err_msg:preValue.err_msg,
        
        error_oldpasswo : 0,
        error_newpass : preValue.error_newpass,
        error_confirmpass : preValue.error_confirmpass,
     
    
        err : preValue.err
        };
       }

       if(event.target.name==='newpass'){

        return {        
            oldpasswo : preValue.oldpasswo,
            newpass : event.target.value,
            confirmpass : preValue.confirmpass,
            err_msg:preValue.err_msg,
            error_oldpasswo : preValue.error_oldpasswo,
            error_newpass :0,
            error_confirmpass : preValue.error_confirmpass,
       
    
        err : preValue.err
        };
       }


       if(event.target.name==='confirmpass'){

        return {        
            oldpasswo : preValue.oldpasswo,
            newpass : preValue.newpass,
            confirmpass : event.target.value,
            err_msg:preValue.err_msg,
            error_oldpasswo : preValue.error_oldpasswo,
            error_newpass : preValue.error_newpass,
            error_confirmpass : 0,
    
    
        err : preValue.err
        };
       }

      
    


    
            });
}

const checkInput =(event)=> {
}


const submit=()=>{
    console.log("Submit");

    
    
    
    if(login.error_oldpasswo===1 || login.error_newpass===1 || login.error_confirmpass===1 ){
        setLogInfo((preValue)=>{
            return {        
                oldpasswo : preValue.oldpasswo,
                newpass : preValue.newpass,
                confirmpass : preValue.confirmpass,
                error_oldpasswo : preValue.error_oldpasswo,
                error_newpass : preValue.error_newpass,         
                error_confirmpass: preValue.error_confirmpass,  
                err_msg:preValue.err_msg,
                 
                     err : 1
                     };
        });
    
    }else{



    //    alert("SUbmitted");

    var phoneno = /^\d{10}$/;
    if(login.oldpasswo.match(phoneno))
    {
       
        if(login.newpass.match(phoneno))
        {
          
            if(login.confirmpass.match(phoneno))
                {

if(login.newpass != login.confirmpass){
    setLogInfo((preValue)=>{
        return {        
            oldpasswo : preValue.oldpasswo,
            newpass : preValue.newpass,
            confirmpass : preValue.confirmpass,
            error_oldpasswo : preValue.error_oldpasswo,
            error_newpass : preValue.error_newpass,         
            error_confirmpass: preValue.error_confirmpass,  
            err_msg:preValue.err_msg,  
             
                 err : 6
                 };
    });

}else{

    if(login.oldpasswo==login.newpass){
        setLogInfo((preValue)=>{
            return {        
                oldpasswo : preValue.oldpasswo,
                newpass : preValue.newpass,
                confirmpass : preValue.confirmpass,
                error_oldpasswo : preValue.error_oldpasswo,
                error_newpass : preValue.error_newpass,         
                error_confirmpass: preValue.error_confirmpass,  
                err_msg:preValue.err_msg,
                 
                     err : 7
                     };
        });
    }else{

        console.log(id); 

        Axios.post("ResetPassword",{id:id,userData:login})
        .then(res =>{
            console.log("applicant id");
            
        // alert("Your request is saved as Draft under My Bookings, click here to Proceed");
        if(res.data.status==='Success'){
            setLogInfo((preValue)=>{
                return {        
                    oldpasswo:"",
                    newpass:"",
                    confirmpass:"",
                 
                    error_oldpasswo:1,
                    error_newpass:1,
                    error_confirmpass:1,
                    err_msg:res.data.message,
                
                   
                     
                         err : 9
                         };
            });
        }else{
            setLogInfo((preValue)=>{
                return {        
                    oldpasswo : preValue.oldpasswo,
                    newpass : preValue.newpass,
                    confirmpass : preValue.confirmpass,
                    error_oldpasswo : preValue.error_oldpasswo,
                    error_newpass : preValue.error_newpass,         
                    error_confirmpass: preValue.error_confirmpass,  
                    err_msg:res.data.message,
                     
                         err : 8
                         };
            });
        }
        
           
        });

    }

}


                   
                }else{
                    setLogInfo((preValue)=>{
                        return {        
                            oldpasswo : preValue.oldpasswo,
                            newpass : preValue.newpass,
                            confirmpass : preValue.confirmpass,
                            error_oldpasswo : preValue.error_oldpasswo,
                            error_newpass : preValue.error_newpass,         
                            error_confirmpass: preValue.error_confirmpass,  
                                
                            err_msg:preValue.err_msg,
                                 err : 4
                                 };
                    });
                }
        }else{
            setLogInfo((preValue)=>{
                return {        
                    oldpasswo : preValue.oldpasswo,
                    newpass : preValue.newpass,
                    confirmpass : preValue.confirmpass,
                    error_oldpasswo : preValue.error_oldpasswo,
                    error_newpass : preValue.error_newpass,         
                    error_confirmpass: preValue.error_confirmpass,  
                    err_msg:preValue.err_msg,
                     
                         err : 5
                         };
            });
        }
        
    


    }else{
        setLogInfo((preValue)=>{
            return {        
                oldpasswo : preValue.oldpasswo,
                newpass : preValue.newpass,
                confirmpass : preValue.confirmpass,
                error_oldpasswo : preValue.error_oldpasswo,
                error_newpass : preValue.error_newpass,         
                error_confirmpass: preValue.error_confirmpass,  
                err_msg:preValue.err_msg,
                 
                     err : 3
                     };
        });
    }


   
      
      

    

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
    //     }

    // });
 
 
 
 
     
           
}

const checkpasstype = () =>{

    var valtype=document.getElementById('oldpasswo').type ;
     var element = document.getElementById("ibtuton");
    if(valtype=='password'){
    document.getElementById("oldpasswo").type="text";
     element.className = "fa fa-eye";
     document.getElementById("ibtuton").style.color = "#506172";
    }else{
    document.getElementById("oldpasswo").type="password"; 
     element.className = "fa fa-eye-slash";
      document.getElementById("ibtuton").style.color = "gray"; 
    }
    
     }
     const checkpasstypenew = () =>{

        var valtype=document.getElementById('newpass').type ;
         var element = document.getElementById("ibtutonnew");
        if(valtype=='password'){
        document.getElementById("newpass").type="text";
         element.className = "fa fa-eye";
         document.getElementById("ibtutonnew").style.color = "#506172";
        }else{
        document.getElementById("newpass").type="password"; 
         element.className = "fa fa-eye-slash";
          document.getElementById("ibtutonnew").style.color = "gray"; 
        }
        
         }
         const checkpasstypenewcon = () =>{

            var valtype=document.getElementById('confirmpass').type ;
             var element = document.getElementById("ibtutonnewcon");
            if(valtype=='password'){
            document.getElementById("confirmpass").type="text";
             element.className = "fa fa-eye";
             document.getElementById("ibtutonnewcon").style.color = "#506172";
            }else{
            document.getElementById("confirmpass").type="password"; 
             element.className = "fa fa-eye-slash";
              document.getElementById("ibtutonnewcon").style.color = "gray"; 
            }
            
             }
useEffect(() => {
    
  

    // alert(selectedFacility);
    // alert(date1);
    // console.log(time);
    },[]);




        return (
        <React.Fragment>
<div class="confirm-section">
<div class="container">
    <div class="row">
        <div class="confirm-inner">
        <div class="col-md-12">
            <p class="confirm-para">Reset Password</p>
        </div>
        <div class="col-md-12">
            <div class="timeslots-select form-details">
                <h2>Password Details</h2>
                <form>
                    <div class="row" style={{marginLeft:'0px',marginRight:'0px'}}>
                   
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec" style={{marginTop:'15px'}}>
                            <label style={{float:'left'}}>Old Password</label>
                            <input type="password" value={login.oldpasswo} name="oldpasswo"  id="oldpasswo"  onChange={inputEvent}   />
                            <i class="fa fa-eye-slash" onClick={checkpasstype} id="ibtuton" aria-hidden="true"   style={{color:'grey',position:'relative',top:'-30px',right:'-132px',fontSize:'11px',cursor:'pointer'}}></i>

                        </div>

                        {(login.error_oldpasswo === 1 && login.err===1) && <span  style={{
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '-9px',
    fontSize: '13px'
    
  }}>* Old Password</span> }
                    </div>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec" style={{marginTop:'15px'}}>
                            <label  style={{float:'left'}}>New Password</label>
                            <input type="password" value={login.newpass} name="newpass"  id="newpass" onChange={inputEvent}  />
                            <i class="fa fa-eye-slash" onClick={checkpasstypenew} id="ibtutonnew" aria-hidden="true"   style={{color:'grey',position:'relative',top:'-30px',right:'-132px',fontSize:'11px',cursor:'pointer'}}></i>

                        </div>
                        {(login.error_newpass === 1 && login.err===1) && <span style={{
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '-9px',
    fontSize: '13px'
    
  }}>* New Password</span> }
                    </div>
                </div>
                <div class="row" style={{marginLeft:'0px',marginRight:'0px',marginBottom:'20px'}}>
                    <div class="col-md-6" style={{paddingLeft:'0px'}}>
                        <div class="form-sec" style={{marginTop:'15px'}}>
                            <label  style={{float:'left'}}>Confirm password</label>
                            <input type="password" value={login.confirmpass} name="confirmpass" id="confirmpass" onChange={inputEvent}  />
                            <i class="fa fa-eye-slash" onClick={checkpasstypenewcon} id="ibtutonnewcon" aria-hidden="true"   style={{color:'grey',position:'relative',top:'-30px',right:'-132px',fontSize:'11px',cursor:'pointer'}}></i>

                        </div>
                        {(login.error_confirmpass=== 1 && login.err===1) && <span  style={{
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '-9px',
    fontSize: '13px'
    
  }}>* Confirm password</span> }
                    </div>
                   
                </div>
            
             
                <div class="row" style={{marginLeft:'0px',marginRight:'0px'}} > 
                <div class="col-md-12" style={{marginTop: '0px',fontSize:'13px',paddingLeft:'5px'}}>
                {(login.err === 8) && <span style={style}><p style={style}>{login.err_msg}</p></span> }
                {(login.err === 9) && <span style={style1}><p style={style1}>{login.err_msg}</p></span> }
                {(login.err === 3) && <span style={style}><p style={style}>Old Password must be ten digit number</p></span> }
                {(login.err === 5) && <span style={style}><p style={style}>New Password must be ten digit number</p></span> }
                {(login.err === 4) && <span style={style}><p style={style}>Confirm password must be ten digit number</p></span> }
                    {(login.err === 6) && <span style={style}><p style={style}>New Password and  Confirm password  must be same</p></span> }
                    {(login.err === 7) && <span style={style}><p style={style}>Old Password and  New password  must be different</p></span> }
                    </div> 
                    <div class="col-md-12" style={{marginTop: '0px',paddingLeft:'0px'}}>
                        <a  class="btn-process btn-confirm btn-book" style={{textDecoration: 'none',color:'#ffffff', cursor: 'pointer'}} onClick={submit}>Submit</a>
                        
                    </div>
                   
                </div>               

                </form>

            </div>





        </div>



    </div>

    </div>

</div>



</div>
</React.Fragment>
        
        
        )
    

  
}

export default Signup;