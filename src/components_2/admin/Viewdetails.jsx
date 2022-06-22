import React from 'react';
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
    <div className="button-print">
    <button type="button" className="btn btn-primary"><i className="fa fa-print" aria-hidden="true" style={{marginRight:'6px'}}></i>
        <span>Print</span></button>

 </div>
 <div data-label="Example" className="df-example">
 <ul className="nav nav-line nav-view" id="myTab5" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="home-tab5" data-toggle="tab" href="#home5" role="tab" aria-controls="home" aria-selected="true">Requested Amenity Details</a>
          </li>
        
          
        
        </ul>
   <div>
   <div className="tab-content mg-t-20" >
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
      <div class="next-sec">
    <Link to="/Requestordetails" type="button" class="btn  btn-add btn-green btnNext">Next</Link>
</div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}
