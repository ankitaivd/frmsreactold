import React, {useState} from 'react';
import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
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
 
  return (
      <>
      <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
     <div class="row">
            <div class="col-md-12">
                <div class="status-section">
                    <p class="status-para-sec">You are creating estimate for</p>
                    <p class="para-bottom">The Director</p>
                    <p class="para-bottom">The Sunshine Kids</p>
                    <p class="para-bottom">4092 Jim Rosa Lane, San Francisco, California United States</p>
                    <p class="para-bottom">ann@gmail.com</p>
                </div>

            </div>

        </div>
 <div data-label="Example" className="df-example">

   <div>
   <div className="tab-content mg-t-20" >
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="ui-accordion-header ">
          <Typography ><span className="ui-accordion-header-icon"></span>School Building</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{paddingTop: '45px', paddingLeft: '24px'}}>
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{ marginTop:'12px', fontFamily: 'IBM Plex Sans', fontSize: '17px'}}>School Building</p>
                          </div>
                    
                        
                    </div>
                    {/* <div class="col-md-2 add-cart-sec">
                        <p class="number-para">NUMBERS</p>
                     <div style={{float:'left'}}>
                        <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                        <input type="text" class="number" id="number" value="0" style={{padding:'13px ​0px'}} />
                        <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                        </div>
    
                  </div> */}
                   <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                
            </div>
           
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}  >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon"></span>Open Play Area</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{marginTop: '45px', paddingLeft: '24px'}}>
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px;',  fontFamily: 'IBM Plex Sans', fontSize: '17px !important'}}>Open Play Area</p>
                              </div>
                        
                            
                        </div>
                        {/* <div class="col-md-2 add-cart-sec">
                            <p class="number-para">NUMBERS</p>
                            <div style={{float:'left'}}>
                            <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                            <input type="text" id="number" class="number" value="0" style={{padding:'13px ​0px'}} />
                            <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                         
    </div>
                         
                      </div> */}
                      <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $150</p>
                </div>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}  >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon"></span>Auditorium</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{marginTop: '20px', paddingLeft: '24px'}}>
                        <div class="col-md-12">
                        <h2 class="heading-status" style={{textAlign: 'left',  fontFamily: 'IBM Plex Sans'}}>Amenities</h2>
                    </div>
                    </div>
                    <div class="row margin-bottom">
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Without Balcony</p>
                              </div>
                        
                            
                        </div>
                      
                        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                  </div>


                  <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>With Balcony</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $200</p>
                </div>
              </div>


              <div class="row margin-bottom">
                <div class="col-md-2">
                    <div class="floating-label floating-school-label open-left-responsive">      
                        
                        <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Stage Lighting</p>
                      </div>
                
                    
                </div>
                <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
          </div>


          <div class="row margin-bottom">
            <div class="col-md-2">
                <div class="floating-label floating-school-label open-left-responsive">      
                    
                    <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Public Address System</p>
                  </div>
            
                
            </div>
            <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
      </div>


      <div class="row margin-bottom">
        <div class="col-md-2">
            <div class="floating-label floating-school-label open-left-responsive">      
                
                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Risers</p>
              </div>
        
            
        </div>
        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
  </div>


  <div class="row margin-bottom">
    <div class="col-md-2">
        <div class="floating-label floating-school-label open-left-responsive">      
            
            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Piano</p>
          </div>
    
        
    </div>
    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
</div>
                 
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')} >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon"></span>Rooms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{marginTop: '20px', paddingLeft: '24px'}}>
                        <div class="col-md-12">
                        <h2 class="heading-status" style={{textAlign: 'left',  fontFamily: 'IBM Plex Sans'}}>Amenities</h2>
                    </div>
                    </div>
                    <div class="row margin-bottom">
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Classrooms</p>
                              </div>
                        
                            
                        </div>
                        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                    </div>


                    <div class="row margin-bottom">
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Dressing Rooms</p>
                              </div>
                        
                            
                        </div>
                        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                    </div>


                    
                    <div class="row margin-bottom">
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Coat Check Rooms</p>
                              </div>
                        
                            
                        </div>
                        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                    </div>


                    <div class="row margin-bottom">
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Shops</p>
                              </div>
                        
                            
                        </div>
                        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                    </div>


                    
                    <div class="row margin-bottom">
                        <div class="col-md-2">
                            <div class="floating-label floating-school-label open-left-responsive">      
                                
                                <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Special Rooms

</p>
                              </div>
                        
                            
                        </div>
                        <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                    </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')} >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon"></span>Gymnasium </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{marginTop: '20px', paddingLeft: '24px'}}>
                      <div class="col-md-12">
                      <h2 class="heading-status" style={{textAlign: 'left',  fontFamily: 'IBM Plex Sans'}}>Amenities</h2>
                  </div>
                  </div>

                  <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{ marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Serving Area Only</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>

                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{ marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Kitchen Facilities</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}  >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header">
          <Typography><span className="ui-accordion-header-icon"></span>Cafeteria</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{marginTop: '20px', paddingLeft: '24px'}}>
                      <div class="col-md-12">
                      <h2 class="heading-status" style={{textAlign: 'left',  fontFamily: 'IBM Plex Sans'}}>Amenities</h2>
                  </div>
                  </div>

                  <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Without Balcony</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>


                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>With Balcony</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>

                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Collapsible Bleacher Seats</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')} >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" className="ui-accordion-header" >
          <Typography><span className="ui-accordion-header-icon"></span>Other</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="row" style={{marginTop: '20px', paddingLeft: '24px'}}>
                      <div class="col-md-12">
                      <h2 class="heading-status" style={{textAlign: 'left',  fontFamily: 'IBM Plex Sans'}}>Amenities</h2>
                  </div>
                  </div>
                  <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Locker room with shower facilities</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>

                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Pool</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>

                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Indoor Playground</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>

                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Outdoor Playground</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>


                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Lavatory</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>


                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Telephone Service</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>


                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Elevator Service</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>

                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>Additional Furniture</p>
                          </div>
                    
                        
                    </div>
                    <div class="form-group col-md-1">
               
               <label class="form-group form-input">
                 <input type="text" name="emp_name" value="2" />                           
                 
               <span class="label">Number<span class="required-must"></span></span>
               <div class="underline"></div>
              
             </label>
             
           </div>
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value="2" />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" placeholder="$10" />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}}>Subtotal:- $100</p>
                </div>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div class="button-sec next-sec">
        <a href="FRMS-Invoice/index.html" type="button" class="btn btn-primary btn-add" style={{fontFamily:'IBM Plex Sans'}}>Preview</a>
        <button type="button" class="btn btn-outline-primary btn-cancel" style={{fontFamily:'IBM Plex Sans'}}>Send</button>
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>


   
    </>
  )
}
