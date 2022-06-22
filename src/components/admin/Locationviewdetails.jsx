import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import { userData } from "../../actions/userData";
import { finalData } from "../../actions/finalData";
import { siteData } from "../../actions/siteData";
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

import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import Modal from 'react-bootstrap/Modal';


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
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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


const [cancelres,setcancelresInfo]=useState({
  cancelreason:"",
  
  err_cancelreason:1,
  
  err:0,
   
    });
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
  const closeok = ()=>{
    setShow1(false);
  }

  const rejectmodal = ()=>{
      setShow3(true)
  }
  const [showM3, setShow3] = useState(false);
  const handleCloseM3 = () => setShow3(false);
  const closeoks = ()=>{
    setShow3(false);
  }

  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });

  const [detailsBookings, setdetailsBookings] = useState([]);
  const [detailsApplicant, setDetailsApplicant] = useState([]);
  const [facilityAdmin, setDetailsFacilityAdmin] = useState([]);
  const [allOffice,setAllOffices]=useState([]);
  const [detailsTimediff, setDetailsTimediff] = useState([]);
  // const { id } = useParams();
  const id = useSelector((state) => state.todoReducer5.id.val);
  console.log("sgf");
  const [time1, setTime] = useState('12:00 pm');
  const [showTime, setShowTime] = useState(false);

  const [endtime1, setEndTime] = useState('01:00 pm');
  const [showEndTime, setEndShowTime] = useState(false);
 // console.log(detailsApplicant);
 const setPrintesti =()=>{
  
    
   
  var deatilsnewforprint = document.getElementById("deatilsnewforprint");
  var deatilsnewforprintnew = document.getElementById("deatilsnewforprintnew"); 


  deatilsnewforprint.style.display = 'none';
  deatilsnewforprintnew.style.display = 'block';
 
  document.title='Facility_Details_Booking_Id_'+id+'_LA';
  window.print();
  document.title='FRMS ADMIN';
  //[Delete this line if you want it to stay hidden after printing]
  deatilsnewforprint.style.display = 'block';
  deatilsnewforprintnew.style.display = 'none';



}
  const submit =()=>{
  
    console.log(initiate);
    console.log(id);
    
console.log({initiate:initiate,id:id});
  var calrea='';
if(initiate.status=='Reject'){
  console.log(cancelres);
  if(cancelres.err_cancelreason==0){


calrea=cancelres.cancelreason;
      setcancelresInfo((preValue)=>{
   
      return {   
      cancelreason:'',
      err_cancelreason:0,
     
      err:0,
      };
     
 
 
 
 
    });
  
  
  }else{
     setcancelresInfo((preValue)=>{
   
     return {   
     cancelreason:preValue.cancelreason,
     err_cancelreason:1,
    
     err:5,
     };
    




   });
     return 0;
  }
}
    Axios.post("adminApproved",{initiate:initiate,id:id,canrea:calrea})
.then(res =>{
  console.log("locationAdminApproved");
   console.log(res.data);

  if(res.data.status==="success"){
    setSubmit(true);
  }
  

});

  }
// alert(detailsApplicant.startTime);
const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
  
  useEffect(() => {


    
    

Axios.post("getBookedFacilitiesById",{id:id})
.then(res =>{
  console.log("getBookedFacilitiesById");
   console.log(res.data.bookingInfo.organizationOffices);
   setAllOffices(JSON.parse(res.data.bookingInfo.organizationOffices));
  setdetailsBookings(res.data.data);
  setDetailsApplicant(res.data.bookingInfo);
  console.log("dbhg");
  console.log(res.data);
   setDetailsTimediff(res.data.timediff);

  let ds = res.data.bookingInfo.startTime.split(":");
let d1='';
let de = res.data.bookingInfo.endTime.split(":");
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
console.log(d1);
console.log(d2);
setTime(d1);
setEndTime(d2);

  // setDetailsFacilityAdmin(res.data.locations);

});



  },[])

  if(submitstatus){
  return <Redirect to={`/Locationadminview`} />;
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
      
       <div data-label="Example" class="df-example">
       <ul class="nav nav-line" id="myTab5" role="tablist">
          <li class="nav-item nav-view">
            <a class="nav-link active" id="home-tab5" data-toggle="tab" href="#home5" role="tab" aria-controls="home" aria-selected="true">My Task</a>
          </li>
        
        </ul>


        <div class="tab-content mg-t-20" id="myTabContent5">
        
        <div class="tab-pane fade show active" id="home5" role="tabpanel" aria-labelledby="home-tab5">
        
         
        <div class="task-view-sec">
            <div class="row">
                <div class="col-md-12">
                  <div class="request-sec" style={{border: 'none'}}>
                      {/* <div class="request-sec-inner"  style={{display: 'flow-root'}}>
                          <div class="request-inner-left">
                              <p>Request</p>
                          </div>
                          <div class="request-inner-right" >
                              <div class="request-icon-sec">
                             <p  href="#modal2" data-toggle="modal" style={{cursor: 'pointer'}}>Approved</p> 
                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                          </div>
                          </div>
                         

                      </div> */}

                      <div class=""  style={{    width: '80%',
    float: 'right',
    top: '-77px',
    position: 'relative',
    right: '-49px'}}>
  
                      { detailsBookings.organization!=''  ? <>  <div className="button-print">
    <button  type="button" onClick={()=>setPrintesti()}  className="btn btn-primary"><i className="fa fa-print" aria-hidden="true" style={{marginRight:'6px'}}></i>
        <span>Print</span></button> </div></> :<></>
       }
  
  </div>
                  </div>
                </div>

               

            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="req-amenity-sec">
                <div class="newcoloback" style={{backgroundColor: '#d2d2d2'}}>
                        <p>Requested Amenity Details</p>
                </div>
                <div class="row req-details-inner">
                  <div class="col-md-6">

                  { detailsBookings.length > 0 ? <>
           {   detailsBookings.map((post,index)=>( 

                  <Accordion square expanded={expanded === post.data.bfid} onChange={handleChange(post.data.bfid)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="ui-accordion-header ">
          <Typography ><span className="ui-accordion-header-icon ui-view-header"></span>{post.data.type}</Typography>
        </AccordionSummary>
        {post.amenities.length > 0 ? 
        <AccordionDetails>
          <Typography>
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
                        ))}
                        </tbody>
                      </table>
          </Typography>
        </AccordionDetails>:'' }
      </Accordion>
           ))}</>:<></> }
      

      


      
                  </div>
                  <div class="col-md-6">

                  

      
      
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="requestor-sec">
        <div class="row">
            <div class="col-md-12">
                <div class="req-amenity-sec">
                    <div class="newcoloback">
                        <p>Requestor Details</p>
                    </div>

                    <div class="row details-inner-sec">
                        <div class="row col-md-6">
                            <div class="col-md-6">
                                <p class="heading-view heading-view-local">Full Name of applicant Organization</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.organization}</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Location</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{((detailsApplicant.locationName)==='Infinity') ? detailsApplicant.locationName :
                
                <>
                 {(isNaN(detailsApplicant.locationName)===false) ? '#'+detailsApplicant.locationName :detailsApplicant.locationName}
                </>
                }</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Position in the Organization</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.position}</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Address</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.address1+' , '+detailsApplicant.address2}</span></p>
                              </div>
                             
                           

                              <div class="col-md-6 top-more">
                                <p class="heading-view heading-view-local">Street Address                                </p>
                              </div>
                              <div class="col-md-6 top-more" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.address3}</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">City</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.city}</span></p>
                              </div>

                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">State</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.state}</span></p>
                              </div>

                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Phone no</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.phone}</span></p>
                              </div>

                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Email id  </p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.email}</span></p>
                              </div>
                        </div>

                        <div class="row col-md-6">
                            <div class="col-md-7">
                                <p class="heading-view heading-view-local">Full Name </p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.name}</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Are you authorized to make this application</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.authorizedOrganization =='1' ? 'Yes' :'NA'}</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Is your Organization profit making?</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>
                                  
                                {detailsApplicant.isProfitMakingOrganization =='1' ? 'Yes' :'No'} </span></p>
                              </div>

                              <div class="col-md-7 top-more">
                                <p class="heading-view heading-view-local">How many enrolled members are in your organization? </p>
                              </div>
                              <div class="col-md-5 top-more" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.memberOfOrganization}</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">if applicant is a youth organization, what is average age of it membership?</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.memberAverageAge}</span></p>
                              </div>

                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">State purpose for which premises will be used</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{detailsApplicant.premises}</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Start Date</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{detailsApplicant.bookingDate}</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">End Date</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{detailsApplicant.bookingDate}</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Start Time</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{time1}</span></p>
                              </div>

                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">End Time</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>{endtime1}</span></p>
                              </div>
                              
                        </div>

                        <div class="row col-md-12 details-below">
                            <div class="col-md-3" style={{marginRight:'-8px'}}>
                                <p class="heading-view heading-view-local">Details of Organization</p>
                              </div>
                              <div class="col-md-7" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span class="para-new-view" style={{marginLeft:'9px'}}>{detailsApplicant.detailOrganization}</span></p>
                              </div>

                              

                        </div>
                        <div class="row col-md-12 details-below">
                        <div class="col-md-3" style={{marginRight:'-11px'}}>
                            <p class="heading-view heading-view-local">Describe purpose or objective of Organization</p>
                          </div>
                          <div class="col-md-7" style={{paddingLeft:'0px'}}>
                            <p class="para-view para-location-views">:<span class="para-new-view" style={{marginLeft:'9px'}}>{detailsApplicant.objectiveOrganization}</span></p>
                          </div>
                          </div>

                          

                    </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="requestor-sec">
        <div class="row">
            <div class="col-md-12">
                <div class="req-amenity-sec">
                    <div class="newcoloback">
                        <p>Event Details</p>
                    </div>

                    <div class="row details-inner-sec">
                        <div class="row col-md-6">
                            <div class="col-md-6">
                                <p class="heading-view heading-view-local">Event Name</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{detailsApplicant.event_name}</span></p>
                              </div>
                              
                           

                            
                        </div>
                        

                        <div class="row col-md-6">
                         
                              <div class="col-md-5">
                                <p class="heading-view heading-view-local">Event Participants</p>
                              </div>
                              <div class="col-md-7" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{detailsApplicant.event_participant}</span></p>
                              </div>
                        </div>
                       
                        <div class="row col-md-6">
                        {detailsApplicant.submit_at!=null ? 
                        <>
                        <div class="col-md-6">
                                <p class="heading-view heading-view-local">Submission Date</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{detailsApplicant.submit_at}</span></p>
                              </div>
                              
                         
                         </>:''}
                   </div>
                   <div class="row col-md-6">
                         
                         <div class="col-md-5">
                           <p class="heading-view heading-view-local">Booking Id </p>
                         </div>
                         <div class="col-md-7" style={{paddingLeft:'0px'}}>
                           <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}} id="starttimenew">{id}</span></p>
                         </div>
                         </div>
                       

                          <div class="row col-md-12 details-below">
                            <div class="col-md-3" style={{marginRight:'-10px'}}>
                                <p class="heading-view heading-view-local">Event Description</p>
                              </div>
                              <div class="col-md-7" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span class="para-new-view" style={{marginLeft:'9px'}}>{detailsApplicant.event_details}</span></p>
                              </div>

                              

                        </div>
                        {detailsApplicant.reject_reason!=null ? 
                        <div class="row col-md-12 details-below">
                            <div class="col-md-3" style={{marginRight:'-10px'}}>
                            {detailsApplicant.status =='cancel' ?
          <>

          <p class="heading-view heading-view-local">Reasons for Cancellation</p>
 
 </> 
        :<>
        
        </>  } 
        {detailsApplicant.status =='rejected' ?
          <>
          <p class="heading-view heading-view-local">Reasons for Rejection</p>
 
 </> 
        :<>
        
        </>  } 
                              </div>
                              <div class="col-md-7" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span class="para-new-view" style={{marginLeft:'9px'}}>{detailsApplicant.reject_reason}</span></p>
                              </div>

                              

                        </div> : ''}
                        {(detailsApplicant.approve_comment!=null && detailsApplicant.approve_comment!='') ? 
                        <div class="row col-md-12 details-below">
                            <div class="col-md-3" style={{marginRight:'-10px'}}>
                                <p class="heading-view heading-view-local">Comments</p>
                              </div>
                              <div class="col-md-7" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span class="para-new-view" style={{marginLeft:'9px'}}>{detailsApplicant.approve_comment}</span></p>
                              </div>

                              

                        </div> : ''}

                    </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px', border:'1px solid rgba(72, 94, 144, 0.16)'}}>
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

          {detailsApplicant.status =='locassign' ?
          <>
<div class="row">
<div class="button-sec button-forward action-sec">
  <button type="button" onClick={()=>setInitiate({status:'Approved',message:'You are about to approve this request',active:true})} data-toggle="modal" class="btn btn-primary btn-add btn-green">Approve</button>
  <button type="button" onClick={()=>setInitiate({status:'Reject',message:'You are about to reject this request',active:true})} href="#modal3" data-toggle="modal" class="btn btn-outline-primary btn-cancel" style={{fontFamily: 'IBM Plex Sans'}}>Reject</button>


</div>
</div> </> 
        :<></>  } 
          


            </div>
            </div>
            </div>
       </div>
       </div>
       </div>


       <Modal show={initiate.active} onHide={handleCloseM} className='closelogin'>
<div class="upload-close upload-top upload-topnewheigh" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '15px',paddingTop:'0px',position:'relative',display:'block',top:'-20px',padding:'0px'}}>
    
                { initiate.status=='Reject' ?  <>

  <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans',fontWeight:'500',borderBottom:'1px solid #cccccc',paddingBottom:'20px'}}>{initiate.message}</p> </>: <>
     <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans',fontWeight:'500',paddingBottom:'20px'}}>{initiate.message}</p>
  </>}

               { initiate.status=='Reject' ?  <>

  <div class="row">
<div class="col-md-12" style={{marginBottom:'15px',padding:'0px 42px'}}>
<span style={{ color: '#707070',fontSize:'15px',textAlign:'left',position:'relative',display:'block',fontWeight:'400'}}>Reasons for Rejection</span>
       <textarea   name="cancelreason" onChange={inputEventcancelDetails}  style={{marginTop:'10px', height:'95px',outline:'none',marginBottom:'10px',fontWeight:'400',border:'1px solid rgb(204, 204, 204)',width:'100%',fontSize:'15px',color:'#707070',fontFamily:'Heebo-Regular'}}></textarea>
      {(cancelres.err_cancelreason==1 && cancelres.err === 5) &&  <span style={{color:'red',textAlign:'left',position:'relative',display:'block',fontSize:'13px',marginTop:'-9px'}}>Please enter reasons of rejection</span> }
      
       </div>
       </div> </>: ''}
              <button onClick={submit} type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</button>
              <button type="button"  onClick={() => {handleCloseM()}} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>


<Modal show={showM3} onHide={handleCloseM3} className='closelogin'>
<div class="upload-close upload-top" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '45px'}}>
              <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans'}}>You are  about to reject this request</p>
              <Link to="/admin" type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</Link>
              <button type="button" onClick={() => {handleCloseM3()}} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>



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
                      <p class="user-inner-sec">{((detailsApplicant.locationName)==='Infinity') ? detailsApplicant.locationName :
                
                <>
                 {(isNaN(detailsApplicant.locationName)===false) ? '#'+detailsApplicant.locationName :detailsApplicant.locationName}
                </>
                }</p>
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
<p class="user-sec" style={{fontSize:'16px'}}>End Time </p>
</div>
<div class="col-md-1"><p style={{fontSize:'19px'}}>:</p></div>
<div class="col-md-5" style={{paddingLeft:'0px', paddingRight:'0px'}}>
<p class="user-inner-sec">{detailsApplicant.bookingEndTime}</p>
</div>

</div>

<div class="col-md-12 row" >
    <div class="col-md-6" style={{paddingLeft:'0px', paddingRight:'0px'}}>
    <p class="user-sec" style={{fontSize:'16px'}}>Booking Id </p>
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
  
   </>
)
}