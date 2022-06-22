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
const  Footer =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
  });

  
        


        return (
        <React.Fragment>
 <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                <p class="para-footer"> Jersey City Public Schools</p>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                    346 Claremont Ave., Jersey City, NJ 07305</p>
                <p><i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;
                    201.915.6000</p></div>
            </div>

        </div>
    </footer>
</React.Fragment>
        )
    

  
}

export default Footer;