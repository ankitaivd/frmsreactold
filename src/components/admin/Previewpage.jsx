import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Spinner from "react-bootstrap/Spinner"
import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { bookingData } from "../../actions/bookingData";
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
  const [todaydate, setTodaydate] = useState();
  const [estimateno, setEstimateno] = useState();
  const [alltotal, setAlltotal] = useState();
  const [taxval, setTaxval] = useState();
  const [totaltaxval, setTotaltaxval] = useState();
  const [statusBooking, setStatusBooking] = useState('submit');

  const [showalert, setShowalert] = useState(false);
  const handleClosealert = () => setShowalert(false);
  const handleShowalert = () => setShowalert(true);

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
      const setPrintesti =()=>{
  
    
   
        var printpagebuttonesti = document.getElementById("printpagebuttonesti");
        var printpagebuttonlink = document.getElementById("printpagebuttonlink"); 
    
      
        printpagebuttonesti.style.visibility = 'hidden';
        printpagebuttonlink.style.visibility = 'hidden';
       
    
        window.print();
    
        //[Delete this line if you want it to stay hidden after printing]
        printpagebuttonesti.style.visibility = 'visible';
        printpagebuttonlink.style.visibility = 'visible';
    
    
    
      }
  const setPrint =()=>{
  
    
    //Get the print button and put it into a variable
    var printButton = document.getElementById("printpagebutton");
    var printpagebuttonlink = document.getElementById("printpagebuttonlink"); 
    var printpagebuttonsave=document.getElementById("printpagebuttonsave"); 
    var printpagebuttonsavesend=document.getElementById("printpagebuttonsavesend"); 
    //Set the print button visibility to 'hidden' 
    printButton.style.visibility = 'hidden';
    printpagebuttonlink.style.visibility = 'hidden';
    printpagebuttonsave.style.visibility = 'hidden';
    printpagebuttonsavesend.style.visibility = 'hidden';
    //Print the page content
    window.print()
    //Set the print button to 'visible' again 
    //[Delete this line if you want it to stay hidden after printing]
    printButton.style.visibility = 'visible';
    printpagebuttonlink.style.visibility = 'visible';
    printpagebuttonsave.style.visibility = 'visible';
    printpagebuttonsavesend.style.visibility = 'visible';


  }
  const previewlistdata =()=>{
 
  
  

    console.log({id:id,booking:detailsBookings,tax:taxval,totalvalue:totaltaxval});
  
           
            Axios.post("previewlistdataupdatesave",{id:id,booking:detailsBookings,tax:taxval,totalvalue:totaltaxval,estimateno:estimateno})
              .then(res =>{
               console.log(id);
               
                if(res.data.status=='Success'){
                  console.log(res.data.status);
                  setStatusBooking('assigned');
                   
                    }
           
          
          
              });
          
          
          
          
          
            
          }
          
const previewlistdatasavesend =()=>{
 
  
  

  setShowalert(true);
         
          Axios.post("previewlistdataupdatesavesend",{id:id,booking:detailsBookings,tax:taxval,totalvalue:totaltaxval,estimateno:estimateno})
            .then(res =>{
             console.log(id);
             
              if(res.data.status=='Success'){
                console.log(res.data.status);
                
                setStatusBooking('assigned');
                setShowalert(false);
                 
                  }
         
        
        
            });
        
        
        
        
        
          
        }
const a3 = useSelector((state) => state.todoReducer3);
const a3new = useSelector((state) => state);
const reducer = useSelector((state) => state.todoReducer);
  useEffect(() => {
   
    console.log(a3);
    console.log(a3);
    Axios.post("getBookedFacilitiesByIdnew",{id:id})
    .then(res =>{
      console.log("getBookedFacilitiesById");
       console.log(res.data);
     var  dt1 = new Date("October 13, 2014 " +res.data.bookingInfo.startTime);
     var dt2 = new Date("October 13, 2014 " +res.data.bookingInfo.endTime);
     console.log("October 13, 2014 " +res.data.bookingInfo.startTime);
     console.log("October 13, 2014 " +res.data.bookingInfo.endTime);
console.log(diff_minutes(dt1, dt2));
 setDetailsTimediff(res.data.timediff);
 if(res.data.bookingInfo.estimateno==null){
  setEstimateno(res.data.estimateno);
 }else{
  setEstimateno(res.data.bookingInfo.estimateno);
 }

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
   
      setdetailsBookings(res.data.data);
var booking=res.data.data;


      console.log(booking.length);
    
      for(var i = 0, length = booking.length; i < length; i++) {
       // console.log(booking[i]);
        

      }
      var total=0;
      let abc= booking.map(item => {
        var temp1 = Object.assign({}, item);
      var anemlength=temp1.amenities;
       // console.log( anemlength.length);
        if(anemlength.length==0){
        
          temp1['count']=1; 
          if(temp1.data.rate!=null){
            temp1['rate']=temp1.data.rate; 
            temp1['subtotal']=(temp1.data.rate*newtimenew); 
          }else{
            temp1['rate']="0"; 
            temp1['subtotal']="0"; 
          }
          total=parseInt(temp1['subtotal'])+total;
        
        }else{
          for(var i = 0, length = anemlength.length; i < length; i++) {
           
            if(temp1.amenities[i].rate!=null){
             
              temp1.amenities[i]['subtotal']=(temp1.amenities[i].rate * temp1.amenities[i].count*newtimenew); 
            
              temp1.amenities[i]['rate']=temp1.amenities[i].rate;  
            }else{
              temp1.amenities[i]['subtotal']="0"; 
            temp1.amenities[i]['rate']="0";  
            }
            total=parseFloat(temp1.amenities[i]['subtotal'])+total;
            
          }
         
        }
        return temp1;
      });
      var tax= parseFloat(((parseFloat(total)*.25))).toFixed(2);
      setTaxval(tax);
      var alltotal=parseFloat((parseFloat(total)+parseFloat(tax))).toFixed(2);
      total= parseFloat(total).toFixed(2);
      setTotaltaxval(alltotal);
      setAlltotal(total);
      console.log(abc);
      setdetailsBookings(abc);
      setDetailsApplicant(res.data.bookingInfo);
      setDetailsFacilityAdmin(res.data.locations);
      setDetailsnewcountnoam(1);
      setDetailsFacilityAdminall([abc,res.data.bookingInfo]);
      var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
if(res.data.bookingInfo.estimateDate==null){
  setTodaydate(today);
}else{

  var todaynew=res.data.bookingInfo.estimateDate;
  const myArray = todaynew.split("-");
  today = myArray[1] + '/' +  myArray[2] + '/' +  myArray[0];
  setTodaydate(today);
}

    });



   },[])
   if(statusBooking === 'assigned'){
        
    return <Redirect to={'/Applicationstatus'} />;  
 }
  return (
      <>
     <div class=" container-inv" style={{maxWidth:'680px',margin:'0 auto'}}>
  <table style={{width:'100%'}}> 
    <tr>     
      <td  style={{width:'265px',padding:'0px 0px'}}><div class="logotype" style={{color:'#fff',width:'75px',height:'75px',lineHeight:'75px',textAlign:'center',fontSize:'11px'}}>
        <img src="../image/logo.png"  style={{height:'90px'}}/> </div>
        </td>
      <td  style={{width:'240px',marginLeft:'155px',display:'block'}} >
        <div style={{background:'#ffcc28',borderLeft:'15px solid #fff',textAlign:'center',fontSize:'24px',color:'#000000',letterSpacing:'-1px',height:'73px',lineHeight:'75px'}} >
        Estimate No: &nbsp; {  estimateno } </div>
        </td>
      <td></td>
    </tr>
  </table> 

 
  <h4 style={{margin:'10px 0px 4px 0px',fontSize: '15px',textAlign:'left'}}>To,</h4>
  <h4 style={{margin:'0px 0px 4px 0px',fontSize: '15px', textAlign:'left'}}>{detailsApplicant.name}</h4>
  <h4 style={{margin:'0px 0px 4px 0px',fontSize: '15px', textAlign:'left'}}>{detailsApplicant.organization}</h4>
  <h4 style={{margin:'0px 0px 30px 0px', fontSize: '15px', textAlign:'left'}}>{detailsApplicant.address1} , {detailsApplicant.address2} , {detailsApplicant.city} , {detailsApplicant.state} </h4>
  <h4 style={{marginBottom: '6px',fontSize: '15px', textAlign:'left'}}>Dear Sir/Madam,</h4>
  <p style={{marginTop:'9px',fontSize: '13px', textAlign:'left',lineHeight:'21px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
  <table style={{width:'100%', borderCollapse: 'collapse'}}>
    <tr>
      <td  style={{width:'43%', background:'#eee', padding:'20px',fontSize: '14px',textAlign:'left'}}>
        <strong>Date:</strong>&nbsp; {todaydate}
       <span style={{display: 'block',marginTop: '9px'}}><strong>Position in the Organization:</strong> &nbsp;  {detailsApplicant.position}</span>    
      </td>
      <td style={{background:'#eee',padding:'20px', fontSize: '14px',textAlign:'left'}}>
        <strong>E-mail:</strong>&nbsp;{detailsApplicant.email}
       <span style={{display: 'block',marginTop:'9px'}}> <strong>Name of applicant Organization:</strong>&nbsp; {detailsApplicant.organization}
       </span>
      </td>
    </tr>
  </table>
 
  <div style={{width:'100%', marginTop:'20px'}}>
<div style={{width:'50%', float:'left'}}>
  <div style={{background: '#ffcc28 url(../image/booking-icon-png-0.jpg) no-repeat',width: '32px',height: '32px', marginRight: '10px', backgroundPosition: 'center',backgroundSize: '15px',float: 'left', marginBottom: '8px'}}></div> 
  <h3 style={{marginTop:'9px',textAlign:'left',fontSize:'13px'}}>Your Booking Request for   {((detailsApplicant.locationName)==='Infinity') ? detailsApplicant.locationName :
                
                <>
                 {(isNaN(detailsApplicant.locationName)===false) ? '#'+detailsApplicant.locationName :detailsApplicant.locationName}
                </>
                }
  </h3>
  </div>
  <div style={{float:'left',width:'50%'}}>
  <div style={{background: '#ffcc28 url(../image/venue.png) no-repeat',width: '32px',height: '32px',marginRight: '10px', backgroundPosition: 'center',backgroundSize: '15px',float: 'left', marginBottom: '8px'}}></div> 
  <h3 style={{marginTop:'9px',textAlign:'left',fontSize:'13px'}}>Venue:-  &nbsp;  {((detailsApplicant.locationName)==='Infinity') ? detailsApplicant.locationName :
                
                <>
                 {(isNaN(detailsApplicant.locationName)===false) ? '#'+detailsApplicant.locationName :detailsApplicant.locationName}
                </>
                }</h3></div>
</div>

<div style={{width:'100%',marginBottom: '10px',display: 'inline-block'}}>
  <div style={{float:'left',width:'50%'}}>
  <div style={{background: '#ffcc28 url(../image/datel.png) no-repeat',width: '32px',height: '32px',marginRight: '10px', backgroundPosition: 'center',backgroundSize: '15px',float: 'left', marginBottom: '8px'}}></div> 
    <h3 style={{marginTop:'9px',textAlign:'left',fontSize:'13px'}}>Date:-  &nbsp; {detailsApplicant.bookingDate}	</h3></div>
    <div style={{float:'left',width:'50%'}}>
      <div style={{background: '#ffcc28 url(../image/time.png) no-repeat',width: '32px',height: '32px',marginRight: '10px',backgroundPosition: 'center',backgroundSize: '16px',float: 'left', marginBottom: '8px'}}></div> 
      <h3 style={{marginTop:'9px',textAlign:'left',fontSize:'13px'}}>Time:- &nbsp; {detailsApplicant.bookingStartTime} to {detailsApplicant.bookingEndTime}	</h3></div>
    </div>


    <table  style={{width:'100%', borderCollapse: 'collapse',borderBottom:'1px solid #eee'}}>
     <tr>
       <td class="column-header" style={{width:'35%', textAlign: 'left',background:'#eee',textTransform:'uppercase',padding:'15px',fontSize:'13px',
       borderRight:'1px solid #eee'}}>FACILITIES</td>
       <td  class="column-header" style={{width:'13%',padding:'15px 4px',textAlign: 'center',background:'#eee',textTransform:'uppercase',padding:'15px',fontSize:'13px',
       borderRight:'1px solid #eee'}}>Numbers</td>
       <td class="column-header"  style={{textAlign: 'center',width:'25%',background:'#eee',textTransform:'uppercase',padding:'15px',fontSize:'13px',
       borderRight:'1px solid #eee'}}>Rate/Hour</td>
       <td  class="column-header"  style={{textAlign: 'center',width:'25%',background:'#eee',textTransform:'uppercase',padding:'15px',fontSize:'13px',
       borderRight:'1px solid #eee'}}>Total Rate</td>
     </tr>
     { detailsBookings.length > 0 ? <>
    {   detailsBookings.map((post)=>( 
      <>
      { post.amenities.length > 0 ? 
 <>
   {post.amenities.map((childpost)=>( 
    <>


<tr  style={{borderBottom:'1px solid #eeeeee',borderLeft:'1px solid #eeeeee'}}>
<td class="" style={{fontSize: '13px',textAlign: 'left',padding:'7px 14px',borderleft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}><span style={{color:'#777',fontSize:'12px'}}>{post.data.type}</span><br></br>{childpost.amenities_name}</td>
<td class="" style={{fontSize: '13px',textAlign: 'center',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}>{childpost.count}</td>
<td class="" style={{fontSize: '13px',textAlign: 'center',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}>{detailsTimediff} <span style={{color:'#777',fontSize:'12px'}}>X</span> ${childpost.rate} </td>
<td class="" style={{fontSize: '13px', textAlign: 'center',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}>${parseFloat(childpost.subtotal).toFixed(2)}</td>
</tr> 
  </>
)) }
 
  </>:<>
  
  <tr style={{borderBottom:'1px solid #eeeeee'}}>
       <td  style={{fontSize: '13px',textAlign: 'left',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee '}}><span style={{color:'#777',fontSize:'12px'}}>{post.data.type}</span></td>
       <td  style={{fontSize: '13px',textAlign: 'center',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}>{post.count} </td>
       <td  style={{fontSize: '13px',textAlign: 'center',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}>{detailsTimediff} <span style={{color:'#777', fontSize: '12px'}}>X</span> ${post.rate} </td>
       <td  style={{fontSize: '13px',textAlign: 'center',padding:'7px 14px',borderLeft:'1px solid #eee',borderRight:'1px solid #eee',borderBottom:'1px solid #eee'}}>${parseFloat(post.subtotal).toFixed(2)}</td>
     </tr>

  
  </>
   }
      
      </>

  ))}</>:<></>
    }
     
    
  </table>
  


  <table  style={{background:'#eee',width:'100%', margin:'20px 0px'}}>
    <tr style={{backgroundColor: '#eee'}}>
      <td style={{padding:'10px 10px'}}>
        <table style={{float:'right',width:'300px'}}>
          <tr style={{padding:'2px 1px',backgroundColor: '#eee'}}>
            <td style={{padding:'2px 1px', textAlign:'left'}}><strong>Sub-total:</strong></td>
            <td style={{textAlign:'right',padding:'2px 18px 5px 8px'}}>${alltotal}</td>
          </tr>           
          <tr style={{backgroundColor: '#eee'}}>
            <td style={{padding:'2px 1px', textAlign:'left'}}><strong>Tax 25%:</strong></td>    
            <td style={{textAlign:'right',padding:'2px 18px 2px 8px'}}>${taxval}</td>
          </tr>
          <tr style={{backgroundColor: '#eee'}}>
            <td style={{padding:'2px 1px', textAlign:'left'}}><strong>Grand total:</strong></td>    
            <td style={{textAlign:'right',padding:'2px 18px 2px 8px'}}>${totaltaxval}</td>
          </tr>
        </table>
       </td>
    </tr>
  </table>


  <div class="alert" style={{backgroundColor: '#ffcc28',fontSize: '13px',fontWeight: '400',borderRadius: '0px',padding: '20px 5px'}}>
      You are therefore requested to pay the above amount i.e. ${totaltaxval} from the date of receipt of this letter.
     </div>
    <div class="">
      <p style={{padding: '0px 20px',marginBottom: '2px',fontSize: '14px',marginTop:'-4px',textAlign:'left'}}>With Best Wishes,</p>
      <p style={{padding:'0px 20px',marginTop:'0px',fontSize: '14px',textAlign:'left'}}>JCBOE</p>
    </div>
  
  <div class="" style={{marginTop:'35px',marginBottom: '35px'}}>
    <p style={{padding: '0px 20px', textAlign:'left',marginBottom:'1px'}}>(Authorized Signatory).</p>
    <p style={{padding: '0px 20px', fontSize: '10px',marginTop: '0px', textAlign:'left'}}>This is a computer generated and verified document hence requires no signatures.</p>
    { (detailsApplicant.status=='approved') ? <> 
   
    <div  id="printpagebutton" onClick={()=>setPrint()} style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px',cursor:'pointer', 
    fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}>Print</div>

 </>:  <>
 <div  id="printpagebuttonesti" onClick={()=>setPrintesti()} style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px',cursor:'pointer', 
    fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}>Print</div>

 </> }
 { (detailsApplicant.status=='approved') ? <> 
  <div  id="printpagebuttonsave"  onClick={()=>previewlistdata()}  style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px', cursor:'pointer',
    fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}>  Save</div>
    </>:  <></> }

    { (detailsApplicant.status=='approved') ? <> 
  <div  id="printpagebuttonsavesend"  onClick={()=>previewlistdatasavesend()}  style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px', cursor:'pointer',
    fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}> Save & Send</div>
    </>:  <></> }



     { (detailsApplicant.status=='approved') ?  <> 

     <Link    to={`/createestimate/${id}`} id="printpagebuttonlink"  style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px', cursor:'pointer',
    fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}> Back</Link>

     </>:  <> 
    
    <Link    to={`/Applicationstatus`} id="printpagebuttonlink"  style={{backgroundColor: '#fa8b01', width:'120px', height: '40px', lineHeight: '40px', color: '#fff', fontSize: '16px', cursor:'pointer',
      fontWeight: 'normal', textDecoration: 'none', display: 'inline-block',marginRight: '10px',textAlign: 'center', marginTop: '30px',cursor: 'pointer', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'}}> Back</Link></> }
    
  
  </div>

  

  </div>
   
   
<Modal show={showalert} onHide={handleClosealert} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center'}}>Procceding</p>
<Spinner animation="border"  style={{position: 'relative',
    textAlign: 'center',
    display: 'block',
    margin: '0 auto',
    fontSize: '19px' ,
    color:'#FA8B01'}}/>
</div>
</div>
      
</Modal>
    </>
  )
}
