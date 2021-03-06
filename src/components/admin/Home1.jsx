import React,{useState,useEffect,useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



/*** for slect muiltple option start **/
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
/*** for select multiple option end */
/*** for date picker section start ***/
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
/*** for date picker section end***/
import Modal from 'react-bootstrap/Modal';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  useHistory ,
  useLocation,
  withRouter
  }from 'react-router-dom'

import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

import axios from 'axios';

function TabPanel(props) {
  
  const { children, value, index, ...other } = props;

  // const [location,setLocation]= useState([]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
/**** vartical tab section start */
id={`vertical-tabpanel-${index}`}
aria-labelledby={`vertical-tab-${index}`}
/*** vartical tab section end */
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>

    
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// function a11yProps(index) {
//   console.log(index);
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,

//   };
// }
/*** for vertical tab start ***/
// function a12yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }
/*** for vertical tab end ***/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [sellectall, setSelectAll] = useState(0);
  const classess = useStyles();
  const [values, setValues] = useState({facility:'',location:'',amenities:[]});
  const [allAmenities, setAllAmenities] = useState({facility:'',facilityid:'',amenities:[]});
  const [addAmenities, setAddAmenities] = useState([]);
  const [addFacility, setAddFacility] = useState(0);
  const [loc, setLoc] = useState();
  const [lFA, setLFA] = useState([]);
  const [lFAview,setLFAview] = useState([]);
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });


  const getFacilities=()=>{
    Axios.post("getAllFacility")
    .then(res =>{
    console.log("api location")
      console.log(res.data);
    

console.log(res.data.response);

var result = res.data.response.map(function(el) {
  var o = Object.assign({}, el);
  o.isSelect = false;
  return o;
})


setFacilities(result);
console.log(result);
      // setLocation(res.data.response);
      // setLocationAdmin(res.data.locationAdmin);


    })
    .catch(error=>{
      console.log("not found");
    });
  }

  const getLocation=()=>{
    
    Axios.post("locationFacilityAmenities")
    .then(res =>{
    console.log("locationFacilityAmenities")
      console.log("locationFacilityAmenities");
      console.log(res.data);
      setLFA(res.data.data);



    })
    .catch(error=>{
      console.log("not found");
    });

  }



  const handleChange = (event, newValue) => {

    console.log(event);
    console.log(newValue);

    if(newValue==2){
      console.log("Add Facility"); 
      getFacilities();
 
    }

    if(newValue==3){
      console.log("Manage");

      getLocation();

    }
    setValue(newValue);
  };



  const viewData =(location)=>{

    console.log(location);
    setLFAview([]);

   

      Axios.post("locationFacilityAmenitiesView",{location:location.loc})
      .then(res =>{
      console.log("view Data");
      setShow1(true);
      console.log(res.data);
      setLFAview(res.data.data);
     
    })
    .catch(error=>{
      console.log("not found");
      setLFAview([]);
  });
  

  }


  const editData=(data)=>{
    // alert("edit Data");
    console.log(data);
    // console.log(data.locationName);
    getLocation();
    getFacilities();
    // let a = data.locationName;
    setValue(2);
    
    // document.getElementById('size-small-standard').value = '003';
    // // alert(a);
    let a=data.locationName;
    setLoc(a);
   
  
  }

  /*** vertical section start ***/

  const handleChanges = (event, newValues) => {
// console.log(newValues);
console.log(" location is = "+loc); 

                Axios.post("getFacilityByLocationId",{facilityid:newValues.id,location:loc})
                .then(res =>{
                console.log("api location1");
                console.log("getFacilityByLocationId");
                console.log(res.data);

                setAllAmenities({facility:'',facilityid:'',amenities:[]});
                setAddAmenities([]);
                setdateValue([null,null]);

                let ame = res.data.data;
                var abc = ame.map(v => ({...v, tcount: 0}));
                setAllAmenities({facility:newValues.type,facilityid:newValues.id,amenities:abc});
                setAddAmenities(abc);

                let start = new Date(res.data.facilityINFO[0].fromDate);
                  let to = new Date(res.data.facilityINFO[0].toDate);
                  let a =[start,to];
                  setdateValue(a);



              /*

                    setAddAmenities([]);
                    setdateValue([null,null]);
                    setAddAmenities([]);

                  
                  setTotal(res.data.facilityINFO.length);
                    if(res.data.facilityINFO.length === 0){

                      alert("1 "+res.data.facilityINFO.length);
                  let start = new Date(res.data.facilityINFO[0].fromDate);
                  let to = new Date(res.data.facilityINFO[0].toDate);
                  let a =[start,to];
                  setdateValue(a);
                  
                  
                  }
                  else  if(res.data.facilityINFO.length >= 1 ){

                    alert("2 "+res.data.facilityINFO.length);
                  
                    let start = new Date(res.data.facilityINFO[0].fromDate);
                    let to = new Date(res.data.facilityINFO[0].toDate);
                    let a =[start,to];
                    setdateValue(a);
                    
                  setAddFacility(res.data.facilityINFO[0].count);

                  let ame = res.data.data;
                  var abc = ame.map(v => ({...v, tcount: 0}));
                  setAllAmenities({facility:newValues.type,facilityid:newValues.id,amenities:abc});
                  setAddAmenities(abc);

                  }else{
                    alert("3 "+res.data.facilityINFO.length);
                    let a =[null,null];

                     setdateValue(a);
                     
                  }

                 
                
           */




                })
                .catch(error=>{
                  console.log("not found");
                });
                

    // setValues(newValues);
  };

  /**** date picker start  */
  const [datevalue, setdateValue] = React.useState([null, null]);
  /*** date picker end */
  /*** vertical section end */
  /** for modal start */
  const initiateview = ()=>{
    //   alert("hello");
    setShow1(true);
    // setShowR(false);
    // setShowUP(false);
  }
  const [showM, setShow1] = useState(false);
  const handleCloseM = () => setShow1(false);

  const closeok = ()=>{
    setShow1(false);
  }


  const uploadimge = ()=>{
    setShow2(true);
  }
   const [showuploadM, setShow2] = useState(false);
  const handleCloseuploadM = () => setShow2(false);
  const [location,setLocation]= useState([]);
  const [locationAdmin,setLocationAdmin]= useState([]);
  const [facilities,setFacilities]= useState([]);
  const [admin,setAdmin]= useState({locationAdmin:[],locations:[]});
  const [pagination,setPagination] = useState({perPage:10,totalCount:0,totalPage:1,currentPage:1})
  const textInput = useRef(null);

 const uploadclose = ()=>{
  handleCloseuploadM(false)
 }
/** for incremnet decrement section start */
// const [num, setNum] = useState(1);
// const increasevalue = ()=>{
//   setNum(num + 1);
//   document.getElementById('number').value = num;
// }
// const decreasevalue = ()=>{
//   if (num > 0){
//     setNum(num - 1);}
//     else{
//       setNum(0);
//     }
//     document.getElementById('number').value = num;
// }
// var temp_num = 1;
const increasevalue = (ev,data)=>{

  console.log(addAmenities);
  console.log("data");
  console.log(data);


  var index = addAmenities.findIndex(x=> x.amenitiesid === data.amenitiesid);
  let g = addAmenities[index];

  if(ev==='increment'){
    ++ g["ascount"]
  }else if(ev==='decrement' && g.ascount > 0){
    -- g["ascount"]
  }
  


  console.log(g);
  if (index === -1){
    // handle error
    console.log('no match')
  }
  else
  setAddAmenities([
      ...addAmenities.slice(0,index),
      g,
      ...addAmenities.slice(index+1)
    ]
            )
           
 
}

var aa=0;
const increaseAmenitiesValue =(ev)=>{

  if(ev==='increment'){
    aa = parseInt(addFacility) + 1;
  }else  if(ev==='decrement' && addFacility > 0){
    aa = parseInt(addFacility) - 1;
  }

  

  console.log(ev+' '+aa);
  setAddFacility(aa);




}



/*** for increment decrement section end */


const setLocationAddFacility=(e)=>{
  console.log(e.target.innerHTML);
 
// alert("setLocationAddFacility");
  // console.log(typeof(v.inputProps.value));
 
  setLoc(e.target.innerHTML);

  // setValues({facility:'',location:v.inputProps.value,amenities:[]});

  // setValues((preValue)=>{
  //   return { 
  //     facility:preValue.facility,
  //     location:v.inputProps.value,
  //     amenities:preValue.amenities,
    
  //   }   
  // });
}
var a;
const inputEventLocation =(v)=> {
  
console.log(v.InputProps.startAdornment);
a = v.InputProps.startAdornment;
}




var adm;
const inputEventAdmin =(v)=>{
  // console.log("Change Location");
  adm = v.InputProps.startAdornment;
}


const assignLocationAdmin=()=>{

console.log(a);
console.log(adm);
//  setAdmin({locationAdmin:adm,locations:a});

// Axios.post("assignLocationAdmin",{location:"3",facility:"1"})
// .then(res =>{
//  console.log("api location")
//   console.log(res.data.response);
//   setLocation(res.data.response);
//   setLocationAdmin(res.data.locationAdmin);
// })
// .catch(error=>{
//   console.log("not found");
// });


}

const perpageList =(co)=>{
console.log(co);
}

const callPagination =(s)=>{
console.log(s);
let a=pagination.currentPage;
if(s==='nextPage' && pagination.currentPage < pagination.totalPage){
  a = a+1;
}

if(s==='previouPage' && pagination.currentPage > 1 && pagination.currentPage <= pagination.totalPage){
  a = a-1;
}


if(pagination.currentPage === a){

  return false;
}


Axios.post("locationList",{perpage:pagination.perPage,page:a})
.then(res =>{
 console.log("api location 2")
  console.log(res.data);
 

  setPagination((preValue)=>{
    return { 
      perPage:preValue.perPage,
      totalCount:res.data.pagination.totalCount,
      totalPage:res.data.pagination.totalPage,
      currentPage:a  
    }   
  });
  setLocation(res.data.response);
  setLocationAdmin(res.data.locationAdmin);


})
.catch(error=>{
  console.log("not found");
});




}

const UpdateLocationFacility =()=>{
 
  let start = 0;
  let end = 0;

  if(! datevalue|| !datevalue[0] || !datevalue[1]){
    alert("Please select Start and End date");
    return 0;
  }else{
     start = dateFormat(datevalue[0]);
     end = dateFormat(datevalue[1]);
  }

  if(!loc){
    alert("Please select a location");
    return 0;
  }


if(sellectall){

  // value={value} onChange={handleChange}

  Axios.post("selectAll",{     
      start:start,
      end:end,
      loc:loc
    })
    .then(res =>{
     console.log("api location 3")
      console.log(res.data);
      getLocation();
      setValue(3);
    alert("Facilities set up successfully");


    });

}else{

  if(addFacility){

    console.log(addFacility);
    console.log(allAmenities);

    Axios.post("updateLocationFacilityOnly",{
      count:addFacility,
      allAmenities:allAmenities,
      start:start,
      end:end,
      loc:loc
    })
    .then(res =>{
     console.log("ADD FACILITY")
      console.log(res.data);
    alert("Success");

    });


}else{
  Axios.post("updateLocationFacility",{
    addAmenities:addAmenities,
    start:start,
    end:end,
    loc:loc
  })
  .then(res =>{
   console.log("api location 3")
    console.log(res.data);
    alert("Success");
  });
}


}



  
}

const dateFormat =(a)=>{
  let y = a.getFullYear();
  let m = a.getMonth()+1;
  let d = a.getDate();
 let date1 =y+'/'+m+'/'+d;
 return date1;
}
const resetData=()=>{

  console.log("reset");

  // setdateValue([null,null]);
  // setAddAmenities([]);
  // setAddFacility(0);

}

const selectAll=()=>(event)=>{
  // let start = dateFormat(datevalue[0]);
  // let end = dateFormat(datevalue[1]);
  const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value);
    console.log(loc);

    setSelectAll(value);


    



}

const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
const a3 = useSelector((state) => state.todoReducer3);

useEffect(() => {

 

  
  Axios.post("locationList",{perpage:10,page:1})
  .then(res =>{
   console.log("api location 4")
    console.log(res.data);
   

    setPagination((preValue)=>{
      return { 
        perPage:preValue.perPage,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:preValue.currentPage  
      }   
    });
    setLocation(res.data.response);
    setLocationAdmin(res.data.locationAdmin);


  })
  .catch(error=>{
    console.log("not found");
  });


},[]);


useEffect(() => {
/* Reset */
// alert("change loc = "+loc);

  setdateValue([null,null]);
  setAddAmenities([]);
},[loc]);

const selectFac=(data)=>{
  
  let b = document.getElementById("fac"+data.id).checked;
 

let a = facilities.map(item => {
    var temp = Object.assign({}, item);
    if (temp.id === data.id) {
        temp.isSelect = b;
    }
    return temp;
});

console.log(facilities);
console.log(a);
setFacilities(a);


}

const restData=()=>{
  setAddAmenities([]);
  setdateValue([null,null]);
  setAddFacility(null);
  setLoc(null);
}

if(applicant_id1){
        
  if(a3.applicant_info.type!=='admin')
  return <Redirect to={`/`} />;
}else{
  return <Redirect to={`/`} />;
}


  return (
    <>
    <div className="content content-fixed">
    <div className="container-admin pd-x-0 pd-lg-x-10 pd-xl-x-0">
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {/* <Tab label="Add Admin" {...a11yProps(0)} />
          <Tab label="Manage Admin" {...a11yProps(1)}  style={{marginLeft: '95px'}}/>
          <Tab label="Add Facilites" {...a11yProps(2)} style={{marginLeft: '95px'}} />
          <Tab label="Manage Facilites" {...a11yProps(3)} style={{marginLeft: '95px'}} /> */}
          <Tab label="Add Admin"  />
          <Tab label="Manage Admin"   style={{marginLeft: '95px'}}/>
          <Tab label="Add Facilites"  style={{marginLeft: '95px'}} />
          <Tab label="Manage Facilites" style={{marginLeft: '95px'}} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div class="row">
                        <div class="col-md-12">
                          <div class="set-number-sec " style={{marginLeft:'0px'}}>
                            
                              <div class="row">
                              <div class="col-md-3">
                              <div class="map-icon-admin">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    
                                  </div>
      <div className={classes.root}>
      <Autocomplete
        multiple
        // value={loc}
        // limitTags={1}
        id="size-small-standard-multi"
        size="small"
        options={location}
        getOptionLabel={(option) => option.locationName}
      
        renderInput={(params) => (
          <TextField {...params} variant="standard" name="locations" onChange={inputEventLocation(params)} label="Select Location" placeholder="Locations" />
        )}
      />
    </div>
    </div>

    <div class="col-md-3">
    <div class="map-icon-admin">
      <i class="fa fa-user" aria-hidden="true"></i>
                                    
    </div>
      <div className={classes.root}>
      <Autocomplete
        multiple
        limitTags={1}
        id="size-small-standard-multi"
        size="small"
        options={locationAdmin}
        getOptionLabel={(option) => option.firstName}
      
        renderInput={(params) => (
          <TextField {...params} variant="standard" onChange={inputEventAdmin(params)} label="Select Location Admin" placeholder="Location Admin" />
        )}
      />
    </div>
    </div>

    </div>

    <div class="col-md-12" style={{paddingLeft: '0px',paddingTop: '20px', display: 'block', position: 'relative', float:'left'}}>
                        <div class="button-sec" style={{float:'left'}}>
                          <button type="button" onClick={assignLocationAdmin} class="btn btn-primary btn-add">Add</button>
                          <button type="button" onClick={resetData} class="btn btn-outline-primary btn-cancel">Cancel</button>
                      </div>
  
                        </div>
    </div>
    </div>
    </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="tab-pane fade show"  role="tabpanel" aria-labelledby="manage-ad-tab5">
          <div data-label="Example" className="df-example demo-table">
            <div className="table-responsive dataTables_wrapper no-footer">
            <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px'}} id="example1_length"><label>
              {/* <select name="example1_length" aria-controls="example1" class="" value={pagination.perPage} onChange={perpageList}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                </select> */}
                </label>
                </div>
                <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
                <input type="search" class="search-data" placeholder="Search..." aria-controls="example1" /></label></div>
            <table className="table table-bordered mg-b-0 text-center">
                <thead>
                  <tr className="heading-sec-table">
                    <th scope="col" style={{width:'150px'}}>Sl No</th>
                    <th scope="col">Location</th>
                    <th>Location Admin</th>
                    <th scope="col" style={{width:'150px'}}>Action</th>
                  </tr>
                </thead>
                <tbody class="tbody-color">

                
                {   locationAdmin.map((post,index)=>(        
                  <tr>
                    <th scope="row">{post.emp_id}</th>
                    <td>{post.locationName}</td>
                    <td>{post.firstName,' ',post.lastName}</td>
                   
                    <td>
                      
                    <a href="#"> <i class="fa fa-pencil view-class view-pencil" title="edit" style={{cursor:'pointer',marginRight: '10px'}} aria-hidden="true"></i></a>
                    <a href="#"><i class="fa fa-trash view-class view-delete" aria-hidden="true"></i>
                    </a>
                    </td>
                  </tr>

                ))}
                 
                </tbody>
              </table>
              <div className="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontSize: '15px'}}>Showing {(pagination.currentPage * pagination.perPage)-pagination.perPage } to {(pagination.currentPage * pagination.perPage)>pagination.totalCount?pagination.totalCount:pagination.currentPage * pagination.perPage} of {pagination.totalCount} entries</div>
              <div style={{width: 'auto', float: 'right', border: '1px solid #ccc', marginTop:'20px'}}>
                <div style={{float: 'left', padding: '5px 10px', background: '#f79e00', color: '#fff', fontSize: '14px'}}> Page {pagination.currentPage}<span> of </span> {pagination.totalPage} </div>
                <div  onClick={()=>callPagination('previouPage')}  style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
                <span style={{float: 'left', fontSize: '14px', marginTop: '6px', marginLeft: '10px', color:'#707070;'}}>Go To</span>
                <input value={pagination.currentPage} type="text" style={{color:'#707070', width: '31px', float: 'left', height: '22px', marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '4px', border: '1px solid #f79e00'}} />
              <div onClick={()=>callPagination('nextPage')} style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div>
              </div>
        
          </div>
              </div>
              </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div class="row">
          <div class="col-md-12" style={{paddingLeft:'0px', paddingRight: '0px', marginBottom: '20px'}}>
            <div class="col-md-3" style={{margin:'0 auto'}}>
            <div class="map-icon maps-icons">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    
             </div>
      {/* <Autocomplete
        multiple
        limitTags={1}
        id="size-small-standard-multi"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => option.title}
      
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Select Location" placeholder="Locations" />
        )}
      /> */}
      <span>Choose location to add facilities</span>
      {loc}
       <Autocomplete
      
        id="size-small-standard"
        size="small"
       
        options={location}
        getOptionLabel={(option) => option.locationName}
        // defaultValue={loc}        
        onChange={setLocationAddFacility}
        renderInput={(params) => (
          <TextField {...params}  label="Select Location Add Facility" placeholder="Location" />
        )}
        
      />
      </div>
      </div>
      </div>
      <input class="floating-input floating-check" style={{float:'left'}}onChange={selectAll()} type="checkbox" id="sall" placeholder=" " />
      <span style={{textAlign: 'left', display:'block', top:'-7px', position:'relative', left:'14px'}}>Select All</span>
      <div className={classess.root} style={{display: 'flex'}}>

    
      {/* <input class="floating-input floating-check" onChange={selectAll()} type="checkbox" id="sall" placeholder=" " /><span>Select All</span> */}
   
                             
      <Tabs
        orientation="vertical"
       
        value={values}
        onChange={handleChanges}
        aria-label="Vertical tabs example"
        className={classess.tabs} 
      >
         
        {   facilities.map((post,index)=>(        
      <> <input class="floating-input floating-check" style={{float:'left'}}onChange={()=>selectFac(post)} type="checkbox" id={'fac'+post.id} placeholder=" " /> <Tab label={'Setup '+post.type} value={post} style={{backgroundColor:`${(sellectall || post.isSelect ) ?'#ffcc28':''}`}}/> </>
        ))
}
      </Tabs>
      <TabPanel >
        <div class="" style={{marginLeft:'20px'}}>
      <div class="row">
                       
                       <div class="col-md-6">
                        
 
                         <div class="set-section">
                             <div class="row">
                               <div class="col-md-12">
                                 <h2>Set Business Days</h2>
                               </div>
                               <div class="col-md-12">
                                 <div class="set-day-sec">
                                   <input class="floating-input floating-check" type="checkbox" placeholder=" " /><span>All Weekends</span>
                                 </div>
                               </div>
                              
                               <div class="col-md-12" style={{marginTop: '20px', paddingLeft: '0px', paddingRight: '0px'}}>
                                 {/* <input type="text" class="form-control form-date-sec hasDatepicker" placeholder="From Date" id="datepicker4" /> 
                                 <i class="fa fa-calendar from-cal" aria-hidden="true"></i>  */}
 
<LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="From date"
        endText="To Date"
        value={datevalue}
        onChange={(newValue) => {
          setdateValue(newValue);console.log(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <i class="fa fa-calendar from-cal" aria-hidden="true"></i><TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <i class="fa fa-calendar from-cal" aria-hidden="true"></i> <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
                                 
                                
                                  
   
                               </div>
                               {/* <div class="col-md-6">
                                 <input type="text" class="form-control form-date-sec hasDatepicker" placeholder="To Date" id="datepicker2" /> 
                                 <i class="fa fa-calendar from-cal" aria-hidden="true"></i>
                               </div> */}
                             </div>
   
                          
   
                           </div>
                       </div>
 
                       <div class="col-md-4">
                         <div class="img-sec">
                            
                             <div class="card card-event card-sec">
                               <img src="../image/school-image-register.jpg" class="card-img-top" alt="" />
       
                                 <div class="card-footer tx-13">
                                   <span class="tx-color-03"></span>
                                   <span class="del-icon">
                                    <a href="#" data-toggle="modal"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a> <i class="fa fa-trash" aria-hidden="true"></i>
       </span></div>
     
                             </div>
                             
                           </div>
                        
                           </div>
                           <div class="col-md-2">
                             <button type="button" onClick={uploadimge} data-toggle="modal" class="btn btn-success  btn-sec btn-upload mg-b-0" style={{marginTop:'65px',fontSize:'15px'}}>Upload Image</button>
                           </div>
 
                       </div>
                       <div class="" style={{border:'1px solid #f0f0f0',width:'100%'}}></div>
                       <div class="row">


                       
                      
                      <div class="col-md-6" >
                        <div class="set-number-sec " style={{marginLeft:'0px'}}>
                            <h2>Units Available</h2>
                            {/* {allAmenities.amenities.map((post,index)=>(   */}
                              {allAmenities.amenities.length > 1  &&

 <> {addAmenities.map((post,index)=>(  
                            <div class="row" key={post.id}>
                            <div class="col-md-5">
                                <p class="para-number">{post.amenities_name} </p>
                            </div>
                            <div class="col-md-7 para-top">
                             
                                <div class="value-button" id="decrease" onClick={(e) => {increasevalue("decrement",post)}} value="Decrease Value">-</div>
                                <input type="number" class="number" id="number" value={post.ascount} style={{padding:'13px ???0px'}}/>
                                <div class="value-button" id="increase" onClick={(e) => {increasevalue("increment",post)}} value="Increase Value">+</div>
                           
                            </div>
                          </div>
                          ))}</>
                          }

                          {allAmenities.amenities.length < 1  &&

                            // <>{allAmenities.facility}</>


                            <div class="row" >
                            <div class="col-md-5">
                                <p class="para-number">{allAmenities.facility}</p>
                            </div>
                            <div class="col-md-7 para-top">
                             
                                <div class="value-button" id="decrease" onClick={(e) => {increaseAmenitiesValue("decrement")}} >-</div>
                                <input type="number" class="number" id="number" value={addFacility} style={{padding:'13px ???0px'}}/>
                                <div class="value-button" id="increase" onClick={(e) => {increaseAmenitiesValue("increment")}} >+</div>
                           
                            </div>
                          </div>

                          }
                          </div>
                      </div>
                  
                    </div>

                    <div class="col-md-12" style={{paddingLeft: '0px'}}>
                      <div class="button-sec button-secs">
                        <button type="button" class="btn btn-primary btn-add" onClick={UpdateLocationFacility}>Add</button>
                        <button type="button" onClick={restData}  class="btn btn-outline-primary btn-cancel">Cancel</button>
                    </div>

                      </div>
                      </div>
      </TabPanel>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div className="tab-pane fade show"  role="tabpanel" aria-labelledby="manage-ad-tab5">
          <div data-label="Example" className="df-example demo-table">
            <div className="table-responsive dataTables_wrapper no-footer">
            <div class="dataTables_length length-data" style={{marginTop:'7px', marginBottom: '0px'}} id="example1_length"><label>
              <select name="example1_length" aria-controls="example1" class="">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                </select>
                </label>
                </div>
                <div id="example1_filter" class="dataTables_filter search-data search-bottom"><label>
                <input type="search" class="search-data" placeholder="Search..." aria-controls="example1" /></label></div>
                <table className="table table-bordered mg-b-0 text-center">
                  <thead>
                    <tr className="heading-sec-table">
                      <th scope="col" style={{width:'65px'}}>Sl No</th>
                      <th scope="col">Location</th>
                      <th scope="col">Facility</th>
                      {/* <th scope="col" style={{width:'320px'}}>Amenities</th> */}
                      <th scope="col" style={{width:'120px'}}>Weekend</th>
                      <th scope="col">From Date</th>
                      <th scope="col">To Date</th>
                      
                      
                      <th scope="col" style={{width:'110px'}}>Action</th>
                    </tr>
                  </thead>
                  <tbody class="tbody-color">
                  { lFA.length > 0 ?        
                  <>{  lFA.map((post,index)=>(   
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>{post.locationName}</td>
                      <td>{post.allFacilities}</td>
                      {/* <td>{post.allAmenities}</td> */}
                      <td>All</td>
                      <td>{post.fromDate}</td>
                      <td>{post.toDate}</td>
                      
                      <td>
                        <a onClick={()=>viewData(post)}  data-toggle="modal">
                          <i class="fa fa-eye view-class" title="view" style={{cursor:'pointer'}} aria-hidden="true"></i>
                          </a>
                      <a onClick={()=>editData(post)} > <i class="fa fa-pencil view-class view-pencil" title="edit" style={{cursor:'pointer'}} aria-hidden="true"></i></a>
                      </td>
                    </tr>
                  ))}</>:"No data available"
                  }
                   
                  </tbody>
                </table>
              <div className="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontSize: '15px'}}>Showing 1 to 10 of 50 entries</div>
              <div style={{width: 'auto', float: 'right', border: '1px solid #ccc', marginTop:'20px'}}>
                <div style={{float: 'left', padding: '5px 10px', background: '#f79e00', color: '#fff', fontSize: '14px'}}> Page 1<span> of </span> 2 </div>
                <div style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
                <span style={{float: 'left', fontSize: '14px', marginTop: '6px', marginLeft: '10px', color:'#707070;'}}>Go To</span>
                <input value="1" type="text" style={{color:'#707070',fontSize: '14px', width: '31px', float: 'left', height: '22px', marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '4px', border: '1px solid #f79e00'}} />
              <div style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div>
              </div>
          </div>
              </div>
              </div>
      </TabPanel>
    </div>
    </div>
    </div>

{/* <Modal show={showM} onHide={handleCloseM} className='closelogin'> */}
<Modal show={showM} onHide={handleCloseM} className='closelogin'>
<div class="login-close view-close" >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-content forward-contents  tx-14" style={{marginTop:'-30px'}}>
            <div class="modal-headers">
             <h2 class="para-view-popup" style={{fontFamily: 'IBM Plex Sans'}}>View Details</h2>
              {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position: 'absolute'}}>
                <span aria-hidden="true">??</span>
              </button> */}
            </div>
            <div class="modal-body modal-body-for" style={{padding: '0px 0px 30px 0px'}}>

            
               
         
              <table class="table table-bordered mg-b-0 text-center" style={{width: '90%', margin:'0 auto'}}>
                <thead>
                  <tr class="heading-sec-table">
                   
                    <th scope="col">Facilities</th>
                    <th scope="col">Amenities</th>
                    <th scope="col">Numbers </th>
                  </tr>
                </thead>
                <tbody class="tbody-color tbody-view">
                {   lFAview.map((post,index)=>(   
                  <tr>
                    
                    <td>{post.type}</td>
                    <td>{post.amenities_name?post.amenities_name:'--'}</td>
                    <td>{post.amenities_name?post.ascount:post.sfcount}</td>
                    
                  </tr>

))}
                
                </tbody>
              </table>
          
         
              <Link type="button" onClick= {closeok}  class="btn btn-primary btn-add" style={{width: '87px',fontSize: '18px',padding: '4px 0px', marginTop: '15px', fontFamily: 'IBM Plex Sans'}}>
                ok
              </Link>
            </div>
            
          </div>
</div>

  
</Modal>


<Modal show={showuploadM} onHide={handleCloseuploadM} className='closelogin'>
<div class="upload-close" >
    <Modal.Header closeButton >
    </Modal.Header>
   

    <div class="modal-content tx-14" style={{marginTop:'-40px'}}>
      <div class="modal-header modal-upload" style={{borderBottom: '1px solid rgba(0,0,0,.2)'}}>
        <h6 class="modal-title" id="exampleModalLabel" style={{fontFamily:'IBM Plex Sans'}}>Upload Image</h6>
        {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{top: '-42px',right: '-33px'}}>
          <span aria-hidden="true">??</span>
        </button> */}
      </div>
      <div class="modal-body">
        <p class="mg-b-0">
          <label for="myfile" style={{display: 'block', fontFamily: 'IBM Plex Sans'}}>Choose image</label>
          <input type="file" class="img-upload-sec" id="myfile" name="myfile" />
        </p> 
        </div>
      <div class="modal-footer">
        <button type="button" onClick={uploadclose} class="btn btn-primary btn-success btn1 tx-13" style={{minWidth:'85px', fontFamily: 'IBM Plex Sans'}} data-dismiss="modal">Save</button>
        <button type="button" onClick={uploadclose} class="btn btn-secondary btn-cancels tx-13" style={{minWidth:'85px', fontFamily: 'IBM Plex Sans'}} data-dismiss="modal">Cancel</button>
       
      </div>
    </div>
    </div>




  
</Modal>

</>
  );
}
