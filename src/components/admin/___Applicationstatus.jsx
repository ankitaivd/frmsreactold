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

const Applicationstatus = () => {

  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });

  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
  Axios.post("getMyProfileAdmin",{id:0,status:'locassign'})
.then(res =>{
  console.log("Get Data");
  console.log(res.data);
  setAllBookings(res.data.totalbookad);

});


},[]);
  
return (
   <>
   <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
  
       <div data-label="Example" class="df-example demo-table">
           <div class="table-responsive dataTables_wrapper no-footer">
             <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px', fontFamily: 'IBM Plex Sans'}} id="example1_length"><label><select name="example1_length" aria-controls="example1" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>
             <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
               <input type="search" class="search-data" placeholder="Search..." aria-controls="example1" style={{fontFamily: 'IBM Plex Sans'}}/></label></div>
               
             <table class="table table-bordered mg-b-0 text-center">
               <thead>
                 <tr class="heading-sec-table">
                   <th scope="col" style={{width:'110px'}}>Sl No</th>
                   <th scope="col">Location</th>
                   <th scope="col" style={{width:'400px'}}>Facilities</th>
                   <th scope="col">Requested Date</th>
                   <th scope="col">Requested hour</th>
                   <th scope="col">Status</th>
                   <th scope="col">Action</th>
                 </tr>
               </thead>
               <tbody class="tbody-color tbody-view">

               { allBookings.length > 0 ? <>
           {   allBookings.map((post,index)=>( 
                 <tr>
                   <th scope="row">{index+1}</th>
                   <td>{post.details.locationName}</td>
                   <td>{post.details.facilityName}</td>
                   <td>{post.details.bookingDate}</td>
                 
                   <td>{post.timediffen}</td>
                   <td>
                     {post.details.status==='locassign'?'Booking Pending':''}
                     {post.details.status==='approved'?'Booking Approved':''}
                     {post.details.status==='rejected'?'Booking not approved':''}
                     </td>
                   <td>
                     <Link to={`/Createestimate/${post.details.bid}`} class="crete-sec" style={{color:'#0AB50A'}}>{post.details.status==='approved'?'Create Estimate':''}</Link></td>
                 </tr>
           ))}</>:<></>}
               
               
               </tbody>
             </table>
             <div class="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontFamily: 'IBM Plex Sans'}}>Showing 1 to 10 of 50 entries</div>
             <div style={{width: 'auto', float: 'right', border: '1px solid #ccc', marginTop:'20px'}}>
               <div style={{float: 'left', padding: '5px 10px', background: '#f79e00', color: '#fff', fontSize: '14px', fontFamily: 'IBM Plex Sans'}}> Page 1<span> of </span> 2 </div>
               <div style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
               <span style={{float: 'left', fontSize: '14px', marginTop: '6px', marginLeft: '10px', color:'#707070', fontFamily: 'IBM Plex Sans'}}>Go To</span>
               <input value="1" type="text" style={{color:'#707070', fontFamily:'IBM Plex Sans', width: '31px', float: 'left', height: '22px',  marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '4px', border: '1px solid #f79e00'}} />
             <div style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div></div>
           </div>
         </div>

</div>
</div>
   </>
)
}
export default Applicationstatus