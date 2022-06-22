import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { withStyles } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Modal from 'react-bootstrap/Modal';
import { siteData } from "./../../actions/siteData";
import { enqueryData } from "../../actions/enqueryData";
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
  
  const [initiate, setInitiate] = useState({
    status:'',
    message:'',
    active:false,
    id:''
  });
  const [showM, setShow1] = useState(false);
  const handleCloseM = () => setInitiate({
    status:'',
    message:'',
    active:false,
    id:''
  });
  const dispatch=useDispatch();
  const [statusBooking, setStatusBooking] = useState('submit');
  const [allBookings, setAllBookings] = useState([]);
 const [paginationfac,setPaginationfac] = useState({perPage:10,totalCount:0,totalPage:1,currentPage:1})
   const [addindexfac, setAddindexfac] = useState();
   const [search,setSearch]=useState({seachnew:''});
   const [viewdeatsilsnew, setViewdeatsilsnew] = useState();
   const a3 = useSelector((state) => state.todoReducer3);
const callPaginationfac =(s)=>{
console.log(s);
console.log(paginationfac.currentPage);
console.log(paginationfac.totalPage);
let a=paginationfac.currentPage;
if(s==='nextPage' && paginationfac.currentPage < paginationfac.totalPage){
  a = a+1;
}

if(s==='previouPage' && paginationfac.currentPage > 1 && paginationfac.currentPage <= paginationfac.totalPage){
  a = a-1;
}


if(paginationfac.currentPage === a){

  return false;
}


if(a3.applicant_info.type=='globaladmin'){
  Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:paginationfac.perPage,page:a,search:search.seachnew})
  .then(res =>{
  
    
        console.log(res.data);
         setAllBookings(res.data.totaldetailsbooknew);
         setPaginationfac((preValue)=>{
        return { 
           perPage:preValue.perPage,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:a   
        }   
      });
         var pagefa=((parseInt(a) * parseInt(paginationfac.perPage))-parseInt(paginationfac.perPage));
         
         
          if(pagefa >= 10){
            setAddindexfac(parseInt(pagefa));
            console.log(parseInt(pagefa));
          }else{
            setAddindexfac(1);
          }
       
  
  
  })
  .catch(error=>{
    console.log("not found");
  });
}
if(a3.applicant_info.type=='admin'){
  Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:paginationfac.perPage,page:a,search:search.seachnew})
  .then(res =>{
  
    
        console.log(res.data);
         setAllBookings(res.data.totaldetailsbooknew);
         setPaginationfac((preValue)=>{
        return { 
           perPage:preValue.perPage,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:a   
        }   
      });
         var pagefa=((parseInt(a) * parseInt(paginationfac.perPage))-parseInt(paginationfac.perPage));
         
         
          if(pagefa >= 10){
            setAddindexfac(parseInt(pagefa));
            console.log(parseInt(pagefa));
          }else{
            setAddindexfac(1);
          }
       
  
  
  })
  .catch(error=>{
    console.log("not found");
  });
}




}
const checkviewdeatisl =(val)=>{
  
    
   
  dispatch(enqueryData({
           val
          }));
          setViewdeatsilsnew(val);
          setStatusBooking('assigned');
          

          

}

const [cancelres,setcancelresInfo]=useState({
  cancelreason:"",
  
  err_cancelreason:1,
  
  err:0,
   
    });
     const inputEventcancelDetails =(event)=> {
    console.log(event.target.name);
    console.log(event.target.value);
 
   console.log(event);
    setcancelresInfo((preValue)=>{
       if(event.target.name==='cancelreason'){
        return {   
        cancelreason:event.target.value,
        err_cancelreason:0,
       
        err:preValue.err,
        };
       }




      })
    }
    const handleFocusnew = (event) => event.target.select();

    const inputEventfacpagexcahnge =(event)=> {
    
      
        console.log(paginationfac.totalPage) ;  
        if(paginationfac.totalPage>=event.target.value){
          if(event.target.name==="namepagefac" && event.target.value!=''){
            var pagnoforadmin=event.target.value;
           console.log(pagnoforadmin) ; 
          
    
           if(a3.applicant_info.type=='globaladmin'){
            Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:10,page:pagnoforadmin,search:search.seachnew})    
            .then(res =>{
             console.log(res.data);
             setAllBookings(res.data.totaldetailsbooknew);
                 setPaginationfac((preValue)=>{
                  return { 
                    perPage:10,
                    totalCount:res.data.pagination.totalCount,
                    totalPage:res.data.pagination.totalPage,
                    currentPage:parseInt(pagnoforadmin)   
                  }   
                });
            
                
             console.log(search);
            })
            .catch(err=>{
            console.log(err);
            })
          }
          if(a3.applicant_info.type=='admin'){
            Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:10,page:pagnoforadmin,search:search.seachnew})    
            .then(res =>{
             console.log(res.data);
             setAllBookings(res.data.totaldetailsbooknew);
                 setPaginationfac((preValue)=>{
                  return { 
                    perPage:10,
                    totalCount:res.data.pagination.totalCount,
                    totalPage:res.data.pagination.totalPage,
                    currentPage:parseInt(pagnoforadmin)   
                  }   
                });
            
                
             console.log(search);
            })
            .catch(err=>{
            console.log(err);
            })
          }
         
         
         }else{
           var pagnoforadmin=1;
           console.log(pagnoforadmin) ; 
           if(a3.applicant_info.type=='globaladmin'){
            Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:10,page:pagnoforadmin,search:search.seachnew})    
            .then(res =>{
             console.log(res.data);
             setAllBookings(res.data.totaldetailsbooknew);
                 setPaginationfac((preValue)=>{
                  return { 
                    perPage:10,
                    totalCount:res.data.pagination.totalCount,
                    totalPage:res.data.pagination.totalPage,
                    currentPage:parseInt(pagnoforadmin)   
                  }   
                });
            
                
             console.log(search);
            })
            .catch(err=>{
            console.log(err);
            })
          }
          if(a3.applicant_info.type=='admin'){
            Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:10,page:pagnoforadmin,search:search.seachnew})    
            .then(res =>{
             console.log(res.data);
             setAllBookings(res.data.totaldetailsbooknew);
                 setPaginationfac((preValue)=>{
                  return { 
                    perPage:10,
                    totalCount:res.data.pagination.totalCount,
                    totalPage:res.data.pagination.totalPage,
                    currentPage:parseInt(pagnoforadmin)   
                  }   
                });
            
                
             console.log(search);
            })
            .catch(err=>{
            console.log(err);
            })
          }
         
         
         
         }
         
        }
       
        
      
         };
const inputEvent =(event)=> {
  setSearch({seachnew:event.target.value});
     console.log({id:0,status:'locassign',perpage:10,page:1,search:event.target.value}) ; 
  if(event.target.name==="search-form"){


    if(a3.applicant_info.type=='globaladmin'){
      Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:10,page:1,search:event.target.value})    
      .then(res =>{
       console.log(res.data);
       setAllBookings(res.data.totaldetailsbooknew);
           setPaginationfac((preValue)=>{
            return { 
              perPage:10,
              totalCount:res.data.pagination.totalCount,
              totalPage:res.data.pagination.totalPage,
              currentPage:1  
            }   
          });
      
          
       console.log(search);
      })
      .catch(err=>{
      console.log(err);
      })
    }
    if(a3.applicant_info.type=='admin'){
      Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:10,page:1,search:event.target.value})    
      .then(res =>{
       console.log(res.data);
       setAllBookings(res.data.totaldetailsbooknew);
           setPaginationfac((preValue)=>{
            return { 
              perPage:10,
              totalCount:res.data.pagination.totalCount,
              totalPage:res.data.pagination.totalPage,
              currentPage:1  
            }   
          });
      
          
       console.log(search);
      })
      .catch(err=>{
      console.log(err);
      })
    }



}



    };
  
  useEffect(() => {
    console.log({id:0,status:'locassign',perpage:10,page:1});
 
    const isEmpty = Object.keys(a3).length === 0;
      console.log(isEmpty);
     if(a3){
      
     }
    if(isEmpty!=true && a3.applicant_info.type=='globaladmin'){
      Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:10,page:1,search:search.seachnew})
      .then(res =>{
        console.log("Get Data");
        console.log(res.data);
        setAllBookings(res.data.totaldetailsbooknew);
           setPaginationfac((preValue)=>{
            return { 
              perPage:10,
              totalCount:res.data.pagination.totalCount,
              totalPage:res.data.pagination.totalPage,
              currentPage:1  
            }   
          });
      });
    }
    if(isEmpty!=true  && a3.applicant_info.type=='admin'){
      Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:10,page:1,search:search.seachnew})
      .then(res =>{
        console.log("Get Data");
        console.log(res.data);
        setAllBookings(res.data.totaldetailsbooknew);
           setPaginationfac((preValue)=>{
            return { 
              perPage:10,
              totalCount:res.data.pagination.totalCount,
              totalPage:res.data.pagination.totalPage,
              currentPage:1  
            }   
          });
      });
    }
  


},[]);
const a4 = useSelector((state) => state.todoReducer4);
const submit =()=>{
  
  console.log(initiate);

if(initiate.status=='Approved'){
  Axios.post("adminComaplete",{initiate:initiate,id:initiate.id,canrea:cancelres.cancelreason})
.then(res =>{
console.log("locationAdminComplete");
 console.log(res.data);

if(res.data.status==="success"){
 



  if(a3.applicant_info.type=='globaladmin'){
    Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:10,page:1,search:search.seachnew})
    .then(res =>{
      console.log("Get Data");
      console.log(res.data);
      setAllBookings(res.data.totaldetailsbooknew);
         setPaginationfac((preValue)=>{
          return { 
            perPage:10,
            totalCount:res.data.pagination.totalCount,
            totalPage:res.data.pagination.totalPage,
            currentPage:1  
          }   
        });
    });
    setStatusBooking('assignednew');
  }
  if(a3.applicant_info.type=='admin'){
    Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:10,page:1,search:search.seachnew})
    .then(res =>{
      console.log("Get Data");
      console.log(res.data);
      setAllBookings(res.data.totaldetailsbooknew);
         setPaginationfac((preValue)=>{
          return { 
            perPage:10,
            totalCount:res.data.pagination.totalCount,
            totalPage:res.data.pagination.totalPage,
            currentPage:1  
          }   
        });
    });
    setStatusBooking('assignednew');
  }
}

handleCloseM();


});
}

if(initiate.status=='Delete'){
  Axios.post("admincompleteDelete",{initiate:initiate,id:initiate.id})
  .then(res =>{
  console.log("locationAdminDelete");
   console.log(res.data);
  
  if(res.data.status==="success"){
   
  
  
  
    if(a3.applicant_info.type=='globaladmin'){
      Axios.post("getMyProfileAdminGlobal",{id:0,status:'locassign',perpage:10,page:1,search:search.seachnew})
      .then(res =>{
        console.log("Get Data");
        console.log(res.data);
        setAllBookings(res.data.totaldetailsbooknew);
           setPaginationfac((preValue)=>{
            return { 
              perPage:10,
              totalCount:res.data.pagination.totalCount,
              totalPage:res.data.pagination.totalPage,
              currentPage:1  
            }   
          });
      });
      setStatusBooking('assignednew');
    }
    if(a3.applicant_info.type=='admin'){
      Axios.post("getMyProfileAdmin",{id:0,status:'locassign',perpage:10,page:1,search:search.seachnew})
      .then(res =>{
        console.log("Get Data");
        console.log(res.data);
        setAllBookings(res.data.totaldetailsbooknew);
           setPaginationfac((preValue)=>{
            return { 
              perPage:10,
              totalCount:res.data.pagination.totalCount,
              totalPage:res.data.pagination.totalPage,
              currentPage:1  
            }   
          });
      });
      setStatusBooking('assignednew');
    }
  }
  
  handleCloseM();
  
  
  });
}

}

if(statusBooking==="assigned"){     
          
 
  return <Redirect to={`/Applicationstatusdetails`} />;


}
if(a4.page=='/admin'){

 
  return <Redirect to={`/admin`} />;
}
if(a4.page=='/globaladmin'){

 
  return <Redirect to={`/globaladmin`} />;
}
// if(statusBooking==="assignednew"){     
          
 
//   return <Redirect to={`/Applicationstatus`} />;


// }

return (
   <>
   <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
  
       <div data-label="Example" class="df-example demo-table">
           <div class="table-responsive dataTables_wrapper no-footer">
{/*             <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px', fontFamily: 'IBM Plex Sans'}} id="example1_length"><label><select name="example1_length" aria-controls="example1" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>*/}
             <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
             <input type="search" class="search-data"  placeholder="Search..." aria-controls="example1" value={search.seachnew}   id="search-form"  name="search-form" style={{fontFamily: 'IBM Plex Sans',outline:'none'}} onChange={inputEvent} /></label></div>
                  
             <table class="table table-bordered mg-b-0 text-center">
               <thead>
                 <tr class="heading-sec-table " style={{fontSize:'15px'}}>
                 <th scope="col" style={{width:'87px'}}>Booking Id</th>
                   <th scope="col" style={{width:'84px'}}>Location</th>
                   <th scope="col"  style={{width:'159px'}}>Location Admin Name</th>
                   <th scope="col" style={{width:'196px'}}>Facilities</th>
                   <th scope="col" style={{width:'124px'}}>Submission Date</th>
                   <th scope="col"  style={{width:'161px'}}>Event Date & Time</th>
                   {/* <th scope="col"  style={{width:'101px'}}>Event Time</th> */}
                   <th scope="col"  style={{width:'121px'}}>Requested hour</th>
                   <th scope="col"  style={{width:'77px'}}>Status</th>
                   <th scope="col"  style={{width:'95px'}}>Action</th>
                 </tr>
               </thead>
               <tbody class="tbody-color tbody-view">

               { allBookings.length > 0 ? <>
           {   allBookings.map((post,index)=>( 
                 <tr style={{fontSize:'14px'}}>
                   <th scope="row">{post.details.bid}</th>
                   <td>
                     
                   {((post.details.locationName)==='Infinity') ? post.details.locationName :
                
                <>
                 {(isNaN(post.details.locationName)===false) ? '#'+post.details.locationName : post.details.locationName}
                </>
                }</td>
                   <td>{post.locadminname}</td>
                   <td>{post.details.facilityName}</td>
                   <td>{post.details.submit_at}</td>
                   <td>{post.details.bookingDate} ({post.details.bookingStartTime} - {post.details.bookingEndTime} )</td>
                   {/* <td>{post.details.bookingStartTime} - {post.details.bookingEndTime}</td> */}
                   <td>{post.timediffen}</td>
                   <td>
                   {post.details.status==='submit'?
                      <><span style={{color:`#1053eb`,fontWeight:`430`}}>
                      Booking Pending</span>
                       </>
                       :''}
                     {post.details.status==='locassign'?
                      <><span style={{color:`#1053eb`,fontWeight:`430`}}>
                      Booking Pending</span> </>
                       :''}
                     {post.details.status==='approved'?
                         <>
                         <div class="demostatusapprove">
                         <a href="#" data-tooltip={`Approved by ${post.locadminname!='' ? post.locadminname : post.faclityad} on  ${post.details.approve_date}`} > <span style={{color:`rgb(250, 139, 1)`,fontWeight:`430`}}>
                         Booking Approved</span></a></div>
                          </>
                    :''}
                      {post.details.status==='complete'?
                     <><span style={{color:`#48a90b`,fontWeight:`430`}}>
                     Completed</span>
                     {/* <div class="demostatus">   <a href="#" data-tooltip={`Completed by Facility Admin on  ${post.details.complete_date}`} >   <span style={{color:`#48a90b`,fontWeight:`430`}}>
                     Completed</span></a></div> */}
                    

                      </>
                    :''}
                     {post.details.status==='estimate'?
                     <><span style={{color:`#48a90b`,fontWeight:`430`}}>
                    Estimate Provided</span> </>
                    :''}
                    {post.details.status==='cancel'?
                      <><span style={{color:`#ed1130`,fontWeight:`430`}}>
                      Booking Cancelled</span> </>
                     
                     :''}
                     {post.details.status==='rejected'?
                      <> <div class="demostatusreject">
                      <a href="#" data-tooltip={`Rejected by ${post.locadminname!='' ? post.locadminname : post.faclityad} on  ${post.details.approve_date}`} >  <span style={{color:`#ed1130`,fontWeight:`430`}}>
                     Booking Rejected</span></a></div>
                      </>
                     
                     :''}
                     </td>
                     <td>
                     {post.details.status==='locassign'?
                   <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)}  style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                         :''}
                         
                   {post.details.status==='approved'?
                   <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)}  style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                         :''}
                       
                           {post.details.status==='complete'?
                   <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)} style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                         :''}
                         {a3.applicant_info.type==='globaladmin' && <>
                         
                         {post.details.status==='cancel'?
                          <>
                                    <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)} style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                          </>
         
                         :''}
                         </>
                         
              }
                         {post.details.status==='rejected'?
                   <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)} style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                         :''}
                           {post.details.status==='estimate'?
                   <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)} style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                         :''}

                        {a3.applicant_info.type=='globaladmin' ? <> 
                          {post.details.status==='submit'?
                   <a to={`#`} onClick={()=>checkviewdeatisl(post.details.bid)} style={{cursor:'pointer',marginRight:'10px',backgroundColor:'rgb(250, 139, 1)'}}>
                       <i class="fa fa-eye view-class " title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                         :''}</>  : <></>} 
                         
                           

{a3.applicant_info.type==='admin' && <>

{post.details.status==='approved'?
           <a type="button" data-toggle="modal" onClick={()=>setInitiate({status:'Approved',message:'You are approving this Booking Request id #'+post.details.bid,active:true,id:post.details.bid})}  style={{cursor:'pointer',marginRight:'10px'}}>  <i class="fa fa-check view-class views-classes" title="Complete" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                :''}

{post.details.status==='complete'?
                    <a type="button" data-toggle="modal" onClick={()=>setInitiate({status:'Delete',message:'You are about to remove this Booking id #'+post.details.bid,active:true,id:post.details.bid})}  style={{cursor:'pointer',marginRight:'10px'}}>  <i class="fa fa-close view-class views-classes" title="Delete" style={{cursor:'pointer',backgroundColor:'red'}} aria-hidden="true"></i></a>
                         :''}

</>
         

}





                   {/* { (post.details.status=='approved') ?
                   <> 
                   
                   { (post.details.estimateno==null) ?

<> 
                     <Link to={`/createestimate/${post.details.bid}`} class="crete-sec" style={{color:'#0AB50A',cursor:'pointer'}}>{post.details.status==='approved'?'Create Estimate':''}</Link>
              </>  :
                <><Link to={`/createestimate/${post.details.bid}`} class="crete-sec" style={{color:'#0AB50A',cursor:'pointer'}}>{post.details.status==='approved'?'Edit Estimate':''}</Link>
                </> 
                }
                 </>  :  <>

                 </>
}
{ (post.details.status=='estimate') ? 
<> 
                     <Link to={`/Previewpage/${post.details.bid}`} class="crete-sec" style={{color:'#0AB50A',cursor:'pointer'}}>{post.details.status==='estimate'?'Print':''}</Link>
              </> 
:
<>

</>

} */}
                </td>
                </tr>
           ))}</>:<>   <tr>
                 
           <td colSpan={9}  >No Request Yet</td>
            </tr> </>}
               
               
               </tbody>
             </table>
             { allBookings.length > 0 ? <>
             <div className="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontSize: '15px'}}>Showing {(paginationfac.currentPage * paginationfac.perPage)-paginationfac.perPage+1 } to {(paginationfac.currentPage * paginationfac.perPage)>paginationfac.totalCount?paginationfac.totalCount:paginationfac.currentPage * paginationfac.perPage} of {paginationfac.totalCount} entries</div>
              <div style={{width: 'auto', float: 'right', border: '1px solid #ccc', marginTop:'20px'}}>
                <div style={{float: 'left', padding: '5px 10px', background: '#f79e00', color: '#fff', fontSize: '14px'}}> Page {paginationfac.currentPage}<span> of </span> {paginationfac.totalPage} </div>
<div  onClick={()=>callPaginationfac('previouPage')}  style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
                <span style={{float: 'left', fontSize: '14px', marginTop: '6px', marginLeft: '10px', color:'#707070;'}}>Go To</span>
                <input  
                    onChange={inputEventfacpagexcahnge} name="namepagefac" id="namepagefac" onClick={handleFocusnew}   
                value={paginationfac.currentPage}  type="text" style={{color:'#707070',fontSize: '14px', width: '31px', float: 'left', height: '22px', marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '4px', border: '1px solid #f79e00'}} />
 <div onClick={()=>callPaginationfac('nextPage')} style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div>
              </div>
              </> : ''}


           </div>
         </div>

</div>
</div>


<Modal show={initiate.active} onHide={handleCloseM} className='closelogin'>
<div class="upload-close upload-top upload-topnewheigh" style={{borderRadius: '0px', marginTop: '50px'}} >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-body modal-body-for" style={{marginBottom: '15px',paddingTop:'0px',position:'relative',display:'block',top:'-20px',padding:'0px'}}>
              <p class="mg-b-0" style={{fontFamily: 'IBM Plex Sans',fontWeight:'500',borderBottom:'1px solid #cccccc',paddingBottom:'20px'}}>{initiate.message}</p>
              { initiate.status=='Approved' ?  <>

              <div class="row">
<div class="col-md-12" style={{marginBottom:'15px',padding:'0px 42px'}}>
<span style={{ color: '#707070',fontSize:'15px',textAlign:'left',position:'relative',display:'block',fontWeight:'400'}}>Comments</span>
       <textarea   name="cancelreason" onChange={inputEventcancelDetails}  style={{marginTop:'10px', height:'95px',outline:'none',marginBottom:'10px',fontWeight:'400',border:'1px solid rgb(204, 204, 204)',width:'100%',fontSize:'15px',color:'#707070',fontFamily:'Heebo-Regular'}}></textarea>
      {(cancelres.err_cancelreason==1 && cancelres.err === 5) &&  <span style={{color:'red',textAlign:'left',position:'relative',display:'block',fontSize:'13px',marginTop:'-9px'}}>Please enter comments</span> }
      
       </div>
       </div> </>: ''}
                  
             
           
              <button onClick={submit} type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</button>
              <button type="button"  onClick={() => {handleCloseM()}} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>

   </>
)
}
export default Applicationstatus