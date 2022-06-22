import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";

// import { addTodo } from "../actions/index";
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
const  Header =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
  });

  const applicant_info = useSelector((state) => state.todoReducer.applicant_info);


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
<li>  <a href="#" class="download-sec download-sec-view">Sign Up</a></li>
                          <li><a href="#" class="download-sec download-sec-view" >Login</a></li>
                      </ul>                     
                  </div>
              </div>
         
          </nav>
      </div>
      </div>
  </header>
</React.Fragment>
        
        
        )
    

  
}

export default Header;