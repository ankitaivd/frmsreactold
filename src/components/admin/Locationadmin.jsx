import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import { userData } from "../../actions/userData";
import { finalData } from "../../actions/finalData";
import { siteData } from "../../actions/siteData";
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

const Locationadmin = () => {
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
  const [allBookings, setAllBookings] = useState([]);
   const [paginationfac,setPaginationfac] = useState({perPage:10,totalCount:0,totalPage:1,currentPage:1})
   const [addindexfac, setAddindexfac] = useState();
   const [search,setSearch]=useState({seachnew:''});
   const [viewdeatsilsnew, setViewdeatsilsnew] = useState();
   const dispatch=useDispatch();
   const [statusBooking, setStatusBooking] = useState('submit');
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


 Axios.post("getMyProfileAdmin",{id:0,status:'approved',  locationadmin:a3.applicant_id,perpage:paginationfac.perPage,page:a,search:search.seachnew})
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


const checkviewdeatisl =(val)=>{
  
    
   
  dispatch(enqueryData({
           val
          }));
          setViewdeatsilsnew(val);
          setStatusBooking('assigned');
          

          

}
const inputEvent =(event)=> {
  setSearch({seachnew:event.target.value});
  if(event.target.name==="search-form"){
    Axios.post("getMyProfileAdmin",{id:0,status:'approved',	locationadmin:a3.applicant_id,perpage:10,page:1,search:event.target.value})    
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
           Axios.post("getMyProfileAdmin",{id:0,status:'approved',  locationadmin:a3.applicant_id,perpage:paginationfac.perPage,page:pagnoforadmin,search:search.seachnew})
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
         
         }else{
           var pagnoforadmin=1;
           console.log(pagnoforadmin) ; 
           Axios.post("getMyProfileAdmin",{id:0,status:'approved',  locationadmin:a3.applicant_id,perpage:paginationfac.perPage,page:pagnoforadmin,search:search.seachnew})
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
       
        
      
         };
    

  const a3 = useSelector((state) => state.todoReducer3);
  useEffect(() => {

    console.log(a3);
console.log({id:0,status:'approved',	locationadmin:a3.applicant_id,perpage:10,page:1,search:search.seachnew});
     Axios.post("getMyProfileAdmin",{id:0,status:'approved',	locationadmin:a3.applicant_id,perpage:10,page:1,search:search.seachnew})
  .then(res =>{
    console.log("Get Data Location Admin");
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

  if(statusBooking==="assigned"){     
          
 
    return <Redirect to={`/Locationviewdetails`} />;
  
  
  }
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
                  {/*<div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px'}} id="example1_length"><label>
                      <select name="example1_length" aria-controls="example1" class="" style={{fontFamily: 'IBM Plex Sans'}}><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>*/}
                  <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
                  
                    <input type="search" class="search-data"  placeholder="Search..." aria-controls="example1"   id="search-form"  value={search.seachnew} name="search-form" style={{fontFamily: 'IBM Plex Sans',outline:'none'}} onChange={inputEvent} /></label></div>
                  
                  <table class="table table-bordered mg-b-0 text-center">
                    <thead>
                      <tr class="heading-sec-table" style={{fontSize:'15px'}}>
                      <th scope="col" style={{width:'87px'}}>Booking Id</th>
                        <th scope="col" style={{width:'84px'}}><span>Location</span></th>
                        <th scope="col" style={{width: '159px'}}>Facilities</th>
                        <th scope="col" style={{width:'124px'}}>Submission Date</th>
                        <th scope="col" style={{width: '161px'}}>Event Date & Time</th>
                          {/* <th scope="col"  style={{width:'101px'}}>Event Time</th> */}
                   <th scope="col"  style={{width:'121px'}}>Requested hour</th>
                        <th scope="col" style={{width: '160px'}}>Comments</th>
                        <th scope="col" style={{width: '77px'}}>Status</th>
                        <th scope="col" style={{width: '80px'}}>Action</th>
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
                        <td>{post.details.facilityName}</td>
                        <td>{post.details.submit_at}</td>
                        <td>{post.details.bookingDate} ({post.details.bookingStartTime} - {post.details.bookingEndTime})</td>
                   {/* <td>{post.details.bookingStartTime} - {post.details.bookingEndTime}</td> */}
                   <td>{post.timediffen}</td>
                        <td>{post.details.event_details}</td>
                        <td>
                          {post.details.status==='approved'?
                            <><span style={{color:`rgb(250, 139, 1)`,fontWeight:`430`}}>
                           Booking Approved</span> </>
                         :""}
                          {post.details.status==='rejected'?
                           <><span style={{color:`#ed1130`,fontWeight:`430`}}>
                           Rejected</span> </>
                          :""}
                           {post.details.status==='cancel'?
                           <><span style={{color:`#ed1130`,fontWeight:`430`}}>
                           Cancelled</span> </>
                          :""}
                          {post.details.status==='estimate'?
                          
                          <><span style={{color:`#48a90b`,fontWeight:`430`}}>
                          Estimate Provided</span> </>:''}
                          {post.details.status==='complete'?
                          
                          <><span style={{color:`#48a90b`,fontWeight:`430`}}>
                           Completed</span> </>:''}
                          {post.details.status==='locassign'?
                            <><span style={{color:`#1053eb`,fontWeight:`430`}}>
                           Pending</span> </>
                         :""}
                        </td>
                        <td>
                          <a to={`#`}   onClick={()=>checkviewdeatisl(post.details.bid)}  style={{paddingTop: '0px', display: 'block',cursor:'pointer'}}>
                            <i class="fa fa-eye view-class" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></a></td>
                      </tr>

           ))} </>:<>   <tr>
                 
           <td colSpan={9}  >No Request Yet</td>
            </tr> </> }
                      
                      
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
      </div>
     


      </div>
    </div>
   </>
)
}
export default Locationadmin