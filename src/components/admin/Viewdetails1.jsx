import React,{useState,useEffect} from "react";
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


  const { id } = useParams();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });

  const [detailsBookings, setdetailsBookings] = useState([]);
  const [detailsApplicant, setDetailsApplicant] = useState([]);
  const [facilityAdmin, setDetailsFacilityAdmin] = useState([]);
  const [tab, setTab] = useState('amenity');

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [locadmin, setLocationAdmin] = useState(0);

  const [statusBooking, setStatusBooking] = useState('submit');

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
  useEffect(() => {

    Axios.post("getBookedFacilitiesById",{id:id})
    .then(res =>{
      console.log("getBookedFacilitiesById");
       console.log(res.data);
      setdetailsBookings(res.data.data);
      setDetailsApplicant(res.data.bookingInfo);
      setDetailsFacilityAdmin(res.data.locations);
    
    });


   },[])

   if(statusBooking === 'assigned'){
        
    return <Redirect to={`/Applicationstatus`} />;
 }

  return (
      <>
      <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
    <div className="button-print">
    <button type="button" className="btn btn-primary"><i className="fa fa-print" aria-hidden="true" style={{marginRight:'6px'}}></i>
        <span>Print</span></button>

 </div>
 <div data-label="Example" className="df-example">
 <ul className="nav nav-line nav-view" id="myTab5" role="tablist">
          <li className="nav-item">
            <a className={`nav-link ${tab==='user'?'active':''}`} id="home-tab5" data-toggle="tab" onClick={()=>clicktab('user')}  role="tab" aria-controls="home" aria-selected="true">User Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${tab==='event'?'active':''}`} id="home-tab5" data-toggle="tab"  role="tab" onClick={()=>clicktab('event')} aria-controls="home" aria-selected="true">Event Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${tab==='amenity'?'active':''}`} id="home-tab5" data-toggle="tab"  role="tab" onClick={()=>clicktab('amenity')}  aria-controls="home" aria-selected="true">Amenity Details</a>
          </li>
        
          
        
        </ul>
   <div>
   <div className="tab-content mg-t-20" style={{display:`${tab==='user'?'block':'none'}`}} >

{detailsApplicant.organization}
{detailsApplicant.name}
{detailsApplicant.position}
{detailsApplicant.phone}
{detailsApplicant.location}
{detailsApplicant.email}
{detailsApplicant.city}
{detailsApplicant.isProfitMakingOrganization}


   </div>
   <div className="tab-content mg-t-20" style={{display:`${tab==='event'?'block':'none'}`}} >

   {detailsApplicant.event_name}
{detailsApplicant.event_participant}
{detailsApplicant.startDate}
{detailsApplicant.endDate}


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
                            <td>2</td>
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
                            <td>2</td>
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
      
      

      
      

      
      
      <div class="next-sec" onClick={()=>setShow3(true)}>
    <span type="button" class="btn  btn-add btn-green btnNext">Next</span>
</div>
      </div>
    </div>
    </div>
    </div>
    </div>

    <Modal show={show3} onHide={handleClose3} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        Location Admin</Modal.Header>
        <div class="modal-body modal-body-apply modal-request modal-padding" style={{padding:'22px 0px'}}>
          <div class="row">
          <div class="col-md-8">
            <select name="locadmin" onChange={inputEvent}>
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
<a onClick={forward} class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'12%',height:'40px;',marginRight:'10px',marginTop:'15px',height:'40px'}}>Yes</a>
<a  class="btn-process btn-confirm btn-save" style={{textDecoration: 'none', cursor: 'pointer',width:'12%',height:'40px;',marginTop:'15px',height:'40px'}}>No</a>
  

</div>

</div>




</div>
</div>
      
</Modal>




    </>
  )
}
