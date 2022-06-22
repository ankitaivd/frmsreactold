import React, {useState} from 'react'; 

import Modal from 'react-bootstrap/Modal';
import {Link } from "react-router-dom";

const Requestordetails = () => {

 
const initiateview = ()=>{
 
  setShow1(true);

}
const [showM, setShow1] = useState(false);
const handleCloseM = () => setShow1(false);

const closeok = ()=>{
  setShow1(false);
}
return (
   <>
   
   <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
  
     <div class="button-print">
       <button type="button" class="btn btn-primary"><i class="fa fa-print" aria-hidden="true" style={{marginRight:'6px'}}></i>
           <span>Print</span></button>

    </div>
     
      <div data-label="Example" class="df-example">
      
       <ul class="nav nav-line nav-view" id="myTab5" role="tablist">
        
         <li class="nav-item">
           <a class="nav-link active" id="contact-tab5" data-toggle="tab" href="#contact5" role="tab" aria-controls="contact" aria-selected="false">Requestor Details</a>
         </li>
         
       
       </ul>

       <div class="tab-content mg-t-20" >
         <div class="" role="tabpanel" aria-labelledby="contact-tab5">           
       <div class="row">
         <div class="col-md-12">
           <div class="view-app-sec">
             <h2>View Applicant Details</h2>
           </div>
         </div>

         <div class="col-md-3">
           <p class="heading-view">Full Name of applicant Organization</p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>The Sunshine Kids</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Position in the Organization  </p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>Director</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Address </p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>4092 Jim Rosa Lane, San Francisco, California United States</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Street Address </p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>4092 Jim Rosa Lane</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">City </p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>San Francisco</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">State </p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>California</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Phone no</p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>518-497-6744</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Email id </p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>ann@gmail.com</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Full Name</p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>Ann Marley</span></p>
         </div>         
         <div class="col-md-3">
           <p class="heading-view">Are you authorized to make this application</p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}}>Yes</span></p>
         </div>
         <div class="col-md-3">
           <p class="heading-view">Details of Organization</p>
         </div>
         <div class="col-md-9" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span class="para-new-view" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</span></p>
         </div>
         <div class="col-md-3 lin-code">
           <p class="heading-view">Describe purpose or objective of Organization</p>
         </div>
         <div class="col-md-9 lin-code" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span class="para-new-view" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</span></p>
         </div>

         <div class="col-md-3 lin-code">
           <p class="heading-view">Is your Organization profit making?</p>
         </div>
         <div class="col-md-9 lin-code" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}} >Can't Say</span></p>
         </div>

         <div class="col-md-3 lin-code">
           <p class="heading-view">How many enrolled members are in your organization?</p>
         </div>
         <div class="col-md-9 lin-code" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}} >20</span></p>
         </div>

         <div class="col-md-3 lin-code">
           <p class="heading-view">if applicant is a youth organization, what is average age of it membership?</p>
         </div>
         <div class="col-md-9 lin-code" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}} >18</span></p>
         </div>

         <div class="col-md-3 lin-code">
           <p class="heading-view">State purpose for which premises will be used</p>
         </div>
         <div class="col-md-9 lin-code" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}} >Sports</span></p>
         </div>

         <div class="col-md-3 lin-code">
           <p class="heading-view">Start Time</p>
         </div>
         <div class="col-md-9 lin-code" style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}} >4PM</span></p>
         </div>

         <div class="col-md-3 ">
           <p class="heading-view">End Time</p>
         </div>
         <div class="col-md-9 " style={{paddingleft:'0px'}}>
           <p class="para-view">:<span style={{marginLeft:'10px'}} >5PM </span></p>
         </div>


       </div>

       <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px'}}>
         <div >
           <h6 class="officer-sec">Officer Details:-</h6>
          
             <table class="table table-bordered mg-b-0 text-center view-top">
                 <thead>
                   <tr class="heading-sec-table heading-view-table">
                     <th scope="col" style={{width:'170px'}}>Name</th>
                     <th scope="col" style={{width:'170px'}}>Phone no</th>
                     <th scope="col" style={{width:'250px'}}>Office held</th>
                     <th scope="col">Address</th>
                     
                   </tr>
                 </thead>
                 <tbody class="tbody-color tbody-view">
                   <tr>
                     <th scope="row">Doris</th>
                     <td>518-497-0011</td>
                     <td>United State</td>
                     <td>3916 Sycamore Lake Road, Wisconsin,United State</td>
                   </tr>
                  
                 </tbody>
               </table>
             
         </div>
       </div>

       <div class="row">
       <div class="col-md-4" style={{margin:'0 auto',marginTop:'15px', marginBottom: '10px'}}>
         <div class="form__group">
           <textarea id="message" class="form__field" placeholder="Your Message" rows="3" style={{fontFamily:'IBM Plex Sans'}}></textarea>
           <label for="message" class="form__label form-lables" style={{fontFamily:'IBM Plex Sans'}}>Add a comments</label>
         </div>
       </div>
     </div>

     <div class="row">
       <div class="button-sec button-forward">
         <button type="button" onClick={initiateview} data-toggle="modal" class="btn btn-primary btn-add" style={{fontFamily:'IBM Plex Sans'}}>Forward</button>
         <button type="button" class="btn btn-outline-primary btn-cancel" style={{fontFamily:'IBM Plex Sans'}}>Cancel</button>


       </div>
     </div>

       </div>
       </div>
    
</div>
     
     </div>
   </div>


   <Modal show={showM} onHide={handleCloseM} className='closelogin'>
<div class="login-close view-close" style={{marginTop: '341px'}}>
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-content forward-contents  tx-14">
      <div class="modal-headers">
       
        {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button> */}
      </div>
      <div class="modal-body modal-body-for" style={{marginBottom: '35px'}}>
        <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans'}}>You are about to forward this enquiry to location admin </p>
        <Link type="button" to="/Locationadmin" class="btn btn-primary btn-add" style={{width: '103px',fontSize: '20px', padding: '7px 0px',fontFamily: 'IBM Plex Sans'}}>ok</Link>
      </div>
    
    </div>
    </div>

  
</Modal>
   </>
)
}
export default Requestordetails