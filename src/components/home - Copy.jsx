import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { siteData } from "../actions/siteData";
import Modal from 'react-bootstrap/Modal';
import { booking } from "../actions/booking";
import dateFormat from 'dateformat';
import { userData } from "../actions/userData";
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
  const [callevent, setCallevent] = useState('location');
  const [paginationfac,setPaginationfac] = useState({perPage:8,totalCount:0,totalPage:1,currentPage:1});
  const [addindexfac, setAddindexfac] = useState();
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
// let a=0;
// if(useSelector((state) => state.todoReducer3)){
//    a = useSelector((state) => state.todoReducer3);
// }
const [showalert, setShowalert] = useState(false);
const handleClosealert = () => setShowalert(false);
const handleShowalert = () => setShowalert(true);
const reducer3 = useSelector((state) => state.todoReducer3);
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
});
  useEffect(() => {
console.log("reducer");

 




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


    dispatch(siteData({page:'home'}));
     Axios.post("getAllFacility")
    .then(res =>{
      console.log("request");
      console.log(res.data.response);
      
      setFacilities(res.data.response);
    
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

      Axios.post("locationList",{perpage:8,page:1})
      .then(res =>{
        console.log("request");
        console.log(res.data);
        console.log(res.data.locationhomedeat);
        
       setFacilities(res.data.locationhomedeat);
       setPaginationfac((preValue)=>{
        return { 
          perPage:8,
          totalCount:res.data.paginationloc.totalCount,
          totalPage:res.data.paginationloc.totalPage,
          currentPage:1  
        }   
      });
      
      });





    }
     
      },[]);
      const callPaginationfac =(s)=>{
        console.log(s);
        console.log(fac)
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
        
        if(fac!=''){
          Axios.post("getLocationFacility",{facilityid:fac,perpage:paginationfac.perPage,page:a})
          .then(res =>{
            console.log("request");
            console.log(res.data.response);
            
          
          
            setFac(fac);
         
            setFacilities(res.data.newlocationdeatils);
            setPaginationfac((preValue)=>{
              return { 
                 perPage:preValue.perPage,
              totalCount:res.data.paginationloc.totalCount,
              totalPage:res.data.paginationloc.totalPage,
              currentPage:a   
              }   
            });
               var pagefa=((parseInt(a) * parseInt(paginationfac.perPage))-parseInt(paginationfac.perPage));
               
               
                if(pagefa >= 10){
                  setAddindexfac(parseInt(pagefa));
                  console.log(parseInt(pagefa));
                }else{
                  setAddindexfac(1);
                }
          
          }).catch(error=>{
            console.log("not found");
          });
          
        }else{
          Axios.post("locationList",{perpage:paginationfac.perPage,page:a})
          .then(res =>{
            console.log("request");
            console.log(res.data);
            console.log(res.data.locationhomedeat);
            
           setFacilities(res.data.locationhomedeat);
           setPaginationfac((preValue)=>{
            return { 
               perPage:preValue.perPage,
            totalCount:res.data.paginationloc.totalCount,
            totalPage:res.data.paginationloc.totalPage,
            currentPage:a   
            }   
          });
             var pagefa=((parseInt(a) * parseInt(paginationfac.perPage))-parseInt(paginationfac.perPage));
             
             
              if(pagefa >= 10){
                setAddindexfac(parseInt(pagefa));
                console.log(parseInt(pagefa));
              }else{
                setAddindexfac(1);
              }
          
          });
        }
        
        
        
        
        }
    const callFunction=(v)=>{
      console.log(v);
      if(v==='facility'){

        dispatch(siteData({page:'home'}));
        Axios.post("getAllFacility")
        .then(res =>{
          console.log("request");
          console.log(res.data.response);
          
          setFacilities(res.data.response);
        
        });
    }else{

      Axios.post("locationList",{perpage:8,page:1})
      .then(res =>{
        console.log("request");
        console.log(res.data);
        console.log(res.data.locationhomedeat);
        
       setFacilities(res.data.locationhomedeat);
       setPaginationfac((preValue)=>{
        return { 
          perPage:8,
          totalCount:res.data.paginationloc.totalCount,
          totalPage:res.data.paginationloc.totalPage,
          currentPage:1  
        }   
      });
      
      });





    }
     // if(v==='location'){
        setCallevent(v);
     
      
    }

    const getLocationFacility=(data)=>{
      console.log(data);
      // setLocation(data.id);

       Axios.post("getLocationFacility",{facilityid:data.id,perpage:8,page:1})
        .then(res =>{
          console.log("request");
          console.log(res.data.response);
          
          // alert("facility set");
          // alert(data.id);
          setCallevent('location');
          setFac(data.id);
          // setShow1(true);
          setFacilities(res.data.newlocationdeatils);
          setPaginationfac((preValue)=>{
            return { 
              perPage:8,
              totalCount:res.data.paginationloc.totalCount,
              totalPage:res.data.paginationloc.totalPage,
              currentPage:1  
            }   
          });
        });

    }


        
        
        // if (!type) return <Redirect to="/login" />;
 
        
        // const type = useSelector((state) => state.todoReducer.type);

        // if (type==='admin') return <Redirect to="/dashboard" />;
        //   else if(type==='participant' || type=== 'wpadmin') return <Redirect to="/home" />;
        //   else  return <Redirect to="/" />;
        const clickHandler=(e)=>{

          console.log(fac);
          console.log(loc);
         // return 0;
          // console.log(a);
          console.log(calendernfo.month);
          console.log(calendernfo.currentYear); 

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
         const checkgetclalender=(loc)=>{
          
  console.log({loc:loc});
 
  
     Axios.post("get_calendar",{loc:loc})
 .then(res =>{
   console.log("calender");
   console.log(res.data);
   setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
   
 });
  setShow1(true);
   
  



}
        const changeDate=(day)=>{
console.log(loc);
console.log(calendernfo.date);
          var today = new Date();
          let date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          // alert(day+' = '+calendernfo.date+' = '+date1);
      
          if(calendernfo.date == date1 && day==='yesterday'){
            setShowalert(true);
           
            return false;
          }
   
          Axios.post("get_calendar",{day:day,date:calendernfo.date,loc:loc})
    .then(res =>{
      // console.log("calender");
      // console.log(res.data);
      setCalender({data:res.data.html,date:res.data.date,currentYear:res.data.currentYear,month:res.data.month});
     
    });

         }



         if (date) return <Redirect to="/booking" />;

         

        return (
        <React.Fragment>


<div class="search-sec">

<div class="container">

  <div class="row">

    <div class="col-md-12">

     

        <div class="dropddown-main">

        <div class="dropdown-sort ">

          

<a onClick={()=>callFunction('location')} className={`btn-view ${callevent==='location'?'btn-view-sort':''}`} style={{textDecoration: 'none',cursor:'pointer', padding:'6px 18px'}}>SELECT LOCATION</a>

</div>
        <div class="dropdown-sort dropdown-right">

          

          <a onClick={()=>[callFunction('facility'),setFac(0)]} className={`btn-view ${callevent==='facility'?'btn-view-sort':''}`} style={{textDecoration: 'none',cursor:'pointer'}}>SELECT FACILITY</a>

        </div>

        

      </div>

    </div>

  </div>

</div>

</div>
    <div class="multiple-school mutiple-facility" style={{padding:'15px 0px 50px 0px'}}>
    <div class="container">     
        <div class="row">
          <div class="col-md-12">
            
           </div>  
           {callevent==='location'?<div class="col-md-12">
           <div  onClick={()=>callPaginationfac('previouPage')}  style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
         
        
           </div>:''}    
           
            
          <div class="col-sm-12">
 <div class="sort-by-section">

  {/* <a href="#" class="sort-date" data-toggle="modal" data-target="#basicModal">Sort by Date</a> */}
 
            </div>
            {/* <p class="para-more">Spaces for all your community needs </p> */}
              </div>
               {(callevent==='facility')?<>
              {   facilities.map((post,index)=>(
                <>



                
{(index === 4 ? 
  (    <div class="col-sm-4 col-md-4" style={{marginTop: '20px',paddingLeft: '0px',paddingRight: '0px'}}>
                        
  <div class="content-home content-bg">
    <a href="#" target="_blank" style={{textDecoration: 'none'}}>
      
      <img class="content-image" />
      <div class="content-details" style={{top:'52%'}}>
        <h3 class="content-titles " style={{fontSize: '39px', width: '95%'}}>Spaces <br/>for all your <br/>community needs</h3>
        {/* <img src="./image/arrow.png" class="img-content"/> */}
        
      </div>
    </a>
 
</div>
</div>) 
  : ('') 
)}
   {fac ==0? "": 

                    <div class="col-sm-4 col-md-4" style={{marginTop: '20px'}}>
                        
                            <div class="content-home">
                              <a  target="_blank" style={{textDecoration: 'none'}}>
                              {fac ==0? "": <div class="content-overlay"> </div>} 
                              {fac !==0?  <img class="content-image" src=""/>: <img class="content-image" src={`./image/${post.img}`}/> }
                             
                             
                                <div className="content-details contentnew">
                                
                                  <h2 class="contact-loc"> {fac !==0 ?  post.locationName:''}</h2>
                                  <h3 className={`${fac !==0 ?'':'content-title'}`}>
                                  {/* {fac !==0 ?  post.location:''} */}
                                  {fac !==0 ?  '#'+post.location_id:post.type}
                                    </h3>
                                    {fac !==0 ? <a onClick={()=>[setLoc(post.locationName),checkgetclalender(post.locationName)]} class="btn-view" style={{textDecoration: 'none', cursor: 'pointer'}}>View</a>:
                                  <a onClick={()=>getLocationFacility(post)} class="btn-view" style={{textDecoration: 'none', cursor: 'pointer'}}>View</a>
}
                                </div>
                                {/* <div class="img-sample" style={{bottom: '0px'}}><span>SAMPLE PHOTO {index}</span></div> */}
                              </a>
                           
                          </div>
                    </div>
                    } 

{fac !==0?  "": 
   <div class="col-sm-4 col-md-4" style={{marginTop: '20px'}}>
                        
   <div class="content-home">
     <a  target="_blank" style={{textDecoration: 'none'}}>
     {fac ==0? "": <div class="content-overlay"> </div>} 
     {fac !==0?  <img class="content-image" src=""/>: <img class="content-image" src={`./image/${post.img}`}/> }
    
    
       <div className="content-details ">
       
         <h2 class="contact-loc"> {fac !==0 ?  post.locationName:''}</h2>
         <h3 className={`${fac !==0 ?'':'content-title'}`}>
         {/* {fac !==0 ?  post.location:''} */}
         {fac !==0 ?  '#'+post.location_id:post.type}
           </h3>
           {fac !==0 ? <a onClick={()=>[setLoc(post.locationName)]} class="btn-view" style={{textDecoration: 'none', cursor: 'pointer'}}>View</a>:
         <a onClick={()=>getLocationFacility(post)} class="btn-view" style={{textDecoration: 'none', cursor: 'pointer'}}>View</a>
}
       </div>
       {/* <div class="img-sample" style={{bottom: '0px'}}><span>SAMPLE PHOTO {index}</span></div> */}
     </a>
  
 </div>
</div> }



</>
 ))
}
</>:

<>

{   facilities.map((post,index)=>(

  <>
  {(index === 4 ? 
  (    <div class="col-sm-4 col-md-4" style={{marginTop: '20px',paddingLeft: '0px',paddingRight: '0px'}}>
                        
  <div class="content-home content-bg">
    <a href="#" target="_blank" style={{textDecoration: 'none'}}>
      
      <img class="content-image" />
      <div class="content-details" style={{top:'52%'}}>
        <h3 class="content-titles " style={{fontSize: '39px', width: '95%'}}>Spaces <br/>for all your <br/>community needs</h3>
        {/* <img src="./image/arrow.png" class="img-content"/> */}
        
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
     <img class="content-image" src=""/>
     <div class="content-details contentnew">
     <h2 class="contact-loc">{post.locationName}</h2>
     <h3 class=''>#{post.location_id}</h3>
       {/* <p class="content-text">Liberty High School</p>                                   */}
       <a onClick={()=>[setLoc(post.location),checkgetclalender(post.locationName)]} class="btn-view" style={{textDecoration: 'none',cursor:'pointer'}}>View</a>
     </div> 
     {/* <div class="img-sample" style={{bottom: '0px'}}><span>SAMPLE PHOTO {index}</span></div> */}
   </a>

</div>
</div>

</>
))}

                      </>

 }
                    

              

          


   







              
                
                
           {callevent==='location'?    <div class="col-md-12">
           <div onClick={()=>callPaginationfac('nextPage')} style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div>
          
           </div>:''} 
          
        </div>
        {/* <div class="view-more-sec">
            <a href="#"> View more &nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </a>
                  </div> */}
      </div>

      
    </div>

    <Modal show={show1} onHide={handleClose1}>
        {/* <Modal.Header closeButton > */}
        {/* <div class="modal-header modal-time-apply" style={{paddingTop:'26px'}}>

<h5 class="modal-title modal-time-title apply-heading" id="exampleModalLongTitle">Ready? </h5>

<button type="button" class="close close-apply" data-dismiss="modal" aria-label="Close" style={{outline:'none',right:'-25px',top:'-31px'}}>

  <span aria-hidden="true" style={{outline: 'none',fontFamily: 'FontAwesome',fontSize: '33px'}}>&times;</span>

</button>

</div> */}
        {/* </Modal.Header> */}
        <i class="fa fa-times" aria-hidden="true" style={{float: 'right',position: 'relative',
display: 'inline-block',color: '#ffffff',fontSize: '20px',
    left: '430px',
    top: '10px', cursor:'pointer'}}  onClick={()=>setShow1(false)}></i>

        <Modal.Body>
<div class="col-md-4">

              

<div class="timeslots-select">
    <div class="calender-inner">
        <div class="timeslots-top time-view">
            <div id="right-box-title top-select" class="top-title text-center" style={{paddingTop: '15px',fontSize: '17px'}}>Choose Your Date</div>

            {/* <div id="right-box-title" class="top-title text-center top-below" style={{marginTop: '-8px'}}>
            {dateFormat(now,"ddd dS mmm, yyyy")}
                <p class="para-change-date">Change Date</p>
            </div> */}
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
      <Modal show={showalert} onHide={handleClosealert} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#FF0000'}}>Previous month is not available !</p>

<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealert()}}>Click Here</button>

</div>
</div>
      
</Modal> 
</React.Fragment>
        
        
        )
    

  
}

export default Home;