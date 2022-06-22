import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { siteData } from "./../../actions/siteData";
import { enqueryData } from "../../actions/enqueryData";
import Modal from 'react-bootstrap/Modal';
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



const Viewenquiries = () => {



  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });

  const [allBookings, setAllBookings] = useState([]);
 const [paginationfac,setPaginationfac] = useState({perPage:10,totalCount:0,totalPage:1,currentPage:1})
   const [addindexfac, setAddindexfac] = useState();
   const [search,setSearch]=useState({seachnew:''});
   const dispatch=useDispatch();
   const [viewdeatsilsnew, setViewdeatsilsnew] = useState();
   const [statusBooking, setStatusBooking] = useState('submit');
   const viewdeid = useSelector((state) => state.todoReducer5.id);

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


Axios.post("getMyProfile",{id:0,status:'submit',perpage:paginationfac.perPage,page:a,search:search.seachnew})
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
const handleFocus = (event) => event.target.select();
const inputEvent =(event)=> {
  setSearch({seachnew:event.target.value}); 
  if(event.target.name==="search-form"){
    Axios.post("getMyProfile",{id:0,status:'submit',perpage:10,page:1,search:event.target.value})    
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



    };

    const handleFocusnew = (event) => event.target.select();

const inputEventfacpagexcahnge =(event)=> {

  
    console.log(paginationfac.totalPage) ;  
    if(paginationfac.totalPage>=event.target.value){
      if(event.target.name==="namepagefac" && event.target.value!=''){
        var pagnoforadmin=event.target.value;
       console.log(pagnoforadmin) ; 
        Axios.post("getMyProfile",{id:0,status:'submit',perpage:10,page:pagnoforadmin,search:search.seachnew})    
     .then(res =>{
     console.log(res.data);
     setPaginationfac({   perPage:10,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:parseInt(pagnoforadmin)   }   
        );
        setAllBookings(res.data.totaldetailsbooknew);
  

     
     })
     .catch(err=>{
     console.log(err);
     })
     
     
     }else{
       var pagnoforadmin=1;
       console.log(pagnoforadmin) ; 
       Axios.post("getMyProfile",{id:0,status:'submit',perpage:10,page:pagnoforadmin,search:search.seachnew})    
       .then(res =>{
       console.log(res.data);
       setPaginationfac({
              perPage:10,
      totalCount:res.data.pagination.totalCount,
      totalPage:res.data.pagination.totalPage,
      currentPage:parseInt(pagnoforadmin)  
            
            }   
          );
          setAllBookings(res.data.totaldetailsbooknew);
    
     
     })
     .catch(err=>{
     console.log(err);
     })
     
     
     
     }
     
    }
   
    
  
     };
    const submit =()=>{
  
      console.log(initiate);
    
   
    
  
    
 
      Axios.post("adminDelete",{initiate:initiate,id:initiate.id})
      .then(res =>{
      console.log("locationAdminDelete");
       console.log(res.data);
      
      if(res.data.status==="success"){
       
      
      
      
          Axios.post("getMyProfile",{id:0,status:'submit',perpage:10,page:1,search:search.seachnew})
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
      
      
      handleCloseM();
      
      
      });
    
    
    
    }
    const checkviewdeatisl =(val)=>{
  
    
   
      dispatch(enqueryData({
               val
              }));
              setViewdeatsilsnew(val);
              setStatusBooking('assigned');
              
    
              
    
    }
    const a12 = useSelector((state) => state.todoReducer3);
  useEffect(() => {
    console.log(a12.applicant_id);
    console.log({id:0,status:'submit',perpage:10,page:1});
  Axios.post("getMyProfile",{id:0,status:'submit',perpage:10,page:1,search:search.seachnew})
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


},[]);

// if(a12.applicant_id!='' && a12.applicant_info.type=='globaladmin'){
 
//   return <Redirect to={`/Applicationstatus`} />;
// }
if(statusBooking==="assigned"){     
          
 
  return <Redirect to={`/Viewdetails`} />;


}


return (
    <>
      <div class="content content-fixed">
     
     <div class="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
  
       <div data-label="Example" class="df-example demo-table">
           <div class="table-responsive dataTables_wrapper no-footer">
  {/*           <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px'}} id="example1_length"><label>
                 <select name="example1_length" aria-controls="example1" class="" style={{fontFamily: 'IBM Plex Sans'}}>
                     <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>*/}
             <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
             <input type="search" class="search-data"  placeholder="Search..." aria-controls="example1"   id="search-form"  name="search-form" value={search.seachnew} style={{fontFamily: 'IBM Plex Sans',outline:'none'}} onChange={inputEvent} /></label></div>
                  
               
             <table class="table table-bordered mg-b-0 text-center">
               <thead>
                 <tr class="heading-sec-table headingviewenq">
                   <th scope="col" style={{width:'106px'}}>Booking Id</th>
                   <th scope="col"  style={{width:'84px'}}>Location</th>
                   <th scope="col" style={{width:'166px'}}>Facilities</th>
                   <th scope="col" style={{width:'76px'}}>Name</th>

                   <th scope="col" style={{width:'109px'}}>Organization</th>
                   <th scope="col" style={{width:'147px'}}>Submission Date</th>
                   <th scope="col"  style={{width:'161px'}}>Event Date & Time</th>
                   {/* <th scope="col"  style={{width:'101px'}}>Event Time</th> */}
                   <th scope="col"  style={{width:'148px'}}>Requested Hours</th>
                   <th scope="col"  style={{width:'80px'}}>Status</th>
                   <th scope="col" style={{width:'58px'}}>Action</th>
                 </tr>
               </thead>
               <tbody class="tbody-color tbody-view">

               { allBookings.length > 0 ? <>
           {   allBookings.map((post,index)=>(          
           
          <tr>
                   <th scope="row">{post.details.bid}</th>
                   <td>
                   {((post.details.locationName)==='Infinity') ? post.details.locationName :
                
                <>
                 {(isNaN(post.details.locationName)===false) ? '#'+post.details.locationName : post.details.locationName}
                </>
                }
                    </td>
                   <td>{post.details.facilityName}</td>
                   <td>{post.details.name}</td>
                   <td>{post.details.organization}</td>
                   <td>{post.details.submit_at}</td>
                   <td>{post.details.bookingDate} ({post.details.bookingStartTime} - {post.details.bookingEndTime})</td>
                   {/* <td></td> */}
                   {/* <td>15th June 2021</td> */}
                  <td>{post.timediffen}</td>
                  <td>
                   
                     {post.details.status==='submit'?
                      <><span style={{color:`#1053eb`,fontWeight:`430`}}>
                       Pending</span> </>
                       :''}
                     
                     {post.details.status==='cancel'?
                      <><span style={{color:`#ed1130`,fontWeight:`430`}}>
                       Cancelled</span> </>
                     
                     :''}
                     </td>
                  <td>  
                  {post.details.status==='cancel'?
                    <a to={`#`}   data-toggle="modal" onClick={()=>setInitiate({status:'Delete',message:'You are about to remove this Booking id #'+post.details.bid,active:true,id:post.details.bid})}style={{cursor:'pointer',marginRight:'2px',backgroundColor:'red'}}>
                    <i class="fa fa-close view-class " title="Delete" style={{cursor:'pointer',backgroundColor:'red'}} aria-hidden="true"></i></a>
                         :
                         <a onClick={()=>checkviewdeatisl(post.details.bid)}   style={{cursor:'pointer'}}>
                       <i class="fa fa-eye view-class views-classes" title="View" style={{cursor:'pointer'}} aria-hidden="true"></i></a> 
                         
                         }
                  </td>
                 
                 </tr>
                
                      ))}</>:<> 
                      <tr>
                                     
                                          <td colSpan={10}  >No Request Yet</td>
                                           </tr> </>

                    }
                      
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
              
                  
             
           
              <button onClick={submit} type="button" class="btn btn-primary btn-add btn-approve" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>Yes</button>
              <button type="button"  onClick={() => {handleCloseM()}} class="btn btn-primary btn-cancel btn-approve" data-dismiss="modal" style={{width: '95px',fontSize: '18px', padding: '5px 0px'}}>No</button>
            </div>
    </div>




  
</Modal>

    </>
)
}
export default Viewenquiries