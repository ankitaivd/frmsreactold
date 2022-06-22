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

const Locationadmin = () => {
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const [allBookings, setAllBookings] = useState([]);
  const a3 = useSelector((state) => state.todoReducer3);
  useEffect(() => {

    console.log(a3);

     Axios.post("getMyProfileAdmin",{id:0,status:'approved',	locationadmin:a3.applicant_id})
  .then(res =>{
    console.log("Get Data Location Admin");
    console.log(res.data);
    setAllBookings(res.data.totalbookad);
  
  });
  
  
  },[]);


return (
   <>
    <div class="content content-fixed">
      <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
      
       <div data-label="Example" class="df-example">
        <ul class="nav nav-line nav-view" id="myTab5" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab5" data-toggle="tab" href="#home5" role="tab" aria-controls="home" aria-selected="true">My Task</a>
          </li>
        
        </ul>

        <div class="tab-content mg-t-20" id="myTabContent5">
        
          <div class="tab-pane fade show active" id="home5" role="tabpanel" aria-labelledby="home-tab5">
          
          
            <div data-label="Example" class="df-example demo-table">
                <div class="table-responsive dataTables_wrapper no-footer">
                  <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px'}} id="example1_length"><label>
                      <select name="example1_length" aria-controls="example1" class="" style={{fontFamily: 'IBM Plex Sans'}}><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>
                  <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
                    <input type="search" class="search-data" placeholder="Search..." aria-controls="example1" style={{fontFamily: 'IBM Plex Sans'}}/></label></div>
                    
                  <table class="table table-bordered mg-b-0 text-center">
                    <thead>
                      <tr class="heading-sec-table">
                        <th scope="col" style={{width:'70px'}}>Sl No</th>
                        <th scope="col" style={{width:'180px'}}><span>Location</span></th>
                        <th scope="col" style={{width: '180px'}}>Facilities</th>
                        <th scope="col" style={{width: '146px'}}>Requested Date</th>
                        <th scope="col" style={{width: '105px'}}>Requested Hours</th>
                        <th scope="col" style={{width: '160px'}}>Comments</th>
                        <th scope="col" style={{width: '140px'}}>Status</th>
                        <th scope="col" style={{width: '72px'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody class="tbody-color tbody-view">
                    { allBookings.length > 0 ? <>
           {   allBookings.map((post,index)=>(          
           
                      <tr>
                        <td scope="row">{index+1}</td>
                        <td>{post.details.locationName}</td>
                        <td>{post.details.facilityName}</td>
                        <td>{post.details.bookingDate}</td>
                        <td>{post.timediffen}</td>
                        <td>{post.details.event_details}</td>
                        <td>
                          {post.details.status==='approved'?"Estimate To Be Provided":""}
                          {post.details.status==='rejected'?"Rejected":""}
                          {post.details.status==='locassign'?"Pending":""}
                        </td>
                        <td>
                          <Link to={`/Locationviewdetails/${post.details.bid}`} style={{paddingTop: '0px', display: 'block'}}>
                            <i class="fa fa-eye view-class" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></Link></td>
                      </tr>

           ))} </>:' No request available ' }
                      
                      
                    </tbody>
                  </table>
                  <div class="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontFamily: 'IBM Plex Sans'}}>Showing 1 to 10 of 50 entries</div>
                  <div style={{width: 'auto', float: 'right', border: '1px solid #ccc', marginTop: '20px' }}>
                    <div style={{float: 'left', padding: '5px 10px', background: '#f79e00', color: '#fff', fontSize: '14px', fontFamily: 'IBM Plex Sans'}}> Page 1<span> of </span> 2 </div>
                    <div style={{float: 'left', cursor: 'pointer', fontsize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00', fontFamily: 'IBM Plex Sans'}}>&lt;</div>
                    <span style={{float: 'left', fontSize: '14px', marginTop: '6px', marginLeft: '10px', color:'#707070', fontFamily: 'IBM Plex Sans'}}>Go To</span>
                    <input value="1" type="text" style={{fontFamily: 'IBM Plex Sans', color:'#707070', width: '31px', float: 'left', height: '22px', marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '4px', border: '1px solid #f79e00' }} />
                  <div style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00', fontFamily: 'IBM Plex Sans'}}>&gt;</div></div>
                </div>
              </div>
            


          </div>
          
         
        </div>
      </div>
     


      </div>
    </div>
   </>
)
}
export default Locationadmin