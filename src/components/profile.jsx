import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";
// import { final } from "../actions/final";
// import { addTodo } from "../actions/index";
import Header from '../components/header';
import { siteData } from "../actions/siteData";
import { userData } from "../actions/userData";
import Modal from 'react-bootstrap/Modal';
import Spinner from "react-bootstrap/Spinner"
import TimeKeeper from 'react-timekeeper';
import { booking } from "../actions/booking";

// import Footer from './components/footer';
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
  // const { id } = useParams();

  const error = {
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '6px',
    fontSize: '14px'
    
  };
  const [bookings,setBookingInfo] = useState([]);
  const [paginationfac,setPaginationfac] = useState({perPage:5,totalCount:0,totalPage:1,currentPage:1});
const [tab,activeTab]=useState('booking');
const [profilestatus,setProfileStatus]=useState({status:'',msg:''});
const [id,SetId]=useState();
const [profilebookingdeatilsprint, setProfileBookingdeatilsprint] = useState([]);
const [cancelres,setcancelresInfo]=useState({
  cancelreason:"",
  
  err_cancelreason:1,
  
  err:0,
   
    });
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
authorizedOrganization:"",  
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
err:0,
    // authorized:
  });

  const [calendernfo, setCalender] = useState({
    data:"",
    date:"",
    currentYear:"",
    month:""
  
  });
  const [showCalender, setShowCalender] = useState(false); 
  const setShowCalenderShow = () => setShowCalender(!showCalender);
  const [doesItHaveNumberdate, setDoesItHaveNumberdate] = useState(); 
  const [addindexfac, setAddindexfac] = useState();
  const [date1, setDate] = useState('');
  const [initiate, setInitiate] = useState({
    status:'',
    message:'',
    active:false,
    id:''
  });
  const [showM, setShowM] = useState(false);
  const handleCloseM = () => setInitiate({
    status:'',
    message:'',
    active:false,
    id:''
  });

  const [event,setEvent]=useState({
    eventname:"",
    noOfGuest:"",
    details:"",
    date:"",
    month:"",
    year:"",
    starttime:"",
    endtime:"",


    error_name:1,
    error_noOfGuest:1,
    error_details:1,
    error_date:1,
    error_month:1,
    error_year:1,
    error_starttime:1,
    error_endtime:1,
    
    err:0,
        
      });
    
      const [time1, setTime] = useState('12:00 pm');
      const [showTime, setShowTime] = useState(false);
    
      const [endtime1, setEndTime] = useState('01:00 pm');
      const [showEndTime, setEndShowTime] = useState(false);
  const [office,setOffices]=useState({
    name:"",
    phone:"",
    officeHeld:"",
   
  });
  const [booking1,setBooking1]=useState({
    schoolFacility:"",
    location:"",
    schoolFacilitySelect:"",
    date:'',
    time:'',
    endtime:'',
    month:'',
    year:''
    
  });
  const dispatch=useDispatch();
  const [allOffice,setAllOffices]=useState([]);
  const [allFacilities, setAllFacilities] = useState([]);
  const [show1, setShow1] = useState(false);
   const [newlocforapp, setNewlocforapp] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show, setShow] = useState("0");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show21, setShow21] = useState(false);
  const [applicationvalidate, setApplicationvalidate] = useState();

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [showR, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);
  const [eventBooking,setEventBooking] = useState([]);
  const [Resetpassword,setResetpassword]=useState({
               
    Reset_email:"",        
        
    error_email:1,     
    Resetpassword_err:'0',
    Resetpassword_mesage:'',
    status:'fail',
    id:''
  });
    
  const [showalert, setShowalert] = useState(false);
  const handleClosealert = () => setShowalert(false);
  const handleShowalert = () => setShowalert(true);
  
  const [Alerterr,setAlerterr]=useState({
               
    Alerterr_message:"",        
        
     
    Alerterr_err:'0',
   
  });

  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const style = {
    color: 'red',
    
  };
  const time = useSelector((state) => state.todoReducer.time);
        const endtime = useSelector((state) => state.todoReducer.endtime);
  const getFacilitiesofLocation=(data)=>{
    console.log(data);

    let date = data.startDate.split("-");
// alert(data.endTime);

let ds = data.startTime.split(":");
let d1='';
let de = data.endTime.split(":");
let d2='';
if(ds[0] > 12 ){
  d1=(ds[0]-12)+':'+ds[1]+' pm';
}else{
  d1=ds[0]+':'+ds[1]+' am';
}

if(de[0] > 12 ){
  d2=(de[0]-12)+':'+de[1]+' pm';
}else{
  d2=de[0]+':'+de[1]+' am';
}

setTime(d1);
setEndTime(d2);






    setEvent((preValue)=>{
      return {
    eventname:preValue.eventname,
    noOfGuest:preValue.noOfGuest,
    details:preValue.details,
    date:date[2],
    month:date[1],
    year:date[0],
    starttime:data.startTime,
    endtime:data.endTime,
    error_name:preValue.error_name,
    error_noOfGuest:preValue.error_noOfGuest,
    error_details:preValue.error_details,
    error_date:0,
    error_month:0,
    error_year:0,
    error_starttime:0,
    error_endtime:0,
    err:0,
  };
  
  });









console.log({location:data.location,bookingID:data.bid});

console.log("hello");

    Axios.post("getFacilityByLocationBookingEdit",{location:data.location,bookingID:data.bid})
  .then(res =>{

   
    console.log(res.data.data);
  setAllFacilities(res.data.data);
  });
  }

  const inputEventOfficenew = (event,index) =>{
    var l=0;
   var result = allOffice.map(function(el) {
     var o = Object.assign({}, el);
     console.log(l);
    console.log(o);
    if(l==index){
     if(event.target.name===('name'+index)){
       o.name=event.target.value;
     }
     if(event.target.name===('phone'+index)){
       o.phone=event.target.value;
     }
     if(event.target.name===('officeHeld'+index)){
       o.officeHeld=event.target.value;
     }
    }
    l++;
     return o;
   })
    setAllOffices(result);


  

  

}


const increasevalue = (event,facilityid,amenitiesid)=>{

console.log(facilityid);
console.log(amenitiesid);
  let abc= allFacilities.map(item => {
    var temp1 = Object.assign({}, item);
    if(temp1.data.facility_id==facilityid){
      console.log(amenitiesid);
      var anemlength=temp1.amenities;
      if(anemlength.length!=0 ){
        for(var i = 0, length = anemlength.length; i < length; i++) {
         
          if(temp1.amenities[i].amenities_id==amenitiesid){
          
            console.log(event.target.value);
         
            temp1.amenities[i]['count']= event.target.value;
          }
        }
      }

    }
    return temp1;
  });
  console.log(abc);
  
  setAllFacilities(abc);
          }
  const changeDate=(day)=>{

    var today = new Date();
    let date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // alert(day+' = '+calendernfo.date+' = '+date1);

    if(calendernfo.date == date1 && day==='yesterday'){
      
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:'Previous month is not available ! ',   
               
            
               
                 };
        });
        setShowalert(true);
     
      return false;
    }
   
    Axios.post("get_calendar",{day:day,date:calendernfo.date,loc:newlocforapp})
    .then(res =>{
      // console.log("calender");
      // console.log(res.data);
      setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
     
    });
   }


   const inputEventcancelDetails =(event)=> {
    console.log(event.target.name);
    console.log(event.target.value);
 
   console.log(event);
    setcancelresInfo((preValue)=>{
       if(event.target.name==='cancelreason'){
        return {   
        cancelreason:event.target.value,
        err_cancelreason:0,
       
        err:preValue.err,
        };
       }




      })
    }
  const inputEvent =(event)=> {
    console.log(event.target.name);
    console.log(event.target.value);
    console.log(event.target.checked);
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
         authorizedOrganization: preValue.authorizedOrganization,
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
         authorizedOrganization: preValue.authorizedOrganization,
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
         authorizedOrganization: preValue.authorizedOrganization, 
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
             authorizedOrganization: preValue.authorizedOrganization,
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
             authorizedOrganization: preValue.authorizedOrganization,
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
          authorizedOrganization: preValue.authorizedOrganization,   
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
           authorizedOrganization: preValue.authorizedOrganization,  
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
           authorizedOrganization: preValue.authorizedOrganization,  
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
        city:preValue.city, 
        state:preValue.state, 
        detailOrganization:preValue.detailOrganization, 
        objectiveOrganization:preValue.objectiveOrganization, 
        isProfitMakingOrganization:preValue.isProfitMakingOrganization, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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
           authorizedOrganization: preValue.authorizedOrganization,  
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
            authorizedOrganization: preValue.authorizedOrganization, 
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
         authorizedOrganization: preValue.authorizedOrganization,    
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

       if(event.target.name==='isProfitMakingOrganization1'){
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
        isProfitMakingOrganization:1, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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

       if(event.target.name==='isProfitMakingOrganization0'){
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
        isProfitMakingOrganization:2, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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

       if(event.target.name==='isProfitMakingOrganization3'){
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
        isProfitMakingOrganization:3, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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
       if(event.target.name==='isProfitMakingOrganization4'){
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
        isProfitMakingOrganization:1, 
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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
       if(event.target.name==='isProfitMakingOrganization5'){
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
        isProfitMakingOrganization:2,
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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
       if(event.target.name==='isProfitMakingOrganization6'){
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
        isProfitMakingOrganization:3,
        organizationOffices:preValue.organizationOffices,
        memberOfOrganization:preValue.memberOfOrganization,
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.premises,
           authorizedOrganization: preValue.authorizedOrganization,  
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
          authorizedOrganization: preValue.authorizedOrganization,   
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
            authorizedOrganization: preValue.authorizedOrganization, 
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
 authorizedOrganization: preValue.authorizedOrganization,
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
        premises:event.target.value,
           authorizedOrganization: preValue.authorizedOrganization,  
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





















        const inputEventapplication = ()=>{

   var checkBox = document.getElementById("authorizedOrganization");
    
    if (checkBox.checked == true){
 setLogInfo((preValue)=>{
       
  
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
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.memberAverageAge,
           authorizedOrganization: 1,  
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
        error_premises:preValue.error_premises,
        err:preValue.err,
          };
         
  
       
  
  
  
      
              });
    }else{

           setLogInfo((preValue)=>{
       
  
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
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.memberAverageAge,
           authorizedOrganization: 0,  
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
        error_premises:preValue.error_premises,
        err:preValue.err,
          };
         
  
       
  
  
  
      
              });
  }
  }

   const inputEventapplication1 = ()=>{

   var checkBox = document.getElementById("authorizedOrganization2");
    
    if (checkBox.checked == true){
 setLogInfo((preValue)=>{
       
  
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
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.memberAverageAge,
           authorizedOrganization: 1,  
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
        error_premises:preValue.error_premises,
        err:preValue.err,
          };
         
  
       
  
  
  
      
              });
    }else{

           setLogInfo((preValue)=>{
       
  
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
        memberAverageAge:preValue.memberAverageAge,
        premises:preValue.memberAverageAge,
           authorizedOrganization: 0,  
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
        error_premises:preValue.error_premises,
        err:preValue.err,
          };
         
  
       
  
  
  
      
              });
  }
  }
      const checkgetclalender=(loc)=>{
     
 
  
     Axios.post("get_calendar",{loc:loc})
 .then(res =>{
   console.log("calender");
   console.log(res.data);
   setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
   if(res.data.html!=''){
    setTimeout(
      function() {
        setShowCalenderShow(true);
      }, 100);
    
   }

 });
  setNewlocforapp(loc);
  
   
  



}
 const checkpasstype = () =>{

var valtype=document.getElementById('Reset_email').type ;
 var element = document.getElementById("ibtuton");
if(valtype=='password'){
document.getElementById("Reset_email").type="text";
 element.className = "fa fa-eye";
 document.getElementById("ibtuton").style.color = "#506172";
}else{
document.getElementById("Reset_email").type="password"; 
 element.className = "fa fa-eye-slash";
  document.getElementById("ibtuton").style.color = "gray"; 
}

 } 


const callPaginationfacperpage =(val)=>{
var perpa=val;

  Axios.post("getMyProfile",{id:id,perpage:perpa,page:1})
  .then(res =>{
    console.log("Get Data");
    console.log(res.data);
    if(res.data.info){
    let fData = res.data.info; 
    console.log(fData.is_validate);
    setApplicationvalidate(fData.is_validate);
        if(fData.organizationOffices){
          const abc = JSON.parse(fData.organizationOffices);
          console.log(abc.length);
          //  console.log("abc");
          //  console.log(abc);
          setAllOffices(abc);
        
        }
  
        setPaginationfac((preValue)=>{
          return { 
            perPage:perpa,
            totalCount:res.data.paginationprint.totalCount,
            totalPage:res.data.paginationprint.totalPage,
            currentPage:1  
          }   
        });
  
  
  setBookingInfo(res.data.newboodetail);
  
   
    
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
  }
  });


}
     const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
     const applicant_info3 = useSelector((state) => state.todoReducer3.applicant_info);
    const location = useSelector((state) => state.todoReducer.location);

    const inputEventDetails =(event)=> {
      //setName(event.target.value);
      //console.log(event.target.value);
     console.log(event);


      setEvent((preValue)=>{

        if(event.target.name==='eventname'){
          return {

            eventname:event.target.value,
            noOfGuest:preValue.noOfGuest,
            details:preValue.details,
            date:preValue.date,
            month:preValue.month,
            year:preValue.year,
            starttime:preValue.starttime,
            endtime:preValue.endtime,
            error_name:0,
            error_noOfGuest:preValue.error_noOfGuest,
            error_details:preValue.error_details,

            error_date:preValue.error_date,
            error_month:preValue.error_month,
            error_year:preValue.error_year,
            error_starttime:preValue.error_starttime,
            error_endtime:preValue.error_endtime,
            err:preValue.err,

          };

        }
        if(event.target.name==='noOfGuest'){
          return {   

            eventname:preValue.eventname,
            noOfGuest:event.target.value,
            details:preValue.details,
            date:preValue.date,
            month:preValue.month,
            year:preValue.year,
            starttime:preValue.starttime,
            endtime:preValue.endtime,
            error_name:preValue.error_name,
            error_noOfGuest:0,
            error_details:preValue.error_details,
            error_date:preValue.error_date,
            error_month:preValue.error_month,
            error_year:preValue.error_year,
            error_starttime:preValue.error_starttime,
            error_endtime:preValue.error_endtime,
            err:preValue.err,

          };
        }
        if(event.target.name==='eventDetails'){
          return {   

            eventname:preValue.eventname,
            noOfGuest:preValue.noOfGuest,
            details:event.target.value,
            date:preValue.date,
            month:preValue.month,
            year:preValue.year,
            starttime:preValue.starttime,
            endtime:preValue.endtime,
            error_name:preValue.error_name,
            error_noOfGuest:preValue.error_noOfGuest,
            error_details:0,
            error_date:preValue.error_date,
            error_month:preValue.error_month,
            error_year:preValue.error_year,
            error_starttime:preValue.error_starttime,
            error_endtime:preValue.error_endtime,
            err:preValue.err,

          };
        }

      })


    }

    const callPaginationfac =(s)=>{
      console.log(s);
     
      console.log(paginationfac.currentPage);
      console.log(paginationfac.totalPage);
      let a=paginationfac.currentPage;
      if(s==='nextPage' && paginationfac.currentPage < paginationfac.totalPage){
        a = a+1;
      }
      
      if(s==='previouPage' && paginationfac.currentPage > 1 && paginationfac.currentPage <= paginationfac.totalPage){
        a = a-1;
      }
      
      
      if(paginationfac.currentPage === a){
      
        return false;
      }
    
    
      
        Axios.post("getMyProfile",{id:id,perpage:paginationfac.perPage,page:a})
        .then(res =>{
          console.log("Get Data");
          console.log(res.data);
          if(res.data.info){
          let fData = res.data.info; 
          console.log(fData.is_validate);
          setApplicationvalidate(fData.is_validate);
              if(fData.organizationOffices){
                const abc = JSON.parse(fData.organizationOffices);
                console.log(abc.length);
                //  console.log("abc");
                //  console.log(abc);
                setAllOffices(abc);
              
              }
        
             
        
              setPaginationfac((preValue)=>{
                return { 
                   perPage:preValue.perPage,
                totalCount:res.data.paginationprint.totalCount,
                totalPage:res.data.paginationprint.totalPage,
                currentPage:a   
                }   
              });
        setBookingInfo(res.data.newboodetail);
        
         
          
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
         var pagefa=((parseInt(a) * parseInt(paginationfac.perPage))-parseInt(paginationfac.perPage));
             
             
         if(pagefa >= 10){
           setAddindexfac(parseInt(pagefa));
           console.log(parseInt(pagefa));
         }else{
           setAddindexfac(1);
         }
        }
        });
      
      
      }
    const reducer3 = useSelector((state) => state.todoReducer3);

    useEffect(() => {

      Axios.post("get_calendar")
      .then(res =>{
    
        setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
        
      });
      
        if( reducer3.applicant_id1 && reducer3.applicant_id1.length > 4  && reducer3.applicant_info.profile_status==='Incomplete'){

          setShow3(true);
        }
      
      

      
    
dispatch(siteData({page:'profile'}));
console.log("From user Reducer");
console.log(applicant_id1);
console.log(applicant_info3);
SetId(applicant_id1);
Axios.post("getMyProfile",{id:applicant_id1,perpage:5,page:1})
.then(res =>{
  console.log("Get Data");
  if(res.data.status=="success"){
  console.log(res.data);
  if(res.data.info){
  let fData = res.data.info; 
  console.log(fData.is_validate);
  setApplicationvalidate(fData.is_validate);
      if(fData.organizationOffices){
        const abc = JSON.parse(fData.organizationOffices);
        console.log(abc.length);
        //  console.log("abc");
        //  console.log(abc);
        setAllOffices(abc);
      
      }

      setPaginationfac((preValue)=>{
        return { 
          perPage:5,
          totalCount:res.data.paginationprint.totalCount,
          totalPage:res.data.paginationprint.totalPage,
          currentPage:1  
        }   
      });


setBookingInfo(res.data.newboodetail);


  
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
    authorizedOrganization:fData.authorizedOrganization,
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
}
}else{

}
});
console.log(applicant_info);




console.log("allOffice")
console.log(allOffice);

Axios.post("getBookedFacilitiesByIdForallProfile",{id:applicant_id1})
.then(res =>{
  console.log("request");
  console.log(res.data);
  console.log(res.data.details);
  if(res.data.status=='success'){
    setProfileBookingdeatilsprint(res.data.details);
  }


});

    },[]);


    useEffect(() => {


console.log(allFacilities);
    },[]);

    
     const checkeventdeatials =(bid)=>{
     
       var searchbar = document.getElementById("bookiddetails"+bid);
       var display = getComputedStyle(searchbar).display;
   
        if (display == "none") {
                searchbar.style.display = "block";
             
                
                document.getElementById("bookeveicon"+bid).className = 'fa fa-minus-circle';
               
            } else {
                searchbar.style.display = "none";
               
                document.getElementById("bookeveicon"+bid).className = 'fa fa-plus-circle';
            }
       
         }

  
  
    const inputEventOffice = (event) =>{
console.log(event.target.name);
       
       if(event.target.name==='name'){
         setOffices((preValue)=>{ 
                    return {  
                        name:event.target.value,
                        phone:preValue.phone,
                        officeHeld:preValue.officeHeld,
                       
                      }
         });
      }
       if(event.target.name==='phone'){
               setOffices((preValue)=>{ 
                    return {  
                        name:preValue.name,
                        phone:event.target.value,
                        officeHeld:preValue.officeHeld,
                        
                      }
         });
      }
       if(event.target.name==='officeHeld'){
            setOffices((preValue)=>{ 
                    return {  
                        name:preValue.name,
                        phone:preValue.phone,
                        officeHeld:event.target.value,
                       
                      }
         });

      }
      

      
    
    }


    const addOffice =()=>{
      console.log(office);

      setAllOffices([...allOffice,{name:office.name,phone:office.phone,officeHeld:office.officeHeld}]);
   

      setOffices({  
            name:'',
            phone:'',
            officeHeld:'',
           })

       console.log(allOffice);
    }

    const saveProfile =()=>{
      var phoneno = /^\d{10}$/;
      setProfileStatus({status:'',msg:''});
      console.log(office.name);
      console.log(login.address1);
      console.log(allOffice);
      console.log(id);
      if(login.organization=='' || login.organization==null){
        setAlerterr((preValue)=>{
          return {    
                 
                  Alerterr_err:1,  
                  Alerterr_message:'Name of Applicant Organization. This field is missing ',   
                 
              
                 
                   };
          });
          setShowalert(true);
      
     return 0;
   }
   
   if(login.position=='' || login.position==null){
    setAlerterr((preValue)=>{
      return {    
             
              Alerterr_err:1,  
              Alerterr_message:'Position in the Organization. This field is missing',   
             
          
             
               };
      });
      setShowalert(true);
     
     return 0;
   }
   if(login.address1=='' || login.address1==null){
    setAlerterr((preValue)=>{
      return {    
             
              Alerterr_err:1,  
              Alerterr_message:'Address. This field is missing',   
             
          
             
               };
      });
      setShowalert(true);
   
 return 0;
}
if(login.address2=='' || login.address2==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Street Address. This field is missing',   
           
        
           
             };
    });
    setShowalert(true);
 

return 0;
}
if(login.city=='' || login.city==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'City.This field is missing',   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}
if(login.state=='' || login.state==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'State/Province/Region. This field is missing',   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}
if(login.phone=='' || login.phone==null || !(login.phone.match(phoneno))){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Phone number which must be ten digit number',   
           
        
           
             };
    });
    setShowalert(true);
 
return 0;
}
if(login.email=='' || login.email==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Email id. This field is missing',   
           
        
           
             };
    });
    setShowalert(true);
  
return 0;
}
if(login.name=='' || login.name==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Name. This field is missing',   
           
        
           
             };
    });
    setShowalert(true);
  
return 0;
}
if(login.detailOrganization=='' || login.detailOrganization==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Details of Organization. This field is missing',   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}

if(login.objectiveOrganization=='' || login.objectiveOrganization==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Describe purpose or objective of Organization. This field is missing',   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}
if(login.isProfitMakingOrganization=='' || login.isProfitMakingOrganization==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Is your Organization profit making?  This field is missing',   
           
        
           
             };
    });
    setShowalert(true);
 
return 0;
}


var lengthofficer=allOffice.length;



 if(lengthofficer==0  ){
  if((office.name==''  || office.name==null) || (office.phone=='' || office.phone==null) || (office.officeHeld=='' || office.officeHeld==null)){
    setAlerterr((preValue)=>{
      return {    
             
              Alerterr_err:1,  
              Alerterr_message:"Organization's Officers details . This field is missing",   
             
          
             
               };
      });
      setShowalert(true);
  
    return 0;
  }

}else{
  if(allOffice[0].name=='' || allOffice[0].name==null){
    setAlerterr((preValue)=>{
      return {    
             
              Alerterr_err:1,  
              Alerterr_message:"Officer Name . This field is missing",   
             
          
             
               };
      });
      setShowalert(true);
    
  return 0;
  }
    if(allOffice[0].phone=='' || allOffice[0].phone==null ||  !(allOffice[0].phone.match(phoneno))){
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:"Officer  Phone number which must be ten digit number .This field is missing",   
               
            
               
                 };
        });
        setShowalert(true);
  
  return 0;
  }
  if(allOffice[0].officeHeld=='' || allOffice[0].officeHeld==null){
    setAlerterr((preValue)=>{
      return {    
             
              Alerterr_err:1,  
              Alerterr_message:"Officer Office held .This field is missing",   
             
          
             
               };
      });
      setShowalert(true);

 
  return 0;
  }
  
}



if(login.memberOfOrganization=='' || login.memberOfOrganization==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"How many enrolled members are in your organization? This field is missing",   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}

if(login.memberAverageAge=='' || login.memberAverageAge==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"If applicant is a youth organization, what is average age of its membership? This field is missing",   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}
if(login.premises=='' || login.premises==null){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"State purpose for which premises will be used? This field is missing",   
           
        
           
             };
    });
    setShowalert(true);

return 0;
}



     setShow1(true);
     if(lengthofficer==0  ){
      if((office.name==''  || office.name==null) || (office.phone=='' || office.phone==null) || (office.officeHeld=='' || office.officeHeld==null)){
       
      
      }else{
        var allnew= new Array();
        allnew.push({name:office.name,phone:office.phone,officeHeld:office.officeHeld});
        console.log({info:login,office:allnew,id:id});
        Axios.post("saveMyProfile",{info:login,office:allnew,id:id})
        .then(res =>{
          console.log("request");
          console.log(res.data);
         // alert(res.data.profilestatus);
          setProfileStatus({status:res.data.profilestatus.status,msg:res.data.profilestatus.msg});
          if(res.data.info.organizationOffices){
            const abc = JSON.parse(res.data.info.organizationOffices);
            console.log(abc.length);
            //  console.log("abc");
            //  console.log(abc);
            setAllOffices(abc);
          
          }
  
          dispatch(userData({
            user_id:res.data.id,
            user_info:res.data.info
           })); 
  
         
  
          // setTimeout(function(){ setShow1(false) }, 3000);
          Axios.post("getBookedFacilitiesByIdForallProfile",{id:id})
          .then(res =>{
            console.log("request");
            console.log(res.data);
            console.log(res.data.details);
            if(res.data.status=='success'){
              setProfileBookingdeatilsprint(res.data.details);
            }
          
          
          });
             
        });
      

      }
    }else{
      console.log({info:login,office:allOffice,id:id});
      Axios.post("saveMyProfile",{info:login,office:allOffice,id:id})
      .then(res =>{
        console.log("request");
        console.log(res.data);
       // alert(res.data.profilestatus);
        setProfileStatus({status:res.data.profilestatus.status,msg:res.data.profilestatus.msg});
        if(res.data.info.organizationOffices){
          const abc = JSON.parse(res.data.info.organizationOffices);
          console.log(abc.length);
          //  console.log("abc");
          //  console.log(abc);
          setAllOffices(abc);
        
        }

        dispatch(userData({
          user_id:res.data.id,
          user_info:res.data.info
         })); 

         Axios.post("getBookedFacilitiesByIdForallProfile",{id:id})
         .then(res =>{
           console.log("request");
           console.log(res.data);
           console.log(res.data.details);
           if(res.data.status=='success'){
             setProfileBookingdeatilsprint(res.data.details);
           }
         
         
         });

        // setTimeout(function(){ setShow1(false) }, 3000);
       
           
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
                  id:eventBooking.applicant_id,  
                     
              
                 
                   };
          }
  
     
  
  
          });
   } 
    const [pageInfo, setPageInfo] = useState({
      facility:"",
      facilityId:"",
      location:"",
      locationNumber:""
    });


    const initiateReset = () =>{
      if( Resetpassword.error_email==0){
    
        Axios.post("validatelogincheck",{Resetpassword:Resetpassword})
         .then(res =>{   
           console.log(res.data);
           
         
      if(res.data.status==='Success'){
        setApplicationvalidate(1);
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
      
       Axios.post("submitMyBooking",{login:login,time1:time1,endtime1:endtime1,event:event,id:eventBooking.bid,applicant_id:eventBooking.applicant_id,allFacilities:allFacilities,perpage:paginationfac.perPage,page:paginationfac.currentPage})
       .then(res =>{
         console.log("request");
         console.log(res.data);
       
         setBookingInfo(res.data.newboodetail);
         setPaginationfac((preValue)=>{
          return { 
             perPage:preValue.perPage,
          totalCount:res.data.paginationprint.totalCount,
          totalPage:res.data.paginationprint.totalPage,
          currentPage:preValue.currentPage  
          }   
        });
          
        Axios.post("getBookedFacilitiesByIdForallProfile",{id:id})
        .then(res =>{
          console.log("request");
          console.log(res.data);
          console.log(res.data.details);
          if(res.data.status=='success'){
            setProfileBookingdeatilsprint(res.data.details);
          }
        
        
        });
        

       });
      

      
 
      }else{
       document.getElementById("Reset_email").value='';
       setResetpassword((preValue)=>{
      
       
         return {    
             Reset_email:'',  
                     
                 error_email:1,         
                 Resetpassword_err:1,  
                 Resetpassword_mesage:res.data.message,   
                 status:'fail',
                 id:eventBooking.applicant_id,  
                    
             
                
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
                     id:eventBooking.applicant_id,  
                        
                 
                    
                      };
             
      
        
      
      
             });
           
       }
    
       
    }
    const saveEventInfo =()=>{
    
 console.log(eventBooking.applicant_id);
// return 0;
// console.log(eventBooking);
// console.log(allFacilities);

if(event.error_name || event.error_noOfGuest || event.error_details || event.error_date || event.error_starttime){
  setEvent((preValue)=>{
    return {
  eventname:preValue.eventname,
  noOfGuest:preValue.noOfGuest,
  details:preValue.details,
  date:preValue.date,
  month:preValue.month,
  year:preValue.year,
  starttime:time1,
  endtime:endtime1,
  error_name:preValue.error_name,
  error_noOfGuest:preValue.error_noOfGuest,
  error_details:preValue.error_details,
  error_date:preValue.error_date,
  error_month:preValue.error_month,
  error_year:preValue.error_year,
  error_starttime:preValue.error_starttime,
  error_endtime:preValue.error_endtime,
  err:1,
};

});

document.getElementById('ev1').focus();

return false;
}else{
   var checkBox = document.getElementById("newiagree");

if( checkBox.checked == false){

  setEvent((preValue)=>{
    return {
  eventname:preValue.eventname,
  noOfGuest:preValue.noOfGuest,
  details:preValue.details,
  date:preValue.date,
  month:preValue.month,
  year:preValue.year,
  starttime:time1,
  endtime:endtime1,
  error_name:preValue.error_name,
  error_noOfGuest:preValue.error_noOfGuest,
  error_details:preValue.error_details,
  error_date:preValue.error_date,
  error_month:preValue.error_month,
  error_year:preValue.error_year,
  error_starttime:preValue.error_starttime,
  error_endtime:preValue.error_endtime,
  err:10,
};

});
  return false; 
}else{
   setEvent((preValue)=>{
    return {
  eventname:preValue.eventname,
  noOfGuest:preValue.noOfGuest,
  details:preValue.details,
  date:preValue.date,
  month:preValue.month,
  year:preValue.year,
  starttime:time1,
  endtime:endtime1,
  error_name:preValue.error_name,
  error_noOfGuest:preValue.error_noOfGuest,
  error_details:preValue.error_details,
  error_date:preValue.error_date,
  error_month:preValue.error_month,
  error_year:preValue.error_year,
  error_starttime:preValue.error_starttime,
  error_endtime:preValue.error_endtime,
  err:0,
};

}); 
}
  

}

console.log(allFacilities);
let a=0;
let doubles = allFacilities.map(function(data) {
  return a = a + data.data.booked ;
});
console.log(event.eventname);
if(event.eventname==''  ){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"Please enter Event Name",   
           
        
           
             };
    });
    setShowalert(true);
  
  return false;
}
if(event.noOfGuest==''){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"Please enter Number of Participant",   
           
        
           
             };
    });
    setShowalert(true);

  return false;
}
if(event.details==''  ){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"Please enter Event Description",   
           
        
           
             };
    });
    setShowalert(true);

  return false;
}

if(a < 1){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:"Please select a facility",   
           
        
           
             };
    });
    setShowalert(true);
 
  return false;
}


console.log({login:login,time1:time1,endtime1:endtime1,event:event,id:eventBooking.bid,applicant_id:eventBooking.applicant_id,allFacilities:allFacilities});

setShow2(false);
if(applicationvalidate==0){
  setShowR(true);
}else{

  Axios.post("submitMyBooking",{login:login,time1:time1,endtime1:endtime1,event:event,id:eventBooking.bid,applicant_id:eventBooking.applicant_id,allFacilities:allFacilities,perpage:paginationfac.perPage,page:paginationfac.currentPage})
.then(res =>{
  console.log("request");
  console.log(res.data);

  setBookingInfo(res.data.newboodetail);
  setPaginationfac((preValue)=>{
    return { 
       perPage:preValue.perPage,
    totalCount:res.data.paginationprint.totalCount,
    totalPage:res.data.paginationprint.totalPage,
    currentPage:preValue.currentPage  
    }   
  });
  Axios.post("getBookedFacilitiesByIdForallProfile",{id:id})
.then(res =>{
  console.log("request new rice");
  console.log(res.data);
  console.log(res.data.details);
  if(res.data.status=='success'){
    setProfileBookingdeatilsprint(res.data.details);
  }


});
     
});


}
// console.log(login);
// return 0;




    }
    
        const removeItem =(data,i)=>{
console.log(data);
console.log(allOffice);
     
          setAllOffices(allOffice.filter(allOffice => allOffice.name !== data.name));
    
        }


           
  const clickHandler=(e)=>{
    const el = e.target.closest("td");  
    console.log(calendernfo);
   
    if (el && e.currentTarget.contains(el)) {  
      // let b =el.innerHTML;  
     let a =Number(el.innerHTML);
     let b =0;
     
if(a<10){
  b='0'+a;
}else{
  b=a;
}

    //  alert(calendernfo.date);
     let ddt = calendernfo.date.split("-");
     setDate(a);
     setShow1(false);

   


    setBooking1((preValue)=>{
      return { 
      schoolFacility:preValue.schoolFacility,
      location:pageInfo.location,
      schoolFacilitySelect:preValue.schoolFacilitySelect,
      date:a,
      endtime:preValue.endtime,
      time:preValue.time,
      month:calendernfo.month,
      year:calendernfo.currentYear   
      }   
    });
     
    dispatch(booking({
      schoolFacility:booking1.schoolFacility,
      location:pageInfo.location,
      schoolFacilitySelect:booking1.schoolFacilitySelect,
      date:a,
      endtime:endtime,
      time:time,
      month:calendernfo.month,
      year:calendernfo.currentYear 
     }));
    // alert(a+'/'+calendernfo.month+'/'+calendernfo.currentYear);

     setEvent((preValue)=>{
      return {
    eventname:preValue.eventname,
    noOfGuest:preValue.noOfGuest,
    details:preValue.details,
    date:a,
    month:ddt[1],
    year:ddt[0],
    starttime:preValue.starttime,
    endtime:preValue.endtime,
    error_name:preValue.error_name,
    error_noOfGuest:preValue.error_noOfGuest,
    error_details:preValue.error_details,
    error_date:0,
    error_month:0,
    error_year:0,
    error_starttime:0,
    error_endtime:0,
    err:preValue.err,
  };



})


    }

  

    setShowCalender(false);
  }


        const changeFacilities =(event)=>{
console.log(event.target.id);
console.log(event.target.checked);
console.log(allFacilities);

/* UPDATE FACILITY  */ 
if(event.target.checked){
  let a = allFacilities.map(function(element){  
    if(element.data.id === event.target.id){
      element.data.booked = 1;      
    }
    return element;
  });
  setAllFacilities(a);
}

if(!event.target.checked){  
  let a = allFacilities.map(function(element){  
    if(element.data.id === event.target.id){
      element.data.booked = 0;      
    }
    return element;
  });
  setAllFacilities(a);
}

/* END */ 

        }

        
        const changeAmenities =(event,bid)=>{
         
          if(event.target.checked){ 
       
            let a = allFacilities.map(function(element){  
              if(element.data.id === show){             

                let b = element.amenities.map(function(elm){ 
                  if(event.target.id===elm.amenities_id){                  
                  elm.booked = 1;
                  }
                  return elm;
                });
              
                
              }
              return element;
            });
            setAllFacilities(a);
          }

          if(!event.target.checked){ 
          
            let a = allFacilities.map(function(element){  
              if(element.data.id === show){             

                let b = element.amenities.map(function(elm){ 
                  if(event.target.id===elm.amenities_id){                  
                  elm.booked = 0;
                  }
                  return elm;
                });
              
                
              }
              return element;
            });
            setAllFacilities(a);
          }
          var check=0;
          let a = allFacilities.map(function(element){  
            if(element.data.id === show){             

              let b = element.amenities.map(function(elm){ 
                if(elm.booked===1){                  
                  check++;
                }
                return elm;
              });
            
              if(element.data.id ===bid && check>0){
                element.data.booked = 1;
              }else{
             
                element.data.booked =0;
              }
            }
            return element;
          });


        }

        const setShowTime1=()=>{
          setShowTime(!showTime);
          setEndShowTime(false);          
        }

        const setEndShowTime1=()=>{
          setShowTime(false);
          setEndShowTime(!showEndTime);
          
        }

        const cancel =()=>{
// alert("hello");
console.log(eventBooking);
if(cancelres.err_cancelreason==0){

  Axios.post("cancelBooking",{id:eventBooking.bid,userid:id,perpage:paginationfac.perPage,page:paginationfac.currentPage,reject_reason:cancelres.cancelreason})
  .then(res =>{
    console.log("request");
    //console.log(res.data);
    setShow4(false);
  
    console.log(res.data);
    setBookingInfo(res.data.newboodetail);
    setPaginationfac((preValue)=>{
      return { 
         perPage:preValue.perPage,
      totalCount:res.data.paginationprint.totalCount,
      totalPage:res.data.paginationprint.totalPage,
      currentPage:preValue.currentPage 
      }   
    });
    Axios.post("getBookedFacilitiesByIdForallProfile",{id:id})
    .then(res =>{
      console.log("request");
      console.log(res.data);
      console.log(res.data.details);
      if(res.data.status=='success'){
        setProfileBookingdeatilsprint(res.data.details);
      }
    
    
    });
    setcancelresInfo((preValue)=>{
   
      return {   
      cancelreason:'',
      err_cancelreason:0,
     
      err:0,
      };
     
 
 
 
 
    })
  
  });
  
}else{
  setcancelresInfo((preValue)=>{
   
     return {   
     cancelreason:preValue.cancelreason,
     err_cancelreason:1,
    
     err:5,
     };
    




   })


}



        }

        const no =()=>{
          
        }
        const ReadMore = ({ children }) => {
          const text = children;
          console.log(text);
          const [isReadMore, setIsReadMore] = useState(true);
          const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
          };
          return (
            <p className="text">
              {isReadMore ? text.slice(0, 150) : text}
              <span onClick={toggleReadMore} className="read-or-hide" style={{cursor:'pointer',color:'#ff0000'}}>
                {isReadMore ? "...read more" : " show less"}
              </span>
            </p>
          );
        };
        const setPrintesti =(bid)=>{
  
    
  
          var deatilsnewforprint = document.getElementById("deatilsnewforprint");
          var deatilsnewforprintnew = document.getElementById("deatilsnewforprintnew"+bid); 
        
        
          deatilsnewforprint.style.display = 'none';
          deatilsnewforprintnew.style.display = 'block';
          document.title='Facility_Details_Booking_Id_'+bid;
        
          window.print();
          document.title='FRMS';
          //[Delete this line if you want it to stay hidden after printing]
          deatilsnewforprint.style.display = 'block';
          deatilsnewforprintnew.style.display = 'none';
        
        
        
        }

        const deletesubmit =()=>{
  
          console.log(initiate);
        
        
        
        
        
        
          Axios.post("usercompleteDelete",{initiate:initiate,id:initiate.id,userid:id,perpage:paginationfac.perPage,page:paginationfac.currentPage})
          .then(res =>{
          console.log("locationAdminDelete");
           console.log(res.data);
          
          if(res.data.status==="success"){
           
          
          
          
             
            setBookingInfo(res.data.newboodetail);
          setPaginationfac((preValue)=>{
            return { 
               perPage:preValue.perPage,
            totalCount:res.data.paginationprint.totalCount,
            totalPage:res.data.paginationprint.totalPage,
            currentPage:preValue.currentPage 
            }   
          });
          Axios.post("getBookedFacilitiesByIdForallProfile",{id:id})
          .then(res =>{
            console.log("request");
            console.log(res.data);
            console.log(res.data.details);
            if(res.data.status=='success'){
              setProfileBookingdeatilsprint(res.data.details);
            }
          
          
          });
        
            }
          
          
          handleCloseM();
          
          
          });
        
        
        
        }
const selectedFacility = useSelector((state) => state.todoReducer.facility);
const applicant_id = useSelector((state) => state.todoReducer.applicant_id);
const applicant_info = useSelector((state) => state.todoReducer.applicant_info);
if(!applicant_id1){
        
       return <Redirect to={`/`} />;
    }
   
    if( applicant_id1!='' && applicant_id1.length >=4){
   
      return <Redirect to={`/`} />;
    }

    var currentdate = new Date(); 
    var curmon=0;
    if((currentdate.getMonth()+1) <=9){
      curmon='0'+(currentdate.getMonth()+1);
    }
    var curdate=0;
    if((currentdate.getDate()) <=9){
      curdate='0'+(currentdate.getDate());
    }
    
var datetime = currentdate.getFullYear() + "-"
                + curmon  + "-" 
                + curdate + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                console.log(datetime);
                var datenew = new Date();
                datenew.setDate(datenew.getDate() - 2);
                console.log(datenew.getFullYear() + "-"
                + (datenew.getMonth()+1)  + "-" 
                + datenew.getDate() + "  "  
                + datenew.getHours() + ":"  
                + datenew.getMinutes() + ":" 
                + datenew.getSeconds());
        return (
        <React.Fragment>
             <Header/>
<div class="profile-sec" id="deatilsnewforprint" >

<div class="container">

<div class="row" >

<div class="col-md-12">

<div data-label="Example" class="df-example">

    <ul class="nav nav-line" id="myTab5" role="tablist">

      <li class="nav-item" onClick={()=>activeTab('profile')}>

        <a  className={`nav-link ${tab==='profile'?'active':''}`} id="home-tab5" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" style={{cursor: 'pointer'}}>My Profile</a>

      </li>

      <li class="nav-item"  onClick={()=>activeTab('booking')}>

        <a className={`nav-link ${tab==='booking'?'active':''}`} id="profile-tab5" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false" style={{cursor: 'pointer'}}>My Booking</a>

      </li>



      <li class="nav-item"  onClick={()=>activeTab('status')}>

        <a className={`nav-link ${tab==='status'?'active':''}`} id="profile-tab5" data-toggle="tab"  role="tab" aria-controls="status" aria-selected="false" style={{cursor: 'pointer'}}>My Status</a>

      </li>

     

    </ul>



    <div class="tab-content mg-t-20" id="myTabContent5">

      <div className={`tab-pane fade show ${tab==='profile'?'active':''}`} id="home5" role="tabpanel" aria-labelledby="home-tab5">

        <div class="row" style={{marginTop:'30px'}}>

        

          <div class="col-md-3"><p class="label-profile">Name of Applicant Organization<span style={{color:'red',position:'relative',top:'-30px',left:'46px'}}>*</span></p></div>

          <div class="col-md-9 form-sec-profile">
            <input type="text" value={login.organization} name="organization" onChange={inputEvent}/ ></div>
              </div> 
              <div class="row" style={{marginTop:'30px'}}>
                <div class="col-md-3"><p class="label-profile">Position in the Organization<span style={{color:'red',position:'relative',top:'-30px',left:'16px'}}>*</span></p></div>
                <div class="col-md-9 form-sec-profile"><input type="text" value={login.position} name="position" onChange={inputEvent}/></div>

                    </div> 

                    <div class="row" style={{marginTop:'30px'}}>

        

                      <div class="col-md-3"><p class="label-profile">Address<span style={{color:'red',position:'relative'}}>*</span></p></div>

                      <div class="col-md-9 form-sec-profile"><input type="text" value={login.address1} name="address1" onChange={inputEvent}/></div>

                        

                          </div> 

                          <div class="row" style={{marginTop:'30px'}}>

        

                            <div class="col-md-3"><p class="label-profile">Street Address<span style={{color:'red',position:'relative'}}>*</span></p></div>

                            <div class="col-md-9 form-sec-profile"><input type="text" value={login.address2} name="address2" onChange={inputEvent} /></div>

                              

                                </div> 

                                <div class="row" style={{marginTop:'30px'}}>

        

                                  <div class="col-md-3"><p class="label-profile">Address Line 2</p></div>

                                  <div class="col-md-9 form-sec-profile"><input type="text" value={login.address3} name="address3" onChange={inputEvent} /></div>

                                    

                                      </div> 

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">City<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" placeholder="" value={login.city} name="city" onChange={inputEvent}/></div>

                      

                                        <div class="col-md-2" style={{marginLeft:'0px'}}><p class="label-profile">State/Province/Region<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                        <div class="col-md-4 form-sec-profile" style={{paddingLeft:'30px'}}><input type="text" placeholder="" value={login.state} name="state" onChange={inputEvent}/></div>

                                      </div>

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">Phone No<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" value="518-497-6744	" placeholder="" value={login.phone} name="phone" onChange={inputEvent}/></div>

                      

                                        <div class="col-md-2"  style={{marginLeft: '0px'}}><p class="label-profile">Email id<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                        <div class="col-md-4 form-sec-profile" style={{paddingLeft:'30px'}}><input type="text"value={login.email} name="email" onChange={inputEvent} disabled/></div>

                                      </div>

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">Name<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" value={login.name} name="name" onChange={inputEvent} placeholder=""/></div>

                      

                                        <div class="col-md-4" style={{color:'hsl(0deg 0% 38%)',paddingLeft:'6px',paddingRight:'0px',paddingTop:'4px',textAlign:'left'}}>Are you authorized to make this application <span style={{color:'red',position:'relative'}}>*</span>

                                        </div>

                                        <div class="col-md-1" style={{float:'left',textAlign:'left'}}>

                                          <input class="floating-input floating-check" type="checkbox" id="authorizedOrganization"   onChange={inputEventapplication}   checked = {login.authorizedOrganization =='1' ? 'true' :''} />

                                          <span style={{fontSize: '16px', lineHeight: '18px',position: 'relative', display: 'block',

                                          fontFamily: 'Heebo-Regular',

                                          marginTop: '-19px', marginLeft: '18px'}}>Yes</span>

                                        </div>

                                      </div>

                                      

    <div class="row" style={{marginTop:'30px'}}>

        

      <div class="col-md-3"><p class="label-profile">Details of Organization<span style={{color:'red',position:'relative'}}>*</span></p></div>

      <div class="col-md-9 form-sec-profile"><input type="text" value={login.detailOrganization} name="detailOrganization" onChange={inputEvent} /></div>

        

          </div> 

          <div class="row" style={{marginTop:'30px'}}>
        
          
            <div class="col-md-3"><p class="label-profile">Describe purpose or objective of Organization <span style={{color:'red',position:'relative'}}>*</span></p></div>

            <div class="col-md-9 form-sec-profile"><input type="text" placeholder="" value={login.objectiveOrganization} name="objectiveOrganization" onChange={inputEvent}/></div>

              

                </div> 

                

                <div class="row" style={{marginTop:'30px'}}>

                  

                  <div class="col-md-4" style={{marginLeft:'0px',color: 'hsl(0deg 0% 38%)', textAlign: 'left'}}>Is your Organization profit making?<span style={{color:'red',position:'relative'}}>*</span>

                  </div>

                  <div class="col-md-3" style={{paddingLeft: '0px'}}>

                    <div class="radioOptions">



                      <div class="radio-inner">

                          <p> <input  type="radio" value="1" checked = {login.isProfitMakingOrganization =='1' ? 'true' :''}   name="isProfitMakingOrganization1" onChange={inputEvent} />  Yes  </p>

                      </div>



                      <div class="radio-inner">

                          <p> <input type="radio" value="2" checked = {login.isProfitMakingOrganization =='2' ? 'true' :''}  name="isProfitMakingOrganization0" onChange={inputEvent}/> No </p>

                      </div>



                      <div class="radio-inner">

                          <p> <input type="radio" value="3"   checked = {login.isProfitMakingOrganization =='3' ? 'true' :''} name="isProfitMakingOrganization3" onChange={inputEvent}/> Can't Say </p>

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
                  
                  

                  {/* <div class="col-md-1"  style={{marginTop: '35px',paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Address</p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '35px'}}><input type="text" placeholder="" value={office.address} name="address" onChange={inputEventOffice}/></div> */}

                  </div>

                
                    {/* {   allOffice.map((post,index)=>( 
                    <div key={post.name}>
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
                  </div>
                    ))
                    } */}
                      { allOffice.length > 0  ? <>
                    {   allOffice.map((post,index)=>( 
                    <div class="col-md-12 row " style={{marginTop: '20px', borderTop: '1px solid  #f0ecec'}} key={post.name}>
                       <div class="col-md-3"  style={{marginTop: '20px'}}><p class="label-profile">Name 
<span style={{color:'red',position:'relative'}}>*</span></p></div>
                      
                    {/* <div class="col-md-4" style={{color: '#506172', textAlign: 'left', border: '1px solid #cccccc;'}}>
                      {post.name}
                    </div> */}
                     <div class="col-md-4 form-sec-profile" style={{marginTop: '20px'}}><input type="text" placeholder="" value={post.name} name={'name'+index} onChange={(event)=>inputEventOfficenew(event,index)} /></div>
                     <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px', marginTop: '20px'}}><p class="label-profile">Phone no 
<span style={{color:'red',position:'relative'}}>*</span></p></div>

                    <div class="col-md-4 form-sec-profile" style={{marginTop: '20px'}}>
                       <input type="text" placeholder=""  value={post.phone} name={'phone'+index}  onChange={(event)=>inputEventOfficenew(event,index)}/></div>
                    {/* <div class="col-md-3" style={{color: '#506172', textAlign: 'left'}}>
                      {post.phone}
                    </div> */}
                       <div class="col-md-3" style={{marginTop: '20px'}}><p class="label-profile">Office held 
<span style={{color:'red',position:'relative'}}>*</span></p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '25px'}}><input type="text" placeholder=""   value={post.officeHeld} name={'officeHeld'+index}  onChange={(event)=>inputEventOfficenew(event,index)}
                  /></div>

                    {/* <div class="col-md-3" style={{color: '#506172', textAlign: 'left'}}>
                      {post.officeHeld}
                    </div> */}
                  {/* <div class="col-md-1"  style={{marginTop: '20px',paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Address</p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '25px'}}>
                    <input type="text" placeholder="" value={post.address} name="address" onChange={inputEventOffice}/></div> */}


                    {/* <div class="col-md-3" style={{color: '#506172',textAlign: 'left'}}>
                      {post.address}
                    </div> */}
                     {/* <div class="col-md-3" style={{color: '#506172'}} onClick={()=>removeItem(post,index)}>
                     Delete <i class="fa fa-trash" aria-hidden="true"></i>

                    </div> */}


{ allOffice.length > 1  ? <> <div class="col-md-12" style={{paddingLeft: '0px', paddingRight: '0px'}}>
           <div class="add-more-sec"onClick={()=>removeItem(post,index)} style={{marginTop: '0px'}}>
                    <a  class="btn btn-delete">Delete<i class="fa fa-trash" style={{marginLeft:'6px',color:'#ffffff !important', fontSize: '12px'}} aria-hidden="true"></i>
                    </a>
                  </div>
                  </div></> : <> </> }

                  </div>
                    ))
                    }
</>
                : <>   <div class="row" style={{marginTop:'30px'}}>

                <div class="col-md-3"><p class="label-profile">Name<span style={{color:'red',position:'relative'}}>*</span></p></div>
                
                <div class="col-md-4 form-sec-profile"><input type="text" placeholder="" value={office.name} name="name" onChange={inputEventOffice}/></div>
                
                
                
                <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Phone no<span style={{color:'red',position:'relative'}}>*</span></p></div>
                
                <div class="col-md-4 form-sec-profile"><input type="text" placeholder=""  value={office.phone} name="phone" onChange={inputEventOffice}/></div>
                
                
                
                <div class="col-md-3" style={{marginTop: '35px'}}><p class="label-profile">Office held<span style={{color:'red',position:'relative'}}>*</span></p></div>
                <div class="col-md-4 form-sec-profile"  style={{marginTop: '35px'}}><input type="text" placeholder=""   value={office.officeHeld} name="officeHeld" onChange={inputEventOffice} /></div>
                
                </div>    </>  }

             
                <div class="row">

<div class="col-md-12">
  <div class="add-more-sec">
  <a  class="btn btn-adds" onClick={addOffice}>ADD MORE<i class="fa fa-plus" style={{marginLeft:'6px',color:'#ffffff'}} aria-hidden="true"></i>
  </a>
</div>
</div>
</div>
                

                  <div class="row" style={{marginTop:'35px'}}>

        

                    <div class="col-md-6"><p class="label-profile">How many enrolled members are in your organization?<span style={{color:'red',position:'relative'}}>*</span></p></div>

                    <div class="col-md-1 form-sec-profile"><input type="text" placeholder="" value={login.memberOfOrganization} name="memberOfOrganization" name="memberOfOrganization" onChange={inputEvent}/></div>

                    {/* <div class="col-md-1 form-sec-profile" style={{marginLeft:'16px'}}><input type="text" placeholder="" /></div>
                    <div class="col-md-1 form-sec-profile"  style={{marginLeft:'-16px'}}><input type="text" placeholder=""/></div> */}

                      

                        </div>

                        <div class="row" style={{marginTop:'35px'}}>

        

                          <div class="col-md-6"><p class="label-profile">If applicant is a youth organization, what is average age of its membership?<span style={{color:'red',position:'relative'}}>*</span></p></div>

                          <div class="col-md-1 form-sec-profile"><input type="text" placeholder="" value={login.memberAverageAge} name="memberAverageAge" onChange={inputEvent}/></div>

                          {/* <div class="col-md-1 form-sec-profile"  style={{marginLeft:'-16px'}}><input type="text" placeholder="" /></div> */}

                              </div>

                              <div class="row" style={{marginTop:'35px'}}>

        

                                <div class="col-md-6"><p class="label-profile">State purpose for which premises will be used<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                <div class="col-md-6 form-sec-profile"><input type="text" placeholder="" value={login.premises} name="premises" onChange={inputEvent}/></div>

                                  

                                    </div>

                                    <div class="row">

                                      <div class="col-md-12" >

                                        <a  class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer'}} onClick={saveProfile}>FINISH</a>

                                      </div>

                                    </div>

      

      </div>

      <div className={`tab-pane fade show ${tab==='booking'?'active':''}`} id="profile5" role="tabpanel" aria-labelledby="profile-tab5">
      <div class="col-md-12" style={{paddingLeft:'0px',paddingRight:'0px'}}>
        <Link to="/"> <a  class="btn-cacl-book" style={{textDecoration: 'none', float: 'right', position: 'relative', right:'0px' }}  > New Booking</a></Link>
        {   bookings.length >0  ? <>

          
          <ul class="pagination list--reset">
          <li class="page-item "    style={{cursor:'pointer',color:'#FA8B01',marginRight:'5px'}}>Show rows :</li> 
         
          
          {paginationfac.perPage==5 ? 
          <li class="page-item newactive"  onClick={()=>callPaginationfacperpage(5)}  style={{cursor:'pointer'}}><span class="page-link" >5</span></li> 
          :
          <li class="page-item "  onClick={()=>callPaginationfacperpage(5)} style={{cursor:'pointer'}}><span class="page-link"  style={{color:'#596882'}}>5</span></li>
             }           
           
           {paginationfac.perPage==10 ? 
          <li class="page-item newactive"  onClick={()=>callPaginationfacperpage(10)} style={{cursor:'pointer'}}><span class="page-link" >10</span></li> 
          :
          <li class="page-item "  onClick={()=>callPaginationfacperpage(10)} style={{cursor:'pointer'}}><span class="page-link"  style={{color:'#596882'}}>10</span></li>
             } 


{paginationfac.perPage==15 ? 
          <li class="page-item newactive"  onClick={()=>callPaginationfacperpage(15)} style={{cursor:'pointer'}}><span class="page-link" >15</span></li> 
          :
          <li class="page-item "  onClick={()=>callPaginationfacperpage(15)} style={{cursor:'pointer'}}><span class="page-link"  style={{color:'#596882'}}>15</span></li>
             } 
             {paginationfac.perPage==20 ? 
          <li class="page-item newactive"  onClick={()=>callPaginationfacperpage(20)} style={{cursor:'pointer'}}><span class="page-link" >20</span></li> 
          :
          <li class="page-item "  onClick={()=>callPaginationfacperpage(20)} style={{cursor:'pointer'}}><span class="page-link"  style={{color:'#596882'}}>20</span></li>
             } 
       
          </ul>

            
                        </>  : <></>
}  
            </div> 
               
            {   bookings.map((post,index)=>(   
    <div class="row booking-border">        

         <div class="col-md-12" style={{paddingLeft: '7px'}}>
           <div class="book-heading" >
           {post.details.status==='draft' &&  <h2 style={{color:`#FA8B01`}}>Draft</h2> }
           {(post.details.status==='submit' || post.details.status==='locassign') && <h2 style={{color:`#1053eb`}}>Submitted Pending</h2> }
           {post.details.status==='approved' && <h2 style={{color:'rgb(250, 139, 1)'}}>Approved</h2> }
           {post.details.status==='complete' && <h2 style={{color:`#48a90b`}}> Completed</h2> }
           {post.details.status==='estimate' && <h2 style={{color:`#48a90b`}}>Estimate Provided</h2> }
           {post.details.status==='rejected' && <h2 style={{color:`#ed1130`}}>Rejected</h2> }
           {post.details.status==='cancel' && <h2 style={{color:`#ed1130`}}>Cancelled</h2> }
           {post.details.status==='delete' && <h2 style={{color:`#ed1130`}}>Cancelled</h2> }
           </div>
         </div>

         <div class="col-md-8">
           <div class="booking-para">
             <p>School:- <span>
             {((post.details.locationName)==='Infinity') ? post.details.locationName :
             
             <>
              {(isNaN(post.details.locationName)===false) ? '#'+post.details.locationName : post.details.locationName}
             </>
            }
              
              
              </span></p>
             <p>Facilities:- <span>{post.details.facilityName}</span></p>
             <p style={{fontFamily: 'Heebo-Medium',fontSize: '15px',marginBottom: '-3px'}}>Amenities</p>
             <p>{post.details.amenitiesName}   </p>
             {post.details.reject_reason!=null ?  
 
 
 <p><span  style={{fontFamily: 'Heebo-Medium',fontSize: '15px'}}>
     
     {post.details.status =='delete' ?
     <>
Reasons for Cancellation:- </> 
   :<>
   
   </>  } 
{post.details.status =='cancel' ?
     <>
     Reasons for Cancellation:- </>  
   :<>
   
   </>  } 
   {post.details.status =='rejected' ?
     <>
     Reasons for Rejection:- </> 

   :<>
   
   </>  } 
 </span>{post.details.reject_reason}</p>

 
 
  :'' }
{(post.details.approve_comment!=null && post.details.approve_comment!='') ? <>
<p><span  style={{fontFamily: 'Heebo-Medium',fontSize: '15px'}}>Comments:- </span>{post.details.approve_comment}</p>

</>  


:'' }
           </div>
         </div>

         <div class="col-md-4">
           <div class="booking-id">
           <p style={{color:'rgb(250, 139, 1)',fontWeight:'600'}}> Booking id:- {post.details.bid}</p>
           {/* <p>Total Cost:- $99</p> */}
           <p>Date:- <span>{post.details.bookingDate} </span></p>
           <p>Time:- <span>{post.details.bookingStartTime+' - '+post.details.bookingEndTime}</span> {post.details.status==='draft'? 
 '' : <> 
 {post.details.submit_at!=null?   <span style={{marginLeft:'15px'}}   ><i id={'bookeveicon'+post.details.bid}  class="fa fa-plus-circle" title="Event Details"  onClick={() => {checkeventdeatials(post.details.bid)}} aria-hidden="true" style={{color:'#0168fa',cursor:'pointer',fontSize:'15px'}}></i></span>
: '' }

{login.address1!=null?    <span style={{marginLeft:'15px'}}   ><i id={'printveicon'+post.details.bid}  class="fa fa-print" title="Print"  onClick={() => {setPrintesti(post.details.bid)}} aria-hidden="true" style={{color:'rgb(250, 139, 1)',cursor:'pointer',fontSize:'15px'}}></i></span> 

: '' }

 </>
 }
 {(post.details.status==='cancel'  || post.details.status==='delete')? 
 
 
 <>
 <span style={{marginLeft:'15px'}}   ><i   class="fa fa-close" title="Delete"  aria-hidden="true" data-toggle="modal" onClick={()=>setInitiate({status:'Delete',message:'You are about to delete your cancelled booking id #'+post.details.bid,active:true,id:post.details.bid})}  style={{color:'red',cursor:'pointer',fontSize:'20px'}}></i></span> 
 </> : <> 
 

  </>
  }
 </p>
           </div>
         </div> 
         {(post.details.status==='submit' || post.details.status==='locassign')? 
         <div class="col-md-12" style={{marginTop:'10px'}}>
         <a onClick={()=>[setShow4(true),setEventBooking(post.details)]} class="btn-cacl-book btn-cancelss" style={{textDecoration: 'none',marginRight:'15px',cursor:'pointer'}} > Cancel Booking</a>
        
         </div> :''}
         {post.houtrack>=datetime  ? <></> : ''}
     
        
         
          {post.details.status==='draft'? 
         <div class="col-md-12" style={{marginTop:'10px'}}>
         <a onClick={()=>[setShow4(true),setEventBooking(post.details)]} class="btn-cacl-book btn-cancelss" style={{textDecoration: 'none',marginRight:'15px',cursor:'pointer'}} > Cancel Booking</a>
         { reducer3.applicant_info.profile_status==="Complete" ?
        <a onClick={()=>[setShow2('true'),getFacilitiesofLocation(post.details),setEventBooking(post.details)]}  class="btn-cacl-book" style={{textDecoration: 'none',cursor:'pointer'}} data-toggle="modal" data-target="#exampleModalcancel" data-dismiss="modal"> Complete Booking</a>
           :<a onClick={()=>[setShow3('true')]}  class="btn-cacl-book" style={{textDecoration: 'none',cursor:'pointer'}} data-toggle="modal" data-target="#exampleModalcancel" data-dismiss="modal"> Complete Booking</a>
         }
         </div> :''} 
         

         {post.details.status==='draft'? 
 '' :
 <div class="col-md-12">
 
 <div class="booking-id" id={'bookiddetails'+post.details.bid} style={{display:'none'}}>
 {post.details.submit_at!=null?  <p><span style={{fontFamily: 'Heebo-Medium',fontSize: '15px'}}>Submission Date:-</span> {post.details.submit_at}</p> :''}

 <p><span style={{fontFamily: 'Heebo-Medium',fontSize: '15px'}}>Event Name:-</span> {post.details.event_name}</p>
 {/* <p>Total Cost:- $99</p> */}
 <p><span style={{fontFamily: 'Heebo-Medium',fontSize: '15px'}}>Number of Participant:- </span> {post.details.event_participant}</p>
 <p><span  style={{fontFamily: 'Heebo-Medium',fontSize: '15px'}}>Event Description:- </span>{post.details.event_details}</p>



  
 </div>
</div>
 
 } 
                

     </div>

   ))}
       {   bookings.length > 0 ? <>  { (paginationfac.currentPage==1) ? '' :  <div class="view-more-sec view-hover" style={{position:'relative',float:'left'}} >
            <a href="#"  onClick={()=>callPaginationfac('previouPage')} style={{cursor: 'pointer'}}><i class="fa fa-angle-double-left" aria-hidden="true"></i> &nbsp; Previous
            </a>
                  </div>}
                  { (paginationfac.currentPage==paginationfac.totalPage) ? '' : <div class="view-more-sec view-hover" >
            <a href="#"  onClick={()=>callPaginationfac('nextPage')} style={{cursor: 'pointer'}}>Next &nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </a>
                  </div>}</> :'' }

        

      </div>



      <div className={`tab-pane fade show ${tab==='status'?'active':''}`} id="status5" role="tabpanel" aria-labelledby="status-tab5">

        <div class="row">

     
        {   bookings.map((post,index)=>(  
    <div class="col-md-12 booking-border" style={{marginBottom: '25px'}}>

    <h6  class="status-heading">The status of your Booking Id <span style={{color:'rgb(250, 139, 1)',fontWeight:'600'}}>#{post.details.bid}</span>  </h6>

   

  

  <ul class="progressbar">
  {post.details.status==='draft' &&  <>
         <li >Submitted Pending</li>
       
       <li >Approved</li>
       <li >Completed</li> </>  }
       {(post.details.status==='submit' || post.details.status==='locassign') &&   <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li >Approved</li>
       <li>Completed</li> </>  }
       {post.details.status==='approved' &&   <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li class="active">Approved <br></br> ({post.details.approve_date})</li>
       <li >Completed</li> </> }
       {post.details.status==='estimate' &&
       <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li class="active">Approved <br></br> ({post.details.approve_date})</li>
       <li class="active">Completed <br></br> ({post.details.complete_date})</li> </>   }
       {post.details.status==='complete' &&
       <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li class="active">Approved <br></br> ({post.details.approve_date})</li>
       <li class="active">Completed <br></br> ({post.details.complete_date})</li> </>   }
       {post.details.status==='rejected' && <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li class="rejectactive" >Rejected <br></br> ({post.details.approve_date})</li>
     </> }
     {(post.details.status==='cancel' && post.details.submit_atnew!=null) &&
       <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li class="rejectactive">Cancelled <br></br> ({post.details.cancel_date})</li>
      </>   }
      {(post.details.status==='cancel' && post.details.submit_atnew==null) &&
       <>
         <li class="active">Draft <br></br> ({post.details.created_at})</li>
       
       <li class="rejectactive">Cancelled<br></br> ({post.details.cancel_date}) </li>
      </>   }
      {post.details.status==='delete' &&
       <>
         <li class="active">Submitted Pending <br></br> ({post.details.submit_atnew})</li>
       
       <li class="rejectactive">Cancelled <br></br>  ({post.details.cancel_date})</li>
      </>   }
           
   

  </ul>

</div>


))}


  </div>



      </div>

     

    </div>

  </div>

</div>

</div>

</div>

</div>

<Modal show={show3} onHide={handleClose3} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '480px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{paddingTop:'18px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center'}}>Complete your profile to request a booking </p>

<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}onClick={()=>[activeTab('profile'),setShow3(false)]}>EDIT PROFILE</button>

</div>
</div>
      
</Modal>

<Modal show={show4} onHide={handleClose4} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '480px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{paddingTop:'18px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'red',fontWeight:'500',marginBottom:'20px'}}>Would you like to cancel your booking ?  </p>
<div class="row">
<div class="col-md-12">
<span style={{ marginLeft: '156px',color: 'rgb(80, 97, 114)'}}>Reasons for Cancellation:</span>
       <textarea  name="cancelreason" onChange={inputEventcancelDetails} style={{marginTop:'20px', marginLeft: '48px',height:'95px',outline:'none',fontWeight:'400',border:'1px solid rgb(204, 204, 204)',width:'80%'}}></textarea>
       {(cancelres.err_cancelreason==1 && cancelres.err === 5) &&  <span style={{color:'red',marginLeft:'48px'}}>Please Enter Reasons of cancellation</span> }
       </div>
       </div>
       
<button class="btn-process btn-confirm btn-saveyescan" style={{float:'left',marginTop:'15px',fontSize:'14px',padding:'8px 3px',marginBottom:'35px',marginLeft:'141px',marginRight:'10px',width:'96px'}}onClick={cancel}>Yes</button>
<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'14px',padding:'8px 3px',marginBottom:'35px',marginLeft:'0px',width:'96px'}}onClick={()=>setShow4(false)}>No</button>

</div>
</div>
      
</Modal>

<Modal show={show1} onHide={handleClose1} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center'}}>{profilestatus.msg} </p>

{profilestatus.status==='Complete' ?
<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}} onClick={()=>[setShow1(false),activeTab('booking')]}>Ok </button>
:
<Spinner animation="border"  style={{position: 'relative',
    textAlign: 'center',
    display: 'block',
    margin: '0 auto',
    fontSize: '19px' ,
    color:'#FA8B01'}}/>
}
</div>
</div>
      
</Modal>


{/* <Modal show={show21} onHide={handleClose2} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        Event Details</Modal.Header>
        <div class="modal-body modal-body-apply modal-request modal-padding" style={{padding:'22px 0px'}}>
          <div class="row">
          <div class="col-md-8">
       Event Name: <input type="text"  name="eventname" value={setEvent.eventname}  onChange={inputEventDetails} style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',width:'78%'}}/>
       </div>
       <div class="col-md-4">
       <span>Participant: </span><input type="text"  name="noOfGuest" value={setEvent.noOfGuest}  onChange={inputEventDetails} style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',width:'40%'}}/>
       </div>
     
       </div>
        <textarea  name="eventDetails" onChange={inputEventDetails} style={{marginTop:'20px'}}></textarea>
        <div class="row">

<div class="col-md-12" >
<a onClick={saveEventInfo} class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'12%',height:'40px;',marginRight:'10px',marginTop:'15px',height:'40px'}}>Yes</a>
<a  class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'12%',height:'40px;',marginTop:'15px',height:'40px'}}>No</a>
  

</div>

</div>




</div>
</div>
      
</Modal> */}

<Modal show={show2} onHide={handleClose2} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '820px', marginTop: '50px', marginLeft:'-146px'}}>
        <Modal.Header closeButton style={{textAlign:'center', display:'block',color:'#fa8b01',fontSize:'20px',textTransform:'capitalize',position:'relative',top:'6px'}}>
        We will run a few details quickly with you</Modal.Header>
        <div class="col-md-12" style={{color:'rgb(80, 97, 114)',position:'relative', float:'right', textAlign:'end',top:'-40px', right:'29px'}}>
             <span style={{fontWeight:'400',color:'#506172',fontSize:'16px'}}>Request Id:</span> {eventBooking.bid} 
             </div>
        <div class="modal-body modal-body-apply modal-request modal-padding" style={{padding:'22px 0px',height:'490px',overflowY:'scroll',textAlign:'justify', }}>
          <div class="row">
          {/* <div class="row col-md-12" style={{marginBottom:'20px'}}>
           <div class="col-md-6" style={{color:'rgb(80, 97, 114)'}}>
           <span style={{fontWeight:'400',color:'#506172',fontSize:'16px'}}>School:</span> {eventBooking.locationName}
             </div>
            
             <div class="col-md-6" style={{color:'rgb(80, 97, 114)'}}>
             <span style={{fontWeight:'400',color:'#506172',fontSize:'16px'}}>Booking id:</span> {eventBooking.bid}
             </div>
           </div> */}
          <div class="col-md-12" style={{color:'#506172'}} >
       Event Name: <input id="ev1" type="text"  name="eventname" value={setEvent.eventname}  onChange={inputEventDetails} style={{outline:'none', height:'32px',marginLeft:'10px',fontWeight:'400',border:'1px solid #cccccc',width:'80%',marginLeft:'61px'}}/>
      {(event.error_name === 1 && event.err===1) &&  <span style={error}>Please Enter Event Name</span> }
       </div>
      
      
       <div class="col-md-12" style={{color:'#506172'}}>
       Number of Participant: <input type="text"  name="noOfGuest" value={setEvent.eventname}  onChange={inputEventDetails} style={{marginTop:'15px', outline:'none', height:'32px',fontWeight:'400',border:'1px solid #cccccc',width:'80%'}}/>
       {(event.error_noOfGuest === 1 && event.err===1) &&  <span style={error}>Please Enter No of Participant</span> }
       </div>
       {/* <div class="col-md-4">
         Participant:<input type="text"  name="noOfGuest" value={setEvent.noOfGuest}  onChange={inputEventDetails} style={{outline:'none', fontWeight:'400'}}/>
       </div> */}
       <div class="col-md-12">
       <span style={{    position: 'relative',display: 'inline-block',marginRight: '32px',top: '-79px',color: 'rgb(80, 97, 114)'}}>Event Description:</span>
       <textarea  name="eventDetails" onChange={inputEventDetails} style={{marginTop:'20px',height:'95px',outline:'none',fontWeight:'400',border:'1px solid rgb(204, 204, 204)',width:'80%'}}></textarea>
       {(event.error_details === 1 && event.err===1) &&  <span style={error}>Please Enter Event Description</span> }
         </div>
        <div class=" col-md-12" style={{marginTop:'18px'}} >
                {/* <div class="col-md-6" onClick={setShowCalenderShow}  >
                  <span style={{color:'rgb(80, 97, 114)'}}>Date:{event.date+'/'+event.month+'/'+event.year}</span>
       {(event.error_date === 1 && event.err===1) &&  <span style={error}>PLease enter event date</span> }
               
                </div>
                <div class="col-md-6">
               
<p style={{float:'left', color:'hsl(0deg 0% 38%)'}}>Time:-</p>
<span onClick={() => setShowTime1()} style={{color:'rgb(97, 97, 97)', position:'relative', top:'3px'}}>{time1}</span> - <span style={{color:'rgb(97, 97, 97)',position:'relative', top:'3px'}} onClick={()=>setEndShowTime1()}>{endtime1}</span>

{(event.error_starttime === 1 && event.err===1) &&  <span style={error}>PLease enter event Time</span> }
        </div> */}

     <p style={{marginBottom:'-3px'}}>You have requested booking for  {((eventBooking.locationName)==='Infinity') ? eventBooking.locationName :
                
                <>
                 {(isNaN(eventBooking.locationName)===false) ? '#'+eventBooking.locationName : eventBooking.locationName}
                </>
                }  on date <span  onClick={() => checkgetclalender(eventBooking.locationName)}  style={{borderBottom:'1px solid rgb(157 162 167)',cursor:'pointer'}}>{event.month+'/'+event.date+'/'+event.year} </span><span><i  onClick={() => checkgetclalender(eventBooking.locationName)}  class="fa fa-pencil" aria-hidden="true" style={{color:'rgb(250, 139, 1)',cursor:'pointer',fontSize:'15px'}}></i></span></p>
     <p style={{marginBottom:'8px'}}>and your preferred time is <span onClick={() => setShowTime1()} style={{color:'rgb(97, 97, 97)', position:'relative', top:'0px',borderBottom:'1px solid rgb(157 162 167)',cursor:'pointer'}}>{time1}</span> <span><i class="fa fa-pencil" aria-hidden="true" onClick={() => setShowTime1()}  style={{color:'rgb(250, 139, 1)',fontSize:'15px',cursor:'pointer'}}></i></span> - <span style={{color:'rgb(97, 97, 97)',position:'relative', top:'0px',borderBottom: '1px solid rgb(157 162 167)',cursor:'pointer'}} onClick={()=>setEndShowTime1()}>{endtime1}</span> <span><i onClick={()=>setEndShowTime1()} class="fa fa-pencil" aria-hidden="true" style={{color:'rgb(250, 139, 1)',fontSize:'15px',cursor:'pointer'}}></i></span></p>
        
        <p style={{color:'rgb(250, 139, 1)',fontWeight:'500',fontSize:'16px', marginBottom:'8px',paddingTop:'25px', position:'relative'}}>You have requested for the following Amenities</p>
        </div>
        <div class="col-md-12">

          <h2 style={{marginTop: '25px',color: 'rgb(250, 139, 1)',fontSize: '17px'}}>Amenities</h2>
          </div>
       

      


            

            { allFacilities.length > 0 ? <>
           {   allFacilities.map((post,index)=>(   
             <div class="col-md-12">
              <div class="card-new">
              <div class="card-header item-header" onClick={()=>setShow(post.data.id)}>
                <h2 class="mb-0" style={{paddingBottom: '0px'}}><button class="d-flex align-items-center justify-content-between button-accordion button-item button-item-new" style={{padding:'0px'}} >{post.data.type}
              
              
              <span class="fa-stack fa-sm plus-addon" style={{height: '7px', lineHeight: '21px'}}>

              {/* {post.data.booked===1?
                <input  type="checkbox" class="checkboxField checkboxField-new" defaultChecked={true} />:<input  type="checkbox" class="checkboxField checkboxField-new" />
              } */}
               {post.amenities.length > 0 ?  
               <input  type="checkbox"  data1={post} id={post.data.id} class="checkboxField checkboxField-new" defaultChecked={post.data.booked===1} />  : 
                             <input  type="checkbox" onClick={changeFacilities} data1={post} id={post.data.id} class="checkboxField checkboxField-new" defaultChecked={post.data.booked===1} />}

                </span>
              </button></h2></div>

<div id="collapseThree" className={`collapse ${show===post.data.id && post.amenities.length > 0 ?'show':''}`} aria-labelledby="headingThree" data-parent="#accordion">
<div class="card-body" style={{padding:'10px'}}>
  <div class="form-top-sec">

  {   post.amenities.map((childpost,index)=>( 
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-4">
        <div class="floating-label floating-school-label open-left-responsive floating-new">
          <p style={{color: 'rgb(104, 104, 104)', fontSize: '14px'}}>{childpost.amenities_name} </p>
          </div>
          </div>
<div class="col-md-4 item-number">
  <div class="floating-label floating-new">
    <p class="quantity-sec">Number</p>
    <div class="select is-primary" >
      <select  value={childpost.count} id={'facnumberam'+childpost.amenities_id+'new'+childpost.school_facility_id } onChange={(event) => {increasevalue(event,post.data.id,childpost.amenities_id)}}>
      {[...Array(parseInt(childpost.totalnum))].map((e, i) => {
                         return <option map={i+1} > {i+1}</option>
                         })}
       </select>
        </div>
        </div>
        </div>
        <div class="col-md-1">
          </div>
          <div class="col-md-1" style={{paddingLeft: '0px', paddingright: '0px'}}>
            <div class="add-to-cart">
              {/* <input id="cb" type="checkbox" class="checkboxField-small" checked/> */}

              {/* {childpost.booked===1?
                <input  type="checkbox" class="checkboxField checkboxField-new" checked />:<input  type="checkbox" class="checkboxField checkboxField-new" />
              } */}

<input  type="checkbox" onClick={(event)=>changeAmenities(event,post.data.id)} id={childpost.amenities_id}  class="checkboxField checkboxField-new" defaultChecked={childpost.booked===1} />
              
              
              </div>
              </div>
              </div>

  ))}



              </div>                                                                  </div></div>
                </div>
 </div>
           ))}</>:<></> }




             


             
                 {/* <div class="col-md-12" style={{color:'#506172'}}>
                   
                 Name of applicant Organization: <input type="text"  name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',width:'73%',marginLeft:'61px'}}/>
       </div> */}
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'11px'}}>
                   
                  <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Name of Applicant Organization </div>
                  <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                  <input type="text" value={login.organization} onChange={inputEvent} name="organization"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                  </div>
         </div>

         <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'11px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Position in the Organization </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.position} onChange={inputEvent} name="position"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

        
       

<div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'11px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Address </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.address1} onChange={inputEvent} name="address1"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

       

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'11px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  Street Address  </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.address2} onChange={inputEvent} name="address2"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

      

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'11px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  Address Line 2  </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.address3} onChange={inputEvent} name="address3"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  City </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  value={login.city}  onChange={inputEvent}  name="city"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  State/Province/Region</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.state}   onChange={inputEvent}  name="state"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

      

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  Phone no</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.phone}   onChange={inputEvent}  name="phone"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          {/* <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Email id</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.email}   name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div> */}

          
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  Email</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.email}     name="email"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}} disabled/>
                   </div>
          </div>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Name</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.name} onChange={inputEvent} chec   name="name"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Are you authorized to make this application</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input class="floating-input floating-check" type="checkbox" style={{float:'left',top:'10px',position:'relative'}} id="authorizedOrganization2"   onChange={inputEventapplication1}   checked = {login.authorizedOrganization =='1' ? 'true' :''} />
                   <span style={{fontSize: '15px', lineHeight: '18px', position: 'relative', display: 'block', fontFamily: 'Heebo-Regular', marginTop: '7px', marginLeft: '16px'}}>Yes</span>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Details of Organization</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.detailOrganization}  name="detailOrganization" onChange={inputEvent} style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Describe purpose or objective of Organization</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  name="objectiveOrganization" onChange={inputEvent} value={login.objectiveOrganization}  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-4" style={{color:'rgb(97, 97, 97)'}}>Is your Organization profit making?</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px', marginLeft:'60px'}}>
                   <div class="radioOptions"><div class="radio-inner"><p> 
                     <input name="isProfitMakingOrganization4" onChange={inputEvent} type="radio" value="1"  checked = {login.isProfitMakingOrganization =='1' ? 'true' :''} />  Yes  </p>
                     </div><div class="radio-inner"><p> 
                       <input  name="isProfitMakingOrganization5" onChange={inputEvent} type="radio" value="2" checked = {login.isProfitMakingOrganization =='2' ? 'true' :''} /> No </p></div><div class="radio-inner"><p> 
                     <input  name="isProfitMakingOrganization6" onChange={inputEvent} type="radio" value="3"  checked = {login.isProfitMakingOrganization =='3' ? 'true' :''} /> Can't Say </p></div></div>
                   </div>
          </div>
          <div class="col-md-12"><p class="org-para" style={{textAlign:'left',marginTop:'20px',fontWeight:'700',color:'rgb(250, 139, 1)'}}>Organization's Officers </p>
          <p class="org-para" style={{textAlign:'left',marginTop:'20px',fontWeight:'400',color:'rgb(250, 139, 1)',marginBottom:'5px'}}>Officer </p>
          </div>

          {allOffice.map((opost,index)=>( 
            <>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'2px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Name</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={opost.name}  name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Phone no</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  value={opost.phone}  name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Office held</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  value={opost.officeHeld}  name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          {/* <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Address</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  value={opost.address}  name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div> */}
          </> ))}
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-8" style={{color:'rgb(97, 97, 97)'}}>How many enrolled members are in your organization? </div>
                   <div class="col-md-4 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.memberOfOrganization} name="memberOfOrganization" onChange={inputEvent}  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px',width:'50%'}}/>
                   </div>
          </div>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-8" style={{color:'rgb(97, 97, 97)'}}>If applicant is a youth organization, what is average age of its membership?</div>
                   <div class="col-md-4 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.memberAverageAge}  name="memberAverageAge" onChange={inputEvent}  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px',width:'50%'}}/>
                   </div>
          </div>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-8" style={{color:'rgb(97, 97, 97)'}}>State purpose for which premises will be used </div>
                   <div class="col-md-4 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  value={login.premises}  name="premises" onChange={inputEvent}  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px',width:'50%'}}/>
                   </div>
          </div>
        
            <div class="row col-md-12" style={{paddingLeft:'0px',marginTop:'0px'}}>
             <div class="col-md-8" style={{color:'rgb(97, 97, 97)'}}>  <input class="floating-input floating-check" type="checkbox" placeholder=" " style={{float: 'left',marginLeft:'17px'}}  id="newiagree" name="newiagree"   /></div>
                  <div class="col-md-4 form-sec-profile" style={{paddingRight:"0px",paddingLeft:"0px",marginLeft:"-446px",paddingTop:"0px",marginTop:"-3px",color:"rgb(97, 97, 97)"}}>
                  I agree to the <Link to={`/terms`} style={{textDecoration:'underline'}} target="_blank"  >Terms & Conditions</Link>
                   </div>
                         
                   </div>
        
           
       <div class="row col-md-12">
           {(event.err===10) && <span style={{color:"red",marginLeft:"253px",marginBottom:'-19px'}}><p style={{color:"red"}}>Please agree to the Terms & Conditions</p></span> }
            </div>       
 
          <div class="row col-md-12">
          <a class="btn-cacl-book btn-booking "  style={{textDecoration: 'none',cursor:'pointer',marginLeft:'17px', textAlign:'center',margin:'0 auto',marginTop:'10px'}}  onClick={saveEventInfo}> Submit Your Request

</a>
            </div>
       </div>
      
        <div class="row">

<div class="col-md-12" >
{/* <a onClick={saveEventInfo} class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'12%',height:'40px;',marginRight:'10px',marginTop:'15px',height:'40px'}}>Yes</a>
<a  class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'12%',height:'40px;',marginTop:'15px',height:'40px'}}>No</a> */}
  

</div>

</div>




</div>
</div>
      
</Modal>
{showTime &&
  <div class="timereact">
                <TimeKeeper  time={time1} onChange={(newTime) => setTime(newTime.formatted12)}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                />
                </div>
            }

{showEndTime &&
  <div class="timereact">
                <TimeKeeper
                    time={endtime1}
                    onChange={(newTime) => setEndTime(newTime.formatted12)}
                    onDoneClick={() => setEndShowTime(false)}
                    switchToMinuteOnHourSelect
                />
                </div>
            }



            
{ showCalender?                         
 <>
<div class="calender-wraps" style={{zIndex: '999999',left: '485px',top: '198px',position:'fixed'}}>
 <div class="date-wrap">

<div class="left" onClick={()=>changeDate('yesterday')}>

    <div class="btn-previous" id="previous-month" data-id="5b2fea0bd26722002483114d"><span class="fa fa-angle-left" aria-hidden=""></span></div>

</div>



<div class="right" onClick={()=>changeDate('tomorrow')}>

    <div class="btn-nexts" >

        <span class="fa fa-angle-right" aria-hidden=""></span></div>

</div>



<div class="mid">

    <span class="date-title"  id="current-selected-date" data-current-date="">{calendernfo.currentYear+', '+calendernfo.month}</span>&nbsp;&nbsp;<span  id="month-dd" class="fa fa-calendar cursor" aria-hidden=""></span>

   </div>

</div>
 <div  onClick={clickHandler}  dangerouslySetInnerHTML={{__html: calendernfo.data}} style={{zIndex: '999999'}}></div></div>
 
 </>:""
}

  <Modal show={showR} onHide={handleCloseR} className='closelogin'>
  <div class="login-close">
      <Modal.Header closeButton >
      </Modal.Header>
     

  <div class="modal-content content-popup" style={{marginTop:'-15px'}}>

    <div class="modal-inner modal-login-inner">

    <div class=" login-apply modal-time-apply" style={{paddingTop:'0px', paddingBottom: '0px', paddingLeft: '0px', borderBottom: '1px solid #cccccc !important'}}>

<h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" style={{fontSize:'17px',marginBottom:'6px !important;'}} >Insert password to confirm booking </h5>


{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

<span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

</button> */}

</div>
   <div class="modal-body modal-body-apply">
 
<div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>

<div class="form-sec" style={{marginTop:'12px'}}>

    

    <input type="password" placeholder="Password" name="Reset_email" id="Reset_email"  onChange={inputEventResetpassword} value={Resetpassword.Reset_email} />
    <i class="fa fa-eye-slash" onClick={checkpasstype} id="ibtuton" aria-hidden="true"   style={{color:'grey',position:'relative',top:'-29px',right:'-265px',fontSize:'11px',cursor:'pointer'}}></i>

    {(Resetpassword.error_email === 1 && Resetpassword.Resetpassword_err===2) && <span style={style}>* Enter Password</span> }

</div>

<div class="form-sec" style={{marginTop:'12px'}}>


</div>



<div class="login-button"  >


<a class="btn-button" style={{textDecoration: 'none',cursor:'pointer'}} onClick={initiateReset} >Submit</a>

</div>
<div class="form-login" style={{marginTop:'0'}}>
{(Resetpassword.Resetpassword_err === 1) && <span style={style}><p style={style}>{Resetpassword.Resetpassword_mesage}</p></span> }


</div>


<div class="create-sec" > 
<p style={{fontSize: '11px',fontStyle: 'italic',color:'#ff0000'}}><span>The password has been sent to your mail.</span></p>

</div>

</div>

</div>
    </div>
    </div>
    </div>


    
</Modal> 
<Modal show={showalert} onHide={handleClosealert} >
    <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '550px', marginTop: '50px'}}>
          <Modal.Header closeButton >
          </Modal.Header>
          <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>
  
              {(Alerterr.Alerterr_err === 1) &&<p style={{marginBottom: '0px',fontSize: '20px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#FF0000'}}>{Alerterr.Alerterr_message}</p> }
  
  
  <button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealert()}}>Click Here</button>
  
  </div>
  </div>
        
  </Modal>   


  <Modal show={initiate.active} onHide={handleCloseM} className='closelogin' style={{width:'100%'}}>
<div class="upload-close upload-top upload-topnewheigh" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '15px',paddingTop:'0px',position:'relative',display:'block',top:'-20px',padding:'0px'}}>
              <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans',fontWeight:'500',borderBottom:'1px solid #cccccc',paddingBottom:'20px',paddingLeft:'10px',paddingRight:'10px',fontSize:'18px'}}>{initiate.message}</p>
            
                  
             
           
              <button  type="button" onClick={deletesubmit} class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</button>
              <button type="button"  onClick={() => {handleCloseM()}} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>


  
  {   profilebookingdeatilsprint.map((post,index)=>(  
    <div class="content content-fixed-new" id={'deatilsnewforprintnew'+post.bookingInfo.id}  style={{maxWidth:'1120px',margin:'0 auto', display:'none'}}>
      <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px'}}>
        <div class="">
        <img src="../image/logo.png" height="55" alt="CoolBrand" style={{height:'75px', marginBottom:'15px'}}/>
        </div>
                  <div id="accordion5" class="accordion accordion-pink" style={{marginBottom:'50px'}}>
                  
                 
                    <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'15px', fontFamily: 'IBM Plex Sans', fontSize: '17px', fontWeight: '600', textAlign:'left',backgroundColor: '#d2d2d2',padding: '15px 20px 13px 20px',borderRadius: '4px'}}>
                      <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>User Details</h6>
                    <div class="ui-accordion-contents" style={{padding: '40px 20px 40px 20px',border:'1px solid #cccccc'}}>
                      <div class="row">
                          <div class="col-md-6">
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec"style={{fontSize:'16px'}}>Name of applicant organization </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.organization}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Name </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.name}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Position in the Organization</p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.position}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Phone </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.phone}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>City </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.city}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Are you authorized to make this application </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-3" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.authorizedOrganization =='1' ? 'Yes' :'NA'}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Details of Organization </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.detailOrganization}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>How many enrolled members are <br></br> in your organization? </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.memberOfOrganization}</p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>State purpose for which premises will be used</p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.premises}</p>
                        </div>
                        
                        </div>
                        
                          </div>
                          <div class="col-md-6">
                          <div class="col-md-12 row" >
                          <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Location </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">

                        {((post.bookingInfo.locationName)==='Infinity') ? post.bookingInfo.locationName :
                
                <>
                 {(isNaN(post.bookingInfo.locationName)===false) ? '#'+post.bookingInfo.locationName : post.bookingInfo.locationName}
                </>
                }
                        
                          </p>
                        </div>
                        
                        </div>
                        <div class="col-md-12 row" >
                          <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Email id </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.email}</p>
                        </div>
                        
                        </div>
                        
                        <div class="col-md-12 row" >
                          <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Address :</p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.address1+' , '+post.bookingInfo.address2}</p>
                        </div>
                        
                        </div>
                        
                        
                        <div class="col-md-12 row" >
                        <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Street Address     </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.address3}</p>
                        </div>
                        <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>State    </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{post.bookingInfo.state}</p>
                        </div>
                        
                          
                        <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Describe purpose or objective of Organization </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{ post.bookingInfo.objectiveOrganization}</p>
                        </div>
                        <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>Is your Organization profit making? </p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{ `${post.bookingInfo.isProfitMakingOrganization== 1?'Yes':'No'}`}</p>
                        </div>
                        
                        
                        <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-sec" style={{fontSize:'16px'}}>if applicant is a youth organization, what is average age of it membership?</p>
                          </div>
                          <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                          <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                        <p class="user-inner-sec">{ post.bookingInfo.memberAverageAge}</p>
                        </div>
                        </div>
                          </div>
                        </div>
                      </div>
                  
                 
                  
                  </div>
                </div>
    


    
                <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px'}}>
                <div id="accordion5" class="accordion accordion-pink">
                <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'15px', fontFamily: 'IBM Plex Sans', fontSize: '17px', fontWeight: '600', textAlign:'left',backgroundColor: '#d2d2d2',padding: '15px 20px 13px 20px',borderRadius: '4px'}}>
                    <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Officer Details</h6>
                  <div class="ui-accordion-contents" style={{padding: '0px 0px 20px 0px'}}>
                    <table class="table table-bordered mg-b-0  view-top" style={{textAlign:'left'}}>
                        <thead >
                          <tr >
                            <th scope="col" style={{width:'170px',padding:'0px'}}><div style={{backgroundColor:'rgb(210 210 210 / 73%)',padding:'8px 10px'}}>Name</div></th>
                            <th scope="col" style={{width:'170px',padding:'0px'}}><div style={{backgroundColor:'rgb(210 210 210 / 73%)',padding:'8px 10px'}}>Phone no</div></th>
                            <th scope="col" style={{width:'250px',padding:'0px'}}><div style={{backgroundColor:'rgb(210 210 210 / 73%)',padding:'8px 10px'}}>Office held</div></th>
                            
                          </tr>
                        </thead>
                        <tbody class="tbody-color tbody-view">
                        {   allOffice.map((post,index)=>(
                          <tr>
                            <th scope="row"  >{post.name}</th>
                            <td>{post.phone}</td>
                            <td>{post.officeHeld}</td>
                       
                          </tr>
                        ))}
                          
                        </tbody>
                      </table>
                    </div>
                
               
                
                </div>
              </div> 
                <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px'}}>
                  <div id="accordion5" class="accordion accordion-pink">
                  <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'15px', fontFamily: 'IBM Plex Sans', fontSize: '17px', fontWeight: '600', textAlign:'left',backgroundColor: '#d2d2d2',padding: '15px 20px 13px 20px',borderRadius: '4px'}}>
                      <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Event Details</h6>
                    <div class="ui-accordion-contents" style={{padding: '40px 30px 40px 30px', border:'1px solid rgb(204, 204, 204)'}}>
                     
    <div class="row">
  
    <div class="col-md-6">
    {post.bookingInfo.event_name!=null ? 
    <div class="col-md-12 row" >
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec"style={{fontSize:'16px'}}>Event Name </p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.event_name}</p>
    </div>
    
    </div> : ''
    }
    <div class="col-md-12 row" >
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Start Date </p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.bookingDate}</p>
    </div>
    
    </div>
    <div class="col-md-12 row" >
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Start Time</p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.bookingStartTime}</p>
    </div>
    
    </div>
    {post.bookingInfo.submit_at!=null? 
    <div class="col-md-12 row" >
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Submission Date</p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.submit_at}</p>
    </div>
    
    </div> : ''}
    
    
    </div>
    <div class="col-md-6">
    {post.bookingInfo.event_participant!=null ? 
    <div class="col-md-12 row" >
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Event Participants </p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.event_participant}</p>
    </div>
    
    </div> : ''}
    {/* <div class="col-md-12 row" >
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Event Description</p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.event_details}</p>
    </div>
    
    </div> */}
    <div class="col-md-12 row" >
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>End Date </p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.bookingDate}</p>
    </div>
    
    </div>
    
    <div class="col-md-12 row" >
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>End Time </p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.bookingEndTime}</p>
    </div>
    
    </div>
    
    <div class="col-md-12 row" >
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Booking Id </p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{post.bookingInfo.id}</p>
    </div>
    
    </div>
    
    
    </div>
    
    
    {post.bookingInfo.event_details!=null ? 
    
    <div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
 
    <p class="user-sec" style={{fontSize:'16px',marginLeft:'32px'}}>Event Description</p>
    <p style={{fontSize:'19px',marginLeft:'73px'}}>:</p>
    <p class="user-inner-sec" style={{marginLeft:'16px'}}>{post.bookingInfo.event_details}</p>
    
    
    
    </div> 
    :''
}
    {post.bookingInfo.reject_reason!=null ?   <div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
  
  
    <div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    {post.bookingInfo.status =='delete' ?
          <>
 <p class="user-sec" style={{fontSize:'16px',marginLeft:'45px'}}>Reasons for Cancellation:</p> </> 
        :<>
        
        </>  } 
    {post.bookingInfo.status =='cancel' ?
          <>
 <p class="user-sec" style={{fontSize:'16px',marginLeft:'45px'}}>Reasons for Cancellation:</p> </> 
        :<>
        
        </>  } 
        {post.bookingInfo.status =='rejected' ?
          <>
 <p class="user-sec" style={{fontSize:'16px',marginLeft:'45px'}}>Reasons for Rejection:</p> </> 
        :<>
        
        </>  } 
    <p style={{fontSize:'19px',marginLeft:'35px'}}>:</p>
    <p class="user-inner-sec" style={{marginLeft:'16px'}}>{post.bookingInfo.reject_reason}</p>
  
    
    
    </div> 


</div> :'' }
{(post.bookingInfo.approve_comment!=null && post.bookingInfo.approve_comment!='') ?   <div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
 
  
 <div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>

 <p class="user-sec" style={{fontSize:'16px',marginLeft:'47px'}}>Comments:</p>
 <p style={{fontSize:'19px',marginLeft:'111px'}}>:</p>
 <p class="user-inner-sec" style={{marginLeft:'16px'}}>{post.bookingInfo.approve_comment}</p>

 
 
 </div> 


</div> :'' }
    
    </div>
                      </div>
                  
                 
                  
                  </div>
                  
                </div>

            
     <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px',marginTop:'80px',paddingTop:'50px'}}>
      <div id="accordion5" class="accordion accordion-pink">
      <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'15px', fontFamily: 'IBM Plex Sans', fontSize: '17px', fontWeight: '600', textAlign:'left',backgroundColor: '#d2d2d2',padding: '15px 20px 13px 20px',borderRadius: '4px'}}>
          <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Amenity Details</h6>
        <div class="ui-accordion-contents" style={{padding: '0px 0px 20px'}}>
          <table class="table table-bordered mg-b-0  view-top" style={{textAlign:'left'}}>
              <thead >
                <tr >
                  <th scope="col" style={{width:'170px',padding:'0px'}}><div style={{backgroundColor:'rgb(210 210 210 / 73%)',padding:'8px 10px'}}>Facilities</div></th>
                  <th scope="col" style={{width:'170px',padding:'0px'}}><div style={{backgroundColor:'rgb(210 210 210 / 73%)',padding:'8px 10px'}}>Number Desired</div></th>
                  <th scope="col" style={{width:'250px',padding:'0px'}}><div style={{backgroundColor:'rgb(210 210 210 / 73%)',padding:'8px 10px'}}>Hours</div></th>
                 
                  
                </tr>
              </thead>
              <tbody class="tbody-color tbody-view">
                  { post.data.length > 0 ? <>
                    {   post.data.map((postdata,index)=>( 
  <> 
  { postdata.amenities.length > 0 ?   <>
    { postdata.amenities.map((childpost,index)=>( 
      <>
      <tr>                          
        <td >{postdata.data.type} ({childpost.amenities_name})</td>
        <td>{childpost.count}</td>
        <td>{post.timediff}</td>
      </tr> 
      </>
      )) }
      </> :  <>  <tr>                          
        <td >{ postdata.data.type}</td>
        <td>1</td>
        <td>{post.timediff}</td>
      </tr>  </>

  }
</> 

   ))} </>:<></>
              }
               
                
              </tbody>
            </table>
          </div>
      
     
      
      </div>
    </div> 
    <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px',marginTop:'20px',paddingTop:'0px'}}>
        <div id="accordion5" class="accordion accordion-pink">
        <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'13px', fontFamily: 'IBM Plex Sans', fontSize: '20px', fontWeight: '700', textAlign:'left',padding: '15px 20px 13px 20px',borderRadius: '4px'}}>
            <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Terms and Conditions</h6>
       
            <ul style={{textAlign:'left',marginLeft:'56px'}}>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular',lineHeight:'18px',marginBottom:'10px'}}> All organizations are required to provide a certificate of insurance indicating $1 million in liability insurance and to name the Jersey City Public Schools as the additional insured.</li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular',lineHeight:'18px',marginBottom:'10px'}}> All organizations are required to provide a $500 security deposit, which is refunded after your event pending no damages to the property. Full payment is expected two weeks prior to the event. </li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular',lineHeight:'18px',marginBottom:'10px'}}> No rentals allowed for personal events such as wedding receptions, birthday parties or baby showers. </li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular',lineHeight:'18px',marginBottom:'10px'}}> All programs are to be concluded by 11pm. </li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular',lineHeight:'18px',marginBottom:'10px'}}> Cancellation of an event must be made at least 48 hours prior to the event.</li>
</ul>
       
        
        </div>
      </div>
              </div>


















              
              ))}    
</React.Fragment>



        
        
        )
    

  
}

export default Profile;