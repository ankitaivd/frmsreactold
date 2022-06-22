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
  withRouter
  }from 'react-router-dom'
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
const  Signup =()=> {
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
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const style = {
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '6px',
    fontSize: '14px'
    
  };
  const dispatch=useDispatch();

const inputEvent =(event)=> {
    //setName(event.target.value);
    //console.log(event.target.value);
   console.log(event);
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


const submit=()=>{
    console.log("Submit");
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

    //    alert("SUbmitted");

       

        console.log(reducer2);

        Axios.post("applySignup",{facility:reducer2.info,userData:login,bookingInfo:reducer})
        .then(res =>{
         console.log(res.data);
       
        dispatch(userData({
            user_id:res.data.id,
            user_info:res.data.info
           }));
           
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
    //     }
 
 
 
 
     
           
}

const name = useSelector((state) => state.todoReducer);
const selectedFacility = useSelector((state) => state.todoReducer.applicant_id);
const applicant_id = useSelector((state) => state.todoReducer3.applicant_id);
const applicant_info = useSelector((state) => state.todoReducer.applicant_info);
const date1 = useSelector((state) => state.todoReducer.date);
const location1 = useSelector((state) => state.todoReducer.location);
const time1 = useSelector((state) => state.todoReducer.time);
const endtime1 = useSelector((state) => state.todoReducer.endtime);

const reducer = useSelector((state) => state.todoReducer);
const reducer2 = useSelector((state) => state.todoReducer2);
const reducer3 = useSelector((state) => state.todoReducer3);
const reducer4 = useSelector((state) => state.todoReducer4);


useEffect(() => {
    
    console.log("reducer");
    console.log(reducer);
    console.log("reducer2");
    console.log(reducer2);
    console.log("reducer3");
    console.log(reducer3);
    console.log("reducer4");
    console.log(reducer4);

    // alert(selectedFacility);
    // alert(date1);
    // console.log(time);
    },[]);

    const date = useSelector((state) => state.todoReducer.date);
const location = useSelector((state) => state.todoReducer.location);
const time = useSelector((state) => state.todoReducer.time);
const endtime = useSelector((state) => state.todoReducer.endtime);


if(applicant_id){
    console.log("userInfo");
    // alert(applicant_id);
    console.log(applicant_id);
    console.log(applicant_info);
    return <Redirect to={'/profile/'+applicant_id} />;
}




        return (
        <React.Fragment>
<div class="confirm-section">
<div class="container">
    <div class="row">
        <div class="confirm-inner">
        <div class="col-md-12">
            <p class="confirm-para">Confirm</p>
        </div>
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
                        <input class="floating-input floating-check" type="checkbox" placeholder=" " style={{float: 'left'}} />
                        <span style={{fontSize: '16px',lineHeight: '18px',position: 'relative',

        display: 'block',fontFamily: 'Heebo-Regular',marginTop: '0px',marginLeft:'22px', textAlign: 'left', color: 'hsl(0deg 0% 38%)'}}>Yes</span>
                    </div>
                </div>

             
                <div class="row" style={{marginLeft:'0px',marginRight:'0px'}} onClick={submit}>  
                    <div class="col-md-12" style={{marginTop: '40px'}}>
                        <a  class="btn-process btn-confirm btn-book" style={{textDecoration: 'none',color:'#ffffff', cursor: 'pointer'}}>Submit</a>
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