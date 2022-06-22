import React, {useState} from 'react';

import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import Modal from 'react-bootstrap/Modal';
import {Link } from "react-router-dom";

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

  const approvemodal = ()=>{
  
    setShow1(true);
    
  }
  const [showM, setShow1] = useState(false);
  const handleCloseM = () => setShow1(false);

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
return (
   <>
     <div class="content content-fixed">
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
                  <div class="request-sec">
                      <div class="request-sec-inner"  style={{display: 'flow-root'}}>
                          <div class="request-inner-left">
                              <p>Request</p>
                          </div>
                          <div class="request-inner-right" >
                              <div class="request-icon-sec">
                             <p  href="#modal2" data-toggle="modal" style={{cursor: 'pointer'}}>Approved</p> 
                              <i class="fa fa-angle-down" aria-hidden="true"></i>
                          </div>
                          </div>
                         

                      </div>
                  </div>
                </div>

               

            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="req-amenity-sec">
                <div class="reg-details-sec">
                        <p>Requested Amenity Details</p>
                </div>
                <div class="row req-details-inner">
                  <div class="col-md-6">
                  <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="ui-accordion-header ">
          <Typography ><span className="ui-accordion-header-icon ui-view-header"></span>School Building</Typography>
        </AccordionSummary>
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
                          <tr>                          
                            <td>School Building</td>
                            <td>1</td>
                            <td>4</td>
                          </tr> 
                        </tbody>
                      </table>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon ui-view-header"></span>Open Play Area</Typography>
        </AccordionSummary>
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
                          <tr>                         
                            <td>Open Play Area</td>
                            <td>1</td>
                            <td>2</td>
                          </tr>                                                
                        </tbody>
                      </table>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon ui-view-header"></span>Auditorium</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table class="table table-bordered mg-b-0 text-center view-top">
                        <thead>
                          <tr class="heading-sec-table heading-view-table heading-view-details">                           
                            <th scope="col">Facilities</th>
                            <th scope="col">Amenities</th>
                            <th scope="col">Number Desired</th>
                            <th scope="col">Hours</th>                            
                          </tr>
                        </thead>
                        <tbody class="tbody-color ">
                          <tr>                         
                            <td>Auditorium</td>
                            <td>With Balcony</td>
                            <td>2</td>
                            <td>3</td>
                          </tr>                                           
                        </tbody>
                      </table>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon ui-view-header"></span>Rooms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table class="table table-bordered mg-b-0 text-center view-top">
                        <thead>
                          <tr class="heading-sec-table heading-view-table heading-view-details">                           
                            <th scope="col">Facilities</th>
                            <th scope="col">Amenities</th>
                            <th scope="col">Number Desired</th>
                            <th scope="col">Hours</th>                            
                          </tr>
                        </thead>
                        <tbody class="tbody-color ">
                          <tr>                           
                            <td>Rooms</td>
                            <td>Classrooms</td>
                            <td>2</td>
                            <td>3</td>
                          </tr>                                                  
                        </tbody>
                      </table>
          </Typography>
        </AccordionDetails>
      </Accordion>


      
                  </div>
                  <div class="col-md-6">

                  <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon ui-view-header"></span>Cafeteria</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table class="table table-bordered mg-b-0 text-center view-top">
                      <thead>
                        <tr class="heading-sec-table heading-view-table heading-view-details">                         
                          <th scope="col">Facilities</th>
                          <th scope="col">Amenities</th>
                          <th scope="col">Number Desired</th>
                          <th scope="col">Hours</th>                         
                        </tr>
                      </thead>
                      <tbody class="tbody-color ">
                        <tr>                         
                          <td>Cafeteria</td>
                          <td>Service Area Only	</td>
                          <td>1</td>
                          <td>3</td>
                        </tr>                       
                      </tbody>
                    </table>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon ui-view-header"></span>Gymnasium</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table class="table table-bordered mg-b-0 text-center view-top">
                    <thead>
                      <tr class="heading-sec-table heading-view-table heading-view-details">
                       
                        <th scope="col">Facilities</th>
                        <th scope="col">Amenities</th>
                        <th scope="col">Number Desired</th>
                        <th scope="col">Hours</th>
                        
                      </tr>
                    </thead>
                    <tbody class="tbody-color ">
                      <tr>
                       
                        <td>Gymnasium</td>
                        <td>With Balcony</td>
                        <td>1</td>
                        <td>3</td>
                      </tr>
                    
                      
                    </tbody>
                  </table>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon ui-view-header"></span>Other</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table class="table table-bordered mg-b-0 text-center view-top">
                  <thead>
                    <tr class="heading-sec-table heading-view-table heading-view-details">
                     
                      <th scope="col">Facilities</th>
                      <th scope="col">Amenities</th>
                      <th scope="col">Number Desired</th>
                      <th scope="col">Hours</th>
                      
                    </tr>
                  </thead>
                  <tbody class="tbody-color ">
                    <tr>
                     
                      <td>Other</td>
                      <td>Pool</td>
                      <td>1</td>
                      <td>3</td>
                    </tr>
                  
                    
                  </tbody>
                </table>
          </Typography>
        </AccordionDetails>
      </Accordion>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="requestor-sec">
        <div class="row">
            <div class="col-md-12">
                <div class="req-amenity-sec">
                    <div class="reg-details-sec">
                        <p>Requestor Details</p>
                    </div>

                    <div class="row details-inner-sec">
                        <div class="row col-md-6">
                            <div class="col-md-6">
                                <p class="heading-view heading-view-local">Full Name of applicant Organization</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>The Sunshine Kids</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Position in the Organization</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>Director</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Address</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views ">:<span class="para-new-view para-view-location para-details-view">4092 Jim Rosa Lane, San Francisco, California United States</span></p>
                              </div>

                              <div class="col-md-6 top-more">
                                <p class="heading-view heading-view-local">Street Address                                </p>
                              </div>
                              <div class="col-md-6 top-more" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>4092 Jim Rosa Lane</span></p>
                              </div>
                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">City</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>San Francisco</span></p>
                              </div>

                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">State</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>California</span></p>
                              </div>

                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Phone no</p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>518-497-6744</span></p>
                              </div>

                              <div class="col-md-6">
                                <p class="heading-view heading-view-local">Email id                                </p>
                              </div>
                              <div class="col-md-6" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>ann@gmail.com</span></p>
                              </div>
                        </div>

                        <div class="row col-md-6">
                            <div class="col-md-7">
                                <p class="heading-view heading-view-local">Full Name </p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>Ann Marley</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Are you authorized to make this application</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>Yes</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Is your Organization profit making?</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>Can't Say</span></p>
                              </div>

                              <div class="col-md-7 top-more">
                                <p class="heading-view heading-view-local">How many enrolled members are in your organization? </p>
                              </div>
                              <div class="col-md-5 top-more" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>20</span></p>
                              </div>
                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">if applicant is a youth organization, what is average age of it membership?</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>18</span></p>
                              </div>

                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">State purpose for which premises will be used</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>Sports</span></p>
                              </div>

                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">Start Time</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>4PM</span></p>
                              </div>

                              <div class="col-md-7">
                                <p class="heading-view heading-view-local">End Time</p>
                              </div>
                              <div class="col-md-5" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span style={{marginLeft:'10px'}}>5PM</span></p>
                              </div>
                        </div>

                        <div class="row col-md-12 details-below">
                            <div class="col-md-5">
                                <p class="heading-view heading-view-local">Details of Organization</p>
                              </div>
                              <div class="col-md-7" style={{paddingLeft:'0px'}}>
                                <p class="para-view para-location-views">:<span class="para-new-view">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</span></p>
                              </div>

                              

                        </div>
                        <div class="row col-md-12 details-below">
                        <div class="col-md-5">
                            <p class="heading-view heading-view-local">Describe purpose or objective of Organization</p>
                          </div>
                          <div class="col-md-7" style={{paddingLeft:'0px'}}>
                            <p class="para-view para-location-views">:<span class="para-new-view">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</span></p>
                          </div>
                          </div>

                          

                    </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-md-12 officer-detail-sec" style={{paddingLeft: '0px', paddingRight:'0px', border:'1px solid rgba(72, 94, 144, 0.16)'}}>
            <div id="accordion5" class="accordion accordion-pink">
              <h6 class="accordion-title ui-accordion-header ui-corner-top ui-state-default ui-accordion-header-active ui-state-active ui-accordion-icons" style={{textAlign: 'left', fontFamily: 'IBM Plex Sans', fontSize: '18px', fontWeight: '400'}}>
                <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>Officer Details</h6>
              <div class="ui-accordion-contents" style={{padding: '0 20px 20px 35px'}}>
                <table class="table table-bordered mg-b-0 text-center view-top">
                    <thead>
                      <tr class="heading-sec-table heading-view-table heading-details-font">
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
          </div>  


          <div class="row">
            <div class="button-sec button-forward action-sec">
              <button type="button" onClick={approvemodal} data-toggle="modal" class="btn btn-primary btn-add btn-green">Approve</button>
              <button type="button" onClick={rejectmodal} href="#modal3" data-toggle="modal" class="btn btn-outline-primary btn-cancel" style={{fontFamily: 'IBM Plex Sans'}}>Reject</button>
    
    
            </div>
          </div>


            </div>
            </div>
            </div>
       </div>
       </div>
       </div>


       <Modal show={showM} onHide={handleCloseM} className='closelogin'>
<div class="upload-close upload-top" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '45px'}}>
              <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans'}}>Your about to approve this request</p>
              <Link to="/admin" type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</Link>
              <button type="button" onClick={closeok} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>


<Modal show={showM3} onHide={handleCloseM3} className='closelogin'>
<div class="upload-close upload-top" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '45px'}}>
              <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans'}}>Your about to reject this request</p>
              <Link to="/admin" type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</Link>
              <button type="button" onClick={closeoks} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>
   </>
)
}