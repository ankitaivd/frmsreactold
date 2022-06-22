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



    Axios.post("getFacilityByLocationBookingEdit",{location:data.location,bookingID:data.bid})
  .then(res =>{

    console.log("hello");
    console.log(res);
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
      
      

      
    
dispatch(siteData({page:'terms'}));
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
           
             <div class="profile-sec" id="deatilsnewforprint" style={{maxWidth:'740px',padding:'30px 0px'}} >

             <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px',marginTop:'0px',paddingTop:'0px'}}>
        <div id="accordion5" class="accordion accordion-pink">
        <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'7px', fontFamily: 'IBM Plex Sans', fontSize: '20px', fontWeight: '700', textAlign:'left',padding: '15px 38px 13px 30px',borderRadius: '4px'}}>
            <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Terms and Conditions</h6>
       
            <ul style={{textAlign:'left',marginLeft:'56px'}}>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular'}}> All organizations are required to provide a certificate of insurance indicating $1 million in liability insurance and to name the Jersey City Public Schools as the additional insured.</li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular'}}> All organizations are required to provide a $500 security deposit, which is refunded after your event pending no damages to the property. Full payment is expected two weeks prior to the event. </li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular'}}> No rentals allowed for personal events such as wedding receptions, birthday parties or baby showers. </li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular'}}> All programs are to be concluded by 11pm. </li>
<li style={{listStyle:'disc',color: '#707070',fontSize: '15px',fontWeight:'400',fontFamily:'Heebo-Regular'}}> Cancellation of an event must be made at least 48 hours prior to the event.</li>
</ul>
       
        
        </div>
      </div> 
               </div>








 


  
  
</React.Fragment>



        
        
        )
    

  
}

export default Profile;