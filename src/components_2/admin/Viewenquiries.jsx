import React from 'react'; 
import {Link } from "react-router-dom";


const Viewenquiries = () => {
return (
    <>
      <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
  
       <div data-label="Example" class="df-example demo-table">
           <div class="table-responsive dataTables_wrapper no-footer">
             <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px'}} id="example1_length"><label>
                 <select name="example1_length" aria-controls="example1" class="" style={{fontFamily: 'IBM Plex Sans'}}>
                     <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>
             <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
               <input type="search" class="search-data" placeholder="Search..." aria-controls="example1" style={{fontFamily: 'IBM Plex Sans'}}/></label>
               </div>
               
             <table class="table table-bordered mg-b-0 text-center">
               <thead>
                 <tr class="heading-sec-table">
                   <th scope="col" style={{width:'130px'}}>Sl No</th>
                   <th scope="col" style={{width:'230px'}}>Location</th>
                   <th scope="col" style={{width:'490px'}}>Facilities</th>
                   <th scope="col">Requested Date</th>
                   <th scope="col">Requested Hours</th>
                   <th scope="col" style={{width:'150px'}}>Action</th>
                 </tr>
               </thead>
               <tbody class="tbody-color tbody-view">
                 <tr>
                   <th scope="row">01</th>
                   <td>Middle School</td>
                   <td>School Building, Open Play Area</td>
                   <td>15th June 2021</td>
                   <td>2</td>
                   <td>
                   <Link to="/Viewdetails">
                       <i class="fa fa-eye view-class views-classes" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></Link></td>
                 </tr>
                 <tr>
                   <th scope="row">02</th>
                   <td>P.S 30</td>
                   <td>Auditorium</td>
                   <td>17th June 2021</td>
                   <td>5</td>
                   <td><Link to="/Viewdetails">
                     <i class="fa fa-eye view-class views-classes" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></Link></td>
                 </tr>
                 
               </tbody>
             </table>
             <div class="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontFamily: 'IBM Plex Sans'}}>Showing 1 to 10 of 50 entries</div>
             <div style={{width: 'auto', float: 'right', border: '1px solid #ccc',marginTop:'20px'}}>
               <div style={{float: 'left', padding: '6px 10px', backgroundColor: '#f79e00', color: '#fff', fontSize: '14px', fontFamily: 'IBM Plex Sans'}}> Page 1<span> of </span> 2 </div>
               <div style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineheight: '18px', marginTop: '2px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
               <span style={{float: 'left', fontSize: '14px', paddingTop: '6px', marginLeft: '10px', color:'#707070',  fontFamily: 'IBM Plex Sans'}}>Go To</span>
               <input value="1" type="text" style={{color:'#707070',  fontFamily: 'IBM Plex Sans', width: '31px', float: 'left', height: '22px', marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '6px', border: '1px solid #f79e00'}} />
             <div style={{float: 'left',  cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div></div>
           </div>
         </div>

</div>
</div>

    </>
)
}
export default Viewenquiries