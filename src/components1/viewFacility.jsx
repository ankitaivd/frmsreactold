import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import Parser from 'react-html-parser';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dateFormat from 'dateformat';
import Modal from 'react-bootstrap/Modal';
import TimeKeeper from 'react-timekeeper';
import { addTodo } from "../actions/index";
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
const  ViewFacility =()=> {
  const [booking1,setBooking1]=useState({
    schoolFacility:"",
    location:"",
    schoolFacilitySelect:"",
    date:'',
    time:'',
    endtime:''
    
  });
  const { id } = useParams();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const dispatch=useDispatch();
  const [moreFacilities, setMoreFacilities] = useState([]);
  
  const [pageInfo, setPageInfo] = useState({
    facility:"",
    facilityId:"",
    location:"",
    locationNumber:""
  });




  const [calendernfo, setCalender] = useState({
    data:"",
    date:"",
    currentYear:"",
    month:""
  
  });
  let currentYear = new Date().getFullYear();
  let month = new Date().getMonth() + 1;

  const schoolFacility = useSelector((state) => state.todoReducer.schoolFacility);
  const schoolFacilitySelect = useSelector((state) => state.todoReducer.schoolFacilitySelect);
  const date1 = useSelector((state) => state.todoReducer.date);

  // if(name){
  //   alert(name);
  // }

  var dateFormat = require("dateformat");
  var now = new Date();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:34pm');
  const [showTime, setShowTime] = useState(false);

  const [endtime, setEndTime] = useState('01:00pm');
  const [showEndTime, setEndShowTime] = useState(false);

   const setShowTime1=()=>{
    setShowTime(!showTime);
    setEndShowTime(false);
    // setTime(true);
    // setEndTime(false);
  }


  
  const applyleave=()=>{
    alert("hrrr");
  }


  const clickHandler=(e)=>{
    const el = e.target.closest("td");    
    if (el && e.currentTarget.contains(el)) {    
     let a =Number(el.innerHTML);
     setDate(a);
     setShow1(true);
     setBooking1({ 
      schoolFacility:id,
      location:pageInfo.location,
      schoolFacilitySelect:"",
      date:a,
      endtime:endtime,
      time:time      
    })
     
    dispatch(booking({
      schoolFacility:id,
      location:pageInfo.location,
      schoolFacilitySelect:"",
      date:date1,
      endtime:endtime,
      time:time
     }));

    }
  }


  const letsBegan=()=>{

// alert(time);
// alert(endtime);

    setBooking1((preValue)=>{     

       return {
        schoolFacility:id,
        location:pageInfo.location,
        schoolFacilitySelect:"",
        date:date,
        endtime:endtime,
        time:time
       };

      });



      // alert(booking1.time);
      // alert(booking1.endtime);
    // dispatch(booking(booking1));
    dispatch(booking({
      schoolFacility:id,
      location:pageInfo.location,
      schoolFacilitySelect:"",
      date:date,
      endtime:endtime,
      time:time
     }));

    
  }

//   if(booking1.time)
// return  <Redirect to="/booking" />;
  


  const abc=()=>{
    alert("hello");
      }

   const setEndShowTime1=()=>{
    setShowTime(false);
    setEndShowTime(!showEndTime);
    // setTime(false);
    // setEndTime(true);
  }


useEffect(() => {
  // alert(schoolFacility);
  // alert(schoolFacilitySelect);
  // alert(date1);
  Axios.post("viewfacility",{school_facilities_id:id})
 .then(res =>{
   console.log("request");
   console.log(res.data);
   
  setMoreFacilities(res.data.moreFacility);
  setPageInfo({
  facility:res.data.facilityInfo.type,
  facilityId:res.data.facilityInfo.id,
  location:res.data.locationInfo.locationName,
  locationNumber:res.data.locationInfo.location})
 
 });


 Axios.post("get_calendar")
 .then(res =>{
   console.log("calender");
   console.log(res.data);
   setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
   
 });

 },[]);
   
 const viewFacility=(ev)=>{
  Axios.post("viewfacility",{school_facilities_id:ev.sfid})
 .then(res =>{
   console.log("request");
   console.log(res.data);
   
  setMoreFacilities(res.data.moreFacility);
  setPageInfo({
  facility:res.data.facilityInfo.type,
  facilityId:res.data.facilityInfo.id,
  location:res.data.locationInfo.locationName,
  locationNumber:res.data.locationInfo.location})
 
 });
 }

 const changeDate=(day)=>{
   
  Axios.post("get_calendar",{day:day,date:calendernfo.date})
  .then(res =>{
    console.log("calender");
    console.log(res.data);
    setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
   
  });
 }
        
        
        // if (!type) return <Redirect to="/login" />;
 
        
        // const type = useSelector((state) => state.todoReducer.type);

        // if (type==='admin') return <Redirect to="/dashboard" />;
        //   else if(type==='participant' || type=== 'wpadmin') return <Redirect to="/home" />;
        //   else  return <Redirect to="/" />;
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


        return (
        <React.Fragment>
<div class="banner">

<div class="hero_image" style={{backgroundImage: 'url(../image/auditorium.jfif)'}}></div>

<div class="container">

  <div class="d-content d-content-view ">

   

    <div class="listing-sec">

        <a href="more-listing.html" class="view-button" style={{textDecoration: 'none'}}>View More Listing</a>

    </div>

    

  </div>

  <div class="d-content d-sample-pic">

      <div class="sample-banner-img">

          <a  class="sample-banner" style={{textDecoration: 'none'}}>SAMPLE PHOTO</a>

        </div>

  </div>





  

</div>



</div>



<div class="view-facility-sec">

       <div class="container">

        <div class="row">

<div class="col-md-8">

                <div class="detail-page-header">					

					<div class="pull-left">

						<h2>{pageInfo.facility}</h2>

						<h3>at {pageInfo.location}</h3>

					</div>

					<div class="pull-right">

						

						

					</div>	

					<div class="clearfix"></div>

                    <div class="row" style={{marginTop:'20px'}}>

                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{fontFamily: 'Heebo-Bold'}}>Amenities:</div>

                        <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">

                            <dl class="facility-useage">

                                <dd><ul>

                                

                                    <li>With Balcony, </li>

                                

                                    <li>Stage Lighting,</li>

                                

                                    <li>Public Address System,</li>

                                

                                    <li>Risers,</li>

                                

                                    <li>Piano</li>

                                

                                    

                                </ul></dd>

                            </dl>

                        </div>

                    </div>	

                    <div class="row">    

                         <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{fontFamily: 'Heebo-Bold'}}>Rates:</div>   

                          <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 text-left content-para">From $15.00 per hour.  Additional fees may apply for services, utilities, etc.</div>  

                     </div>	

                     

                     

                   

                     <div class="multiple-school multiple-differ-sec">

                        <div class="container">

                            <div class="row">

                                <div class="col-md-12">

                                    <h2 class="more-para">View more facilities</h2>
                                    <Carousel responsive={responsive}>

              {   moreFacilities.map((post,index)=>(                     
<div class="child card" key={post.id} >
    <img class="card-img-top" src="../image/rooms.jfif" alt="Card image cap"/>
    <div class="img-sample img-sample-slide"><span>SAMPLE PHOTO</span></div>
    <div class="card-body card-school">       
      <h5 class="card-title card-tit-view">{post.type}</h5>

     

     <a onClick={()=>{viewFacility(post)}} style={{textDecoration:'none',fontSize:'14px'}} class="card-text card-view">View more</a>

      

    </div>

  </div> 
    ))
  }
  
  
  
</Carousel>
                                </div>
{/* <span renderArrowPrev></span> */}


                            </div>

                          </div>

                        </div>

                     

				</div>

            </div>

            <div class="col-md-4">

              

                <div class="timeslots-select">

                    <div class="calender-inner">

                        <div class="timeslots-top time-view">

                            <div id="right-box-title top-select" class="top-title text-center" style={{paddingTop: '15px',fontSize: '17px'}}>Select Your Date</div>

                       <div id="right-box-title" class="top-title text-center top-below" style={{marginTop: '-8px'}}>

                       {dateFormat(now,"ddd dS mmm, yyyy")}

                           <p class="para-change-date">Change Date</p>

                       </div>

                        </div>

                       

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


 {/* {Parser(calendernfo.data)} */}
 {/* { calendernfo.data } */}
 {/* <div className="Container" dangerouslySetInnerHTML={{__html: calendernfo.data}}></div> */}
 <div onClick={clickHandler} dangerouslySetInnerHTML={{__html: calendernfo.data}}></div>





                         

                        </div>



  
                        {/* <Carousel responsive={responsive}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel> */}




                    </div>

                </div></div>
            </div>
            </div>
            </div>

            <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
        <div class="modal-header modal-time-apply" style={{paddingTop:'26px'}}>

<h5 class="modal-title modal-time-title apply-heading" id="exampleModalLongTitle">Ready? </h5>

<button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>&times;</span>

</button>

</div>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body modal-body-apply">

<p>Would you like to book this {pageInfo.facility} at {pageInfo.location}</p>

<ul style={{width:'45%',float:'left'}}>



    <li class=""><i class="fa fa-check" aria-hidden="true"></i>

        Event date {date} June 2021</li>

        <li  ><i class="fa fa-check" aria-hidden="true"></i>

            Event Timings <span style={{textTransform : 'uppercase'}}>{time} to {endtime}</span></li>

</ul>

<div class="" style={{width: '55%',float:'left'}}>

<div class="" style={{width: '45%',float: 'left',marginRight: '20px'}}>

<p style={{fontSize: '14px',marginBottom: '0px',fontFamily: 'Heebo-Medium'}}>Start Time</p>


                <span onClick={() => setShowTime1()}>{time}</span>

                
            </div>

<div class="" style={{width: '45%',float: 'left'}}>

<p style={{fontSize: '14px',marginBottom: '0px',fontFamily: 'Heebo-Medium'}}>End Time</p>

<span onClick={() => setEndShowTime1()}>{endtime}</span>
</div>

</div>

<div class="begin-button" style={{marginTop:'50px'}} onClick={letsBegan}>

<Link to="/booking"><a  class="btn-book">Let's Begin</a></Link>

</div>

<div>
            {showTime &&
                <TimeKeeper
                    time={time}
                    onChange={(newTime) => setTime(newTime.formatted12)}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }


{showEndTime &&
                <TimeKeeper
                    time={endtime}
                    onChange={(newTime) => setEndTime(newTime.formatted12)}
                    onDoneClick={() => setEndShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }
            
            
        </div>
</div>
        </Modal.Body>
      
      </Modal>

</React.Fragment>
        
        
        )
    

  
}

export default ViewFacility;