import React from 'react'; 
import {Link } from "react-router-dom";

const Locationadmin = () => {
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
                        <th scope="col" style={{width:'200px'}}><span>Location</span></th>
                        <th scope="col" style={{width: '250px'}}>Facilities</th>
                        <th scope="col" style={{width: '146px'}}>Requested Date</th>
                        <th scope="col" style={{width: '155px'}}>Requested Hours</th>
                        <th scope="col" style={{width: '300px'}}>Comments</th>
                        <th scope="col" style={{width: '72px'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody class="tbody-color tbody-view">
                      <tr>
                        <td scope="row">01</td>
                        <td>Middle School</td>
                        <td>School Building, Open Play Area</td>
                        <td>15th June 2021</td>
                        <td>2</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                        <td>
                          <Link to="/Locationviewdetails" style={{paddingTop: '30px', display: 'block'}}>
                            <i class="fa fa-eye view-class" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></Link></td>
                      </tr>
                      <tr>
                        <td scope="row">02</td>
                        <td>P.S 30</td>
                        <td>Auditorium</td>
                        <td>17th June 2021</td>
                        <td>5</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                        <td>
                          <Link to="/Locationviewdetails" style={{paddingTop: '30px', display: 'block'}}>
                            <i class="fa fa-eye view-class" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></Link></td>
                      </tr>
                      
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