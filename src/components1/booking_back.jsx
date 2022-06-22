import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";

// import { addTodo } from "../actions/index";
import axios from 'axios';
import { facility } from "../actions/facility";
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
const  Booking =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
  });
  const dispatch=useDispatch();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const [allFacilities, setAllFacilities] = useState([]);
  const [addFacilities, setAddFacilities] = useState({facilityid:'',facilityName:''});
  const [storeFacilities, setStoreFacilities] = useState([]);
//   const location = useLocation();
  const [show, setShow] = useState("0");
//   const handleHalfClose = () => setHalfShow(false);
//   const handleHalfShow = () => setHalfShow(true);


//   const dispatch=useDispatch();


//   const name = useSelector((state) => state.todoReducer.name);
//   const empid = useSelector((state) => state.todoReducer.empid);
//   const type = useSelector((state) => state.todoReducer.type);
  
let array=[];
  useEffect(() => {
   
    Axios.post("getFacilityByLocation",{location:"3",facility:"1"})
    .then(res =>{
      console.log("request");
      console.log(res.data);
      setAllFacilities(res.data.data);
      // setHeader({time:res.data.data.time});
    
    });
    
     //setAddFacilities({facilityid:'121122',facilityName:'abhi'});
     
     console.log("REDUX");

    //  console.log(data);
    },[]);
   
    // const data = useSelector((state) => state.todoReducer.data);
        
        
        // if (!type) return <Redirect to="/login" />;
 
        
        // const type = useSelector((state) => state.todoReducer.type);

        // if (type==='admin') return <Redirect to="/dashboard" />;
        //   else if(type==='participant' || type=== 'wpadmin') return <Redirect to="/home" />;
        //   else  return <Redirect to="/" />;
        

        const expanArea = (data)=>{
          console.log(data);
        }


        const addFacility = (data)=>{
          // console.log(data);
          // console.log(addFacilities);
          // console.log(addFacilities.length);

        
          setAddFacilities({facilityid:data.id,facilityName:data.type});

          // dispatch(facility({
          //   data:{facilityid:data.id,facilityName:data.type},
            
          //  }));


         
          setStoreFacilities([...storeFacilities,{facilityid:data.id,facilityName:data.type}]);
          // console.log(addFacilities);
          console.log(storeFacilities);

          // setTimeout(function(){ console.log(addFacilities); }, 3000);
        }
        const schoolFacility = useSelector((state) => state.todoReducer.schoolFacility);
        const schoolFacilitySelect = useSelector((state) => state.todoReducer.schoolFacilitySelect);
        const date = useSelector((state) => state.todoReducer.date);
        const location = useSelector((state) => state.todoReducer.location);
        const time = useSelector((state) => state.todoReducer.time);
        const endtime = useSelector((state) => state.todoReducer.endtime);

        return (
        <React.Fragment>
             <div class="banner">
<div class="hero_image" style={{backgroundImage: 'url(../image/auditorium.jfif)'}}></div>
<div class="container">
  <div class="d-content d-content-view">
  </div>
  <div class="d-content d-sample-pic">
      <div class="sample-banner-img">
          <a  class="sample-banner" style={{textDecoration: 'none'}}>SAMPLE PHOTO</a>
        </div>
  </div>
</div>
</div>
<div class="item-section">
<div class="container">
    <div class="row">
       <div class="col-md-7">
           <div class="item-left">
               <h2>About JCBOE Facility Rental System{addFacilities.facilityName}</h2>
               <p>JCBOE is pleased to announce a new online facility request and rental system designed to provide a positive user experience for all. With the new system, reservation requests can be submitted easily and will be handled more efficiently.</p>

               <p style={{marginTop:'10px'}} class="para-item"> Renters will be able to access photos and descriptions, see real-time availability, get estimated quotes, and track progress of their application.</p>

          <div class="item-amenitie-sec">
           <div id="accordion" class="myaccordion myitemaccordion">
           {   allFacilities.map((post,index)=>(          
           
            <div class="card-new" key={post.data.id}>
             <div class="card-header item-header"  onClick={()=>setShow(post.data.id)}>
               <h2 class="mb-0" style={{paddingBottom: '0px',borderBottom: 'none !important'}}>
                 <button class="d-flex align-items-center justify-content-between button-accordion button-item" >

                 {post.data.type}

                  <span class="fa-stack fa-sm plus-addon">

                  
            {post.amenities.length > 0 ?         
                 
                 <>{show===post.data.id ? 
                   <i class="fa fa-stack-1x fa-inverse fa-angle-down"></i>:
                   <i class="fa fa-stack-1x fa-inverse fa-angle-right"></i>
                  }
                </>
                  // <i class="fa fa-stack-1x fa-inverse fa-angle-right"></i>
                   :
                   <i class="fa fa-plus-circle" onClick={()=>addFacility(post.data)}></i>
                  
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

            <div class="col-md-3">
                  <div class="floating-label floating-school-label open-left-responsive">
                    <p style={{marginTop:'5px !important',color:'#686868',fontSize: '16px'}}>{childpost.amenities_name}</p>
                  </div>

            </div>

            <div class="col-md-3">
                <div class="floating-label">
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



            <div class="col-md-3 item-number">
                <div class="floating-label">
                          <p class="quantity-sec">Number</p>
                      <div class="select is-primary">
                        <select>

                        {[...Array(parseInt(childpost.count))].map((e, i) => {
                         return <option map={i}> {i+1}</option>
                         })}
                        
                        </select>
                      </div>
                  </div>
            </div>



            <div class="col-md-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
                  <div class="floating-label price-sec-item">      
                    <p>$11 per/hour</p>
                  </div>
            </div>

            <div class="col-md-1" style={{paddingLeft: '0px',paddingRight:'0px'}}>
                <div class="add-to-cart">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
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

                               <h2>{location}

                               </h2>

                           </div>

                       </div>

                   </div>

                   <div class="timeslots-top date-section" style={{height:'115px'}}>

                       <div class="row date-sec">

                           <div class="col-md-3">

                               <i class="fa fa-calendar-o date-icon" aria-hidden="true"></i>



                           </div>

                           <div class="col-md-9" style={{paddingLeft:'0px'}}>

                               <div class="data-para">

                               <h3 > Date</h3>

                               <p style={{marginBottom: '0px'}}>{date}</p>

                               <a  class="btn-time btn-change" style={{textDecoration: 'none',cursor: 'pointer',color:'#646663'}}>Change Date </a>

                           </div>

                           </div>

                       </div>



                       





                       

                   </div>



                   <div class="timeslots-top timeslots-tops" style={{marginLeft:'0px',marginRight:'0px'}}>

                   



                       <div class="row date-sec">

                           <div class="col-md-3">

                               <i class="fa fa-clock-o date-icon" aria-hidden="true"></i>



                           </div>

                           <div class="col-md-9" style={{paddingLeft:'0px'}}>

                               <div class="data-para">

                               <h3> Time <span class="hour-para" style={{fontFamily: 'Heebo-Regular',fontSize: '15px'}}>1 hours</span></h3>

                               <p style={{marginBottom: '0px'}}>{time} - {endtime}</p>

                               <a  class="btn-time " style={{textDecoration: 'none',cursor: 'pointer',color:'#646663'}}>Change Time</a>

                           </div>

                           </div>

                       </div>





                   </div>

                  



<div class="calender-wraps" id="calender-show" style={{display:'none',marginTop:'-11px'}}>

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



<div id="calendar">

 <table class="calendar-table">

     <tbody>

         <tr class="calendar-header">

             <td class="calendar-header-day">Sun</td>

             <td class="calendar-header-day">Mon</td>

             <td class="calendar-header-day">Tue</td>

             <td class="calendar-header-day">Wed</td>

             <td class="calendar-header-day">Thu</td>

             <td class="calendar-header-day">Fri</td>

             <td class="calendar-header-day">Sat</td>

         </tr>

         <tr class="calendar-row">

             <td class="calendar-day-other default-cursor"></td>

             <td class="calendar-day-other default-cursor"></td>

             <td class="calendar-day calendar-day-disabled"><del>1</del></td>

             <td class="calendar-day calendar-day-disabled"><del>2</del></td>

             <td class="calendar-day calendar-day-disabled"><del>3</del></td>

             <td class="calendar-day calendar-day-disabled"><del>4</del></td>

             <td class="calendar-day calendar-day-disabled"><del>5</del></td>

             </tr>

             <tr class="calendar-row">

                 <td class="calendar-day calendar-day-other  calendar-day-disabled"><del>6</del></td>

                 <td class="calendar-day calendar-day-other  calendar-day-disabled"><del>7</del></td>

                 <td class="calendar-day calendar-day-disabled"><del>8</del></td>

                 <td class="calendar-day calendar-day-disabled"><del>9</del></td>

                 <td class="calendar-day calendar-day-disabled"><del>10</del></td>

                 <td class="calendar-day calendar-day-disabled"><del>11</del></td>

                 <td class="calendar-day calendar-day-disabled"><del>12</del></td>

                 </tr>

                 <tr class="calendar-row">

                     <td class="calendar-day calendar-day-other  calendar-day-disabled"><del>13</del></td>

                     <td class="calendar-day calendar-day-other  calendar-day-disabled"><del>14</del></td>

                     <td class="calendar-day calendar-day-disabled calender-highlight">15</td>

                     <td class="calendar-day calendar-day-disabled"><del>16</del></td>

                     <td class="calendar-day calendar-day-disabled"><del>17</del></td>

                     <td class="calendar-day calendar-day-disabled"><del>18</del></td>

                     <td class="calendar-day calendar-day-disabled"><del>19</del></td>

                     </tr>

                     <tr class="calendar-row">

                         <td class="calendar-day calendar-day-other  calendar-day-disabled"><del>20</del></td>

                         <td class="calendar-day calendar-day-other  calendar-day-disabled"><del>21</del></td>

                         <td class="calendar-day calendar-day-disabled">22</td>

                         <td class="calendar-day calendar-day-disabled"><del>23</del></td>

                         <td class="calendar-day calendar-day-disabled"><del>24</del></td>

                         <td class="calendar-day calendar-day-disabled"><del>25</del></td>

                         <td class="calendar-day calendar-day-disabled"><del>26</del></td>

                         </tr>

                         <tr>

                             <td class="calendar-day calendar-day-other  calendar-day-disabled border-last"><del>27</del>&gt;</td>

                             <td class="calendar-day calendar-day-other  calendar-day-disabled border-last">

                                 <del>28</del></td>

                             <td class="calendar-day calendar-day-disabled border-last">

                                 <del>29</del></td>

                             <td class="calendar-day calendar-day-disabled border-last calender-active">30</td>

                             <td class="calendar-day-other default-cursor"></td>

                             <td class="calendar-day-other default-cursor"></td>

                             <td class="calendar-day-other default-cursor"></td>

                             </tr>

         </tbody></table></div>



</div>







</div>





                



                   <div class="amenty-section">

                       <h2>Facilities</h2>



                      



                       <div id="accordion" class="myaccordion">

                       

                         <div class="card" style={{boxShadow: 'none'}}>

                           <div class="card-header" id="headingfourteen">

                             <h2 class="mb-0">

                               <button class="d-flex align-items-center justify-content-between button-accordion " data-toggle="collapse" data-target="#collapsefourteen" aria-expanded="false" aria-controls="collapsefourteen">

                               

                               <sapn>Open Play Area</sapn>  

                                <span><p class="total-para">$18</p></span>

                                 <span class="fa-stack fa-sm">

                                   <i class="fas fa-angle-down fa-stack-2x"></i>

                                   <i class="fas fa-stack-1x fa-inverse"></i>

                                 </span>

                                 

                               </button>

                             </h2>

                           </div>

                           <div id="collapsefourteen" class="collapse" aria-labelledby="headingfourteen" data-parent="#accordion">

                             <div class="card-body">

                                 

                                       <div class="form-top-sec" style={{marginTop:'10px'}}>

                                         <div class="row">

                                            <table style={{boxShadow: 'none'}}>

                                             <tbody><tr class="bo-border">

                                                 <th class="audi-table" style={{textAlign:'left',width:'130px'}}>Amenities</th>

                                                 <th class="audi-table" style={{width:'90px'}}>Numbers</th>

                                                 <th class="audi-table" style={{width:'60px'}}>Cost</th>

                                                

                                               </tr>

                                               <tr class="bo-border">

                                                 <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)',textAlign:'left'}}>Open Play Area                                                       </td>

                                                 <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>

                                                     <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>

                                                     <input type="text" id="number" value="1" style={{padding:'13px ​0px !important'}}/>

                                                     <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>

                                                 </td>

                                                 <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>$18</td>

                                                 

                                               </tr>

                                             

                                            </tbody></table>

                                         

                                         </div>

                                           </div>

 

                                         

 

                                              

                             </div>

                           </div>

                         </div>

                        

                           <div class="card" style={{boxShadow: 'none'}}>

                             <div class="card-header" id="headingNine">

                               <h2 class="mb-0">

                                 <button class="d-flex align-items-center justify-content-between button-accordion " data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">

                                 

                                 <sapn>Auditorium</sapn>  

                                  <span><p class="total-para">$88</p></span>

                                   <span class="fa-stack fa-sm">

                                     <i class="fas fa-angle-down fa-stack-2x"></i>

                                     <i class="fas fa-stack-1x fa-inverse"></i>

                                   </span>

                                   

                                 </button>

                               </h2>

                             </div>

                             <div id="collapseNine" class="collapse" aria-labelledby="headingNine" data-parent="#accordion" >

                               <div class="card-body">

                                   

                                         <div class="form-top-sec" style={{marginTop:'10px'}}>

                                           <div class="row">

                                              <table style={{boxShadow: 'none'}}>

                                               <tbody><tr class="bo-border">

                                                   <th class="audi-table" style={{textAlign:'left',width:'130px'}}>Amenities</th>

                                                   <th class="audi-table" style={{width:'90px'}}>Numbers</th>

                                                   <th class="audi-table" style={{width:'60px'}}>Cost</th>

                                                  

                                                 </tr>

                                                 <tr class="bo-border">

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)',textAlign:'left'}}>With Balcony                                                        </td>

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>

                                                       <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>

                                                       <input type="text" id="number" value="2" style={{padding:'13px ​0px !important'}}/>

                                                       <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>

                                                   </td>

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>$40</td>

                                                   

                                                 </tr>

                                                 <tr class="bo-border">

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)',textAlign:'left'}}>Public Address System</td>

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}> 

                                                       <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>

                                                       <input type="text" id="number" value="2" style={{padding:'13px ​0px !important'}}/>

                                                       <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>

</td>

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>$30</td>

                                                  

                                                 </tr>

                                                 <tr class="bo-border">

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)',textAlign:'left'}}>Piano</td>

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>

                                                       <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>

                                                       <input type="text" id="number" value="1" style={{padding:'13px ​0px !important'}}/>

                                                       <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>

                                                   </td>

                                                   <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>$18</td>

                                                  

                                                 </tr>

                                              </tbody></table>

                                           

                                           </div>

                                             </div>

   

                                           

   

                                                

                               </div>

                             </div>

                           </div>

                           <div class="card" style={{boxShadow: 'none'}}>

                             <div class="card-header" id="headingTen">

                               <h2 class="mb-0">

                                 <button class="d-flex align-items-center justify-content-between button-accordion collapsed" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">

                                   <span>Cafeteria</span>

                                   <span><p class="total-para">$11</p></span>

                                   <span class="fa-stack fa-2x">

                                     <i class="fas fa-angle-down fa-stack-2x"></i>

                                     <i class="fas fa-angle-down fa-stack-1x fa-angle-down"></i>

                                   </span>

                                 </button>

                               </h2>

                             </div>

                             <div id="collapseTen" class="collapse" aria-labelledby="headingTen" data-parent="#accordion">

                               <div class="card-body">

                                   <div class="form-top-sec" style={{marginTop:'10px'}}>

                                       <div class="row">

                                          <table style={{boxShadow: 'none'}}>

                                           <tbody><tr class="bo-border">

                                               <th class="audi-table" style={{textAlign:'left',width:'130px'}}>Amenities</th>

                                               <th class="audi-table" style={{width:'90px'}}>Numbers</th>

                                               <th class="audi-table" style={{width:'60px'}}>Cost</th>

                                               

                                             </tr>

                                             <tr class="bo-border">

                                               <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)',textAlign:'left'}}>Serving Area Only                                                       </td>

                                               <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>

                                                   <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>

                                                   <input type="text" id="number" value="1" style={{padding:'13px ​0px !important'}}/>

                                                   <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>

                                               </td>

                                               <td style={{padding:'6px 7px',fontSize:'13px',color:'hsl(0deg 0% 38%)'}}>$11</td>

                                              

                                             </tr>

                                            

                                          </tbody></table>

                                       

                                       </div>

                                         </div>

                               </div>

                             </div>

                           </div>

                          

   

   

                         

                         </div>

                         <div class="row price-secs" style={{marginLeft:'0px',marginRight:'0px',marginBottom: '20px'}}>

                           <div class="col-md-8 price-left">

                               <p>Grand Total</p>

                           </div>

                           <div class="col-md-4 price-right">

                               <p>$117</p>

                           </div>

                          

                       </div>

                       <div class="col-md-12">

                           <a href="#" class="btn-book btn-process btn-check " data-toggle="modal" data-target="#exampleModalapplys" data-dismiss="modal" style={{textDecoration: 'none',color:'#ffffff'}}>Request Booking</a>

                         

                       </div>



                     

                      

                   </div>







               </div>

           </div>



       </div>

    </div>





 



    <div class="facility-sub-sec">

        <div class="container">

            <div class="row">

               <div class="col-md-12">

                   <h2>Smiliar Facilities</h2>

               </div>

            </div>

        </div>

    <div id="carousel" class="carousel carousel-below slide" data-ride="carousel">

                           

       <div class="carousel-inner">

         <div class="carousel-item carousel-item2 active">

           <div class="d-none d-lg-block">

               <div class="slide-box">

                   <div class="col-sm-4 col-md-4 ">

                       <div class="child card cards">

                           <img class="card-img-top card-facility" src="./image/audi-libert.jfif" alt="Card image cap"/>

                           <div class="img-sample"><span>SAMPLE PHOTO</span></div>

                           <div class="card-body card-schools">

                               <h3> AUDITORIUM </h3>

                             <h5 class="card-titles">Liberty High School</h5>

                             <p class="card-times">$30 per hour</p>

                             <a href="view-facility.html" style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>

                             </a>

                             

                           </div>

                         </div> </div>

                         <div class="col-sm-4 col-md-4 " style={{marginTop: '0px'}}>

                           <div class="child card cards">

                               <img class="card-img-top card-facility" src="./image/cafe-one.jfif" alt="Card image cap"/>

                               <div class="img-sample"><span>SAMPLE PHOTO</span></div>

                               <div class="card-body card-schools">

                                 <h3> CAFETERIA</h3>

                                   <h5 class="card-titles">High School Division</h5>

                                   <p class="card-times">$18 per hour</p>

                                   <a href="view-facility.html" style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>

                                   </a>

                                 </div>

                             </div>

                         </div>

                             <div class="col-sm-4 col-md-4 " style={{marginTop: '0px'}}>

                               <div class="child card cards">

                                   <img class="card-img-top card-facility" src="./image/cafe-sec.jfif" alt="Card image cap"/>

                                   <div class="img-sample"><span>SAMPLE PHOTO</span></div>

                                   <div class="card-body card-schools">

                                     <h3> CAFETERIA</h3>

                                       <h5 class="card-titles">Ferris HS</h5>

                                       <p class="card-times">$15 per hour</p>

                                       <a href="view-facility.html" style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>

                                       </a>

                                     </div>

                                 </div>

                             </div>

                                

                 </div>

           </div>

        

         

         </div>

         <div class="carousel-item">

           <div class="d-none d-lg-block">

               <div class="slide-box">

                   <div class="col-sm-4 col-md-4 ">

                       <div class="child card cards">

                           <img class="card-img-top card-facility" src="./image/audi-libert.jfif" alt="Card image cap"/>

                           <div class="img-sample"><span>SAMPLE PHOTO</span></div>

                           <div class="card-body card-schools">

                               <h3> AUDITORIUM </h3>

                             <h5 class="card-titles">Liberty High School</h5>

                             <p class="card-times">$30 per hour</p>

                             <a href="view-facility.html" style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>

                             </a>

                             

                           </div>

                         </div> </div>

                         <div class="col-sm-4 col-md-4 " style={{marginTop: '0px'}}>

                           <div class="child card cards">

                               <img class="card-img-top card-facility" src="./image/cafe-one.jfif" alt="Card image cap"/>

                               <div class="img-sample"><span>SAMPLE PHOTO</span></div>

                               <div class="card-body card-schools">

                                 <h3> CAFETERIA</h3>

                                   <h5 class="card-titles">High School Division</h5>

                                   <p class="card-times">$18 per hour</p>

                                   <a href="view-facility.html" style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>

                                   </a>

                                 </div>

                             </div>

                         </div>

                             <div class="col-sm-4 col-md-4 " style={{marginTop: '0px'}}>

                               <div class="child card cards">

                                   <img class="card-img-top card-facility" src="./image/cafe-sec.jfif" alt="Card image cap"/>

                                   <div class="img-sample"><span>SAMPLE PHOTO</span></div>

                                   <div class="card-body card-schools">

                                     <h3> CAFETERIA</h3>

                                       <h5 class="card-titles">Ferris HS</h5>

                                       <p class="card-times">$15 per hour</p>

                                       <a href="view-facility.html" style={{textDecoration:'none'}} class="card-texts card-view"><i class="fa fa-angle-double-right" aria-hidden="true"></i>

                                       </a>

                                     </div>

                                 </div>

                             </div>

                                

                 </div>

           </div>

          

         

         

         </div>

       </div>

       <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">

         <span class="" aria-hidden="true"><i class="fa fa-angle-left" style={{color:'#000000',fontSize: '50px',marginLeft:'30px'}} aria-hidden="true"></i>

         </span>

         <span class="sr-only">Previous</span>

       </a>

       <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">

         <span class="" aria-hidden="true"><i class="fa fa-angle-right" style={{color:'#000000',fontSize: '50px',marginRight:'10px'}} aria-hidden="true"></i>

         </span>

         <span class="sr-only">Next</span>

       </a>

     </div>



   </div>

   



</div>




</React.Fragment>
        
        
        )
    

  
}

export default Booking;