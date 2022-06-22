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
withRouter,
useParams
}from 'react-router-dom'
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
const  Profile =()=> { 
  const { id } = useParams();
const [tab,activeTab]=useState('profile');
const [login,setLogInfo]=useState({
name:"",
organization:"",
position:"",
phone:"",
email:"", 
address1:"", 
address2:"", 
address3:"", 
city:"", 
state:"", 
detailOrganization:"", 
objectiveOrganization:"", 
isProfitMakingOrganization:"", 
organizationOffices:[],
memberOfOrganization:"",
memberAverageAge:"",
premises:"",
    
error_name:1,
error_organization:1,
error_position:1,
error_phone:1,
error_email:1, 
error_addrss1:1,
error_addrss2:1,
error_addrss3:1,
error_city:1,
error_state:1,
error_detailOrganization:1,
error_objectiveOrganization:1,
error_isProfitMakingOrganization:1,
error_organizationOffices:1,
error_memberOfOrganization:1,
error_memberAverageAge:1,
error_premises:1,
err:'0',
    // authorized:
  });

  const [office,setOffices]=useState({
    name:"",
    phone:"",
    officeHeld:"",
    address:""
  });

  const [allOffice,setAllOffices]=useState([]);

  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const style = {
    color: 'red',
    
  };

  const inputEvent =(event)=> {
    //setName(event.target.value);
    //console.log(event.target.value);
   console.log(event);
    setLogInfo((preValue)=>{
       if(event.target.name==='organization'){
        return {   
        name:preValue.name,
        organization:event.target.value,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:0,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='position'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:event.target.value,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:0,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }


       if(event.target.name==='address1'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:event.target.value,
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrss1:0,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='address2'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:event.target.value, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:0,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='address3'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:event.target.value, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:0,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='city'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:event.target.value,
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:1,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='state'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:event.target.value, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:0,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='phone'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:event.target.value,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:0,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='email'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:event.target.value, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:event.target.value, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:0, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='name'){
        return {   
        name:event.target.value,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:0,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='detailOrganization'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:event.target.value, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:0,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='objectiveOrganization'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:event.target.value, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:0,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='isProfitMakingOrganization'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:event.target.value, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:0,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='organizationOffices'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:event.target.value,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:0,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='memberOfOrganization'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:event.target.value,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:0,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='memberAverageAge'){
        return {   
        name:preValue.name,
        organization:preValue.organization,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:event.target.value,
        premises:preValue.premises,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:0,
        error_premises:preValue.error_premises,
        err:preValue.err,
        };
       }

       if(event.target.name==='premises'){
        return {   
        name:preValue.name,
        organization:event.target.value,
        position:preValue.position,
        phone:preValue.phone,
        email:preValue.email, 
        address1:preValue.address1, 
        address2:preValue.address2, 
        address3:preValue.address3, 
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:event.target.value,
            
        error_name:preValue.error_name,
        error_organization:preValue.error_organization,
        error_position:preValue.error_position,
        error_phone:preValue.error_phone,
        error_email:preValue.error_email, 
        error_addrsspreValue:preValue.error_addrsspreValue,
        error_addrss2:preValue.error_addrss2,
        error_addrss3:preValue.error_addrss3,
        error_city:preValue.error_city,
        error_state:preValue.error_state,
        error_detailOrganization:preValue.error_detailOrganization,
        error_objectiveOrganization:preValue.error_objectiveOrganization,
        error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
        error_organizationOffices:preValue.error_organizationOffices,
        error_memberOfOrganization:preValue.error_memberOfOrganization,
        error_memberAverageAge:preValue.error_memberAverageAge,
        error_premises:0,
        err:preValue.err,
        };
       }



      })
    }

    useEffect(() => {
// alert(id);

Axios.post("getMyProfile",{id:id})
.then(res =>{
  console.log("Get Data");
  console.log(res.data);
   let fData = res.data.info;
  //  console.log(fData.organizationOffices);
  //  console.log(JSON.parse(JSON.stringify(fData.organizationOffices)));
   const abc = JSON.parse(fData.organizationOffices);
   console.log(abc);
   setAllOffices([...allOffice,abc]);
  setLogInfo((preValue)=>{ 
    return {   
    name:fData.name,
    organization:fData.organization,
    position:fData.position,
    phone:fData.phone,
    email:fData.email, 
    address1:fData.address1, 
    address2:fData.address2, 
    address3:fData.address3, 
    city:fData.city, 
    state:fData.state, 
    detailOrganization:fData.detailOrganization, 
    objectiveOrganization:fData.objectiveOrganization, 
    isProfitMakingOrganization:fData.isProfitMakingOrganization, 
    organizationOffices:fData.organizationOffices,
    memberOfOrganization:fData.memberOfOrganization,
    memberAverageAge:fData.memberAverageAge,
    premises:fData.premises,
        
    error_name:preValue.error_name,
    error_organization:0,
    error_position:preValue.error_position,
    error_phone:preValue.error_phone,
    error_email:preValue.error_email, 
    error_addrsspreValue:preValue.error_addrsspreValue,
    error_addrss2:preValue.error_addrss2,
    error_addrss3:preValue.error_addrss3,
    error_city:preValue.error_city,
    error_state:preValue.error_state,
    error_detailOrganization:preValue.error_detailOrganization,
    error_objectiveOrganization:preValue.error_objectiveOrganization,
    error_isProfitMakingOrganization:preValue.error_isProfitMakingOrganization,
    error_organizationOffices:preValue.error_organizationOffices,
    error_memberOfOrganization:preValue.error_memberOfOrganization,
    error_memberAverageAge:preValue.error_memberAverageAge,
    error_premises:preValue.error_premises,
    err:preValue.err,
    };
   
 })
});
console.log(applicant_info);


console.log("allOffice")
console.log(allOffice);

    },[]);


    const inputEventOffice = (event) =>{
console.log(event.target.name);
       
       if(event.target.name==='name'){
         setOffices((preValue)=>{ 
                    return {  
                        name:event.target.value,
                        phone:preValue.phone,
                        officeHeld:preValue.officeHeld,
                        address:preValue.address,
                      }
         });
      }
       if(event.target.name==='phone'){
               setOffices((preValue)=>{ 
                    return {  
                        name:preValue.name,
                        phone:event.target.value,
                        officeHeld:preValue.officeHeld,
                        address:preValue.address,
                      }
         });
      }
       if(event.target.name==='officeHeld'){
            setOffices((preValue)=>{ 
                    return {  
                        name:preValue.name,
                        phone:preValue.phone,
                        officeHeld:event.target.value,
                        address:preValue.address,
                      }
         });
      }
       if(event.target.name==='address'){
           setOffices((preValue)=>{ 
                    return {  
                        name:preValue.name,
                        phone:preValue.phone,
                        officeHeld:preValue.officeHeld,
                        address:event.target.value,
                      }
         });
      }
    }


    const addOffice =()=>{
      console.log(office);

      setAllOffices([...allOffice,{name:office.name,phone:office.phone,officeHeld:office.officeHeld,address:office.address}]);

       console.log(allOffice);
    }

    const saveProfile =()=>{
      console.log(login);

      Axios.post("saveMyProfile",{info:login,office:office,id:id})
      .then(res =>{
        console.log("request");
        console.log(res.data);
      //   console.log(res.data.response);        
      //  setFacilities(res.data.response);      
      });



    }



    
        const removeItem =(data,i)=>{
console.log(data);
console.log(allOffice);
     
          setAllOffices(allOffice.filter(allOffice => allOffice.name !== data.name));
    
        }

const selectedFacility = useSelector((state) => state.todoReducer.facility);
const applicant_id = useSelector((state) => state.todoReducer.applicant_id);
const applicant_info = useSelector((state) => state.todoReducer.applicant_info);


        return (
        <React.Fragment>
<div class="profile-sec">

<div class="container">

<div class="row">

<div class="col-md-12">

<div data-label="Example" class="df-example">

    <ul class="nav nav-line" id="myTab5" role="tablist">

      <li class="nav-item" onClick={()=>activeTab('profile')}>

        <a  className={`nav-link ${tab==='profile'?'active':''}`} id="home-tab5" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true">My Profile</a>

      </li>

      <li class="nav-item"  onClick={()=>activeTab('booking')}>

        <a className={`nav-link ${tab==='booking'?'active':''}`} id="profile-tab5" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false">My Booking</a>

      </li>



      <li class="nav-item"  onClick={()=>activeTab('status')}>

        <a className={`nav-link ${tab==='status'?'active':''}`} id="profile-tab5" data-toggle="tab"  role="tab" aria-controls="status" aria-selected="false">My Status</a>

      </li>

     

    </ul>



    <div class="tab-content mg-t-20" id="myTabContent5">

      <div className={`tab-pane fade show ${tab==='profile'?'active':''}`} id="home5" role="tabpanel" aria-labelledby="home-tab5">

        <div class="row" style={{marginTop:'30px'}}>

        

          <div class="col-md-3"><p class="label-profile">Name of applicant Organization</p></div>

          <div class="col-md-9 form-sec-profile">
            <input type="text" value={login.organization} name="organization" onChange={inputEvent}/ ></div>
              </div> 
              <div class="row" style={{marginTop:'30px'}}>
                <div class="col-md-3"><p class="label-profile">Position in the Organization</p></div>
                <div class="col-md-9 form-sec-profile"><input type="text" value={login.position} name="position" onChange={inputEvent}/></div>

                    </div> 

                    <div class="row" style={{marginTop:'30px'}}>

        

                      <div class="col-md-3"><p class="label-profile">Address</p></div>

                      <div class="col-md-9 form-sec-profile"><input type="text" value={login.address1} name="address1" onChange={inputEvent}/></div>

                        

                          </div> 

                          <div class="row" style={{marginTop:'30px'}}>

        

                            <div class="col-md-3"><p class="label-profile">Street Address</p></div>

                            <div class="col-md-9 form-sec-profile"><input type="text" value={login.address2} name="address2" onChange={inputEvent} /></div>

                              

                                </div> 

                                <div class="row" style={{marginTop:'30px'}}>

        

                                  <div class="col-md-3"><p class="label-profile">Address Line2</p></div>

                                  <div class="col-md-9 form-sec-profile"><input type="text" value={login.address3} name="address3" onChange={inputEvent} /></div>

                                    

                                      </div> 

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">City</p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" placeholder="" value={login.city} name="city" onChange={inputEvent}/></div>

                      

                                        <div class="col-md-2" style={{marginLeft:'0px'}}><p class="label-profile">State/Province/Region</p></div>

                                        <div class="col-md-4 form-sec-profile" style={{paddingLeft:'30px'}}><input type="text" placeholder="" value={login.state} name="state" onChange={inputEvent}/></div>

                                      </div>

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">Phone No</p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" value="518-497-6744	" placeholder="" value={login.phone} name="phone" onChange={inputEvent}/></div>

                      

                                        <div class="col-md-2"  style={{paddingLeft: '0px'}}><p class="label-profile">Email id</p></div>

                                        <div class="col-md-4 form-sec-profile" style={{marginLeft:'30px'}}><input type="text"value={login.email} name="email" onChange={inputEvent}/></div>

                                      </div>

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">Name</p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" value={login.name} name="name" onChange={inputEvent} placeholder=""/></div>

                      

                                        <div class="col-md-4" style={{color:'hsl(0deg 0% 38%)',paddingLeft:'0px',paddingRight:'0px',paddingTop:'4px'}}>Are you authorized to make this application

                                        </div>

                                        <div class="col-md-1">

                                          <input class="floating-input floating-check" type="checkbox" checked />

                                          <span style={{fontSize: '16px',

                                          lineHeight: '18px',

                                          position: 'relative',

                                          display: 'block',

                                          fontFamily: 'Heebo-Regular',

                                          marginTop: '6px'}}>Yes</span>

                                        </div>

                                      </div>

                                      

    <div class="row" style={{marginTop:'30px'}}>

        

      <div class="col-md-3"><p class="label-profile">Details of Organization</p></div>

      <div class="col-md-9 form-sec-profile"><input type="text" value={login.detailOrganization} name="detailOrganization" onChange={inputEvent} /></div>

        

          </div> 

          <div class="row" style={{marginTop:'30px'}}>
        
          
            <div class="col-md-3"><p class="label-profile">Describe purpose or objective of Organization </p></div>

            <div class="col-md-9 form-sec-profile"><input type="text" placeholder="" value={login.objectiveOrganization} name="objectiveOrganization" onChange={inputEvent}/></div>

              

                </div> 

                

                <div class="row" style={{marginTop:'30px'}}>

                  

                  <div class="col-md-4" style={{marginLeft:'0px',color: 'hsl(0deg 0% 38%)'}}>Is your Organization profit making?

                  </div>

                  <div class="col-md-3" style={{paddingLeft: '0px'}}>

                    <div class="radioOptions">



                      <div class="radio-inner">

                          <p> <input name="orgaizationType" type="radio" value={login.isProfitMakingOrganization} name="isProfitMakingOrganization" onChange={inputEvent} />  Yes  </p>

                      </div>



                      <div class="radio-inner">

                          <p> <input name="orgaizationType" type="radio" value={login.isProfitMakingOrganization} name="isProfitMakingOrganization" onChange={inputEvent}/> No </p>

                      </div>



                      <div class="radio-inner">

                          <p> <input name="orgaizationType" type="radio" value={login.isProfitMakingOrganization} name="isProfitMakingOrganization" onChange={inputEvent}/> Can't Say </p>

                      </div>



                  </div>

                  </div>

                  </div>



                  <div class="row" style={{marginTop:'30px'}}>

                    <div class="col-md-12">

                      <p class="org-para">Organization's Officers </p>

                    </div>

                    <div class="col-md-12">

                      <p class="org-paras">Officer</p>

                    </div>

                    <div class="col-md-3"><p class="label-profile">Name</p></div>

                  <div class="col-md-4 form-sec-profile"><input type="text" placeholder="" value={office.name} name="name" onChange={inputEventOffice}/></div>



                  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Phone no</p></div>

                  <div class="col-md-4 form-sec-profile"><input type="text" placeholder=""  value={office.phone} name="phone" onChange={inputEventOffice}/></div>



                  <div class="col-md-3" style={{marginTop: '35px'}}><p class="label-profile">Office held</p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '35px'}}><input type="text" placeholder=""   value={office.officeHeld} name="officeHeld" onChange={inputEventOffice}/></div>



                  <div class="col-md-1"  style={{marginTop: '35px',paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Address</p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '35px'}}><input type="text" placeholder="" value={office.address} name="address" onChange={inputEventOffice}/></div>

                  </div>

                  <div class="row">

                  <div class="col-md-12">
<div class="add-more-sec"onClick={addOffice}>
                    <a  class="btn btn-add">ADD MORE<i class="fa fa-plus" style={{marginLeft:'6px',color:'#ffffff !important'}} aria-hidden="true"></i>
                    </a>
                  </div>
                    {   allOffice.map((post,index)=>( 
                    <>
                    <div class="col-md-02">
                      {post.name}
                    </div>

                    <div class="col-md-02">
                      {post.phone}
                    </div>

                    <div class="col-md-02">
                      {post.officeHeld}
                    </div>

                    <div class="col-md-02">
                      {post.address}
                    </div>
                     <div class="col-md-02" onClick={()=>removeItem(post,index)}>
                      <i class="fa fa-minus-circle"></i>
                    </div>
                  </>
                    ))
                    }

                  

                </div>

                </div>

                  <div class="row" style={{marginTop:'35px'}}>

        

                    <div class="col-md-6"><p class="label-profile">How many enrolled members are in your organization?</p></div>

                    <div class="col-md-1 form-sec-profile"><input type="text" placeholder="" value={login.memberOfOrganization} name="memberOfOrganization" onChange={inputEvent}/></div>

                    {/* <div class="col-md-1 form-sec-profile" style={{marginLeft:'16px'}}><input type="text" placeholder="" /></div>
                    <div class="col-md-1 form-sec-profile"  style={{marginLeft:'-16px'}}><input type="text" placeholder=""/></div> */}

                      

                        </div>

                        <div class="row" style={{marginTop:'35px'}}>

        

                          <div class="col-md-6"><p class="label-profile">If applicant is a youth organization, what is average age of it membership?</p></div>

                          <div class="col-md-1 form-sec-profile"><input type="text" placeholder="" value={login.memberAverageAge} name="memberAverageAge" onChange={inputEvent}/></div>

                          {/* <div class="col-md-1 form-sec-profile"  style={{marginLeft:'-16px'}}><input type="text" placeholder="" /></div> */}

                              </div>

                              <div class="row" style={{marginTop:'35px'}}>

        

                                <div class="col-md-6"><p class="label-profile">State purpose for which premises will be used</p></div>

                                <div class="col-md-6 form-sec-profile"><input type="text" placeholder="" value={login.premises} name="premises" onChange={inputEvent}/></div>

                                  

                                    </div>

                                    <div class="row">

                                      <div class="col-md-12" onClick={saveProfile}>

                                        <a  class="btn-process btn-confirm btn-save" style={{textDecoration: 'none'}}>SAVE</a>

                                      </div>

                                    </div>

      

      </div>

      <div className={`tab-pane fade show ${tab==='booking'?'active':''}`} id="profile5" role="tabpanel" aria-labelledby="profile-tab5">

       <div class="row booking-border">        

  <div class="col-md-12">
    <div class="book-heading">
    <h2>Active Booking</h2>
    </div>
  </div>

          <div class="col-md-8">
            <div class="booking-para">
              <p>School:- <span>Middle School #4</span></p>
              <p>Facilities:- <span>Auditorium</span></p>
              <p style={{fontFamily: 'Heebo-Medium',fontSize: '15px',marginBottom: '-3px'}}>Amenities</p>
              <p>Auditorium:- <span>With balcony, Public Address System, Piano</span></p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="booking-id">
             <p> Booking id:- #76878</p>
             <p>Total Cost:- $99</p>
             <p>Date:- <span>30th June 2021</span></p>
             <p>Time:- <span>9:00AM - 12:00PM</span></p>
            </div>
          </div>

          <div class="col-md-12">
            <a href="#" class="btn-cacl-book" style={{textDecoration: 'none'}} data-toggle="modal" data-target="#exampleModalcancel" data-dismiss="modal"> Cancel Booking</a>
          </div>         

        </div>



        

      </div>



      <div className={`tab-pane fade show ${tab==='status'?'active':''}`} id="status5" role="tabpanel" aria-labelledby="status-tab5">

        <div class="row">

     

        <div class="col-md-12" style={{marginBottom: '25px'}}>

        <h6  class="status-heading">Auditorium at middle school #4 is booked </h6>

       

      

      <ul class="progressbar">

        <li class="active">Request Received</li>

        <li class="">Forwarded</li>

        <li>Awaiting</li>

      </ul>

    </div>



  </div>

     

      </div>

     

    </div>

  </div>

</div>

</div>

</div>

</div>


</React.Fragment>
        
        
        )
    

  
}

export default Profile;