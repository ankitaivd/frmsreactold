import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";

// import { addTodo } from "../actions/index";
import axios from 'axios';
import { facility } from "../actions/facility";
import Modal from 'react-bootstrap/Modal';
import { finalData } from "../actions/finalData";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TimeKeeper from 'react-timekeeper';
import Carousel from "react-multi-carousel";
import { booking } from "../actions/booking";
import { userData } from "../actions/userData";
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
import { findAllByDisplayValue } from "@testing-library/dom";
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
const  Booking =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
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
  const [Resetpassword,setResetpassword]=useState({
               
    Reset_email:"",        
        
    error_email:1,     
    Resetpassword_err:'0',
    Resetpassword_mesage:'',
    status:'fail',
    id:''
  });
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [showM, setShow1b] = useState(false);
  const handleCloseM = () => setShow1b(false);
  const handleShowM = () => setShow1b(true);


  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const style = {
    color: 'red',
    
  };

  const dispatch=useDispatch();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const [allFacilities, setAllFacilities] = useState([]);
  const [allAmenities, setallAmenities] = useState([]);
  const [addFacilities, setAddFacilities] = useState({facilityid:'',facilityName:'',amenities:[]});
  const [addAme, setAme] = useState({amenities_name:'',amenitiesid:''});
  const [storeFacilities, setStoreFacilities] = useState([]);
//   const location = useLocation();
  const [show, setShow] = useState("0");
  const [stat, setStat] = useState({status:'',state:''});
  const [chshow, setChShow] = useState("0");

  const [calendernfo, setCalender] = useState({
    data:"",
    date:"",
    currentYear:"",
    month:""
  
  });

  const [pageInfo, setPageInfo] = useState({
    facility:"",
    facilityId:"",
    location:"",
    locationNumber:""
  });
  const changeDate=(day)=>{
    var today = new Date();
    let date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // alert(day+' = '+calendernfo.date+' = '+date1);

    if(calendernfo.date == date1 && day==='yesterday'){


     setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Previous month is not available !',   
           
        
           
             };
    });
    setShowalert(true);
      return false;
    }
   
    Axios.post("get_calendar",{day:day,date:calendernfo.date,loc:location})
    .then(res =>{
      // console.log("calender");
      console.log(res);
      setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
     
    });
   }
  const [moreFacilities, setMoreFacilities] = useState([]);
  const { id } = useParams();
  // const [pageInfo, setPageInfo] = useState({
  //   facility:"",
  //   facilityId:"",
  //   location:"",
  //   locationNumber:""
  // });
  const [showCalender, setShowCalender] = useState(false);
  // const setShowCalenderClose = () => setShowCalender(false);
  const setShowCalenderShow = () => setShowCalender(!showCalender);
  // var dateFormat = require("dateformat");
  // var now = new Date();
  // const [show1, setShow1] = useState(false);
  // const handleClose1 = () => setShow1(false);
  // const handleShow1 = () => setShow1(true);

  const [date1, setDate] = useState('');
  const [eventTime, setEventTime] = useState('1');
  const [time1, setTime] = useState('12:00 pm');
  const [showTime, setShowTime] = useState(false);
  const [time2, setTimeNew] = useState('0');
  const [endtime2, setEndTimeNew] = useState('0');
  const [endtime1, setEndTime] = useState('01:00 pm');
  const [showEndTime, setEndShowTime] = useState(false);

  const [signIn,setSignin]=useState({
    signIn_password:"",        
    signIn_email:"",        
    error_password:1,        
    error_email:1,     
    signIn_err:'0',
    signIn_mesage:'',
    status:'fail',
    id:''
  });

   const setShowTime1=()=>{
    setShowTime(!showTime);
    setEndShowTime(false);
    // setTime(true);
    // setEndTime(false);
  }
  const [showR, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);


  
  const [showalert, setShowalert] = useState(false);
  const handleClosealert = () => setShowalert(false);
  const handleShowalert = () => setShowalert(true);
  
  const [Alerterr,setAlerterr]=useState({
               
    Alerterr_message:"",        
        
     
    Alerterr_err:'0',
   
  });

  
 const [showalertsuccess, setShowalertsuccess] = useState(false);
 const handleClosealertsuccess = () => setShowalertsuccess(false);
 const handleShowalertsuccess = () => setShowalertsuccess(true);
 const [contentloc, setContentloc] = useState();
 const [Alertsuccess,setAlertsuccess]=useState({
              
   Alertsuccess_message:"",        
       
    
   Alertsuccess_err:'0',
  
 });
    
  const setDateTime=()=>{
// alert("hello");
console.log(booking1);
  //   dispatch(booking({
  //   schoolFacility:fac,
  //   location:loc,
  //   schoolFacilitySelect:fac,
  //   date:a,
  //   endtime:0,
  //   time:0,
  //   month:calendernfo.month,
  //   year:calendernfo.currentYear 
  //  }));
  }

//   const dispatch=useDispatch();


  const red1 = useSelector((state) => state.todoReducer);
//   const empid = useSelector((state) => state.todoReducer.empid);
//   const type = useSelector((state) => state.todoReducer.type);
  
let array=[];
  useEffect(() => {

    console.log("reducer2");
    console.log(reducer);
    console.log(reducer2);
    console.log(reducer3);
    console.log(reducer4);
    console.log(signIn);
    


    try {
      if(reducer3.applicant_info.type==='sub'){
        dispatch(userData({
          user_id:'',
          user_info:[]
         }));    
    }
    }
    catch(err) {
      
    }
   
// return 0;
    if(reducer.location){
      console.log("jyghk");
      console.log(booking1);
    setBooking1({ 
      schoolFacility:reducer.schoolFacility,
      location:reducer.location,
      schoolFacilitySelect:"",
      date:reducer.date,
      endtime:endtime2,
      time:time2,
      month:reducer.month,
      year:reducer.year      
    });
    
  }

// alert(reducer.location);
// alert(reducer.location+' = '+reducer.schoolFacility);
if(reducer.location || reducer.schoolFacility){

  Axios.post("getFacilityByLocationBooking",{location:reducer.location,facility:reducer.schoolFacility})
  .then(res =>{

    console.log("hello");
    console.log(res.data);
  setAllFacilities(res.data.data);
  
  });

  const regex = /\d/;
          const doesItHaveNumber = regex.test(location);

console.log(doesItHaveNumber);

setContentloc(doesItHaveNumber);
   Axios.post("get_calendar",{loc:location})
   .then(res =>{
 
     setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
     
   });

   Axios.post("viewfacility",{school_facilities_id:reducer.location})
   .then(res =>{
    
    console.log("viewfacility");
     console.log(res.data.moreFacility);
  //   setMoreFacilities(res.data.moreFacility);
  //   setPageInfo({
  //   facility:res.data.facilityInfo.type,
  //   facilityId:res.data.facilityInfo.id,
  //   location:res.data.locationInfo.locationName,
  //   locationNumber:res.data.locationInfo.location
  // })
   
  });

}else
{
// alert("no data available");
setStat({status:'fail',state:'home'});
  }

    },[]);


    
    const inputEventSignIn =(event)=> {
      setSignin((preValue)=>{

        if(event.target.name==='signIn_email'){
          return {    
                  signIn_email:event.target.value,  
                  signIn_password:preValue.signIn_password,
                  error_password:preValue.error_password,             
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
                  error_password:0,             
                  error_email:preValue.error_email,         
                  signIn_err:preValue.signIn_err,   
                  signIn_mesage:'',
                  id:preValue.id,  
                   };
          }


          });
   }  


    useEffect(() => {
console.log("allAmenities");
console.log(allAmenities);

    },[]);
   
    // const data = useSelector((state) => state.todoReducer.data);
        
        
        // if (!type) return <Redirect to="/login" />;
 
        
        // const type = useSelector((state) => state.todoReducer.type);

        // if (type==='admin') return <Redirect to="/dashboard" />;
        //   else if(type==='participant' || type=== 'wpadmin') return <Redirect to="/home" />;
        //   else  return <Redirect to="/" />;
        

        const expanArea = (data)=>{
          // console.log(data);
        }


        const addFacility =(data)=>(event)=>{       
          console.log(data);
          console.log(event);

          // alert("CLICK");

          const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value);
        
    if(value){

       var index = storeFacilities.findIndex(x=> x.facilityid === data.id);
          

          if(index>=0){
         
          }else{
            setAddFacilities({facilityid:data.id,facilityName:data.type,amenities:[]});
            setStoreFacilities([...storeFacilities,{facilityid:data.id,facilityName:data.type,amenities:[]}]); 
          }
              


    }else{
// alert(data.id);
      //document.getElementById('t'+data.id).checked = false;
      removeFacility1(data);
    }


    setTimeNew(booking1.time);
    setEndTimeNew(booking1.endtime); 
              
        }

        const addAmenities = (data,childData)=>(event)=>{    
          // alert("add Amenities");

         let a = document.getElementById('child'+childData.amenities_id).checked;
         var countam=  document.getElementById('facnumberam'+childData.id+'new'+data.id).value;
  
     if(a){
   
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          console.log(value);
          var index = storeFacilities.findIndex(x=> x.facilityid === data.id);
          
          if (index === -1){            
            setallAmenities([]);
            setStoreFacilities([...storeFacilities,{facilityid:data.id,facilityName:data.type,amenities:[{amenities_name:childData.amenities_name,amenitiesid:childData.amenities_id,countam:countam,totalnum:childData.count}]}]);
            setAddFacilities({facilityid:data.id,facilityName:data.type});
            setallAmenities([...allAmenities,{amenities_name:childData.amenities_name,amenitiesid:childData.amenities_id,countam:countam,totalnum:childData.count}]);       
           
          }
          else
          {            
              setallAmenities([]);
              let g = storeFacilities[index];            
          setAme({amenities_name:childData.amenities_name,amenitiesid:childData.amenities_id})
            setallAmenities([...g.amenities,{amenities_name:childData.amenities_name,amenitiesid:childData.amenities_id,countam:countam,totalnum:childData.count}]);          
            g["amenities"] =[...g.amenities,{amenities_name:childData.amenities_name,amenitiesid:childData.amenities_id,countam:countam,totalnum:childData.count}];
              setStoreFacilities([
                ...storeFacilities.slice(0,index),
                g,
                ...storeFacilities.slice(index+1)
              ]
                      );
            setAddFacilities({facilityid:data.id,facilityName:data.type});
          }
        }else{
          // alert("remove");
          console.log(data);          
          console.log(childData);
          console.log(storeFacilities);

          var index = storeFacilities.findIndex(x=> x.facilityid === data.facility_id);
          let fac = storeFacilities[index];
          fac.amenities=fac.amenities.filter(x=>x.amenitiesid !== childData.amenities_id);

          let a2 = storeFacilities.map(item => {
            var temp1 = Object.assign({}, item);
            if (temp1.facilityid === data.facility_id) {

            
              console.log("temp1");
              console.log(temp1);
              temp1.amenities.filter(x=>x.amenitiesid != childData.amenities_id);
            }
            return temp1;
        });

     console.log(a2);
        setStoreFacilities(a2);
          //document.getElementById('child'+childData.amenities_id).checked=false;
         
        }    
        setTimeNew(booking1.time);
        setEndTimeNew(booking1.endtime);
        }


        const selectFacility =(data)=>{

          // console.log(data);


        }

        const forgotPassword = ()=>{
          //   alert("hello");
          setShow1b(false);
          setShowR(true);
        
        }
       

        
        const increasevalue = (ev,facilityid,amenitiesid)=>{
// console.log(storeFacilities);
// console.log(allAmenities);
let abc= storeFacilities.map(item => {
  var temp1 = Object.assign({}, item);
if(temp1.facilityid==facilityid){
  var anemlength=temp1.amenities;
  if(anemlength.length!=0 ){
    for(var i = 0, length = anemlength.length; i < length; i++) {
    
      if(temp1.amenities[i].amenitiesid==amenitiesid){
        if(ev==='increment'){
          if(temp1.amenities[i].totalnum==temp1.amenities[i].countam){
            setAlerterr((preValue)=>{
              return {    
                     
                      Alerterr_err:1,  
                      Alerterr_message:'No more units available',   
                     
                  
                     
                       };
              });
              setShowalert(true);
              temp1.amenities[i]['countam'] =temp1.amenities[i].countam;
          }else{
           var num= parseInt( temp1.amenities[i].countam) + 1; 
           temp1.amenities[i]['countam']=num.toString();
          }
        }else if(ev==='decrement'){
          if(temp1.amenities[i].countam==1){
            setAlerterr((preValue)=>{
              return {    
                     
                      Alerterr_err:1,  
                      Alerterr_message:'Minimum units reached',   
                     
                  
                     
                       };
              });
              setShowalert(true);
             
              temp1.amenities[i]['countam'] =temp1.amenities[i].countam;
          }else{
      var num=parseInt( temp1.amenities[i].countam) - 1; 
      temp1.amenities[i]['countam'] =num.toString();
          }
        }
        console.log(temp1.amenities[i]);
      }
    
  
    }
   
  }

}

  return temp1;
});
console.log(abc);
setStoreFacilities(abc);

        }

        const removeFacility =(data)=>{

          console.log("REMOVE");
          console.log(booking1.time);
          console.log(data);
          document.getElementById('t'+data.facilityid).checked = false;
          console.log(data);
          var a='';
        if(data.facilityid){
           a= data.facilityid;
        }

        if(data.facility_id){
           a=data.facility_id;
           
        }


        
          setStoreFacilities(storeFacilities.filter(storeFacilities => storeFacilities.facilityid !== a));
          setAddFacilities({facilityid:data.id,facilityName:data.type});
          setTimeNew(booking1.time);
          setEndTimeNew(booking1.endtime);
        }

        const removeFacility1 =(data)=>{

          console.log("REMOVE 1");
           console.log(booking1.time);
          console.log(data);
          document.getElementById('t'+data.facility_id).checked = false;
          console.log(data);
          var a='';
        if(data.facilityid){
           a= data.facilityid;
        }

        if(data.facility_id){
           a=data.facility_id;
           
        }


        
          setStoreFacilities(storeFacilities.filter(storeFacilities => storeFacilities.facilityid !== a));
          setAddFacilities({facilityid:data.id,facilityName:data.type});
          setTimeNew(booking1.time);
          setEndTimeNew(booking1.endtime);
        }

        const removeAmenities =(data,child)=>{
          console.log("amenities");
          // alert("A1")

          document.getElementById('child'+child.amenitiesid).checked = false;

          var a='';
          if(data.facilityid){
             a= data.facilityid;
          }
  
          if(data.facility_id){
             a=data.facility_id;
          }
          
        
         
          console.log("allAmenities");
         
          var index = storeFacilities.findIndex(x=> x.facilityid === data.facilityid);
          

          let fac = storeFacilities[index];

         
          // console.log(fac.amenities.filter(x=>x.amenitiesid !== child.amenitiesid));
          fac.amenities=fac.amenities.filter(x=>x.amenitiesid !== child.amenitiesid);
         
          console.log(data); 
          console.log(child); 
         console.log(storeFacilities);
         let t=0;
         let a1 = storeFacilities.map(item => {
          var temp = Object.assign({}, item);
          
          if (temp.facilityid === data.facilityid) {
             
             temp.amenities.filter(x=>x.amenitiesid !== child.amenitiesid);

             if( temp.amenities.length == 0){
              t = data.facilityid;
              document.getElementById('t'+t).checked=false;
                //alert("done");
              // console.log("facid");
             
              // chkfacid.push(temp.facilityid);
              
              // console.log(chkfacid);
              // temp.facilityid.filter(x => x.facilityid !== temp.facilityid);
              // console.log("temp");
              // console.log(temp);
             }
          }


         
          
          
            return temp;
        
          
      });
      console.log(a1);
      a1 = a1.filter(x=>x.facilityid !== t);
      setStoreFacilities(a1);
      setTimeNew(booking1.time);
      setEndTimeNew(booking1.endtime);
          // setStoreFacilities(storeFacilities.filter(storeFacilities => storeFacilities.amenities.amenitiesid !== child.amenitiesid));
          // setStoreFacilities(storeFacilities.filter(storeFacilities => storeFacilities.facilityid !== a));
        
        // setStoreFacilities([storeFacilities,fac]);
        }

        const selectedFacility = useSelector((state) => state.todoReducer.facility);
        // console.log("selectedFacility");
        // console.log(selectedFacility);
        const schoolFacility = useSelector((state) => state.todoReducer.schoolFacility);
        const schoolFacilitySelect = useSelector((state) => state.todoReducer.schoolFacilitySelect);
       
        const date = useSelector((state) => state.todoReducer.date);
        const month = useSelector((state) => state.todoReducer.month);
        const year = useSelector((state) => state.todoReducer.year);
        const location = useSelector((state) => state.todoReducer.location);
        const time = useSelector((state) => state.todoReducer.time);
        const endtime = useSelector((state) => state.todoReducer.endtime);


        const reducer = useSelector((state) => state.todoReducer);
        const reducer2 = useSelector((state) => state.todoReducer2);
        const reducer3 = useSelector((state) => state.todoReducer3);
        const reducer4 = useSelector((state) => state.todoReducer4);
        const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);

        const submitStatus = useSelector((state) => state.todoReducer2.status);
        const inf = useSelector((state) => state.todoReducer2.info);
        const finalSubmit =(e)=>{         
     
          console.log(reducer);
          console.log(reducer2);
          console.log(reducer3);
          console.log(storeFacilities);
          console.log(booking1) ;
          //return 0;
          // reducer2['info'] = storeFacilities;
          //reducer2.push({info:storeFacilities});


          var obj = {info:[]};
          var ary=[];
        obj.info = storeFacilities;
        // ary.push(obj);
          // return 0;
        
          /* Modal Close */ 
          setShow1(false);

          if(reducer3.applicant_id){
          
             Axios.post("addBooking",{reducer:reducer,reducer2:obj,reducer3:reducer3,booking:booking1})
              .then(res =>{
                console.log(res.data);
               setStat({status:res.data.status,state:'login'});
             
           
              });

            }else{
              setStat({status:'',state:'signup'});
            }

        }

        
      
    const setBookingFacility = ()=>{
      dispatch(finalData({
        info:storeFacilities
       }));


       if(reducer3.applicant_id){
          
        Axios.post("addBooking",{reducer:reducer,reducer2:reducer2,reducer3:reducer3})
         .then(res =>{
           console.log(res.data);
           setStat({status:res.data.status,state:'login'});
        
      
         });

       }else{
         setStat({status:'',state:'signup'});
       }
    }

    const setEndShowTime1=()=>{
      setShowTime(false);
      setEndShowTime(!showEndTime);
      // setTime(false);
      // setEndTime(true);
    }

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };

    const viewFacility=(ev)=>{
      Axios.post("viewfacility",{school_facilities_id:ev.sfid})
     .then(res =>{
      //  console.log("request");
      //  console.log(res.data);
       console.log("new faclit");
      setMoreFacilities(res.data.moreFacility);
      setPageInfo({
      facility:res.data.facilityInfo.type,
      facilityId:res.data.facilityInfo.id,
      location:res.data.locationInfo.locationName,
      locationNumber:res.data.locationInfo.location})
     
     });
     }

     
  const clickHandler=(e)=>{
    const el = e.target.closest("td");  
    
    setShowCalender(false);
   
    if (el && e.currentTarget.contains(el)) {  
      // let b =el.innerHTML;  
     let a =Number(el.innerHTML);
     let b =0;
     
if(a<10){
  b='0'+a;
}else{
  b=a;
}
    //  $('#dd'+a).css('background-color:yellow');
    // document.getElementsByClassName('reset').style.backgroundColor = "";
    // document.getElementsByName('reset').style.backgroundColor = "";
    //  document.getElementById(b).style.backgroundColor = "yellow";
     
     setDate(a);
     setShow1(false);

   

console.log(location);
    setBooking1((preValue)=>{
      return { 
        schoolFacility:id,
        location:pageInfo.location,
        schoolFacilitySelect:"",
      date:a,
      endtime:endtime1,
      time:time1,
      month:calendernfo.month,
      year:calendernfo.currentYear   
      }   
    });
     
    // dispatch(booking({
    //   schoolFacility:booking1.schoolFacility,
    //   location:pageInfo.location,
    //   schoolFacilitySelect:booking1.schoolFacilitySelect,
    //   date:a,
    //   endtime:endtime,
    //   time:time,
    //   month:calendernfo.month,
    //   year:calendernfo.currentYear 
    //  }));

    }
  }


  const changeTime =()=>{

    var time_start = new Date();
    var time_end = new Date();
    var value_start = time1.split(' ');
    var value_end = endtime1.split(' ');

    //alert(value_start[0]+' = '+value_end[0]);
    var stH=0;
    var enH=0;
    var stM=0;
    var enM=0;
    if(value_start[1]==='pm'){
      stH =  value_start[0].split(':');
      stH[0]=parseInt(stH[0]) + 12;
      stM=parseInt(stH[1]);
    }
    if(value_end[1]==='pm'){
      enH =  value_end[0].split(':');
      enH[0]= parseInt(enH[0]) + 12;
      enM=parseInt(enH[1]);
    }
   

    // setEventTime(a);


    if(storeFacilities.length < 1 ){
      setShow2(false);

  
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:'Add Facilities ... ',   
               
            
               
                 };
        });
        setShowalert(true);
      return 0;
    }
    console.log(booking1);
    setBooking1((preValue)=>{
      return { 
      schoolFacility:id,
      location:pageInfo.location,
      schoolFacilitySelect:"",
      date:preValue.date,
      endtime:endtime1,
      time:time1,
      month:booking1.month,
      year:booking1.year  
      }   
    });

    // alert("call");
    console.log(booking1);

  //   dispatch(booking({
  //     schoolFacility:id,
  //     location:pageInfo.location,
  //     schoolFacilitySelect:"",
  //     date:booking1.date,
  //     endtime:endtime1,
  //     time:time1,
  //  month:booking1.month,
  //     year:booking1.year  
  //    }));



    setShow2(false);
  }
  const initiateReset = () =>{
    console.log(Resetpassword);
      if( Resetpassword.error_email==0){
    
       Axios.post("passwordCheck",{Resetpassword:Resetpassword})
        .then(res =>{   
          console.log(res.data);
          
        
    if(res.data.status==='Success'){
      setAlertsuccess((preValue)=>{
        return {    
               
            Alertsuccess_err:1,  
            Alertsuccess_message:'Password send  successfully  ',   
               
            
               
                 };
        });
        setShowalertsuccess(true);
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
    
    }else{
      document.getElementById("Reset_email").value='';
      setResetpassword((preValue)=>{
    
        
        return {    
          Reset_email:'',  
                
          error_email:1,         
          Resetpassword_err:1,  
          Resetpassword_mesage:res.data.message,   
          status:'fail',
          id:preValue.id,  
                   
            
               
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
                    id:preValue.id,  
                       
                
                   
                     };
            
    
       
    
    
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
                      id:preValue.id,  
                         
                  
                     
                       };
              }
      
         
      
      
              });
       } 

  const initiateLogin = ()=>{
    //   alert("hello");

    // console.log(reducer);
    // console.log(reducer2);
    
    console.log(red1);
    console.log(booking1);

    // return 0;

    dispatch(booking({
      schoolFacility:"",
      location:red1.location,
      schoolFacilitySelect:"",
      date:booking1.date,
      endtime:booking1.endtime,
      time:booking1.time,
      month:booking1.month,
      year:booking1.year 
     }));


    if(storeFacilities.length < 1 ){
      console.log(storeFacilities);
      console.log("endtime1");
      console.log(endtime);
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:'Please select Facilities',   
               
            
               
                 };
        });
        setShowalert(true);
      return 0;
    }

    if(booking1.endtime == 0 ){      
   
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:'Select your event timings',   
               
            
               
                 };
        });
        setShowalert(true);
      return 0;
    }
    console.log("endtime1");
    console.log(endtime);

    console.log(storeFacilities);
    dispatch(finalData({
      info:storeFacilities
     }));
    setShow1b(true);
    setShowR(false);
 
  }


  const chkfacilitiesLogin=()=>{

    if(storeFacilities.length < 1 ){
      console.log(storeFacilities);
      console.log("endtime1");
      console.log(endtime);
  
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:'Please select Facilities ',   
               
            
               
                 };
        });
        setShowalert(true);
      return 0;
    }

    if(booking1.endtime == 0 ){      
      setAlerterr((preValue)=>{
        return {    
               
                Alerterr_err:1,  
                Alerterr_message:'Select your event timings  ',   
               
            
               
                 };
        });
        setShowalert(true);
      return 0;
    }
    console.log("endtime");
    console.log(endtime);
    setShow1(true);

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

    // console.log(reducer); return 0;
   
    // console.log(signIn);
    // console.log(reducer2); return 0;
    // console.log(storeFacilities); return 0;
   

    dispatch(booking({
      schoolFacility:"",
      location:red1.location,
      schoolFacilitySelect:"",
      date:booking1.date,
      endtime:booking1.endtime,
      time:booking1.time,
      month:booking1.month,
      year:booking1.year 
     }));

    if(signIn.error_password==0 && signIn.error_email==0){
 
     Axios.post("loginCheck",{signIn:signIn,bookingInfo:reducer,facility:reducer2.info})
      .then(res =>{    

        console.log("loginCheck");
        console.log(res.data);
        if(res.data.status=='Success'){
          setAlertsuccess((preValue)=>{
            return {    
                   
                Alertsuccess_err:1,  
                Alertsuccess_message:'Your request is saved as Draft under My Bookings, click here to Proceed  ',   
                   
                
                   
                     };
            });
           
         
          dispatch(userData({
            user_id:res.data.id,
            user_info:res.data.response
           }));
          
                     setSignin((preValue)=>{
                    
                      return {    
                              signIn_email:preValue.signIn_email,  
                              signIn_password:preValue.signIn_password,
                              error_password:preValue.error_password,             
                              error_email:preValue.error_email,         
                              signIn_err:1,     
                              signIn_mesage:res.data.message,
                              status:res.data.status,
                              id:res.data.id, 
                               };
                      });
                      setShowalertsuccess(true);
        }else{
          setSignin((preValue)=>{
                    
            return {    
                    signIn_email:preValue.signIn_email,  
                    signIn_password:preValue.signIn_password,
                    error_password:preValue.error_password,             
                    error_email:preValue.error_email,         
                    signIn_err:1,     
                    signIn_mesage:res.data.message,
                    status:res.data.status,
                    id:res.data.id, 
                     };
            });

            
        }

           
  
      });
    }else{
      setSignin((preValue)=>{
            
        return {    
                signIn_email:preValue.signIn_email,  
                signIn_password:preValue.signIn_password,
                error_password:preValue.error_password,             
                error_email:preValue.error_email,         
                signIn_err:2,     
                signIn_mesage:"Empty Form",
                status:'fail',
                id:preValue.id,    
                 };
        });
    }
  
  
      }




    if(stat.state==='login' && applicant_id1!='0000'  && applicant_id1!='0001'  && applicant_id1!='0003' && (applicant_id1.length <4)){
  
      return <Redirect to={'/profile'} />;    
    } else if(stat.state==='signup'){
      return <Redirect to="/confirm" />;           
     }  else if(stat.state==='home'){
      return <Redirect to="/" />;           
     }

     if(signIn.status==="Success"){
 
      return <Redirect to={`/profile`} />;
    }

    

        return (
        <React.Fragment>
           
             <div class="banner">
{/* <div class="hero_image img-book" style={{backgroundImage: 'url(../image/auditorium.jfif)', }}></div> */}
<div class="hero_image img-book" ></div>
<div class="container">
  <div class="d-content d-content-view" style={{zIndex:'999'}}>
  <div class="listing-sec" style={{cursor:'pointer'}}>
             
              <Link to={`/`} class="view-button"><i class="fa fa-angle-double-left" aria-hidden="true" style={{marginRight:'4px',cursor:'pointer'}}></i> 
               Back</Link>
          </div>
  </div>
  <div class="d-content d-sample-pic booking-top" >
      <div class="sample-banner-img">
          <a  class="sample-banner" style={{textDecoration: 'none',color:'#ffffff',height:'20px'}}>
          {(contentloc===true) ? 
                               <>
                               {(location==='Middle School 7') ? 
                                location 
                                :
                                'LOCATION '+location 
                               }

                             
                               </>
                              : location}
            </a>
        </div>

        
  </div>


  <div class="d-content d-content-view" >
  
  
    {location==='PS # 8' && <> 
   
    <div class="listing-new"  > 
       
       <div class=" newcol" style={{padding:'10px 0px'}}>
     <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
     <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
    
  </span>
  
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
  </div>
  <div class="col-md-4 right-newcol">
     <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
       </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
  </div>        
    
    
   </div>
    <div class="newcol" style={{padding:'10px 0px'}}>
   
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
       <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
        
     </span>
      </div>

      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
        <div class="col-md-4 right-newcol">
     
        <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
        
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
    </div>
    </div>
  
    <div class=" newcol" style={{padding:'10px 0px'}}> 
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
      <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
      </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>

    <div class="col-md-4 right-newcol">
     
       <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
      
    </span>
     </div>
     <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
      </div>

     </div>
    </div>
  
    <div class=" newcol " style={{padding:'10px 0px'}}>
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
       <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
      
       </span>
      </div>
      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
      </div>
      <div class="col-md-4 right-newcol">
     
       <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking (40 Car) 
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
       <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

    </div>
    </div>

</div>
    
  
     </>
    
     
     }
  
  {location==='PS # 28' && <>
    
    
  <div class="listing-new"  > 
       
  <div class=" newcol" style={{padding:'10px 0px'}}>
     <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
     <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
    
  </span>
  
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
  </div>
  <div class="col-md-4 right-newcol">
     <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
       </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
  </div>        
    
    
   </div>
    <div class="newcol" style={{padding:'10px 0px'}}>
   
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
       <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
        
     </span>
      </div>

      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
        <div class="col-md-4 right-newcol">
     
        <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
        
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
    </div>
    </div>
  
    <div class=" newcol" style={{padding:'10px 0px'}}> 
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
      <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
      </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>

    <div class="col-md-4 right-newcol">
     
       <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
      
    </span>
     </div>
     <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
      </div>

     </div>
    </div>
  
    <div class=" newcol " style={{padding:'10px 0px'}}>
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
       <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
      
       </span>
      </div>
      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
      </div>
      <div class="col-md-4 right-newcol">
     
       <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking (42 Car) 
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
       <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

    </div>
    </div>



    </div>
     
     
  
     </>
    
     
     }
  
  {location==='PS # 27' && <> 
 
  <div class="listing-new"  > 
  <div class=" newcol" style={{padding:'10px 0px'}}>
     <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
     <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
    
  </span>
  
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
  </div>
  <div class="col-md-4 right-newcol">
     <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
       </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
  </div>        
    
    
   </div>
    <div class="newcol" style={{padding:'10px 0px'}}>
   
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
       <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
        
     </span>
      </div>

      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
        <div class="col-md-4 right-newcol">
     
        <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
        
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
    </div>
    </div>
  
    <div class=" newcol" style={{padding:'10px 0px'}}> 
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
      <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
      </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>

    <div class="col-md-4 right-newcol">
     
       <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
      
    </span>
     </div>
     <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
      </div>

     </div>
    </div>
  
    <div class=" newcol " style={{padding:'10px 0px'}}>
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
       <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
      
       </span>
      </div>
      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
      </div>
      <div class="col-md-4 right-newcol">
     
       <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
       <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

    </div>
    </div>


</div>
    
     
     
  
     </>
    
     
     }

{location==='PS # 23' && <> 
 
<div class="listing-new"  >  
 <div class=" newcol" style={{padding:'10px 0px'}}>
    <div class="row" style={{justifyContent:'center'}}>
    <div class="col-md-4 left-newcol">
  
    <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
   
 </span>
 
 </div>
 <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
 </div>
 <div class="col-md-4 right-newcol">
    <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
      </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
 </div>
 </div>        
   
   
  </div>
   <div class="newcol" style={{padding:'10px 0px'}}>
  
   <div class="row" style={{justifyContent:'center'}}>
    <div class="col-md-4 left-newcol">
 
      <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
       
    </span>
     </div>
 
     <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
     </div>
       <div class="col-md-4 right-newcol">
    
       <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
       
     </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
     </div>
   </div>
   </div>
 
   <div class=" newcol" style={{padding:'10px 0px'}}> 
   <div class="row" style={{justifyContent:'center'}}>
    <div class="col-md-4 left-newcol">
 
     <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
     </span>
   </div>
   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
     </div>
 
   <div class="col-md-4 right-newcol">
    
      <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
     
   </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
     </div>
 
    </div>
   </div>
 
   <div class=" newcol " style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
    <div class="col-md-4 left-newcol">
  
      <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
     
      </span>
     </div>
     <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
     </div>
     <div class="col-md-4 right-newcol">
    
      <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
     </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
 
   </div>
   </div>
 
 
 
   </div>
    
    
 
    </>
   
    
    }
     {location==='Lincoln HS' && <> 
     <div class="listing-new"  > 
       
<div class=" newcol" style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
   <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
  
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
   <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
     </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
  
  
 </div>
  <div class="newcol" style={{padding:'10px 0px'}}>
 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

     <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
      
   </span>
    </div>

    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
      <div class="col-md-4 right-newcol">
   
      <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
      
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
  </div>
  </div>

  <div class=" newcol" style={{padding:'10px 0px'}}> 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

    <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
    </span>
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

  <div class="col-md-4 right-newcol">
   
     <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
    
  </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>

   </div>
  </div>

  <div class=" newcol " style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
     <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
    
     </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
    </div>
    <div class="col-md-4 right-newcol">
   
     <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
  </div>

  </div>
  </div>



  
   </div>
   

   
     </>
    
     
     }
       {location==='Snyder High School' && <> 
       <div class="listing-new"  > 
       <div class=" newcol" style={{padding:'10px 0px'}}>
     <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
     <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
    
  </span>
  
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
  </div>
  <div class="col-md-4 right-newcol">
     <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  (Limited) 
       </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
  </div>        
    
    
   </div>
    <div class="newcol" style={{padding:'10px 0px'}}>
   
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
       <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating   (Limited)
        
     </span>
      </div>

      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
        <div class="col-md-4 right-newcol">
     
        <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
        
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>
    </div>
    </div>
  
    <div class=" newcol" style={{padding:'10px 0px'}}> 
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
 
      <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
      </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
      </div>

    <div class="col-md-4 right-newcol">
     
       <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
      
    </span>
     </div>
     <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
      </div>

     </div>
    </div>
  
    <div class=" newcol " style={{padding:'10px 0px'}}>
    <div class="row" style={{justifyContent:'center'}}>
     <div class="col-md-4 left-newcol">
   
       <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
      
       </span>
      </div>
      <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
      <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
      </div>
      <div class="col-md-4 right-newcol">
     
       <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking (Limited) 
      </span>
    </div>
    <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
       <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

    </div>
    </div>
</div>
     </>
    
     
     }
  
  {location==='Ferris High School' && <> 
 
  <div class="listing-new"  >   
<div class=" newcol" style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
   <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
  
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
   <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
     </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
  
  
 </div>
  <div class="newcol" style={{padding:'10px 0px'}}>
 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

     <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
      
   </span>
    </div>

    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
      <div class="col-md-4 right-newcol">
   
      <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
      
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
  </div>
  </div>

  <div class=" newcol" style={{padding:'10px 0px'}}> 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

    <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
    </span>
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

  <div class="col-md-4 right-newcol">
   
     <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
    
  </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>

   </div>
  </div>

  <div class=" newcol " style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
     <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
    
     </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
    </div>
    <div class="col-md-4 right-newcol">
   
     <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
  </div>

  </div>
  </div>



  
   </div>
   

   
     </>
    
     
     } 
  
  
  {location==='Dickinson High School' && <>

  <div class="listing-new"  > 
       
<div class=" newcol" style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
   <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
  
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
   <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
     </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
  
  
 </div>
  <div class="newcol" style={{padding:'10px 0px'}}>
 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

     <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
      
   </span>
    </div>

    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
      <div class="col-md-4 right-newcol">
   
      <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
      
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
  </div>
  </div>

  <div class=" newcol" style={{padding:'10px 0px'}}> 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

    <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
    </span>
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

  <div class="col-md-4 right-newcol">
   
     <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
    
  </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>

   </div>
  </div>

  <div class=" newcol " style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
     <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
    
     </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>
    <div class="col-md-4 right-newcol">
   
     <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
  </div>

  </div>
  </div>



  </div>
   
   

   
     </>
    
     
     }
     {location==='PS # 41' && <> 
     
     <div class="listing-new"  >  
<div class=" newcol" style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
   <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
  
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
   <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
     </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
  
  
 </div>
  <div class="newcol" style={{padding:'10px 0px'}}>
 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

     <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
      
   </span>
    </div>

    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
      <div class="col-md-4 right-newcol">
   
      <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating  
      
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
  </div>
  </div>

  <div class=" newcol" style={{padding:'10px 0px'}}> 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

    <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
    </span>
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

  <div class="col-md-4 right-newcol">
   
     <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
    
  </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>

   </div>
  </div>

  <div class=" newcol " style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
     <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
    
     </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>
    <div class="col-md-4 right-newcol">
   
     <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
  </div>

  </div>
  </div>



  
   </div>
   

   
     </>
    
     
     }
      {location==='PS # 34' && <> 

      <div class="listing-new"  >  
       
<div class=" newcol" style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
   <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium 
  
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
   <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
     </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i>
</div>
</div>        
  
  
 </div>
  <div class="newcol" style={{padding:'10px 0px'}}>
 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

     <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
      
   </span>
    </div>

    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i>
    </div>
      <div class="col-md-4 right-newcol">
   
      <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating (Limited)
      
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
  </div>
  </div>

  <div class=" newcol" style={{padding:'10px 0px'}}> 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

    <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
    </span>
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

  <div class="col-md-4 right-newcol">
   
     <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
    
  </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
    </div>

   </div>
  </div>

  <div class=" newcol " style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
     <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
    
     </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
    </div>
    <div class="col-md-4 right-newcol">
   
     <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking (Limited)
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
  </div>

  </div>
  </div>


</div>
  
   
   

   
     </>
    
     
     } 
   {location==='PS # 26' && <> 
   
   <div class="listing-new"  > 
<div class=" newcol" style={{padding:'10px 0px'}}>
   <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
   <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium (Limited)
  
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
   <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
     </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
  
  
 </div>
  <div class="newcol" style={{padding:'10px 0px'}}>
 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

     <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating  
      
   </span>
    </div>

    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
      <div class="col-md-4 right-newcol">
   
      <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating 
      
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>
  </div>
  </div>

  <div class=" newcol" style={{padding:'10px 0px'}}> 
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">

    
    <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} />
    <span style={{marginLeft:'5px'}}>  Lavatories  
    </span>
  </div>
  <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
    </div>

  <div class="col-md-4 right-newcol">
   
     <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
    
  </span>
   </div>
   <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>

   </div>
  </div>

  <div class=" newcol " style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
   <div class="col-md-4 left-newcol">
 
     <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
    
     </span>
    </div>
    <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
    </div>
    <div class="col-md-4 right-newcol">
   
     <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
    </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
     <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
  </div>

  </div>
  </div>



  </div>
   
   

   
     </>
    
     
     }
     {location==='PS # 22' && <> 
     <div class="listing-new"  > 
       <div class=" newcol" style={{padding:'10px 0px'}}>
          <div class="row" style={{justifyContent:'center'}}>
          <div class="col-md-4 left-newcol">
        
          <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium
         
       </span>
       
       </div>
       <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
       <i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
       </div>
       <div class="col-md-4 right-newcol">
          <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
            </span>
       </div>
       <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
       <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i>
       </div>
       </div>        
         
         
        </div>
         <div class="newcol" style={{padding:'10px 0px'}}>
        
         <div class="row" style={{justifyContent:'center'}}>
          <div class="col-md-4 left-newcol">
       
            <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating (Limited)  
             
          </span>
           </div>
       
           <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
           <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
           </div>
             <div class="col-md-4 right-newcol">
          
             <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating 
             
           </span>
         </div>
         <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
         <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
           </div>
         </div>
         </div>
       
         <div class=" newcol" style={{padding:'10px 0px'}}> 
         <div class="row" style={{justifyContent:'center'}}>
          <div class="col-md-4 left-newcol">
       
           <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
           </span>
         </div>
         <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
         <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
           </div>
       
         <div class="col-md-4 right-newcol">
          
            <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
           
         </span>
          </div>
          <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
          <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
           </div>
       
          </div>
         </div>
       
         <div class=" newcol " style={{padding:'10px 0px'}}>
         <div class="row" style={{justifyContent:'center'}}>
          <div class="col-md-4 left-newcol">
        
            <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
           
            </span>
           </div>
           <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
           <i class="fa fa-close " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'red'}} aria-hidden="true"></i> 
           </div>
           <div class="col-md-4 right-newcol">
          
            <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking (Limited)
           </span>
         </div>
         <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
            <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
         </div>
       
         </div>
         </div>
       
       
       
         </div>
          
          
       
          
     </>
    
     
     } 
  
  {location==='PS # 20' && <>
  
  <div class="listing-new"  > 
   <div class=" newcol" style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

  <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium
 
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
  <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
    </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
 
 
</div>
 <div class="newcol" style={{padding:'10px 0px'}}>

 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

    <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating (Limited)  
     
  </span>
   </div>

   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
     <div class="col-md-4 right-newcol">
  
     <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating (Limited)
     
   </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
 </div>
 </div>

 <div class=" newcol" style={{padding:'10px 0px'}}> 
 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

   <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
   </span>
 </div>
 <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>

 <div class="col-md-4 right-newcol">
  
    <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
   
 </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
   </div>

  </div>
 </div>

 <div class=" newcol " style={{padding:'10px 0px'}}>
 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

    <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
   
    </span>
   </div>
   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
   </div>
   <div class="col-md-4 right-newcol">
  
    <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking (Limited)
   </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
 </div>

 </div>
 </div>

</div>

     </>
    
     
     }
     {location==='PS # 11' && <>
     <div class="listing-new"  > 
     
      <div class=" newcol" style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

  <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium
 
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
  <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
    </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
 
 
</div>
 <div class="newcol" style={{padding:'10px 0px'}}>

 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

    <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating 
     
  </span>
   </div>

   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
     <div class="col-md-4 right-newcol">
  
     <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating 
     
   </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
 </div>
 </div>

 <div class=" newcol" style={{padding:'10px 0px'}}> 
 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

   <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
   </span>
 </div>
 <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>

 <div class="col-md-4 right-newcol">
  
    <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
   
 </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
   </div>

  </div>
 </div>

 <div class=" newcol " style={{padding:'10px 0px'}}>
 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

    <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
   
    </span>
   </div>
   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
   </div>
   <div class="col-md-4 right-newcol">
  
    <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
   </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
 </div>

 </div>
 </div>

</div>

     </>
    
     
     }
        {location==='Middle School 7' && <> 
        
        <div class="listing-new"  > 
        <div class=" newcol" style={{padding:'10px 0px'}}>
  <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

  <i class="fa fa-building " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Auditorium
 
</span>

</div>
<div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',color:'#0AB50A' ,float:'left'}} aria-hidden="true"></i> 
</div>
<div class="col-md-4 right-newcol">
  <i class="fa-regular fa-lightbulb " title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Electrical / Lighting  
    </span>
</div>
<div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
<i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px',paddingRight:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
</div>
</div>        
 
 
</div>
 <div class="newcol" style={{padding:'10px 0px'}}>

 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

    <i class="fa-solid fa-chair" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Staff seating 
     
  </span>
   </div>

   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
     <div class="col-md-4 right-newcol">
  
     <i class="fa-solid fa-couch" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Public Seating 
     
   </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>
 </div>
 </div>

 <div class=" newcol" style={{padding:'10px 0px'}}> 
 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

   <img src="../image/unnamed.png" style={{height:'15px',width:'15px',cursor:'pointer'}} /><span style={{marginLeft:'5px'}}>  Lavatories  
   </span>
 </div>
 <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
 <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
   </div>

 <div class="col-md-4 right-newcol">
  
    <i class="fa-brands fa-accessible-icon" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Handicapped Access  
   
 </span>
  </div>
  <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
  <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
   </div>

  </div>
 </div>

 <div class=" newcol " style={{padding:'10px 0px'}}>
 <div class="row" style={{justifyContent:'center'}}>
  <div class="col-md-4 left-newcol">

    <i class="fa-solid fa-fan" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}>  Air Condition / Heating  
   
    </span>
   </div>
   <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
   <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i> 
   </div>
   <div class="col-md-4 right-newcol">
  
    <i class="fa-solid fa-car" title="View" style={{cursor:'pointer',color:'red'}} aria-hidden="true"></i> <span style={{marginLeft:'5px'}}> Parking 
   </span>
 </div>
 <div class="col-md-1" style={{paddingLeft:'0px',paddingRight:'0px'}}>
    <i class="fa fa-check " title="View" style={{cursor:'pointer',paddingLeft:'0px' ,float:'left',color:'#0AB50A'}} aria-hidden="true"></i>
 </div>

 </div>
 </div>

</div>

     </>
    
     
     }
  
        
         
        
  </div>


  
</div>

</div>
<div class="item-section">

<div class="container">
 
    <div class="row">
 
    {/* <div class="back-button col-md-12" style={{float:'left',textAlign:'left',marginBottom:'15px',paddingLeft:'0px'}}>
    <Link to={`/`}><i class="fa fa-arrow-left" aria-hidden="true"></i>
        <span>Back</span></Link>
            </div> */}
    {/* <div class="view-more-sec view-hover col-md-12" style={{float: 'left', cursor: 'pointer',position:'relative'}}> 
    <div class="item-left ">
            <Link to={`/`}><i class="fa fa-angle-double-left" aria-hidden="true"></i> &nbsp; Home</Link>
            </div>
            </div> */}
       <div class="col-md-7">
           <div class="item-left ">
               <h2 class="item-mid">About JCBOE Facility Rental System</h2>
               <p>JCBOE is pleased to announce a new online facility request and rental system designed to provide a positive user experience for all. With the new system, reservation requests can be submitted easily and will be handled more efficiently.</p>

               <p style={{marginTop:'10px'}} class="para-item"> Renters will be able to access photos and descriptions, see real-time availability, get estimated quotes, and track progress of their application.</p>

          <div class="item-amenitie-sec">
           <div id="accordion" class="myaccordion myitemaccordion">
         { allFacilities.length > 0 ? <>
           {   allFacilities.map((post,index)=>(          
           
            <div class="card-new" key={post.data.id}>
             <div class="card-header item-header"  onClick={()=>setShow(post.data.id)}>
               <h2 class="mb-0" style={{paddingBottom: '0px',borderBottom: 'none !important'}}>
                 <button class="d-flex align-items-center justify-content-between button-accordion button-item" >

                 {post.data.type}  

                  <span class="fa-stack fa-sm plus-addon">
                  
                  
            {post.amenities.length > 0 ?         
                 
                 <>
                 {/* {show===post.data.id ? 
                 
                  <input id=""  type="checkbox"   class="checkboxField" checked />
                   :
                 
                  <input id=""  type="checkbox"   class="checkboxField" />
                  } */}
                   <input id={'t'+post.data.id}  type="checkbox"    class="checkboxField"  />

                </>
                  // <i class="fa fa-stack-1x fa-inverse fa-angle-right"></i>
                  
                   :
                  <> 
                

                   <input id={'t'+post.data.id}  type="checkbox"   onChange={addFacility(post.data)} class="checkboxField"  />
                  </>
            }
                 </span>
                 

                 </button>

               </h2>

             </div>

            <div id="collapseThree" className={`collapse ${show===post.data.id && post.amenities.length > 0 ?'show':''}`} aria-labelledby="headingThree" data-parent="#accordion">

<div class="card-body">

{   post.amenities.map((childpost,index)=>( 
    <div class="form-top-sec" key={childpost.id}>

        <div class="row">
<div class="col-md-1"></div>
            <div class="col-md-4">
                  <div class="floating-label floating-school-label open-left-responsive">
                    <p style={{marginTop:'5px !important',color:'#686868',fontSize: '16px'}}>{childpost.amenities_name}</p>
                  </div>

            </div>
            <div class="col-md-4 item-number">
                <div class="floating-label">
                          <p class="quantity-sec">Number</p>
                      <div class="select is-primary">
                        <select id={'facnumberam'+childpost.id+'new'+post.data.id }>

                        {[...Array(parseInt(childpost.count))].map((e, i) => {
                         return <option map={i}> {i+1}</option>
                         })}
                        
                        </select>
                      </div>
                  </div>
            </div>

            {/* <div class="col-md-3">
                <div class="floating-label" >
                    <div class="radioOptions" style={{marginTop:'22px'}}>
                        <div class="radio-inner">
                            <p style={{color:'#686868'}}> <input name="orgaizationType" type="radio" value="Yes"/>  Yes  </p>
                        </div>

                        <div class="radio-inner">
                            <p style={{color:'#686868'}}> <input name="orgaizationType" type="radio" value="No"/> No </p>
                        </div>
                    </div>
                  </div>
            </div>



           


            <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px', visibility: 'hidden'}}>
                  <div class="floating-label price-sec-item">      
                    <p>$11 per/hour</p>
                  </div>
            </div> */}
<div class="col-md-1"></div>
            <div class="col-md-1" style={{paddingLeft: '0px',paddingRight:'0px'}}  onChange={addAmenities(post.data,childpost)}>
                <div class="add-to-cart">
                    {/* <i class="fa fa-plus-circle" aria-hidden="true" style={{fontSize: '19px'}}></i> */}
                    <input id={'child'+childpost.amenities_id} type="checkbox"  class="checkboxField-small" />
                </div>
            </div>                            

        </div>

          </div>

))}

</div>

</div>

           </div>
   ))
  }
           </>:<>facility is not available  <span ><Link to="/">BACK</Link></span> </>}

             

            

               

               

             





              

             </div>



          </div>

          

           </div>

       </div>

       <div class="col-md-5">

           <div class="itm-right">

               <div class="timeslots-select confirm-left">

                   <div class="row">

                       <div class="col-md-5">

                           <img src="../image/logo-round.png" class="img-schol-round img-item-round"/>

                       </div>

                       <div class="col-md-7" style={{paddingLeft:'0px'}}>

                           <div class="confirm-right-sec">

                               <h2> {(contentloc===true) ? 
                               <>
                               {(location==='Middle School 7') ? 
                                location 
                                :
                                'LOCATION '+location 
                               }

                             
                               </>
                              : location}

                               </h2>

                           </div>

                       </div>

                   </div>

                   <div class="timeslots-top date-section" style={{height:'115px'}}>

                       <div class="row date-sec">

                           <div class="col-md-3"  onClick={setShowCalenderShow} style={{textDecoration: 'none',cursor: 'pointer'}}>

                               <i class="fa-regular fa-calendar date-icon" aria-hidden="true"></i>



                           </div>

                           <div class="col-md-9"  onClick={setShowCalenderShow} style={{textDecoration: 'none',cursor: 'pointer',paddingLeft:'0px'}}>

                               <div class="data-para">

                               <h3 > Date</h3>

                               <p style={{marginBottom: '0px', textAlign: 'left'}}>{booking1.date} {booking1.month+' '+booking1.year}</p>

                               <a onClick={setShowCalenderShow}  class="btn-time btn-change" style={{textDecoration: 'none',cursor: 'pointer',color:'#646663', textAlign: 'left'}}>Change Date </a>

                           </div>

                           </div>

                       </div>



                       





                       

                   </div>



                   <div class="timeslots-top timeslots-tops" style={{marginLeft:'0px',marginRight:'0px'}}>

                   



                       <div class="row date-sec">

                           <div class="col-md-3" onClick={handleShow2} style={{textDecoration: 'none',cursor: 'pointer'}}>

                               <i class="fa-regular fa-clock date-icon" aria-hidden="true"></i>



                           </div>

                           <div class="col-md-9" onClick={handleShow2} style={{textDecoration: 'none',cursor: 'pointer',paddingLeft:'0px'}}>

                               <div class="data-para" >

                               <h3> Time <span class="hour-para" style={{fontFamily: 'Heebo-Regular',fontSize: '15px'}}></span></h3>

                               <p style={{marginBottom: '0px'}}>{booking1.time} - {booking1.endtime}</p>

                               <a onClick={handleShow2}  class="btn-time " style={{textDecoration: 'none',cursor: 'pointer',color:'#646663'}}>Select Time</a>

                           </div>

                           </div>

                       </div>





                   </div>

                  



<div class="calender-wraps" id="calender-show" style={{display:'none',marginTop:'-11px', zIndex: '999999'}}>

<div class="date-wrap">

 <div class="left">

     <div class="btn-previous" id="previous-month" data-id="5b2fea0bd26722002483114d"><span class="fa fa-angle-left" aria-hidden=""></span></div>

 </div>



 <div class="right">

     <div class="btn-nexts">

         <span class="fa fa-angle-right" aria-hidden=""></span></div>

 </div>



 <div class="mid">

     <span class="date-title" id="current-selected-date" data-current-date="">June 2021</span>&nbsp;&nbsp;<span id="month-dd" class="fa fa-calendar cursor" aria-hidden=""></span>

    </div>

</div>





</div>


{ showCalender?                         
 <>
<div class="calender-wraps">
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

<div class="amenty-section">

<h2>Facilities</h2>

<div id="accordion" class="myaccordion">


{   storeFacilities.map((post,index)=>(     


  <div class="card"  style={{boxShadow: 'none'}} onClick={()=>setChShow(post.facilityid)} key={post.amenitiesid} >

    <div class="card-header" id="headingfourteen">

      <h2 class="mb-0">

        <button class="d-flex align-items-center justify-content-between button-accordion " data-toggle="collapse" data-target="#collapsefourteen" aria-expanded="false" aria-controls="collapsefourteen">

        

        <span>{post.facilityName}</span>  

         <span style={{visibility:'hidden'}}><p class="total-para">$18</p></span>

          <span class="fa-stack fa-sm">

            {/* <i class="fa fa-angle-down fa-stack-2x"></i> */}
            {post.amenities.length > 0 ? 
            <i class="fa fa-angle-down fa-stack-2x"></i>:<i class="fa fa-minus-circle" style={{color: '#d60303', fontSize: '17px'}} onClick={()=>removeFacility(post)}></i>
            }
            {/* <i class="fa fa-stack-1x fa-inverse"></i> */}


          </span>

          

        </button>

      </h2>

    </div>

    <div id="collapsefourteen" className={`collapse ${chshow===post.facilityid && post.amenities.length > 0 ?'show':''}`} aria-labelledby="headingfourteen" data-parent="#accordion">

      <div class="card-body">

          

                <div class="form-top-sec" style={{marginTop:'10px'}}>
               
                  <div class="row">

                     <table style={{boxShadow: 'none'}}>

                      <tbody><tr class="bo-border">

                          <th class="audi-table" style={{textAlign:'left',width:'130px'}}>Amenities</th>

                          <th class="audi-table" style={{width:'90px'}}>Numbers</th>

                          <th class="audi-table" style={{width:'60px',visibility:'hidden'}}>Cost</th>

                         

                        </tr>
                        {   post.amenities.map((postChild,index)=>(  
                        <tr class="bo-border">

                          <td style={{padding:'6px 2px',fontSize:'13px',color:'hsl(0deg 0% 38%)',textAlign:'left'}}>{postChild.amenities_name}                                              </td>

                          <td style={{padding:'6px 0px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>

                              <div class="value-button" id="decrease" onClick={() => {increasevalue("decrement",post.facilityid,postChild.amenitiesid)}} style={{cursor:'pointer'}} value="Decrease Value">-</div>

                              <input type="text" id="number" class="number" value={postChild.countam} style={{padding:'13px ​0px !important'}}/>

                              <div class="value-button increaseavl"  onClick={() => {increasevalue("increment",post.facilityid,postChild.amenitiesid)}}  style={{cursor:'pointer'}} value="Increase Value">+</div>

                          </td>

                          <td style={{padding:'6px 2px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}><i class="fa fa-minus-circle"  onClick={()=>removeAmenities(post,postChild)}></i></td>

                          

                        </tr>

))}


                     </tbody></table>

                  

                  </div>
             
               </div>
                 

      </div>

    </div>

  </div>

 
))}
    





  

  </div>

  <div class="row price-secs" style={{visibility:'hidden',marginLeft:'0px',marginRight:'0px',marginBottom: '0px',marginTop:'-20px'}}>

    <div class="col-md-8 price-left">

        <p>Grand Total</p>

    </div>

    <div class="col-md-4 price-right">

        <p>$117</p>

    </div>

   

</div>
{applicant_id1 ?  <>
  { (applicant_id1.length <4) ?                       
    <>
    {applicant_id1!='0000' 
      ? <>   
      {applicant_id1!='0001' 
      ? 
          
     <>
     
     {applicant_id1!='0003' 
? 
    
<div class="col-md-12" > 
<a  class="btn-book btn-process btn-check "   style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}} onClick={()=>chkfacilitiesLogin()}>Request Booking</a>  
</div>
:
<div class="col-md-12" >

<a  onClick={()=>[initiateLogin()]}  class="btn-book btn-process btn-check "   style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}}>Request Booking</a>  
</div>
}
     
     </>
      :
      <div class="col-md-12" >

      <a  onClick={()=>[initiateLogin()]}  class="btn-book btn-process btn-check "   style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}}>Request Booking</a>  
    </div>
}
  </>   
   
      : <div class="col-md-12" >

      <a  onClick={()=>[initiateLogin()]}  class="btn-book btn-process btn-check "   style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}}>Request Booking</a>  
    </div>
    }
   
  </>
     :<>
     <div class="col-md-12" >

  <a  onClick={()=>[initiateLogin()]}  class="btn-book btn-process btn-check "   style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}}>Request Booking</a>  
</div>
     </>
     }



</> :<>
<div class="col-md-12" >

<a  onClick={()=>[initiateLogin()]}  class="btn-book btn-process btn-check "   style={{textDecoration: 'none',color:'#ffffff',cursor:'pointer'}}>Request Booking</a>  
</div>
</> }






</div>


</div>

               </div>

           </div>



       </div>

    </div>





 



    <div class="facility-sub-sec">

        <div class="container">

            <div class="row" style={{display:'none'}}>

               <div class="col-md-12" >

                   <h2 style={{textAlign: 'left'}}>Smiliar Facilities</h2>
                   <Carousel responsive={responsive}>

{   moreFacilities.map((post,index)=>(                     
<div class="child card" key={post.id} >
<img class="card-img-top card-caro " src="../image/rooms.jfif" alt="Card image cap"/>
<div class="img-sample img-sample-slide img-card-caro card-book"><span>SAMPLE PHOTO</span></div>
<div class="card-body card-school">       
<h5 class="card-title card-tit-view">{post.type}</h5>



<a onClick={()=>{viewFacility(post)}} style={{textDecoration:'none',fontSize:'14px'}} class="card-text card-view">View more</a>



</div>

</div> 
))
}



</Carousel>
               </div>

            </div>

        </div>

    



   </div>

   



</div>

<Modal show={show1} onHide={handleClose1} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center'}}>Your request is saved as Draft under My Bookings, click here to Proceed </p>

<div class="begin-button request-btn" style={{marginTop:'23px'}}>

<a  class="btn-book" onClick={finalSubmit} style={{cursor: 'pointer'}}>Click Here{submitStatus}</a>

</div>

</div>
</div>
      
</Modal>
<Modal show={show2} onHide={handleClose2} className="header-ready">
              <div class="" style={{backgroundColor: '#ffffff',width:'600px'}}>
        <Modal.Header closeButton className="header-viewfac">
        <div class=" modal-time-apply" style={{paddingTop:'0px'}}>

<h5 class="modal-title modal-time-title apply-heading" id="exampleModalLongTitle">Ready? </h5>

{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>&times;</span>

</button> */}

</div>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body modal-body-apply">

<p>Would you like to book this {pageInfo.facility} at {pageInfo.location}</p>

<ul style={{width:'45%',float:'left'}}>



    <li class=""><i class="fa fa-check" aria-hidden="true"></i>

        Event date {date} {calendernfo.month+' '+calendernfo.currentYear}</li>

        <li style={{width:'300px'}}  ><i class="fa fa-check" aria-hidden="true"></i>

            Event Timings <span style={{textTransform : 'uppercase'}}>{time1} to {endtime1}</span></li>

</ul>

<div class="" style={{width: '55%',float:'left'}}>

<div class="" style={{width: '45%',float: 'left',marginRight: '20px', borderBottom: '1px solid #cccccc'}}>

<p style={{fontSize: '14px',marginBottom: '0px',fontFamily: 'Heebo-Medium'}}>Start Time</p>

<span onClick={() => setShowTime1()} style={{color: '#506172', fontSize: '14px' ,cursor:'pointer'}}>{time1}</span>

                
            </div>

<div class="" style={{width: '45%',float: 'left', borderBottom: '1px solid #cccccc'}}>

<p style={{fontSize: '14px',marginBottom: '0px',fontFamily: 'Heebo-Medium'}}>End Time</p>

<span onClick={() => setEndShowTime1()} style={{color:'#506172', fontSize: '14px' ,cursor:'pointer'}}>{endtime1}</span>
</div>

</div>
{/* onClick={letsBegan} */}
<div class="begin-button" style={{marginTop:'50px',cursor:'pointer'}} >

<a  class="btn-book" style={{right:'13px', position:'relative'}} onClick={changeTime}>Set Time</a>

</div>

<div>
            {showTime &&
                <TimeKeeper
                    time={time1}
                    onChange={(newTime) => setTime(newTime.formatted12)}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }


{showEndTime &&
                <TimeKeeper
                    time={endtime1}
                    onChange={(newTime) => setEndTime(newTime.formatted12)}
                    onDoneClick={() => setEndShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }
            
            
        </div>
</div>
        </Modal.Body>
        </div>
      </Modal>

      
  <Modal show={showM} onHide={handleCloseM} className='closelogin'>
    <div class="login-close">
        <Modal.Header closeButton >
        </Modal.Header>
       

    <div class="modal-content content-popup">

      <div class="modal-inner modal-login-inner">

      <div class=" login-apply modal-time-apply" style={{paddingTop:'0px', paddingBottom: '0px', paddingLeft: '0px', borderBottom: '1px solid #cccccc !important'}}>

<h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" >LOGIN </h5>

{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

</button> */}

</div>
     <div class="modal-body modal-body-apply">

<div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>

  <div class="form-sec" style={{marginTop:'12px'}}>

      

      <input type="text" placeholder="Email id" name="signIn_email" onChange={inputEventSignIn} value={signIn.signIn_email} />
 {(signIn.error_email === 1 && signIn.signIn_err===2) && <span style={style}>* Enter Email</span> }
  </div>

  <div class="form-sec" style={{marginTop:'13px'}}>
    <input type="password" placeholder="Password" name="signIn_password" id="signIn_password" onChange={inputEventSignIn} value={signIn.signIn_password}/>
      <i class="fa fa-eye-slash" onClick={checkpasstype} id="ibtuton" aria-hidden="true"   style={{color:'grey',position:'relative',top:'-29px',right:'-265px',fontSize:'11px',cursor:'pointer'}}></i>

    {/* <div class="demo">
 <a href="#" data-tooltip="Password is your 10 digit phone number that you used to register yourself"><i class="fa fa-info-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"  style={{color:'red',float:'right',position:'absolute',top:'-46px',cursor:'pointer',marginLeft:'5px',right:'-163px'}}></i></a>

</div>
         */}
{(signIn.error_password === 1 && signIn.signIn_err===2) && <span style={style}>* Enter Password</span> }
</div>

<div class="form-login">

  <p onClick={forgotPassword}>Forgot Your Password?</p>

  {(signIn.signIn_err === 1) && <>
    <span ><p style={{color:'#ff0000',fontSize:'15px',lineHeight:'15px'}}>{signIn.signIn_mesage}</p></span>
    {(signIn.signIn_mesage !='') ?
    <p style={{fontSize: '10px',fontStyle: 'italic',color:'rgb(15 100 5)',lineHeight:'0px',marginBottom:'22px'}}><span>Try Forgot Your Password to retrieve your login details.</span></p>

: <></> }
  </>
  
  
  
  }


</div>

<div class="login-button"  >


  <a class="btn-button" style={{textDecoration: 'none',cursor:'pointer'}} onClick={initiateSignIn}>Login</a>
  
 
</div>



<div class="create-sec">
<p style={{fontSize: '11px',fontStyle: 'italic',color:'#ff0000',lineHeight:'19px'}}><span>Your request will be saved as Draft under My Bookings, please login to proceed</span></p>

<Link to="/confirm"><p>Don't have an account? <span><a href="#" style={{textDecoration: 'none'}}>Create an Account</a></span>



  </p></Link>

</div>

</div>

</div>
      </div>
      </div>
      </div>


      
</Modal>
<Modal show={showR} onHide={handleCloseR} className='closelogin'>
    <div class="login-close">
        <Modal.Header closeButton >
        </Modal.Header>
       

    <div class="modal-content content-popup">

      <div class="modal-inner modal-login-inner">

      <div class=" login-apply modal-time-apply" style={{paddingTop:'0px', paddingBottom: '0px', paddingLeft: '0px', borderBottom: '1px solid #cccccc !important'}}>

<h5 class="modal-title modal-time-title login-heading" id="exampleModalLongTitle" >Forgot Password  </h5>

{/* <button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>×</span>

</button> */}

</div>
     <div class="modal-body modal-body-apply">

<div class="col-md-12" style={{paddingLeft:'0px',paddingRight: '0px'}}>

  <div class="form-sec" style={{marginTop:'12px'}}>

      

      <input type="text" placeholder="Email id" name="Reset_email" id="Reset_email"  onChange={inputEventResetpassword} value={Resetpassword.Reset_email} />
 {(Resetpassword.error_email === 1 && Resetpassword.Resetpassword_err===2) && <span style={style}>* Enter Email</span> }

  </div>

  <div class="form-sec" style={{marginTop:'12px'}}>

  
</div>

<div class="login-button"  >


  <a class="btn-button" style={{textDecoration: 'none',cursor:'pointer'}} onClick={initiateReset} >Reset Password</a>
 
</div>
<div class="form-login" style={{marginTop:'12px'}}>
{(Resetpassword.Resetpassword_err === 1) && <span style={style}><p style={style}>{Resetpassword.Resetpassword_mesage}</p></span> }

  
</div>




<div class="create-sec" > 
    <p style={{fontSize: '12px',fontStyle: 'normal'}}><span>We have send you an Email.</span>


  </p>

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


<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealert()}}>Ok</button>

</div>
</div>
      
</Modal> 
<Modal show={showalertsuccess} onHide={handleClosealertsuccess} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

            {(Alertsuccess.Alertsuccess_err === 1) &&<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#007500'}}>{Alertsuccess.Alertsuccess_message}</p> }


<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealertsuccess()}}>Ok </button>

</div>
</div>
      
</Modal> 
</React.Fragment>
        
        
        )
    

  
}

export default Booking;