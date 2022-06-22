import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { siteData } from "../actions/siteData";
import Modal from 'react-bootstrap/Modal';
import { booking } from "../actions/booking";
import dateFormat from 'dateformat';
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
const  Home =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
  });
  var dateFormat = require("dateformat");
  var now = new Date();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [fac, setFac] = useState(0);
  const [loc, setLoc] = useState(0);

  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });
//   const location = useLocation();
  const [facilities, setFacilities] = useState([]);
  const [callevent, setCallevent] = useState('facility');
//   const handleHalfClose = () => setHalfShow(false);
//   const handleHalfShow = () => setHalfShow(true);
const [calendernfo, setCalender] = useState({
  data:"",
  date:"",
  currentYear:"",
  month:""

});
const [date, setDate] = useState('');
const [time, setTime] = useState('12:34pm');
let currentYear = new Date().getFullYear();
let month = new Date().getMonth() + 1;

  const dispatch=useDispatch();


//   const name = useSelector((state) => state.todoReducer.name);
//   const empid = useSelector((state) => state.todoReducer.empid);
//   const type = useSelector((state) => state.todoReducer.type);
  
  useEffect(() => {

    dispatch(siteData({page:'home'}));
     Axios.post("getAllFacility")
    .then(res =>{
      console.log("request");
      console.log(res.data.response);
      
      setFacilities(res.data.response);
    
    });

    Axios.post("get_calendar")
 .then(res =>{
   console.log("calender");
   console.log(res.data);
   setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
   
 });
   
    },[]);

    useEffect(() => {

      if(callevent==='facility'){

        dispatch(siteData({page:'home'}));
        Axios.post("getAllFacility")
        .then(res =>{
          console.log("request");
          console.log(res.data.response);
          
          setFacilities(res.data.response);
        
        });
    }else{

      Axios.post("locationList",{perpage:10,page:1})
      .then(res =>{
        console.log("request");
        console.log(res.data.response);
        
       setFacilities(res.data.response);
      
      });





    }
     
      },[callevent]);
   
    const callFunction=(v)=>{
      console.log(v);

     // if(v==='location'){
        setCallevent(v);
     
      
    }

    const getLocationFacility=(data)=>{
      console.log(data);
      // setLocation(data.id);

       Axios.post("getLocationFacility",{facilityid:data.id})
        .then(res =>{
          console.log("request");
          console.log(res.data.response);
          
          alert("facility set");
          alert(data.id);
          setFac(data.id);
          // setShow1(true);
          setFacilities(res.data.response);
        
        });

    }


        
        
        // if (!type) return <Redirect to="/login" />;
 
        
        // const type = useSelector((state) => state.todoReducer.type);

        // if (type==='admin') return <Redirect to="/dashboard" />;
        //   else if(type==='participant' || type=== 'wpadmin') return <Redirect to="/home" />;
        //   else  return <Redirect to="/" />;
        const clickHandler=(e)=>{

          const el = e.target.closest("td");    
          if (el && e.currentTarget.contains(el)) {    
           let a =Number(el.innerHTML);
          // alert(a);
           setDate(a);

           dispatch(booking({
            schoolFacility:fac,
            location:loc,
            schoolFacilitySelect:fac,
            date:a,
            endtime:0,
            time:0,
            month:calendernfo.month,
            year:calendernfo.currentYear 
           }));


          }
        

          

        }
        const changeDate=(day)=>{
   
          // Axios.post("get_calendar",{day:day,date:calendernfo.date})
          // .then(res =>{
          //   console.log("calender");
          //   console.log(res.data);
          //   setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
           
          // });

         }



         if (date) return <Redirect to="/booking" />;

         

        return (
        <React.Fragment>


<div class="search-sec">

<div class="container">

  <div class="row">

    <div class="col-md-12">

     

        <div class="dropddown-main">

        <div class="dropdown-sort">

          

          <a onClick={()=>[callFunction('facility'),setFac(0)]} className={`btn-view ${callevent==='facility'?'btn-view-sort':''}`} style={{textDecoration: 'none',cursor:'pointer'}}>Select by Facility</a>

        </div>

        <div class="dropdown-sort dropdown-right">

          

          <a onClick={()=>callFunction('location')} className={`btn-view ${callevent==='location'?'btn-view-sort':''}`} style={{textDecoration: 'none',cursor:'pointer'}}>Select by Location</a>

        </div>

      </div>

    </div>

  </div>

</div>

</div>
    <div class="multiple-school mutiple-facility">
    <div class="container">     
        <div class="row">
          <div class="col-md-12">
           </div>      

            
          <div class="col-sm-12">
 <div class="sort-by-section">

  <a href="#" class="sort-date" data-toggle="modal" data-target="#basicModal">Sort by Date</a>
 
            </div>
            <p class="para-more">Spaces for all your community needs </p>
              </div>
               {(callevent==='facility')?<>
              {   facilities.map((post,index)=>(
                <>



                
{(index === 4 ? 
  (    <div class="col-sm-4 col-md-4" style={{marginTop: '20px',paddingLeft: '0px',paddingRight: '0px'}}>
                        
  <div class="content-home content-bg">
    <a href="#" target="_blank" style={{textDecoration: 'none'}}>
      
      <img class="content-image" />
      <div class="content-details">
        <h3 class="content-titles ">FRMS</h3>
        <img src="./image/arrow.png" class="img-content"/>
        
      </div>
    </a>
 
</div>
</div>) 
  : ('') 
)}
                    <div class="col-sm-4 col-md-4" style={{marginTop: '20px'}}>
                        
                            <div class="content-home">
                              <a  target="_blank" style={{textDecoration: 'none'}}>
                                <div class="content-overlay"></div>
                                <img class="content-image" src="./image/audi.jpg"/>
                                <div class="content-details">
                                  <h3 class="content-title">
                                  {fac !==0 ?  post.locationName:post.type}
                                    </h3>
                                    {fac !==0 ? <a onClick={()=>[setShow1(true),setLoc(post.location)]} class="btn-view" style={{textDecoration: 'none'}}>View</a>:
                                  <a onClick={()=>getLocationFacility(post)} class="btn-view" style={{textDecoration: 'none'}}>View</a>
}
                                </div>
                                {/* <div class="img-sample" style={{bottom: '0px'}}><span>SAMPLE PHOTO {index}</span></div> */}
                              </a>
                           
                          </div>
                    </div>


</>
 ))
}
</>:
<>
{   facilities.map((post,index)=>(
 <div class="col-sm-4 col-md-4" style={{marginTop: '20px'}}>
                        
 <div class="content-home">
   <a  target="_blank" style={{textDecoration: 'none'}}>
     <div class="content-overlay"></div>
     <img class="content-image" src=""/>
     <div class="content-details">
       <h3 class="content-title">{post.locationName}</h3>
       {/* <p class="content-text">Liberty High School</p>                                   */}
       <a onClick={()=>[setShow1(true),setLoc(post.location)]} class="btn-view" style={{textDecoration: 'none'}}>View</a>
     </div>
     {/* <div class="img-sample" style={{bottom: '0px'}}><span>SAMPLE PHOTO {index}</span></div> */}
   </a>

</div>
</div>
))}
                      </>

 }
                    

              

          


   







              
                
           
          
          
        </div>
      </div>
    </div>

    <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
        {/* <div class="modal-header modal-time-apply" style={{paddingTop:'26px'}}>

<h5 class="modal-title modal-time-title apply-heading" id="exampleModalLongTitle">Ready? </h5>

<button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>&times;</span>

</button>

</div> */}
        </Modal.Header>
        <Modal.Body>
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



<div onClick={clickHandler} dangerouslySetInnerHTML={{__html: calendernfo.data}}></div>





         

        </div>







    </div>

</div>
</div>
        </Modal.Body>
      
      
      </Modal>

</React.Fragment>
        
        
        )
    

  
}

export default Home;