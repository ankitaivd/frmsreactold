import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";
// import { final } from "../actions/final";
// import { addTodo } from "../actions/index";
import Header from '../components/header';
import { siteData } from "../actions/siteData";
import { userData } from "../actions/userData";
import Modal from 'react-bootstrap/Modal';
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
  const { id } = useParams();

  const error = {
    color: 'red',
    textAlign: 'left',
    display: 'block',
    marginTop: '6px',
    fontSize: '14px'
    
  };
  const [bookings,setBookingInfo] = useState([]);
const [tab,activeTab]=useState('booking');
const [profilestatus,setProfileStatus]=useState({status:'',msg:''});
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
  const [date1, setDate] = useState('');

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
    address:""
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
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show, setShow] = useState("0");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show21, setShow21] = useState(false);


  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [eventBooking,setEventBooking] = useState([]);

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













    Axios.post("getFacilityByLocationBookingEdit",{location:data.location,bookingID:data.bid})
  .then(res =>{

    console.log("hello");
    console.log(res);
  setAllFacilities(res.data.data);
  });
  }

  const changeDate=(day)=>{

    var today = new Date();
    let date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // alert(day+' = '+calendernfo.date+' = '+date1);

    if(calendernfo.date == date1 && day==='yesterday'){
      alert("Previous month is not available !");
      return false;
    }
   
    Axios.post("get_calendar",{day:day,date:calendernfo.date})
    .then(res =>{
      // console.log("calender");
      // console.log(res.data);
      setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
     
    });
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

       if(event.target.name==='isProfitMakingOrganization2'){
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


    const reducer3 = useSelector((state) => state.todoReducer3);

    useEffect(() => {

      Axios.post("get_calendar")
      .then(res =>{
    
        setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
        
      });
      
        if(reducer3.applicant_info.profile_status==='Incomplete'){

          setShow3(true);
        }
      
      

      
    
dispatch(siteData({page:'profile'}));
console.log("From user Reducer");
console.log(applicant_id1);
console.log(applicant_info3);

Axios.post("getMyProfile",{id:id})
.then(res =>{
  console.log("Get Data");
  console.log(res.data);
  if(res.data.info){
  let fData = res.data.info; 
        //console.log(res.data);

      if(fData.organizationOffices){
        const abc = JSON.parse(fData.organizationOffices);
        console.log(abc.length);
        //  console.log("abc");
        //  console.log(abc);
        setAllOffices(abc);
      }

    


setBookingInfo(res.data.booking);

 
  
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
console.log(applicant_info);




console.log("allOffice")
console.log(allOffice);

    },[]);


    useEffect(() => {


console.log(allFacilities);
    },[allFacilities]);


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

      setOffices({  
            name:'',
            phone:'',
            officeHeld:'',
            address:''})

       console.log(allOffice);
    }

    const saveProfile =()=>{

      setProfileStatus({status:'',msg:''});
      console.log(login);
      console.log(office);
     setShow1(true);

      Axios.post("saveMyProfile",{info:login,office:allOffice,id:id})
      .then(res =>{
        console.log("request");
        console.log(res.data);
       // alert(res.data.profilestatus);
        setProfileStatus({status:res.data.profilestatus.status,msg:res.data.profilestatus.msg});


        dispatch(userData({
          user_id:res.data.id,
          user_info:res.data.info
         })); 

       

        // setTimeout(function(){ setShow1(false) }, 3000);
       
           
      });



    }

    const [pageInfo, setPageInfo] = useState({
      facility:"",
      facilityId:"",
      location:"",
      locationNumber:""
    });


    const saveEventInfo =()=>{
// console.log(login);
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

console.log(allFacilities);
let a=0;
let doubles = allFacilities.map(function(data) {
  return a = a + data.data.booked ;
});

if(a < 1){
  alert("Please select a facility");
  return false;
}


setShow2(false);
// console.log(login);
// return 0;
Axios.post("submitMyBooking",{login:login,time1:time1,endtime1:endtime1,event:event,id:eventBooking.bid,applicant_id:eventBooking.applicant_id,allFacilities:allFacilities})
.then(res =>{
  console.log("request");
  console.log(res.data);

  setBookingInfo(res.data.bookingInfo);
     
});



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

        const changeAmenities =(event)=>{

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

Axios.post("cancelBooking",{id:eventBooking.bid,userid:id})
.then(res =>{
  console.log("request");
  //console.log(res.data);
  setShow4(false);

  console.log(res.data);
  setBookingInfo(res.data.response);
  // setBookingInfo(res.data.bookingInfo);
     
});



        }

        const no =()=>{
          
        }
    

const selectedFacility = useSelector((state) => state.todoReducer.facility);
const applicant_id = useSelector((state) => state.todoReducer.applicant_id);
const applicant_info = useSelector((state) => state.todoReducer.applicant_info);
if(!applicant_id1){
        
       return <Redirect to={`/`} />;
    }

        return (
        <React.Fragment>
             <Header/>
<div class="profile-sec">

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

        

          <div class="col-md-3"><p class="label-profile">Name of applicant Organization<span style={{color:'red',position:'relative',top:'-30px',left:'46px'}}>*</span></p></div>

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

                                        <div class="col-md-4 form-sec-profile" style={{paddingLeft:'30px'}}><input type="text"value={login.email} name="email" onChange={inputEvent}/></div>

                                      </div>

                                      <div class="row" style={{marginTop:'30px'}}>

                                        <div class="col-md-3"><p class="label-profile">Name<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                        <div class="col-md-3 form-sec-profile"><input type="text" value={login.name} name="name" onChange={inputEvent} placeholder=""/></div>

                      

                                        <div class="col-md-4" style={{color:'hsl(0deg 0% 38%)',paddingLeft:'6px',paddingRight:'0px',paddingTop:'4px',textAlign:'left'}}>Are you authorized to make this application<span style={{color:'red',position:'relative'}}>*</span>

                                        </div>

                                        <div class="col-md-1" style={{float:'left',textAlign:'left'}}>

                                          <input class="floating-input floating-check" type="checkbox" checked />

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

                          <p> <input name="orgaizationType" type="radio" value={login.isProfitMakingOrganization} name="isProfitMakingOrganization1" onChange={inputEvent} />  Yes  </p>

                      </div>



                      <div class="radio-inner">

                          <p> <input name="orgaizationType" type="radio" value={login.isProfitMakingOrganization} name="isProfitMakingOrganization0" onChange={inputEvent}/> No </p>

                      </div>



                      <div class="radio-inner">

                          <p> <input name="orgaizationType" type="radio" value={login.isProfitMakingOrganization} name="isProfitMakingOrganization3" onChange={inputEvent}/> Can't Say </p>

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

                    <div class="col-md-3"><p class="label-profile">Name<span style={{color:'red',position:'relative'}}>*</span></p></div>

                  <div class="col-md-4 form-sec-profile"><input type="text" placeholder="" value={office.name} name="name" onChange={inputEventOffice}/></div>



                  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Phone no<span style={{color:'red',position:'relative'}}>*</span></p></div>

                  <div class="col-md-4 form-sec-profile"><input type="text" placeholder=""  value={office.phone} name="phone" onChange={inputEventOffice}/></div>



                  <div class="col-md-3" style={{marginTop: '35px'}}><p class="label-profile">Office held<span style={{color:'red',position:'relative'}}>*</span></p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '35px'}}><input type="text" placeholder=""   value={office.officeHeld} name="officeHeld" onChange={inputEventOffice}/></div>



                  <div class="col-md-1"  style={{marginTop: '35px',paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Address<span style={{color:'red',position:'relative'}}>*</span></p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '35px'}}><input type="text" placeholder="" value={office.address} name="address" onChange={inputEventOffice}/></div>

                  </div>

                  <div class="row">

                  <div class="col-md-12">
                    <div class="add-more-sec"onClick={addOffice}>
                    <a  class="btn btn-adds">ADD MORE<i class="fa fa-plus" style={{marginLeft:'6px',color:'#ffffff'}} aria-hidden="true"></i>
                    </a>
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
                    {   allOffice.map((post,index)=>( 
                    <div class="col-md-12 row " style={{marginTop: '20px', borderTop: '1px solid  #f0ecec'}} key={post.name}>
                       <div class="col-md-3"  style={{marginTop: '20px'}}><p class="label-profile">Name</p></div>
                      
                    {/* <div class="col-md-4" style={{color: '#506172', textAlign: 'left', border: '1px solid #cccccc;'}}>
                      {post.name}
                    </div> */}
                     <div class="col-md-4 form-sec-profile" style={{marginTop: '20px'}}><input type="text" placeholder="" value={post.name} name="name" /></div>
                     <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px', marginTop: '20px'}}><p class="label-profile">Phone no</p></div>

                    <div class="col-md-4 form-sec-profile" style={{marginTop: '20px'}}>
                       <input type="text" placeholder=""  value={post.phone} name="phone"/></div>
                    {/* <div class="col-md-3" style={{color: '#506172', textAlign: 'left'}}>
                      {post.phone}
                    </div> */}
                       <div class="col-md-3" style={{marginTop: '20px'}}><p class="label-profile">Office held</p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '25px'}}><input type="text" placeholder=""   value={post.officeHeld} name="officeHeld" 
                  /></div>

                    {/* <div class="col-md-3" style={{color: '#506172', textAlign: 'left'}}>
                      {post.officeHeld}
                    </div> */}
                  <div class="col-md-1"  style={{marginTop: '20px',paddingLeft:'0px',paddingRight:'0px'}}><p class="label-profile">Address</p></div>
                  <div class="col-md-4 form-sec-profile"  style={{marginTop: '25px'}}>
                    <input type="text" placeholder="" value={post.address} name="address" onChange={inputEventOffice}/></div>


                    {/* <div class="col-md-3" style={{color: '#506172',textAlign: 'left'}}>
                      {post.address}
                    </div> */}
                     {/* <div class="col-md-3" style={{color: '#506172'}} onClick={()=>removeItem(post,index)}>
                     Delete <i class="fa fa-trash" aria-hidden="true"></i>

                    </div> */}

           <div class="col-md-12" style={{paddingLeft: '0px', paddingRight: '0px'}}>
           <div class="add-more-sec"onClick={()=>removeItem(post,index)} style={{marginTop: '0px'}}>
                    <a  class="btn btn-delete">Delete<i class="fa fa-trash" style={{marginLeft:'6px',color:'#ffffff !important', fontSize: '12px'}} aria-hidden="true"></i>
                    </a>
                  </div>
                  </div>
                  </div>
                    ))
                    }

                  

                </div>

                </div>

                  <div class="row" style={{marginTop:'35px'}}>

        

                    <div class="col-md-6"><p class="label-profile">How many enrolled members are in your organization?<span style={{color:'red',position:'relative'}}>*</span></p></div>

                    <div class="col-md-1 form-sec-profile"><input type="text" placeholder="" value={login.memberOfOrganization} name="memberOfOrganization" name="memberOfOrganization" onChange={inputEvent}/></div>

                    {/* <div class="col-md-1 form-sec-profile" style={{marginLeft:'16px'}}><input type="text" placeholder="" /></div>
                    <div class="col-md-1 form-sec-profile"  style={{marginLeft:'-16px'}}><input type="text" placeholder=""/></div> */}

                      

                        </div>

                        <div class="row" style={{marginTop:'35px'}}>

        

                          <div class="col-md-6"><p class="label-profile">If applicant is a youth organization, what is average age of it membership?<span style={{color:'red',position:'relative'}}>*</span></p></div>

                          <div class="col-md-1 form-sec-profile"><input type="text" placeholder="" value={login.memberAverageAge} name="memberAverageAge" onChange={inputEvent}/></div>

                          {/* <div class="col-md-1 form-sec-profile"  style={{marginLeft:'-16px'}}><input type="text" placeholder="" /></div> */}

                              </div>

                              <div class="row" style={{marginTop:'35px'}}>

        

                                <div class="col-md-6"><p class="label-profile">State purpose for which premises will be used<span style={{color:'red',position:'relative'}}>*</span></p></div>

                                <div class="col-md-6 form-sec-profile"><input type="text" placeholder="" value={login.premises} name="premises" onChange={inputEvent}/></div>

                                  

                                    </div>

                                    <div class="row">

                                      <div class="col-md-12" onClick={saveProfile}>

                                        <a  class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer'}}>PROCEED</a>

                                      </div>

                                    </div>

      

      </div>

      <div className={`tab-pane fade show ${tab==='booking'?'active':''}`} id="profile5" role="tabpanel" aria-labelledby="profile-tab5">
      <div class="col-md-12">
        <Link to="/"> <a  class="btn-cacl-book" style={{textDecoration: 'none', float: 'right', position: 'relative', right:'35px' }}  > New Booking</a></Link>
            </div> 
      {   bookings.map((post,index)=>(   
       <div class="row booking-border">        

            <div class="col-md-12" style={{paddingLeft: '7px'}}>
              <div class="book-heading" >
              {post.status==='draft' &&  <h2 style={{color:`#FA8B01`}}>Draft</h2> }
              {(post.status==='submit' || post.status==='locassign') && <h2 style={{color:`#1053eb`}}>Pending</h2> }
              {post.status==='approved' && <h2 style={{color:`#48a90b`}}>Estimate Provided</h2> }
              {post.status==='rejected' && <h2 style={{color:`#ed1130`}}>Rejected</h2> }
               
            
              </div>
            </div>

            <div class="col-md-8">
              <div class="booking-para">
                <p>School:- <span>{post.locationName}</span></p>
                <p>Facilities:- <span>{post.facilityName}</span></p>
                <p style={{fontFamily: 'Heebo-Medium',fontSize: '15px',marginBottom: '-3px'}}>Amenities</p>
                <p>{post.amenitiesName}</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="booking-id">
              <p> Booking id:- {post.bid}</p>
              {/* <p>Total Cost:- $99</p> */}
              <p>Date:- <span>{post.bookingDate}</span></p>
              <p>Time:- <span>{post.bookingStartTime+' - '+post.bookingEndTime}</span></p>
              </div>
            </div>
            {post.status==='draft'? 
            <div class="col-md-12" style={{marginTop:'10px'}}>
            <a onClick={()=>[setShow4(true),setEventBooking(post)]} class="btn-cacl-book btn-cancelss" style={{textDecoration: 'none',marginRight:'15px',cursor:'pointer'}} > Cancel Booking</a>
            { reducer3.applicant_info.profile_status==="Complete" ?
           <a onClick={()=>[setShow2('true'),getFacilitiesofLocation(post),setEventBooking(post)]}  class="btn-cacl-book" style={{textDecoration: 'none',cursor:'pointer'}} data-toggle="modal" data-target="#exampleModalcancel" data-dismiss="modal"> Complete Booking</a>
              :<a onClick={()=>[setShow3('true')]}  class="btn-cacl-book" style={{textDecoration: 'none',cursor:'pointer'}} data-toggle="modal" data-target="#exampleModalcancel" data-dismiss="modal"> Complete Booking</a>
            }
            </div> :''}        

        </div>

      ))}

        

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

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center'}}>Would you like to cancel your booking ?  </p>

<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}onClick={cancel}>Cancel</button>
<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}onClick={()=>setShow4(false)}>No</button>

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
<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}} onClick={()=>[setShow1(false),activeTab('booking')]}>Proceed Booking</button>
:
<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}} onClick={()=>[setShow1(false)]}>Complete Booking</button>
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
        <Modal.Header closeButton style={{textAlign:'center', display:'block',color:'#fa8b01',fontSize:'20px'}}>
        Booking Details</Modal.Header>
        <div class="modal-body modal-body-apply modal-request modal-padding" style={{padding:'22px 0px',height:'490px',overflowY:'scroll',textAlign:'justify', }}>
          <div class="row">
          <div class="row col-md-12" style={{marginBottom:'20px'}}>
           <div class="col-md-6" style={{color:'rgb(80, 97, 114)'}}>
           <span style={{fontWeight:'400',color:'#506172',fontSize:'16px'}}>School:</span> {eventBooking.locationName}
             </div>
            
             <div class="col-md-6" style={{color:'rgb(80, 97, 114)'}}>
             <span style={{fontWeight:'400',color:'#506172',fontSize:'16px'}}>Booking id:</span> {eventBooking.bid}
             </div>
           </div>
          <div class="col-md-12" style={{color:'#506172'}} >
       Event Name: <input id="ev1" type="text"  name="eventname" value={setEvent.eventname}  onChange={inputEventDetails} style={{outline:'none', height:'32px',marginLeft:'10px',fontWeight:'400',border:'1px solid #cccccc',width:'80%',marginLeft:'61px'}}/>
      {(event.error_name === 1 && event.err===1) &&  <span style={error}>PLease Enter Event Name</span> }
       </div>
      
      
       <div class="col-md-12" style={{color:'#506172'}}>
       Number of Participant: <input type="text"  name="noOfGuest" value={setEvent.eventname}  onChange={inputEventDetails} style={{marginTop:'15px', outline:'none', height:'32px',fontWeight:'400',border:'1px solid #cccccc',width:'80%'}}/>
       {(event.error_noOfGuest === 1 && event.err===1) &&  <span style={error}>PLease Enter No of Participant</span> }
       </div>
       {/* <div class="col-md-4">
         Participant:<input type="text"  name="noOfGuest" value={setEvent.noOfGuest}  onChange={inputEventDetails} style={{outline:'none', fontWeight:'400'}}/>
       </div> */}
       <div class="col-md-12">
       <span style={{    position: 'relative',display: 'inline-block',marginRight: '32px',top: '-79px',color: 'rgb(80, 97, 114)'}}>Event Description:</span>
       <textarea  name="eventDetails" onChange={inputEventDetails} style={{marginTop:'20px',height:'95px',outline:'none',fontWeight:'400',border:'1px solid rgb(204, 204, 204)',width:'80%'}}></textarea>
       {(event.error_details === 1 && event.err===1) &&  <span style={error}>PLease enter No of Participant</span> }
         </div>
        <div class="row col-md-12" style={{marginTop:'18px'}} >
                <div class="col-md-6" onClick={setShowCalenderShow}  >
                  <span style={{color:'rgb(80, 97, 114)'}}>Date:{event.date+'/'+event.month+'/'+event.year}</span>
       {(event.error_date === 1 && event.err===1) &&  <span style={error}>PLease enter event date</span> }
               
                </div>
                <div class="col-md-6">
                {/* <span style={{color:'rgb(80, 97, 114)'}}>Time:</span>
                <input type="time" name="eventname" value="12:00pm-01:00pm" style={{marginLeft:'10px',color:'rgb(80, 97, 114)',outline: 'none', fontWeight: '400',height:'33px', border: '1px solid rgb(204, 204, 204)', width: '80%', marginleft: '61px'}} /> */}
<p style={{float:'left', color:'hsl(0deg 0% 38%)'}}>Time:-</p>
<span onClick={() => setShowTime1()} style={{color:'rgb(97, 97, 97)', position:'relative', top:'3px'}}>{time1}</span> - <span style={{color:'rgb(97, 97, 97)',position:'relative', top:'3px'}} onClick={()=>setEndShowTime1()}>{endtime1}</span>
{/* <span onClick={() => setShowTime1()} style={{color:'rgb(97, 97, 97)', position:'relative', top:'3px'}}>{event.starttime}</span> - <span style={{color:'rgb(97, 97, 97)',position:'relative', top:'3px'}} onClick={()=>setEndShowTime1()}>{event.endtime}</span> */}
{(event.error_starttime === 1 && event.err===1) &&  <span style={error}>PLease enter event Time</span> }
        </div>
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
              <input  type="checkbox" onClick={changeFacilities} data1={post} id={post.data.id} class="checkboxField checkboxField-new" defaultChecked={post.data.booked===1} />
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
          <p style={{color: 'rgb(104, 104, 104)', fontSize: '14px'}}>{childpost.amenities_name}</p>
          </div>
          </div>
<div class="col-md-4 item-number">
  <div class="floating-label floating-new">
    <p class="quantity-sec">Number</p>
    <div class="select is-primary">
      <select>
        <option map="0"> 1</option></select>
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

<input  type="checkbox" onClick={changeAmenities} id={childpost.amenities_id}  class="checkboxField checkboxField-new" defaultChecked={childpost.booked===1} />
              
              
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
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px'}}>
                   
                  <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Name of applicant Organization2 </div>
                  <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                  <input type="text" value={login.organization} onChange={inputEvent} name="organization"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                  </div>
         </div>

         <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Position in the Organization </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.position} onChange={inputEvent} name="position"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

        
       

<div class="row col-md-12" style={{color:'#506172',paddingRight:'0px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}> Address </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.address1} onChange={inputEvent} name="address1"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

       

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  Street Address  </div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.address2} onChange={inputEvent} name="address2"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

      

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>  Address Line2  </div>
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
                   <input type="text" value={login.name} onChange={inputEvent}   name="name"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'15px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Are you authorized to make this application</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input class="floating-input floating-check" type="checkbox" style={{float:'left',top:'10px',position:'relative'}}   />
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
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px', marginLeft:'40px'}}>
                   <div class="radioOptions"><div class="radio-inner"><p> 
                     <input name="isProfitMakingOrganization" type="radio" value="" />  Yes  </p>
                     </div><div class="radio-inner"><p> 
                       <input name="isProfitMakingOrganization" type="radio" value="" /> No </p></div><div class="radio-inner"><p> 
                     <input name="isProfitMakingOrganization" type="radio" value="" /> Can't Say </p></div></div>
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

          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-5" style={{color:'rgb(97, 97, 97)'}}>Address</div>
                   <div class="col-md-7 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text"  value={opost.address}  name="eventname"  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px'}}/>
                   </div>
          </div>
          </> ))}
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-8" style={{color:'rgb(97, 97, 97)'}}>How many enrolled members are in your organization? </div>
                   <div class="col-md-4 form-sec-profile" style={{paddingRight:'0px'}}>
                   <input type="text" value={login.memberOfOrganization} name="memberOfOrganization" onChange={inputEvent}  style={{outline:'none', fontWeight:'400',border:'1px solid #cccccc',padding:'7px 8px',height:'31px',width:'50%'}}/>
                   </div>
          </div>
          <div class="row col-md-12" style={{color:'#506172',paddingRight:'0px',marginTop:'12px'}}>
                   
                   <div class="col-md-8" style={{color:'rgb(97, 97, 97)'}}>If applicant is a youth organization, what is average age of it membership?</div>
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

          <div class="row col-md-12" onClick={saveEventInfo}>
          <a class="btn-cacl-book btn-booking " style={{textDecoration: 'none',cursor:'pointer',marginLeft:'17px', textAlign:'center',margin:'0 auto',marginTop:'10px'}}> Submit Booking</a>
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
            
</React.Fragment>



        
        
        )
    

  
}

export default Profile;