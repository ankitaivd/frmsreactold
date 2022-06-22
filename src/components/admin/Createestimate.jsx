import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { bookingData } from "../../actions/bookingData";
import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

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

const AccordionDetails = withStyles(() => ({
  // root: {
  //   padding: theme.spacing(2),
  // },
}))(MuiAccordionDetails);



export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const { id } = useParams();
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });
  const [detailsBookings, setdetailsBookings] = useState([]);
  const [detailsApplicant, setDetailsApplicant] = useState([]);
  const [detailsTimediff, setDetailsTimediff] = useState([]);
  const [facilityAdmin, setDetailsFacilityAdmin] = useState([]);
  const [facilityAdminall, setDetailsFacilityAdminall] = useState([]);
  const [tab, setTab] = useState('amenity');
  const [detailsnewcountnoam, setDetailsnewcountnoam] = useState();
  const [show3, setShow3] = useState(false);
  const [locadmin, setLocationAdmin] = useState(0);
    
  const [showalert, setShowalert] = useState(false);
  const handleClosealert = () => setShowalert(false);
  const handleShowalert = () => setShowalert(true);
  const [Alerterr,setAlerterr]=useState({
               
    Alerterr_message:"",        
        
     
    Alerterr_err:'0',
   
  });

  const [statusBooking, setStatusBooking] = useState('submit');
  const dispatch=useDispatch();
  const [event,setEvent]=useState({
    eventname:"",
    noOfGuest:"",
    details:0,
    
        
    error_name:1,
    error_noOfGuest:1,
    error_details:1,
    
    err:'0',
        
      });
      function diff_minutes(dt2, dt1) 
      {
     
       var diff =(dt2.getTime() - dt1.getTime()) / 1000;
       diff /= 60;
       return Math.abs(Math.round(diff));
       
      }

      const increaseAmenitiesValue =(ev,bfid)=>{
        var timedifnew=detailsTimediff;
        const myArraynew = timedifnew.split(".");
var ourSubstring=.30;

var newtimenew;
 
if (myArraynew[1]=='00') {
  newtimenew=timedifnew;
  
 }else{
  var time1 =(myArraynew[1]/60)
  

  newtimenew=parseInt(myArraynew[0])+time1;
 }
      let abc= detailsBookings.map(item => {
        var temp1 = Object.assign({}, item);
      var anemlength=temp1.amenities;
       // console.log( anemlength.length);
        if(anemlength.length==0 && temp1.data.bfid==bfid){
          
         var hoursrate= document.getElementById('hournew'+bfid).value;
         console.log("hoursrate");
         console.log(hoursrate);
          if(ev==='increment'){
          temp1['count']=parseInt(temp1.count) + 1;
         
          }else if(ev==='decrement' && temp1.count > 0){
            temp1['count']=parseInt(temp1.count) - 1;  
          } 
          if(hoursrate!=''){
            temp1['subtotal']=(hoursrate*temp1['count']*newtimenew);
            temp1['rate']=hoursrate; 
          }else{
            temp1['subtotal']="0";
            temp1['rate']="0"; 
          } 
        }

        return temp1;
      });
        
      setdetailsBookings(abc);
        
      setDetailsFacilityAdminall([abc,detailsApplicant]);
      dispatch(bookingData({
        facbook:abc,
        bookdeta:detailsApplicant
       }));
        // document.getElementById('hournew'+id).innerHTML = '$'+(aa *time);
      
        // document.getElementById('newsubtotal'+id).innerHTML = ' Subtotal:- $'+(aa * time);
      
      }
      const rateincrease =(bfid)=>{
        var timedifnew=detailsTimediff;
        const myArraynew = timedifnew.split(".");
     var ourSubstring=.30;
     
     var newtimenew;
     
   
 if (myArraynew[1]=='00') {
  newtimenew=timedifnew;
  
 }else{
  var time1 =(myArraynew[1]/60)
  

  newtimenew=parseInt(myArraynew[0])+time1;
 }
        let abc= detailsBookings.map(item => {
          var temp1 = Object.assign({}, item);
        var anemlength=temp1.amenities;
         // console.log( anemlength.length);
          if(anemlength.length==0 && temp1.data.bfid==bfid){
            
           var hoursrate= document.getElementById('hournew'+bfid).value;
         
          
            if(hoursrate!=''){
              temp1['subtotal']=(hoursrate*temp1['count']*newtimenew);
              temp1['rate']=hoursrate; 
            }else{
              temp1['subtotal']="0";
              temp1['rate']=""; 
            } 
          }
  
          return temp1;
        });
          console.log(abc);
        setdetailsBookings(abc);
          
        setDetailsFacilityAdminall([abc,detailsApplicant]);
        dispatch(bookingData({
          facbook:abc,
          bookdeta:detailsApplicant
         }));
          // document.getElementById('hournew'+id).innerHTML = '$'+(aa *time);
        
          // document.getElementById('newsubtotal'+id).innerHTML = ' Subtotal:- $'+(aa * time);
        
        }
  

      
      const increasevalue = (ev,bfid,childid,detailsTimediff)=>{
        var timedifnew=detailsTimediff;
        const myArraynew = timedifnew.split(".");
     var ourSubstring=.30;
     
     var newtimenew;
     
    
 if (myArraynew[1]=='00') {
  newtimenew=timedifnew;
  
 }else{
  var time1 =(myArraynew[1]/60)
  

  newtimenew=parseInt(myArraynew[0])+time1;
 }
        console.log(detailsBookings);
        console.log("data");
        console.log(bfid);
        console.log(childid);
        let abc= detailsBookings.map(item => {
          var temp1 = Object.assign({}, item);
        var anemlength=temp1.amenities;
         // console.log( anemlength.length);
          if(anemlength.length!=0 && temp1.data.bfid==bfid){
            for(var i = 0, length = anemlength.length; i < length; i++) {
           
              if(temp1.amenities[i]['amenities_id']==childid){
                if(ev==='increment'){
                  temp1.amenities[i]['count']=parseInt( temp1.amenities[i].count) + 1;  
                  }else if(ev==='decrement' &&  temp1.amenities[i].count > 0){
                    temp1.amenities[i]['count']=parseInt( temp1.amenities[i].count) - 1;  
                  } 
                  var hoursrate= document.getElementById('hour'+childid+'new'+bfid).value;
                  if(hoursrate!=''){
                 
                    temp1.amenities[i]['subtotal'] =(hoursrate* temp1.amenities[i]['count']*newtimenew);
                    temp1.amenities[i]['rate']=hoursrate; 
                  }else{
                    temp1.amenities[i]['subtotal']="0";
                    temp1.amenities[i]['rate']="0";  
                  } 
              } 
             
      
            }
           
          }
  
          return temp1;
        });
          console.log(abc);
          console.log(id);
        setdetailsBookings(abc);
      
        setDetailsFacilityAdminall([abc,detailsApplicant]);  
        dispatch(bookingData({
          facbook:abc,
          bookdeta:detailsApplicant
         }));    
        // document.getElementById('facnew'+id).innerHTML = aa;
      
        // document.getElementById('hournew'+id).innerHTML = '$'+(aa *detailsTimediff);
      
        // document.getElementById('subtotal'+id).innerHTML = ' Subtotal:- $'+(aa * detailsTimediff);
      
       
      }
          
      const rateincreasenew = (bfid,childid,detailsTimediff)=>{
        var timedifnew=detailsTimediff;
        const myArraynew = timedifnew.split(".");
     var ourSubstring=.30;
     
     var newtimenew;
     
      
 if (myArraynew[1]=='00') {
  newtimenew=timedifnew;
  
 }else{
  var time1 =(myArraynew[1]/60)
  

  newtimenew=parseInt(myArraynew[0])+time1;
 }
        console.log(detailsBookings);
        console.log("data");
        console.log(id);
        console.log(childid);
        let abc= detailsBookings.map(item => {
          var temp1 = Object.assign({}, item);
        var anemlength=temp1.amenities;
         // console.log( anemlength.length);
          if(anemlength.length!=0 && temp1.data.bfid==bfid){
            for(var i = 0, length = anemlength.length; i < length; i++) {
           
              if(temp1.amenities[i]['amenities_id']==childid){
                var hoursrate= document.getElementById('hour'+childid+'new'+bfid).value;
              if(hoursrate!=''){
                temp1.amenities[i]['subtotal'] =(hoursrate* temp1.amenities[i]['count']*newtimenew);
                temp1.amenities[i]['rate']=hoursrate; 
              }else{
                temp1.amenities[i]['subtotal']="0";
                temp1.amenities[i]['rate']="";  
              } 
              } 
              
      
            }
           
          }
  
          return temp1;
        });
          console.log(abc);
        setdetailsBookings(abc);
        setDetailsFacilityAdminall([abc,detailsApplicant]);
        dispatch(bookingData({
          facbook:abc,
          bookdeta:detailsApplicant
         }));         
        // document.getElementById('facnew'+id).innerHTML = aa;
      
        // document.getElementById('hournew'+id).innerHTML = '$'+(aa *detailsTimediff);
      
        // document.getElementById('subtotal'+id).innerHTML = ' Subtotal:- $'+(aa * detailsTimediff);
      
       
      }

      const previewlistdata =()=>{
 var ol=0;
  console.log(detailsBookings);
        let abc= detailsBookings.map(item => {
          var temp1 = Object.assign({}, item);
        var anemlength=temp1.amenities;
         // console.log( anemlength.length);
          if(anemlength.length==0){
          
            temp1['count']=1; 
            if(temp1.rate==null || temp1.rate==0){
           
              ol++;
             
            }
              
          }else{
            for(var i = 0, length = anemlength.length; i < length; i++) {
             
              if(temp1.amenities[i].rate==null || temp1.amenities[i].rate==0){
               
                ol++;
              }
      
            }
           
          }
          return temp1;
        });
console.log(ol);
setdetailsBookings(abc);
console.log({id:id,booking:detailsBookings});
if(ol!=0){
  setAlerterr((preValue)=>{
    return {    
           
            Alerterr_err:1,  
            Alerterr_message:'Mandatory rates missing !',   
           
        
           
             };
    });
    setStatusBooking('notassigned');
    setShowalert(true);
    return 0;
}else{
  Axios.post("previewlistdataupdate",{id:id,booking:detailsBookings})
  .then(res =>{
   console.log(id);
   console.log("null");
   
    if(res.data.status=='Success'){
      console.log(res.data.status);
      setStatusBooking('assigned');
       
        }



  });
}

       
      
      
      
      
      
        
      }
const a3 = useSelector((state) => state.todoReducer3);
  useEffect(() => {

    console.log(a3);
    Axios.post("getBookedFacilitiesById",{id:id})
    .then(res =>{
      console.log("getBookedFacilitiesById");
       console.log(res.data);
     var  dt1 = new Date("October 13, 2014 " +res.data.bookingInfo.startTime);
     var dt2 = new Date("October 13, 2014 " +res.data.bookingInfo.endTime);
     console.log("October 13, 2014 " +res.data.bookingInfo.startTime);
     console.log("October 13, 2014 " +res.data.bookingInfo.endTime);
console.log(diff_minutes(dt1, dt2));
 setDetailsTimediff(res.data.timediff);

      setdetailsBookings(res.data.data);
var booking=res.data.data;
var timedifnew=res.data.timediff;
const myArraynew = timedifnew.split(".");
var ourSubstring=.30;

var newtimenew;

 
if (myArraynew[1]=='00') {
  newtimenew=timedifnew;
  
 }else{
 
   var time1 =(myArraynew[1]/60)
  

  newtimenew=parseInt(myArraynew[0])+time1;
 }
 console.log(newtimenew);
      console.log(booking.length);
    
      for(var i = 0, length = booking.length; i < length; i++) {
       // console.log(booking[i]);
        

      }
      let abc= booking.map(item => {
        var temp1 = Object.assign({}, item);
      var anemlength=temp1.amenities;
       // console.log( anemlength.length);
        if(anemlength.length==0){
        
          temp1['count']=1; 
          if(temp1.data.rate!=null){
            temp1['rate']=temp1.data.rate; 
            temp1['subtotal']=(temp1.data.rate*newtimenew); 
            console.log( temp1['subtotal']);
          }else{
            temp1['rate']="0"; 
            temp1['subtotal']="0"; 
          }
            
        }else{
          for(var i = 0, length = anemlength.length; i < length; i++) {
           
            if(temp1.amenities[i].rate!=null){
             
              temp1.amenities[i]['subtotal']=(temp1.amenities[i].rate * temp1.amenities[i].count*newtimenew); 
            
              temp1.amenities[i]['rate']=temp1.amenities[i].rate;  
            }else{
              temp1.amenities[i]['subtotal']="0"; 
            temp1.amenities[i]['rate']="0";  
            }
           
    
          }
         
        }
        return temp1;
      });
      console.log(abc);
      setdetailsBookings(abc);
      setDetailsApplicant(res.data.bookingInfo);
      setDetailsFacilityAdmin(res.data.locations);
      setDetailsnewcountnoam(1);
      setDetailsFacilityAdminall([abc,res.data.bookingInfo]);
      dispatch(bookingData({
        facbook:abc,
        bookdeta:res.data.bookingInfo
       }));
    });


   },[])
   if(statusBooking === 'assigned'){
        
    return <Redirect to={'/Previewpage/'+id} />;  
 }
  return (
      <>
      <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
     <div class="row">
            <div class="col-md-12">
                <div class="status-section">
                    <p class="status-para-sec">You are creating estimate for</p>
                    <p class="para-bottom">The {detailsApplicant.organization}</p>
                    <p class="para-bottom">The {detailsApplicant.name}</p>
                    <p class="para-bottom">{detailsApplicant.address1},{detailsApplicant.address2}</p>
                    <p class="para-bottom">{detailsApplicant.email}</p>
                </div>

            </div>

        </div>
 <div data-label="Example" className="df-example">

   <div>
   <div className="tab-content mg-t-20" >
   { detailsBookings.length > 0 ? <>
    {   detailsBookings.map((post)=>( 
<Accordion square expanded={expanded === post.data.bfid} onChange={handleChange(post.data.bfid)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className="ui-accordion-header ">
          <Typography ><span className="ui-accordion-header-icon"></span>{post.data.type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            { post.amenities.length > 0 ? 
                <> 

                <div class="row" style={{marginTop: '20px', paddingLeft: '24px'}}>
                    <div class="col-md-12">
                    <h2 class="heading-status" style={{textAlign: 'left',  fontFamily: 'IBM Plex Sans'}}>Amenities</h2>
                </div>
                </div>
                {post.amenities.map((childpost)=>( 
                <div class="row margin-bottom">
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{marginTop:'12px', paddingLeft: '24px',  fontFamily: 'IBM Plex Sans'}}>{childpost.amenities_name}</p>
                          </div>
                    
                        
                    </div>
         

     

                        <div class="col-md-2 add-cart-sec">
                        <p class="number-paras" >Numbers</p>
                
                        <div class="value-button"  id="decrease" onClick={() => {increasevalue("decrement",post.data.bfid,childpost.amenities_id,detailsTimediff)}}  style={{cursor:'pointer'}} value="Decrease Value">-</div>
                        {/* <input type="text" id="number" value={childpost.count} style={{padding:'13px ​0px'}}/> */}
                        <p style={{marginBottom: '0px', fontSize: '15px', color: '#868e96'}}  class="inputnumber-invc" id={'fac'+childpost.amenities_id+'new'+post.data.bfid }>{childpost.count}</p>
                  
                       <div class="value-button" id="increase" onClick={() => {increasevalue("increment",post.data.bfid,childpost.amenities_id,detailsTimediff)}}  style={{cursor:'pointer'}} value="Increase Value">+</div>
                     

                     
                  </div>



       <div class="form-group col-md-1">
           
                <label class="form-group form-input">
                  <input type="text" name="emp_name" value={detailsTimediff} />                           
                  
                <span class="label">Hours<span class="required-must"></span></span>
                <div class="underline"></div>
               
              </label>
              
            </div>
            
              <div class="form-group col-md-2"> 
              <label class="form-group form-input">
                      <input type="number" step="any" name={'hour'+childpost.amenities_id+'new'+post.data.bfid} 
                        id={'hour'+childpost.amenities_id+'new'+post.data.bfid} value={post.data.rate} value={childpost.rate} onChange={() => {rateincreasenew(post.data.bfid,childpost.amenities_id,detailsTimediff)}} />                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
               
                 
                
              
            </div>


            <div class="col-md-2">
            <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px' ,color: '#000000'}}  id={'subtotal'+childpost.amenities_id+'new'+post.data.bfid }>Subtotal:-{childpost.subtotal}</p>
  
            </div>
              </div>

)) }



             </>
       :<>  
          <div class="row" style={{paddingTop: '45px', paddingLeft: '24px'}}>
                    <div class="col-md-2">
                        <div class="floating-label floating-school-label open-left-responsive">      
                            
                            <p style={{ marginTop:'12px', fontFamily: 'IBM Plex Sans', fontSize: '17px'}}>{post.data.type}</p>
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
                   <div class="col-md-2 add-cart-sec">
                        <p class="number-parass" style={{textAlign:'center'}} >Numbers</p>
                
                      
                        <p style={{marginBottom: '0px', fontSize: '15px', color: '#868e96'}}  class="inputnumber-invc" id={'facnew'+post.data.bfid }>{post.count}</p>
                  
                      

                     
                  </div>
             
           <div class="form-group col-md-1">
               
                    <label class="form-group form-input">
                      <input type="text" name="emp_name" value={detailsTimediff}  />                           
                      
                    <span class="label">Hours<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                  
                </div>
                  <div class="form-group col-md-2">
                  <label class="form-group form-input">
                      <input type="number" step="any" name={'hournew'+post.data.bfid}  value={post.rate}  id={'hournew'+post.data.bfid} value={post.rate }  onChange={() => {rateincrease(post.data.bfid,detailsTimediff)}}/>                           
                      
                    <span class="label">Rate/per hour<span class="required-must"></span></span>
                    <div class="underline"></div>
                   
                  </label>
                    
                     
                </div>


                <div class="col-md-2">
                <p style={{marginBottom: '0px', fontSize: '18px', marginTop: '14px', color: '#000000'}} id={'newsubtotal' +post.data.bfid}>Subtotal:- {post.subtotal }</p>
                </div>
                
            </div>
            </>     
       
       
        }
           
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))}</>:<></>
    }
     
    
  
     
     
      <div class="button-sec next-sec">
      <button type="button" onClick={previewlistdata} class="btn btn-outline-primary btn-cancel" style={{fontFamily:'IBM Plex Sans'}}>Preview</button>
 
       
       
      </div>
      </div>
    </div>
    </div>
    </div>
    </div>


    <Modal show={showalert} onHide={handleClosealert} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '550px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

            {(Alerterr.Alerterr_err === 1) &&<p style={{marginBottom: '0px',fontSize: '20px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#FF0000'}}>{Alerterr.Alerterr_message}</p> }


<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealert()}}>Ok</button>

</div>
</div>
      
</Modal> 
    </>
  )
}

