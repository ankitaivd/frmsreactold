import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";
import { siteData } from "../actions/siteData";
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
  withRouter,
  useParams
  }from 'react-router-dom'
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
const  Facility =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
  });

  const { id } = useParams();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });
  const [facilities, setFacilities] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {

    dispatch(siteData({page:'facility'}));
// alert(id);
    Axios.post("getLocationFacility",{facilityid:id})
   .then(res =>{
     console.log("request");
     console.log(res.data.response);
     
    setFacilities(res.data.response);
   
   });

   },[]);

 return (
    <React.Fragment>
<div class="multiple-school mutiple-facility">
    <div class="container"> 
        <div class="row">
          <div class="col-md-12">
            <div class="sort-by-section">
            </div></div>
          <div class="col-sm-12">
            <div class="sort-by-section">
                <a href="#" class="sort-date" data-toggle="modal" data-target="#basicModal">Sort by Date</a>
                          </div>
            <p class="para-more">Spaces for all your community needs</p>
              </div>
              {   facilities.map((post,index)=>(
                    <div class="col-sm-4 col-md-4 " key={post.location}>
                        <div class="child card cards" >
                            <img class="card-img-top card-facility" src="../image/schl-audi-01.jpg" alt="Card image cap"/>
                            <div class="img-sample"><span>SAMPLE PHOTO</span></div>
                            <div class="card-body card-schools">
                                <h3> {post.type} </h3>
                              <h5 class="card-titles">{post.locationName}</h5>
                              <p class="card-times" style={{visibility:'hidden'}}>$30 per hour</p>
                              <Link to={`/viewfacility/${post.sfid}`}> <a  style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>
                              </a></Link>
                              

                            </div>

                          </div> 
                    </div>
                          
                          ))
                        }

        </div>

      </div>

    </div>
    </React.Fragment>
        
        
        )
    

  
}

export default Facility;