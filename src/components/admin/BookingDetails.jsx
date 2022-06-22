import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Modal from 'react-bootstrap/Modal';
import { siteData } from "./../../actions/siteData";
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

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  // root: {
  //   padding: theme.spacing(2),
  // },
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    // console.log(panel);
    // console.log(newExpanded);
   
  };


  // const { id } = useParams();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });

  const [detailsBookings, setdetailsBookings] = useState([]);
  const [detailsApplicant, setDetailsApplicant] = useState([]);
  const [detailsTimediff, setDetailsTimediff] = useState([]);
  const [facilityAdmin, setDetailsFacilityAdmin] = useState([]);
  const [tab, setTab] = useState('amenity');

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [locadmin, setLocationAdmin] = useState(0);
  const [allOffice,setAllOffices]=useState([]);
  const [statusBooking, setStatusBooking] = useState('submit');
  const dispatch=useDispatch();
  const id = useSelector((state) => state.todoReducer5.id.val);
  const a3 = useSelector((state) => state.todoReducer3);
  const [initiate, setInitiate] = useState({
    status:'',
    message:'',
    active:false
  });

  const [submitstatus, setSubmit] = useState(false);

  const approvemodal = ()=>{
  
    setShow1(true);
    
  }
  const [showM, setShow1] = useState(false);
  const handleCloseM = () => setInitiate({
    status:'',
    message:'',
    active:false
  });

  const closeok = ()=>{
    setShow1(false);
  }


  const [event,setEvent]=useState({
    eventname:"",
    noOfGuest:"",
    details:0,
    
        
    error_name:1,
    error_noOfGuest:1,
    error_details:1,
    
    err:'0',
        
      });

  const clicktab=(e)=>{

    console.log(e);
    setTab(e);

  }


  const inputEvent =(event)=> {

console.log(event.target.value);
setLocationAdmin(event.target.value);

  }

  const forward=()=>{
    

    Axios.post("forwardToSchoolAdmin",{locadmin:locadmin,id:id})
.then(res =>{
  console.log("request");
  console.log(res.data);

  if(res.data.status==='success'){
    setStatusBooking('assigned');
  }
     
});


  }
  function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }
 const setPrintesti =()=>{
  
    
   
  var deatilsnewforprint = document.getElementById("deatilsnewforprint");
  var deatilsnewforprintnew = document.getElementById("deatilsnewforprintnew"); 


  deatilsnewforprint.style.display = 'none';
  deatilsnewforprintnew.style.display = 'block';
  document.title='Facility_Details_Booking_Id_'+id+'_FA';

  window.print();
  document.title='FRMS ADMIN';
  //[Delete this line if you want it to stay hidden after printing]
  deatilsnewforprint.style.display = 'block';
  deatilsnewforprintnew.style.display = 'none';



}

const submit =()=>{
  
  console.log(initiate);
  console.log(id);
  

  Axios.post("adminComaplete",{initiate:initiate,id:id})
.then(res =>{
console.log("locationAdminComplete");
 console.log(res.data);

if(res.data.status==="success"){
  setStatusBooking('assigned');
}




});

}
const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
const a4 = useSelector((state) => state.todoReducer4);
  useEffect(() => {

    Axios.post("getBookedFacilitiesById",{id:id})
    .then(res =>{
      console.log("getBookedFacilitiesById");
       console.log(res.data);
     var  dt1 = new Date("October 13, 2014 " +res.data.bookingInfo.startTime);
     var dt2 = new Date("October 13, 2014 " +res.data.bookingInfo.endTime);
     console.log("October 13, 2014 " +res.data.bookingInfo.startTime);
     console.log("October 13, 2014 " +res.data.bookingInfo.endTime);
console.log(diff_minutes(dt1, dt2));
 setDetailsTimediff(res.data.timediff);

      setdetailsBookings(res.data.data);
      setDetailsApplicant(res.data.bookingInfo);
      setDetailsFacilityAdmin(res.data.locations);
      setAllOffices(JSON.parse(res.data.bookingInfo.organizationOffices));
    
    });


   },[])

   if(statusBooking === 'assigned'){
    dispatch(siteData({
      page:'/Applicationstatus'   
     }));
    return <Redirect to={`/Applicationstatus`} />;
 }
 if(a4.page=='/admin'){

 
  return <Redirect to={`/admin`} />;
}
if(a4.page=='/globaladmin'){

 
  return <Redirect to={`/globaladmin`} />;
}
if(!applicant_id1 ){
        
  return <Redirect to={`/admin`} />;
}
if(applicant_id1!='' &&  applicant_id1.length <4){
return <Redirect to={`/admin`} />;
}
  return (
      <>
      <div class="content content-fixed" id="deatilsnewforprint">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
      
       { detailsBookings.organization!=''  ? <>  <div className="button-print">
    <button onClick={()=>setPrintesti()} type="button" className="btn btn-primary"><i className="fa fa-print" aria-hidden="true" style={{marginRight:'6px'}}></i>
        <span>Print</span></button> </div></> :<></>
       }
  


 <div data-label="Example" className="df-example">
 <ul className="nav nav-line nav-view" id="myTab5" role="tablist">
          <li className="nav-item">
            <a className={`nav-link ${tab==='user'?'active':''}`} id="home-tab5" data-toggle="tab" onClick={()=>clicktab('user')}  role="tab" aria-controls="home" aria-selected="true"  style={{cursor: 'pointer'}}> User Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${tab==='event'?'active':''}`} id="home-tab5" data-toggle="tab"  role="tab" onClick={()=>clicktab('event')} aria-controls="home" aria-selected="true" style={{cursor: 'pointer'}}>Event Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${tab==='amenity'?'active':''}`} id="home-tab5" data-toggle="tab"  role="tab" onClick={()=>clicktab('amenity')}  aria-controls="home" aria-selected="true" style={{cursor: 'pointer'}}>Amenity Details</a>
          </li>
        
          
        
        </ul>
   <div>
   <div className="tab-content mg-t-40" style={{display:`${tab==='user'?'block':'none'}`}} >

{/* {detailsApplicant.organization}
{detailsApplicant.name}
{detailsApplicant.position}
{detailsApplicant.phone}
{detailsApplicant.location}
{detailsApplicant.email}
{detailsApplicant.city}
{detailsApplicant.isProfitMakingOrganization} */}

<div class="row">
<div class="col-md-6">
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec"style={{fontSize:'16px'}}>Name of applicant organization </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.organization}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Name </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.name}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Position in the Organization</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.position}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Phone </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.phone}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>City </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.city}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Are you authorized to make this application </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-3" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.authorizedOrganization =='1' ? 'Yes' :'NA'}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Details of Organization </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.detailOrganization}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>How many enrolled members are <br></br> in your organization? </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.memberOfOrganization}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>State purpose for which premises will be used</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.premises}</p>
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
{((detailsApplicant.locationName)==='Infinity') ? detailsApplicant.locationName :

<>
{(isNaN(detailsApplicant.locationName)===false) ? '#'+detailsApplicant.locationName :detailsApplicant.locationName}
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
<p class="user-inner-sec">{detailsApplicant.email}</p>
</div>

</div>

<div class="col-md-12 row" >
<div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Address :</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.address1+' , '+detailsApplicant.address2}</p>
</div>

</div>


<div class="col-md-12 row" >
<div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Street Address     </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.address3}</p>
</div>
<div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>State    </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.state}</p>
</div>


<div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Describe purpose or objective of Organization </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{ detailsApplicant.objectiveOrganization}</p>
</div>
<div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Is your Organization profit making? </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{ `${detailsApplicant.isProfitMakingOrganization== 1?'Yes':'No'}`}</p>
</div>


<div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>if applicant is a youth organization, what is average age of it membership?</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{ detailsApplicant.memberAverageAge}</p>
</div>
</div>
</div>
</div>

<div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px', border:'1px solid rgba(72, 94, 144, 0.16)',marginTop:'45px'}}>
            <div id="accordion5" class="accordion accordion-pink">
              <h6 class="accordion-title ui-corner-top ui-state-default ui-accordion-header-active ui-accordion-icons" style={{textAlign: 'left', fontSize: '14px',fontWeight: '500',
    color: '#1b2e4b',
    marginBottom: '0',
    border: '1px solid rgba(72, 94, 144, 0.16)',

    padding: '12px 15px 12px 35px',
    position: 'relative',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out', fontFamily: 'IBM Plex Sans', fontSize: '18px', fontWeight: '500',backgroundColor: '#d2d2d2',color:'#343030'}}>
                <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Officer Details</h6>
              <div class="ui-accordion-contents" style={{padding: '0 20px 20px 35px'}}>
                <table class="table table-bordered mg-b-0 text-center view-top">
                    <thead>
                      <tr class="heading-sec-table heading-view-table heading-details-font">
                        <th scope="col" style={{width:'170px'}}>Name</th>
                        <th scope="col" style={{width:'170px'}}>Phone no</th>
                        <th scope="col" style={{width:'250px'}}>Office held</th>
                        
                      </tr>
                    </thead>
                    <tbody class="tbody-color tbody-view">
                    {   allOffice.map((post,index)=>(
                      <tr>
                        <th scope="row">{post.name}</th>
                        <td>{post.phone}</td>
                        <td>{post.officeHeld}</td>
                   
                      </tr>
                    ))}
                      
                    </tbody>
                  </table>
                </div>
            
           
            
            </div>
          </div>  
   </div>
   <div className="tab-content mg-t-40" style={{display:`${tab==='event'?'block':'none'}`}} >
   
   {/* {detailsApplicant.event_name}
{detailsApplicant.event_participant}
{detailsApplicant.startDate}
{detailsApplicant.endDate} */}

{/* <div class="row">
  <div class="col-md-4">
<p style={{textAlign:'left'}}><span style={{fontWeight:'700',marginRight:'8px'}}>Event Name :</span> {detailsApplicant.event_name}</p>
  </div>
 

  <div class="col-md-3">
<p style={{textAlign:'left'}}><span style={{fontWeight:'700',marginRight:'8px'}}>Event Participant : </span>{detailsApplicant.event_participant}</p>
  </div>
  
  <div class="col-md-3">
<p style={{textAlign:'left'}}><span style={{fontWeight:'700',marginRight:'8px'}}>Start Date : </span>{detailsApplicant.startDate}</p>
  </div>
  
  <div class="col-md-2">
<p style={{textAlign:'left'}}><span style={{fontWeight:'700',marginRight:'8px'}}>End Date : </span>{detailsApplicant.endDate}</p>
  </div>
 
</div> */}

{/* <div class="row">
<div class="col-md-6 col-sm-6 col-xs-12 event-detail" style={{marginRight:'76px',marginLeft:'10px'}}>

                            <div class="event-sec-detail">
                                <h2 style={{float:'left',fontWeight:'700'}}>Event Name :</h2>
                            </div>
                            <div class="event-sec-detail">
                                <h2>{detailsApplicant.event_name}</h2>
                            </div>
                        </div>
                       

                        <div class="col-md-5 col-sm-5 col-xs-12 event-detail">

                            <div class="event-sec-detail">
                                <h2 style={{float:'left',fontWeight:'700'}}>Event Participant :</h2>
                            </div>
                            <div class="event-sec-detail">
                                <p style={{float:'right',paddingTop:'0px'}}>{detailsApplicant.event_participant}</p>
                            </div>
                        </div>

                        
                        <div class="col-md-6 col-sm-6 col-xs-12 event-detail" style={{marginRight:'75px',marginLeft:'10px',marginTop:'30px'}}>

                            <div class="event-sec-detail">
                                <h2 style={{float:'left',fontWeight:'700'}}>Start Date  :</h2>
                            </div>
                            <div class="event-sec-detail">
                                <p style={{float:'right',paddingTop:'0px'}}>{detailsApplicant.bookingDate}</p>
                            </div>
                        </div>

                        <div class="col-md-5 col-sm-5 col-xs-12 event-detail" style={{marginTop:'30px'}}>

                            <div class="event-sec-detail">
                                <h2 style={{float:'left',fontWeight:'700'}}>End Date  :</h2>
                            </div>
                            <div class="event-sec-detail">
                                <p style={{float:'right',paddingTop:'0px'}}>{detailsApplicant.bookingDate}</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12 event-detail" style={{marginRight:'75px',marginLeft:'10px',marginTop:'30px'}}>

<div class="event-sec-detail">
    <h2 style={{float:'left',fontWeight:'700'}}>Start Time  :</h2>
</div>
<div class="event-sec-detail">
    <p style={{float:'right',paddingTop:'0px'}}>{detailsApplicant.bookingStartTime}</p>
</div>
</div>
<div class="col-md-5 col-sm-5 col-xs-12 event-detail" style={{marginTop:'30px'}}>

<div class="event-sec-detail">
    <h2 style={{float:'left',fontWeight:'700'}}>End Time  :</h2>
</div>
<div class="event-sec-detail">
    <p style={{float:'right',paddingTop:'0px'}}>{detailsApplicant.bookingEndTime}</p>
</div>
</div>

                        <div class="col-md-12 col-sm-12 col-xs-12 event-detail" style={{marginRight:'76px',marginLeft:'10px',marginTop:'22px'}}>

<div class="event-sec-detail">
    <h2 style={{float:'left',fontWeight:'700'}}>Event Details :</h2>
</div>
<div class="event-sec-detail"  style={{paddingTop:'10px'}}>
    <p style={{paddingTop:'18px', textAlign:'left'}}>{detailsApplicant.event_details}</p>
</div>
</div>
</div> */}

<div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12 " >

                            <div class="event-sec-detail-para">
                                <h2 style={{textAlign:'left',fontWeight:'700'}}>Event Name :</h2>
                                
                                <h3 class="border-after">{detailsApplicant.event_name}</h3>
                           
                            </div>
           </div>

           <div class="col-md-2 col-sm-2 col-xs-12 " >

                            <div class="event-sec-detail-para">
                                <h2 style={{textAlign:'left',fontWeight:'700'}}>Event Participants :</h2>
                                
                                <h3 class="border-after">{detailsApplicant.event_participant}</h3>
                           
                            </div>
           </div>
           <div class="col-md-3 col-sm-3 col-xs-12 " >

           <div class="event-sec-detail-para">
            <h2 style={{textAlign:'left',fontWeight:'700'}}>Start Date :</h2>
            
            <h3 class="border-after">{detailsApplicant.bookingDate}</h3>

           </div>
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12 " >

<div class="event-sec-detail-para">
 <h2 style={{textAlign:'left',fontWeight:'700'}}>End Date :</h2>
 
 <h3 class="border-after">{detailsApplicant.bookingDate}</h3>

</div>
</div>

        </div>
        <div class="row" style={{marginTop:'70px'}}>
       

        <div class="col-md-2 col-sm-2 col-xs-12 " >

          <div class="event-sec-detail-para">
          <h2 style={{textAlign:'left',fontWeight:'700'}}>Start Time :</h2>
          
          <h3 class="border-after">{detailsApplicant.bookingStartTime}</h3>

          </div>
        </div>

        <div class="col-md-2 col-sm-2 col-xs-12 " >

          <div class="event-sec-detail-para">
          <h2 style={{textAlign:'left',fontWeight:'700'}}>End Time </h2>
          
          <h3 class="border-after">{detailsApplicant.bookingEndTime}</h3>

          </div>
        </div>
        {detailsApplicant.submit_at!=null ? 
        <div class="col-md-4 col-sm-4 col-xs-12 " >

<div class="event-sec-detail-para">
 <h2 style={{textAlign:'left',fontWeight:'700'}}>Submission Date :</h2>
 
 <h3 class="border-after">{detailsApplicant.submit_at}</h3>

</div>
</div> :''}
<div class="col-md-4 col-sm-4 col-xs-12 " >

<div class="event-sec-detail-para">
 <h2 style={{textAlign:'left',fontWeight:'700'}}>Booking Id </h2>
 
 <h3 class="border-after">{id}</h3>

</div>
</div>
        <div class="col-md-8 col-sm-8 col-xs-12 " style={{marginTop:'70px'}}>

<div class="event-sec-detail-para">
<h2 style={{textAlign:'left',fontWeight:'700'}}>Event Description:</h2>
{/* <h3 class="border-after">{detailsApplicant.event_details detailsApplicant.event_details}</h3> */}
{/* <input class="border-after text-area " type="text" value={'It is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports event'} /> */}

<h3 class="border-after">{detailsApplicant.event_details}</h3>
</div>
</div>
{detailsApplicant.reject_reason!=null ?  <div class="col-md-8 col-sm-8 col-xs-12 " style={{marginTop:'70px'}}>

<div class="event-sec-detail-para">
{detailsApplicant.status =='cancel' ?
          <>

 <h2 style={{textAlign:'left',fontWeight:'700'}}>Reasons for Cancellation:</h2>
 
 </> 
        :<>
        
        </>  } 
        {detailsApplicant.status =='rejected' ?
          <>
          <h2 style={{textAlign:'left',fontWeight:'700'}}>Reasons for Rejection:</h2>
 </> 
        :<>
        
        </>  } 
{/* <h3 class="border-after">{detailsApplicant.event_details detailsApplicant.event_details}</h3> */}
{/* <input class="border-after text-area " type="text" value={'It is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports event'} /> */}

<h3 class="border-after">{detailsApplicant.reject_reason}</h3>
</div>
</div> :'' }
                       
{(detailsApplicant.approve_comment!=null && detailsApplicant.approve_comment!='')?  <div class="col-md-8 col-sm-8 col-xs-12 " style={{marginTop:'70px'}}>

<div class="event-sec-detail-para">
<h2 style={{textAlign:'left',fontWeight:'700'}}>Comments:</h2>
{/* <h3 class="border-after">{detailsApplicant.event_details detailsApplicant.event_details}</h3> */}
{/* <input class="border-after text-area " type="text" value={'It is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports eventIt is a annual sports event'} /> */}

<h3 class="border-after">{detailsApplicant.approve_comment}</h3>
</div>
</div> :'' }
</div>


   </div>
   <div className="tab-content mg-t-20" style={{display:`${tab==='amenity'?'block':'none'}`}} >

     
     { detailsBookings.length > 0 ? <>
           {   detailsBookings.map((post,index)=>( 
      <Accordion square expanded={expanded === post.data.bfid} onChange={handleChange(post.data.bfid)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="ui-accordion-header ">
          <Typography ><span className="ui-accordion-header-icon ui-view-header"></span>{post.data.type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>

          { post.amenities.length > 0 ? 
<> 

          <table class="table table-bordered mg-b-0 text-center view-top">
                        <thead>
                          <tr class="heading-sec-table heading-view-table heading-view-details">                           
                            <th scope="col">Facilities</th>
                            <th scope="col">Number Desired</th>
                            <th scope="col">Hours</th>                            
                          </tr>
                        </thead>
                        <tbody class="tbody-color ">
                        {post.amenities.map((childpost,index)=>( 
                          <tr>                          
                            <td>{childpost.amenities_name}</td>
                            <td>{childpost.count}</td>
                            <td>{detailsTimediff}</td>
                          </tr> 
                          )) }
                        </tbody>
                      </table>


</>
          :<>          
          <table class="table table-bordered mg-b-0 text-center view-top">
                        <thead>
                          <tr class="heading-sec-table heading-view-table heading-view-details">                           
                            <th scope="col">Facilities</th>
                            <th scope="col">Number Desired</th>
                            <th scope="col">Hours</th>                            
                          </tr>
                        </thead>
                        <tbody class="tbody-color ">
                          <tr>                          
                            <td>{post.data.type}</td>
                            <td>1</td>
                            <td>{detailsTimediff}</td>
                          </tr> 
                        </tbody>
                      </table>
          </>     
          
          
}

          </Typography>
        </AccordionDetails>
      </Accordion>

           ))}</>:<></>
     }
      
      

      
      

      
    


         <div class="next-sec" >
       
         <Link    to={`/BookingList`} id="printpagebuttonlink"  style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px', cursor:'pointer',
         fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}> Back</Link> 
       
     
     
   </div>
 
    


      </div>
    </div>
    </div>
    </div>
    </div>
  

    <div class="content content-fixed-new" id="deatilsnewforprintnew"  style={{maxWidth:'1120px',margin:'0 auto', display:'none'}}>
    
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
                      <p class="user-inner-sec">{detailsApplicant.organization}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Name </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.name}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Position in the Organization</p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.position}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Phone </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.phone}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>City </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.city}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Are you authorized to make this application </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-3" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.authorizedOrganization =='1' ? 'Yes' :'NA'}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Details of Organization </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.detailOrganization}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>How many enrolled members are <br></br> in your organization? </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.memberOfOrganization}</p>
                      </div>
                      
                      </div>
                      <div class="col-md-12 row" >
                        <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>State purpose for which premises will be used</p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.premises}</p>
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
                      {((detailsApplicant.locationName)==='Infinity') ? detailsApplicant.locationName :
                
                <>
                 {(isNaN(detailsApplicant.locationName)===false) ? '#'+detailsApplicant.locationName :detailsApplicant.locationName}
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
                      <p class="user-inner-sec">{detailsApplicant.email}</p>
                      </div>
                      
                      </div>
                      
                      <div class="col-md-12 row" >
                        <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Address :</p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.address1+' , '+detailsApplicant.address2}</p>
                      </div>
                      
                      </div>
                      
                      
                      <div class="col-md-12 row" >
                      <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Street Address     </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                      <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.address3}</p>
                      </div>
                      <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>State    </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                      <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{detailsApplicant.state}</p>
                      </div>
                      
                        
                      <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Describe purpose or objective of Organization </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{ detailsApplicant.objectiveOrganization}</p>
                      </div>
                      <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>Is your Organization profit making? </p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{ `${detailsApplicant.isProfitMakingOrganization== 1?'Yes':'No'}`}</p>
                      </div>
                      
                      
                      <div class="col-md-7" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-sec" style={{fontSize:'16px'}}>if applicant is a youth organization, what is average age of it membership?</p>
                        </div>
                        <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
                        <div class="col-md-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                      <p class="user-inner-sec">{ detailsApplicant.memberAverageAge}</p>
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
            
              <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px',marginTop:'10px'}}>
                <div id="accordion5" class="accordion accordion-pink">
                <h6 class=" ui-state-active " style={{textAlign: 'left',marginBottom:'15px', fontFamily: 'IBM Plex Sans', fontSize: '17px', fontWeight: '600', textAlign:'left',backgroundColor: '#d2d2d2',padding: '15px 20px 13px 20px',borderRadius: '4px'}}>
                    <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Event Details</h6>
                  <div class="ui-accordion-contents" style={{padding: '40px 30px 40px 30px', border:'1px solid rgb(204, 204, 204)'}}>
                   
<div class="row">
<div class="col-md-6">
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec"style={{fontSize:'16px'}}>Event Name </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.event_name}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Start Date </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.bookingDate}</p>
</div>

</div>
<div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Start Time</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.bookingStartTime}</p>
</div>

</div>
{detailsApplicant.submit_at!=null? 
    <div class="col-md-12 row" >
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Submission Date</p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{detailsApplicant.submit_at}</p>
    </div>
    
    </div> : ''}



</div>
<div class="col-md-6">
<div class="col-md-12 row" >
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Event Participants </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.event_participant}</p>
</div>

</div>
{/* <div class="col-md-12 row" >
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>Event Description</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.event_details}</p>
</div>

</div> */}
<div class="col-md-12 row" >
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>End Date </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.bookingDate}</p>
</div>

</div>

<div class="col-md-12 row" >
<div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-sec" style={{fontSize:'16px'}}>End Time :</p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.bookingEndTime}</p>
</div>

</div>

<div class="col-md-12 row" >
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Booking Id :</p>
    </div>
    <div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
    <div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-inner-sec">{id}</p>
    </div>
    
    </div>


</div>



<div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
 
 <p class="user-sec" style={{fontSize:'16px',marginLeft:'32px'}}>Event Description</p>
 <p style={{fontSize:'19px',marginLeft:'65px'}}>:</p>
 <p class="user-inner-sec" style={{marginLeft:'16px'}}>{detailsApplicant.event_details}</p>
 
 
 
 </div> 

 {detailsApplicant.reject_reason!=null ?  
  <div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
 
 {detailsApplicant.status =='cancel' ?
          <>
 <p class="user-sec" style={{fontSize:'16px',marginLeft:'32px'}}>Reasons for Cancellation:</p> </> 
        :<>
        
        </>  } 
        {detailsApplicant.status =='rejected' ?
          <>
 <p class="user-sec" style={{fontSize:'16px',marginLeft:'32px'}}>Reasons for Rejection:</p> </> 
        :<>
        
        </>  } 
 <p style={{fontSize:'19px',marginLeft:'27px'}}>:</p>
 <p class="user-inner-sec" style={{marginLeft:'16px',paddingBottom:'0px'}}>{detailsApplicant.reject_reason}</p>
 
 
 
 </div> 




 : '' }
 {(detailsApplicant.approve_comment!=null && detailsApplicant.approve_comment!='') ?  

<div class="col-md-12 row" style={{paddingLeft:'0px', paddingRight:'0px'}}>
 
<p class="user-sec" style={{fontSize:'16px',marginLeft:'32px'}}>Comments</p>
<p style={{fontSize:'19px',marginLeft:'110px'}}>:</p>
<p class="user-inner-sec" style={{marginLeft:'16px',paddingBottom:'0px'}}>{detailsApplicant.approve_comment}</p>



</div> 



:'' }
</div>
                    </div>
                
               
                
                </div>
              </div>
            
    
    <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px',marginTop:'80px',paddingTop:'90px'}}>
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
                    { detailsBookings.length > 0 ? <>
                        {   detailsBookings.map((post,index)=>( 
     <> 
                    { post.amenities.length > 0 ?   <>
                    {post.amenities.map((childpost,index)=>( 
                        <>
                        <tr>                          
                          <td >{post.data.type} ({childpost.amenities_name})</td>
                          <td>{childpost.count}</td>
                          <td>{detailsTimediff}</td>
                        </tr> 
                        </>
                        )) }
                        </> :  <>  <tr>                          
                          <td >{post.data.type}</td>
                          <td>1</td>
                          <td>{detailsTimediff}</td>
                        </tr>  </>
    
                    }
                 </>   ))}</>:<></>
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
  

    
    <Modal show={show3} onHide={handleClose3} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '430px', marginTop: '50px'}}>
        <Modal.Header closeButton style={{paddingLeft:'35px', color:'rgb(104, 104, 104)', fontWeight:'400', fontSize:'20px',paddingBottom:'0px'}}>
        <span style={{paddingTop:'10px'}}>Location Admin</span></Modal.Header>
        <div class="modal-body modal-body-apply modal-request modal-padding" style={{padding:'22px 0px'}}>
          <div class="row">
          <div class="col-md-12">
            <select name="locadmin" class="select-sec" onChange={inputEvent}>
            <option value="0">Select ... </option>
            {   facilityAdmin.map((post,index)=>( 
            
              <option value={post.emp_id}>{post.firstName+' '+post.lastName} </option>
            ))}
            </select>
     </div>
       </div>
        {/* <textarea  name="locadmin" onChange={inputEvent}  style={{marginTop:'20px'}}></textarea> */}
        <div class="row">

<div class="col-md-12" >
<a onClick={forward} class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'20%',height:'40px;',marginRight:'10px',marginTop:'25px',height:'40px',marginBottom:'20px'}}>Yes</a>
<a  class="btn-process btn-confirm btn-no" style={{textDecoration: 'none', cursor: 'pointer',width:'20%',height:'40px;',marginTop:'25px',height:'40px',marginBottom:'20px'}} onClick={() => {setShow3(false)}}>No</a>
  

</div>

</div>




</div>
</div>
      
</Modal>

<Modal show={initiate.active} onHide={handleCloseM} className='closelogin'>
<div class="upload-close upload-top upload-topnewheigh" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '45px'}}>
              <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans'}}>{initiate.message}</p>
              <button onClick={submit} type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</button>
              <button type="button"  onClick={() => {handleCloseM()}} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>


    </>
  )
}
