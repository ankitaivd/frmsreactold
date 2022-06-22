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
import Multiselect from 'multiselect-react-dropdown';
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
var selectloc={
  "location_id": "78",
  "location": "Innovation",
  "locationName": "Innovation",
  "selected": false
};
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
  const [updatelocation,setUpdteLoction] = useState([]);
  const [total, setTotal] = useState(0);
  const [sellectall, setSelectAll] = useState(0);
  const [sellectallweek, setSelectAllweek] = useState(0);
  const [sellectonlyweek, setSelectOnlyweek] = useState(0);
  const classess = useStyles();
  const [values, setValues] = useState({facility:'',location:'',amenities:[]});
  const [allAmenities, setAllAmenities] = useState({facility:'',facilityid:'',amenities:[]});
  const [addAmenities, setAddAmenities] = useState([]);
  const [addFacility, setAddFacility] = useState(0);
   const [addindexfac, setAddindexfac] = useState();
  const [loc, setLoc] = useState();
  const [lFA, setLFA] = useState([]);
  const [lFAview,setLFAview] = useState([]);
  const [theArray, setTheArray] = useState([]);
  const [locedit, setLocEdit] = useState();
    const [datefomt, setDatefomt] = useState();
    const [search,setSearch]=useState({seachnew:''});
    const [searchfac,setSearchFac]=useState({seachnewfac:''});
    const [showalert, setShowalert] = useState(false);
    const handleClosealert = () => setShowalert(false);
    const handleShowalert = () => setShowalert(true);
    
   
    const [Alerterr,setAlerterr]=useState({
               
      Alerterr_message:"",        
          
       
      Alerterr_err:'0',
     
    });
  
    const [showalertsuccess, setShowalertsuccess] = useState(false);
    const handleClosealertsuccess = () => setShowalertsuccess(false);
    const handleShowalertsuccess = () => setShowalertsuccess(true);
    
    const [Alertsuccess,setAlertsuccess]=useState({
                 
      Alertsuccess_message:"",        
          
       
      Alertsuccess_err:'0',
     
    });
       
  const [datevalue, setdateValue] = React.useState([null, null]);
  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL
  });
const selectAllweek=()=>(event)=>{
  
  const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
   
  console.log(value);
    setSelectAllweek(value);
    setSelectOnlyweek(0);
    document.getElementById('sonlyweek').checked=false;
    



}
const selectOnlylweek=()=>(event)=>{
  
  const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
   
  console.log(value);
  setSelectOnlyweek(value);
  setSelectAllweek(0);
  document.getElementById('sallweek').checked=false;
    



}
  const getFacilities1=(numberArray,is_unavailable,is_onlyweekend)=>{
    Axios.post("getAllFacility")
    .then(res =>{
    console.log("api location new");
      console.log(res.data);
    console.log(numberArray);

console.log(res.data.response);
var theArraynewon=new Array();
var result = res.data.response.map(function(el) {
  var o = Object.assign({}, el);

  if (numberArray.includes(parseInt(o.id))==true) {
    document.getElementById("fac"+parseInt(o.id)).checked=true;
     o.isSelect = true;
     theArraynewon.push({ facilityid: o.id });
  }else{
     document.getElementById("fac"+parseInt(o.id)).checked=false;
     o.isSelect = false;
  }
 
  return o;
})
var lennum=numberArray.length;
var lenres=result.length;

if(lennum==lenres){
document.getElementById('sall').checked=true;
setSelectAll(true);
}else{
  document.getElementById('sall').checked=false;
  setSelectAll(false);
}
console.log(theArraynewon);
setTheArray(theArraynewon);
setFacilities(result);
console.log(result);
if(is_unavailable==1){
   document.getElementById('sallweek').checked=true;
  setSelectAllweek(true);
}else{
   document.getElementById('sallweek').checked=false;
  setSelectAllweek(false);
}

if(is_onlyweekend==1){
  document.getElementById('sonlyweek').checked=true;
  setSelectOnlyweek(true);
}else{
  document.getElementById('sonlyweek').checked=false;
  setSelectOnlyweek(false);
}

      // setLocation(res.data.response);
      // setLocationAdmin(res.data.locationAdmin);


    })
    .catch(error=>{
      console.log("not found");
    });
  }

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

  const inputEventFacSerach =(event)=> {
    setSearchFac({seachnewfac:event.target.value});
    console.log({perpage:10,page:1,search:event.target.value}) ;   
   if(event.target.name==="search-form-fac"){
     Axios.post("locationFacilityAmenities",{perpage:10,page:1,search:event.target.value})    
 .then(res =>{
  console.log(res.data);
     setPaginationfac((preValue)=>{
       return { 
         perPage:10,
         totalCount:res.data.pagination.totalCount,
         totalPage:res.data.pagination.totalPage,
         currentPage:1  
       }   
     });
        setAddindexfac(1);
       setLFA(res.data.managefacilites);
 

  console.log(searchfac);
 })
 .catch(err=>{
 console.log(err);
 })
 
 
 }
 
 
 
     };
 
  const getLocation=()=>{
    
    Axios.post("locationFacilityAmenities",{perpage:10,page:1,search:searchfac.seachnewfac})
    .then(res =>{
    console.log("locationFacilityAmenities")
      console.log("locationFacilityAmenities");
      console.log(res.data);
       setPaginationfac((preValue)=>{
      return { 
        perPage:10,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:1  
      }   
    });
       setAddindexfac(1);
      setLFA(res.data.managefacilites);



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
      Axios.post("facilityadminList",{perpage:10,page:1,search:search.seachnew})
      .then(res =>{
       console.log("api location 4")
        console.log(res.data);
        setLoc();
        setLocEdit();
        
      
        setLocationforfacility(res.data.locresponseforadd);
      
    
      })
      .catch(error=>{
        console.log("not found");
      });
    }

    if(newValue==3){
      console.log("Manage");

      getLocation();

    }
    setValue(newValue);
  };



  const viewData =(location)=>{

  
    setLFAview([]);

   

      Axios.post("locationFacilityAmenitiesView",{location:location.locationName})
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
       console.log("edit Data");

     console.log(data);
    console.log(data.fromDate);
    // console.log(data.locationName);
    getLocation();
    getFacilities();
    // let a = data.locationName;
    console.log(data.loc_id);
    console.log(data.locationName);
    setLocEdit({
      "location_id": data.loc_id,
      "location": data.locationName,
      "locationName": data.locationName
    });
    setLocationforfacility([{
      "location_id": data.loc_id,
      "location": data.locationName,
      "locationName": data.locationName
    }]);
setDatefomt(data.fromDate);
let start = new Date(data.fromDate);
                  let to = new Date(data.toDate);
                  let l =[start,to];
                   setdateValue(l);

  setAddFacility(data.totalcountfacility);
   console.log(l);
   console.log(datevalue);
 



var arrfac = data.allFacilitiesid.split(",").map(item => item.trim());
var numberArray = [];
 for(var i = 0, length = arrfac.length; i < length; i++) {
  

      numberArray.push(parseInt(arrfac[i]));
  }
  console.log(numberArray[0]);
  // selectFac1(1);
  getFacilities1(numberArray,data.is_unavailable,data.is_onlyweekend);
      
 



  

    setValue(2);
    
   
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
  const [locationforfacility,setLocationforfacility]= useState([]);
  const [locationAdmin,setLocationAdmin]= useState([]);
  const [LocationAdminList,setLocationAdminList]= useState([]);
  const [LocationAdminsave,setLocationAdminsave]= useState([]);
const [LocationAdminnamesave,setLocationAdminnamesave]= useState([]);
  const [facilities,setFacilities]= useState([]);
  const [admin,setAdmin]= useState({locationAdmin:[],locations:[]});
  const [pagination,setPagination] = useState({perPage:10,totalCount:0,totalPage:1,currentPage:1});
    const [paginationfac,setPaginationfac] = useState({perPage:10,totalCount:0,totalPage:1,currentPage:1})

  const textInput = useRef(null);
  const [editlocation,setEditLocation]= useState([]);
  const [editadminName,setEditAdminName]= useState([]);
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


const [faclitityevent,setFaclitityevent]=useState({
firstname:"",
lastname:"",
email:"",
password:"",
id:"", 

    
error_firstname:1,
error_lastname:1,
error_email:1,
error_password:1,
error_id:1, 

err:0,
    // authorized:
  });
  const inputEvent =(event)=> {
    console.log(event.target.name);
    console.log(event.target.value);
    console.log(event.target.checked);
   console.log(event);
    setFaclitityevent((preValue)=>{
       if(event.target.name==='firstname'){
        return {   
        firstname:event.target.value,
        lastname:preValue.lastname,
        email:preValue.email,
        password:preValue.password,
        id:preValue.id, 
        
            
        error_firstname:0,
        error_lastname:preValue.error_lastname,
        error_email:preValue.error_email,
        error_password:preValue.error_password,
        error_id:preValue.error_id, 
        
        err:preValue.err,
        };
       }

       if(event.target.name==='lastname'){
        return {   
        firstname:preValue.firstname,
        lastname:event.target.value,
        email:preValue.email,
        password:preValue.password,
        id:preValue.id, 
        
            
        error_firstname:preValue.error_firstname,
        error_lastname:0,
        error_email:preValue.error_email,
        error_password:preValue.error_password,
        error_id:preValue.error_id, 
        
        err:preValue.err,
        };
       }


       if(event.target.name==='email'){
        return {   
        firstname:preValue.firstname,
        lastname:preValue.lastname,
        email:event.target.value,
        password:preValue.password,
        id:preValue.id, 
        
            
        error_firstname:preValue.error_firstname,
        error_lastname:preValue.error_lastname,
        error_email:0,
        error_password:preValue.error_password,
        error_id:preValue.error_id, 
        
        err:preValue.err,
        };
       }

       if(event.target.name==='password'){
        return {   
        firstname:preValue.firstname,
        lastname:preValue.lastname,
        email:preValue.email,
        password:event.target.value,
        id:preValue.id, 
        
            
        error_firstname:preValue.error_firstname,
        error_lastname:preValue.error_lastname,
        error_email:preValue.error_email,
        error_password:0,
        error_id:preValue.error_id, 
        
        err:preValue.err,
        };
       }

      

     

      
     



      })
    }





















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
  
  // console.log(e.target);
// alert("setLocationAddFacility");
  // console.log(typeof(v.inputProps.value));
 
  setLoc(e.target.innerHTML);
  let text = e.target.innerHTML;
  let result =text.includes("path");
  console.log(text.includes("path"));
  // setLoc(e.target.innerHTML);
// alert("setLocationAddFacility");
  // console.log(typeof(v.inputProps.value));
 if(result===true){
   
  setLoc();
 }else{
  setLoc(e.target.innerHTML);
 }


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
var newa = new Array();
const inputEventLocation =(v)=> {
  console.log(v);
console.log(v.target.innerHTML);
a = v.target.innerHTML;
if(a!=undefined){
  newa.push(a);
  LocationAdminsave.push(a);
  Axios.post("locationadminlist",{location:a})    
.then(res =>{
 console.log(res.data);

  setLocationAdminList(res.data);

 console.log(search);
})
.catch(err=>{
console.log(err);
});
}
console.log(LocationAdminsave);

setLocationAdminsave(LocationAdminsave);
}



const inputEventEmpSerach =(event)=> {
  setSearch({seachnew:event.target.value});
   console.log({perpage:10,page:1,search:event.target.value}) ;   
  if(event.target.name==="search-form"){
    Axios.post("facilityadminList",{perpage:10,page:1,search:event.target.value})    
.then(res =>{
 console.log(res.data);
 setPagination((preValue)=>{
      return { 
        perPage:10,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:1 
      }   
    });
    // setLocation(res.data.response);
    setLocationAdmin(res.data.locationdeta);
//  setLocationAdminList(res.data.totalsub);

 console.log(search);
})
.catch(err=>{
console.log(err);
})


}



    };

var adm;
var newaad = new Array();
const inputEventAdmin =(v)=>{
  // console.log("Change Location");
  adm =v.target.innerHTML;
  if(adm!=undefined){
     newaad.push(adm);
 LocationAdminnamesave.push(adm);
}
setLocationAdminnamesave(LocationAdminnamesave);
console.log(newaad);
}
const deleteAdmin=(emp_id)=>{



// console.log(adm);
//  setAdmin({locationAdmin:adm,locations:a});

Axios.post("deleteLocationAdmin",{emp_id:emp_id,deleted_by:a3.applicant_id})
.then(res =>{
 console.log("api location");
  console.log(res.data);

  Axios.post("facilityadminList",{perpage:10,page:1,search:search.seachnew})
  .then(res =>{
   console.log("api location 4")
    console.log(res.data);
   

    setPagination((preValue)=>{
      return { 
        perPage:10,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:1 
      }   
    });
    // setLocation(res.data.response);
    setLocationAdmin(res.data.locationdeta);
//  setLocationAdminList(res.data.totalsub);

  })
  .catch(error=>{
    console.log("not found");
  });
      setValue(1);
  
    setAlertsuccess((preValue)=>{
      return {    
             
          Alertsuccess_err:1,  
          Alertsuccess_message:'Location admin deleted  successfully ',   
             
          
             
               };
      });
      setShowalertsuccess(true);
  // console.log(res.data.response);
  // setLocation(res.data.response);
  // setLocationAdmin(res.data.locationAdmin);
})
.catch(error=>{
  console.log("not found");
}); 
  }


const assignLocationAdmin=()=>{

 
    console.log(LocationAdminsave);
     console.log(LocationAdminnamesave);
  if( faclitityevent.error_firstname != 0 || faclitityevent.error_lastname != 0 || faclitityevent.error_email != 0 || faclitityevent.error_password != 0){
   setFaclitityevent((preValue)=>{
      return {    
             
       firstname:preValue.firstname,
        lastname:preValue.lastname,
        email:preValue.email,
        password:preValue.password,
        id:preValue.id, 
        
            
        error_firstname:preValue.error_firstname,
        error_lastname:preValue.error_lastname,
        error_email:preValue.error_email,
        error_password:preValue.error_password,
        error_id:preValue.error_id, 
        
        err:2,   
          
             
               };
      });
      
   
    return 0;
  }else{
 


 console.log({facadmin:faclitityevent});

//  setAdmin({locationAdmin:adm,locations:a});

Axios.post("assignLocationAdmin",{facadmin:faclitityevent})
.then(res =>{
 console.log("api faciltyadmin");
  console.log(res.data);
 if(res.data.status=='Success'){
     Axios.post("facilityadminList",{perpage:10,page:1,search:search.seachnew})
  .then(res =>{
   console.log("api location 4")
    console.log(res.data);


    setPagination((preValue)=>{
      return { 
        perPage:10,
        totalCount:res.data.pagination.totalCount,
        totalPage:res.data.pagination.totalPage,
        currentPage:1  
      }   
    });
    // setLocation(res.data.response);
    setLocationAdmin(res.data.locationdeta);
//  setLocationAdminList(res.data.totalsub);

  })
  .catch(error=>{
    console.log("not found");
  });
      setValue(1);
     
      setFaclitityevent((preValue)=>{
 return {    
             
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            id:"", 

                
            error_firstname:1,
            error_lastname:1,
            error_email:1,
            error_password:1,
            error_id:1, 

            err:0,
                    
                        
             
               };

         });
      setAlertsuccess((preValue)=>{
        return {    
               
            Alertsuccess_err:1,  
            Alertsuccess_message:'Facility Admin saved  successfully ',   
               
            
               
                 };
        });
        setShowalertsuccess(true);
   }else{
   setAlerterr((preValue)=>{
      return {    
             
        Alerterr_err:1,  
        Alerterr_message:res.data.message,   
             
          
             
               };
      });
      setShowalert(true);
      
   }
 
    

})
.catch(error=>{
  console.log("not found");
});  
  }



}

const editAdmin=(post)=>{

     setFaclitityevent((preValue)=>{
 return {    
             
            firstname:post.firstName,
            lastname:post.lastName,
            email:post.email,
            password:post.password,
            id:post.sub_admin_id,

                
            error_firstname:0,
            error_lastname:0,
            error_email:0,
            error_password:0,
            error_id:0, 

            err:0,
                    
                        
             
               };
    });

setValue(0);
  }
  

const perpageList =(co)=>{
console.log(co);
}


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


Axios.post("locationFacilityAmenities",{perpage:paginationfac.perPage,page:a,search:searchfac.seachnewfac})
.then(res =>{

  console.log("locationFacilityAmenities")
      console.log("locationFacilityAmenities");
      console.log(res.data);
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
      setLFA(res.data.managefacilites);


})
.catch(error=>{
  console.log("not found");
});




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


Axios.post("facilityadminList",{perpage:pagination.perPage,page:a,search:search.seachnew})
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
  // setLocation(res.data.response);
  setLocationAdmin(res.data.locationdeta);

// setLocationAdminList(res.data.totalsub);
})
.catch(error=>{
  console.log("not found");
});




}

const UpdateLocationFacility =()=>{
 
  let start = 0;
  let end = 0;
if(sellectonlyweek==0 || sellectonlyweek==false){
  if(! datevalue|| !datevalue[0] || !datevalue[1] ){
    setAlerterr((preValue)=>{
      return {    
             
        Alerterr_err:1,  
        Alerterr_message:'Please select Start and End date ',   
             
          
             
               };
      });
      setShowalert(true);
 
    return 0;
  }else{
     
    
    start = dateFormat(datevalue[0]);
     end = dateFormat(datevalue[1]);
  }
}


  if(!loc){
    setAlerterr((preValue)=>{
      return {    
             
        Alerterr_err:1,  
          Alerterr_message:'Please select a location  ',   
             
          
             
               };
      });
      setShowalert(true);
 
    return 0;
  }
if(addFacility==0){
  setAlerterr((preValue)=>{
    return {    
           
      Alerterr_err:1,  
        Alerterr_message:'Please select a units Available  ',   
           
        
           
             };
    });
    setShowalert(true);

    return 0;
}
var lenatherr=theArray.length;

if(lenatherr==0){
  setAlerterr((preValue)=>{
    return {    
           
      Alerterr_err:1,  
      Alerterr_message:'Please select a facilities ',   
           
        
           
             };
    });
    setShowalert(true);
   
    return 0;
}

if(sellectall){

console.log({count:addFacility,allAmenities:theArray,start:start,end:end,loc:loc,allweek:sellectallweek,onlyweek:sellectonlyweek});

  // value={value} onChange={handleChange}
  console.log(loc);
  Axios.post("updateLocationFacilityOnly",{count:addFacility,allAmenities:theArray,start:start,end:end,loc:loc,allweek:sellectallweek,onlyweek:sellectonlyweek})
    .then(res =>{
     console.log("api location 3")
      console.log(res.data);
      getLocation();
      setTheArray([]);
      setAddFacility(0);
      setdateValue([null, null]);
      setLoc();
      setSelectAllweek(0);
      setSelectOnlyweek(0);
      setLocEdit();
      getFacilities();
      setSelectAll(0);
      setValue(3);
      setAlertsuccess((preValue)=>{
        return {    
               
            Alertsuccess_err:1,  
            Alertsuccess_message:'Facilities set up successfully ',   
               
            
               
                 };
        });
        setShowalertsuccess(true);
 


    });

}else{

  if(addFacility){

    console.log(loc);
    console.log(theArray);
    console.log(addFacility);
    Axios.post("updateLocationFacilityOnly",{count:addFacility,allAmenities:theArray,start:start,end:end,loc:loc,allweek:sellectallweek,onlyweek:sellectonlyweek})
    .then(res =>{
     console.log("ADD FACILITY")
      console.log(res.data);
      getLocation();
      setTheArray([]);
      setAddFacility(0);
      setdateValue([null, null]);
      setLoc();
      setSelectAllweek(0);
      setSelectOnlyweek(0);
      setSelectAll(0);
      setLocEdit();
      getFacilities();
      setValue(3);
      setAlertsuccess((preValue)=>{
        return {    
               
            Alertsuccess_err:1,  
            Alertsuccess_message:'Facilities set up successfully ',   
               
            
               
                 };
        });
        setShowalertsuccess(true);

    });


}else{
  Axios.post("updateLocationFacility",{addAmenities:theArray,start:start,end:end,loc:loc,allweek:sellectallweek,onlyweek:sellectonlyweek})
  .then(res =>{
   console.log("api location 3")
    console.log(res.data);
    getLocation();
    setTheArray([]);
    setAddFacility(0);
    setdateValue([null, null]);
    setLoc();
    setSelectAllweek(0);
    setSelectOnlyweek(0);
    setSelectAll(0);
    setLocEdit();
    getFacilities();
    setValue(3);
    
    setAlertsuccess((preValue)=>{
      return {    
             
          Alertsuccess_err:1,  
          Alertsuccess_message:'Facilities set up successfully ',   
             
          
             
               };
      });
      setShowalertsuccess(true);
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
   
    var elements = document.getElementsByClassName('checkall');
var theArraynew=new Array();
    for(var i = 0, length = elements.length; i < length; i++) {
     if(value== true){

         elements[i].checked=true;
         let a = facilities.map(item => {
          var temp = Object.assign({}, item);
          if (1) {
              temp.isSelect = true;
             
          }
          return temp;
      });
      
      console.log(facilities);
      console.log(a);
      setFacilities(a);
     }else{
      elements[i].checked=false;
      let a = facilities.map(item => {
        var temp = Object.assign({}, item);
        if (1) {
            temp.isSelect = false;
        }
        return temp;
    });

    
    console.log(facilities);
    console.log(a);
    setFacilities(a);
     }
      
   }
    let l = facilities.map(item => {
        var temp = Object.assign({}, item);
       if(value== true){
            theArraynew.push({ facilityid: temp.id });
        }
        return temp;
    });


   console.log(theArraynew);
    console.log(value);
    console.log(loc);
 setTheArray(theArraynew);
       
    setSelectAll(value);


    



}

const applicant_id1 = useSelector((state) => state.todoReducer3.applicant_id);
const a3 = useSelector((state) => state.todoReducer3);

useEffect(() => {

  console.log("api location details");

   console.log(a3);
  Axios.post("facilityadminList",{perpage:10,page:1,search:search.seachnew})
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
    // setLocation(res.data.response);
    // setLocationforfacility(res.data.locresponseforadd);
    setLocationAdmin(res.data.locationdeta);
//  setLocationAdminList(res.data.totalsub);

  })
  .catch(error=>{
    console.log("not found");
  });


},[]);


useEffect(() => {
/* Reset */
// alert("change loc = "+loc);

  // setdateValue([null,null]);
  setAddAmenities([]);
},[loc]);


useEffect(() => {

  console.log("use effect");
  // console.log(updatelocation);

// setLocation(updatelocation);

console.log(location);
  },[updatelocation]);

const selectFac1=(d)=>{
  
  let b = document.getElementById("fac"+d).checked;
   console.log("single new checkb");
 console.log(d);

if(b== false){
  setSelectAll(false);
document.getElementById('sall').checked=false;

}

// let a = facilities.map(item => {
//     var temp = Object.assign({}, item);
//     if (temp.id === d) {
//       console.log(b);
//       if(b== true){
//       theArray.push({ facilityid: data.id });
//       }if(b== false){
        
//         theArray.splice(theArray.indexOf(data.id), 1);
     
//         setTheArray(theArray);
       
        
//         }
        
     
//         temp.isSelect = b;
//     }
//     return temp;
// });
console.log("tempfacility id");
// console.log(theArray);
// console.log(facilities);
// console.log(a);

// setFacilities(a);


}
const handleFocus = (event) => event.target.select();
const handleFocusforfaciltiy = (event) => event.target.select();
const inputEventEmppagexcahnge =(event)=> {

  
  console.log(pagination.totalPage) ;  
  if(pagination.totalPage>=event.target.value){
    if(event.target.name==="namepageadmin" && event.target.value!=''){
      var pagnoforadmin=event.target.value;
     console.log(pagnoforadmin) ; 
      Axios.post("facilityadminList",{perpage:10,page:pagnoforadmin,search:search.seachnew})    
   .then(res =>{
   console.log(res.data);
   setPagination({ perPage:10,
          totalCount:res.data.pagination.totalCount,
          totalPage:res.data.pagination.totalPage,
          currentPage:parseInt(pagnoforadmin) }   
      );
   
      // setLocation(res.data.response);
      setLocationAdmin(res.data.locationdeta);
   //  setLocationAdminList(res.data.totalsub);
   console.log(parseInt(pagnoforadmin)) ; 
   console.log({ perPage:10,
     totalCount:res.data.pagination.totalCount,
     totalPage:res.data.pagination.totalPage,
     currentPage:parseInt(pagnoforadmin) } );
   
   })
   .catch(err=>{
   console.log(err);
   })
   
   
   }else{
     var pagnoforadmin=1;
     console.log(pagnoforadmin) ; 
      Axios.post("facilityadminList",{perpage:10,page:pagnoforadmin,search:search.seachnew})    
   .then(res =>{
   console.log(res.data);
   setPagination({ perPage:10,
          totalCount:res.data.pagination.totalCount,
          totalPage:res.data.pagination.totalPage,
          currentPage:1 }   
      );
   
      // setLocation(res.data.response);
      setLocationAdmin(res.data.locationdeta);
   //  setLocationAdminList(res.data.totalsub);
   
   
   })
   .catch(err=>{
   console.log(err);
   })
   
   
   
   }
   
  }
 
  

   };
   const inputEventfacpagexcahnge =(event)=> {

  
    console.log(paginationfac.totalPage) ;  
    if(paginationfac.totalPage>=event.target.value){
      if(event.target.name==="namepagefac" && event.target.value!=''){
        var pagnoforadmin=event.target.value;
       console.log(pagnoforadmin) ; 
        Axios.post("locationFacilityAmenities",{perpage:10,page:pagnoforadmin,search:searchfac.seachnewfac})    
     .then(res =>{
     console.log(res.data);
     setPaginationfac({ perPage:10,
      totalCount:res.data.pagination.totalCount,
      totalPage:res.data.pagination.totalPage,
            currentPage:parseInt(pagnoforadmin) }   
        );
        setLFA(res.data.managefacilites);
  

     
     })
     .catch(err=>{
     console.log(err);
     })
     
     
     }else{
       var pagnoforadmin=1;
       console.log(pagnoforadmin) ; 
       Axios.post("locationFacilityAmenities",{perpage:10,page:pagnoforadmin,search:searchfac.seachnewfac})       
     .then(res =>{
     console.log(res.data);
     setPaginationfac({ perPage:10,
      totalCount:res.data.pagination.totalCount,
      totalPage:res.data.pagination.totalPage,
        currentPage:parseInt(pagnoforadmin) }   
    );
    setLFA(res.data.managefacilites);
     
     
     })
     .catch(err=>{
     console.log(err);
     })
     
     
     
     }
     
    }
   
    
  
     };
const selectFac=(data)=>{
  
  let b = document.getElementById("fac"+data.id).checked;
   console.log("single checkb");
 console.log(data);

if(b== false){
  setSelectAll(false);
document.getElementById('sall').checked=false;

}

let a = facilities.map(item => {
    var temp = Object.assign({}, item);
    if (temp.id === data.id) {
      console.log(b);
      if(b== true){
      theArray.push({ facilityid: data.id });
      }if(b== false){
        console.log({ facilityid: data.id });
        const index = theArray.findIndex(object => {
  return object.facilityid === data.id;
});
        console.log(index);
         theArray.splice(index,1);
     
        setTheArray(theArray);
       
        
        }
        
     
        temp.isSelect = b;
    }
    return temp;
});

console.log("tempfacility id");
console.log(theArray);
 setTheArray(theArray);
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
        
  if(a3.applicant_info.type!=='admin' &&  a3.applicant_info.type!=='globaladmin'){
    return <Redirect to={`/`} />;
  }

}else{
  return <Redirect to={`/`} />;
}



const sitebar1= {
  backgroundColor : '#ffc200 ',
    color: '#ffffff'
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
          <Tab label="Add Facility Admin"  />
          <Tab label="Manage Facility Admin"   style={{marginLeft: '95px'}}/>
         {/* <Tab label="Add Facilites"  style={{marginLeft: '95px'}} />
          <Tab label="Manage Facilites" style={{marginLeft: '95px'}} />
*/}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div class="row">
                        <div class="col-md-12">
                          <div class="set-number-sec " style={{marginLeft:'0px'}}>
                            
                              <div class="row">
                              <div class="col-md-3">
<div class="form__group_new">
                          <input type="text" id="bsm-name" class="form__field_new" placeholder="First Name" 
       name="firstname"  style={{border:'none',borderBottom:'1px solid #d1d1d1',outline:'none',paddingLeft:'3px'}} value={faclitityevent.firstname} onChange={inputEvent} />
                          <label for="bsm-name" class="form__label_new">First Name<span style={{color:'red',position:'relative'}}>*</span></label>
                          {(faclitityevent.error_firstname === 1 && faclitityevent.err===2) &&  <span style={{color:"red",fontSize:"13px",fontWeight:"600",textAlign:"left",position:"relative",display:"block",paddingTop:"4px"}}>Please Enter First Name</span> }
                        </div>
                        </div>

                        <div class="col-md-3">
                             
     
                             {/* <p class="label-profile" style={{fontFamily:'IBM Plex Sans',color:'#707070',fontSize:'17px',fontWeight:'500'}}>Last Name<span style={{color:'red',position:'relative'}}>*</span>
                             <input type="text" placeholder="" 
                              name="lastname"  style={{border:'none',borderBottom:'1px solid #d1d1d1',outline:'none'}} value={faclitityevent.lastname} onChange={inputEvent}  /></p>
                             {(faclitityevent.error_lastname === 1 && faclitityevent.err===2) &&  <span style={{color:'red',fontSize:'13px',fontWeight:'600',marginLeft:'-125px'}}>Please Enter Last Name</span> }
                           */}
                       
                       <div class="form__group_new">
                                                 <input type="text" id="last-name" class="form__field_new" placeholder="last Name" 
                              name="lastname"   style={{border:'none',borderBottom:'1px solid #d1d1d1',outline:'none',paddingLeft:'3px'}} value={faclitityevent.lastname} onChange={inputEvent} />
                                                 <label for="last-name" class="form__label_new">Last Name<span style={{color:'red',position:'relative'}}>*</span></label>
                                                 {(faclitityevent.error_lastname === 1 && faclitityevent.err===2) &&  <span style={{color:"red",fontSize:"13px",fontWeight:"600",textAlign:"left",position:"relative",display:"block",paddingTop:"4px"}}>Please Enter Last Name</span> }
                             </div>
                           </div>
                           <div class="col-md-3">
                             
                             {/*      
                                   <p class="label-profile" style={{fontFamily:'IBM Plex Sans',color:'#707070',fontSize:'17px',fontWeight:'500'}}>Email<span style={{color:'red',position:'relative'}}>*</span>
                                      <br></br>
                                   <input type="text" placeholder="" 
                                    name="email"  style={{border:'none',borderBottom:'1px solid #d1d1d1',outline:'none'}} value={faclitityevent.email} onChange={inputEvent}/></p>
                                        {(faclitityevent.error_email === 1 && faclitityevent.err===2) &&  <span style={{color:'red',fontSize:'13px',fontWeight:'600',marginLeft:'-125px'}}>Please Enter Email</span> }
                                 */}
                             <div class="form__group_new">
                             <input type="text" id="email-id" class="form__field_new" placeholder="Email id" name="email"   style={{border:'none',paddingLeft:'3px',borderBottom:'1px solid #d1d1d1',outline:'none'}} value={faclitityevent.email} onChange={inputEvent} />
                                                       <label for="email-id" class="form__label_new">Email id <span style={{color:'red',position:'relative'}}>*</span></label>
                                                       {(faclitityevent.error_email === 1 && faclitityevent.err===2) &&  <span style={{color:"red",fontSize:"13px",fontWeight:"600",textAlign:"left",position:"relative",display:"block",paddingTop:"4px"}}>Please Enter Email</span> }  
                                 </div>
                                 </div>
                                  <div class="col-md-3">
                                                          
                                  
                                   {/* <p class="label-profile" style={{fontFamily:'IBM Plex Sans',color:'#707070',fontSize:'17px',fontWeight:'500'}}>Password<span style={{color:'red',position:'relative'}}>*</span>
                                      <br></br><input type="text" placeholder="" 
                                    name="password"  style={{border:'none',borderBottom:'1px solid #d1d1d1',outline:'none'}} value={faclitityevent.password} onChange={inputEvent}/></p>
                                             {(faclitityevent.error_password === 1 && faclitityevent.err===2) &&  <span style={{color:'red',fontSize:'13px',fontWeight:'600',marginLeft:'-125px'}}>Please Enter Password</span> }
                                 */}
                                 <div class="form__group_new">
                             
                                 <input type="text" id="password" class="form__field_new" placeholder="Password" name="password"   
                                 style={{border:'none',borderBottom:'1px solid #d1d1d1',outline:'none',paddingLeft:'3px'}} value={faclitityevent.password} onChange={inputEvent} />
                                                       <label for="password" class="form__label_new">Password <span style={{color:'red',position:'relative'}}>*</span></label>
                                                       {(faclitityevent.error_password === 1 && faclitityevent.err===2) &&  <span style={{color:"red",fontSize:"13px",fontWeight:"600",textAlign:"left",position:"relative",display:"block",paddingTop:"4px"}}>Please Enter Password</span> } 
                             
                                 </div>
                                 </div>
    </div>

    <div class="col-md-12" style={{paddingLeft: '0px',paddingTop: '20px', display: 'block', position: 'relative', float:'left'}}>
                        <div class="btuton-sec" style={{float:'left',marginTop:'15px'}}>
                          <button type="button" onClick={assignLocationAdmin} class="btn btn-primary btn-add">Save</button>
                          <button type="button" onClick={()=>setValue(1)} class="btn btn-outline-primary btn-cancel">Cancel</button>
                      </div
>  
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
                <input type="search" class="search-data"  placeholder="Search..." aria-controls="example1"   id="search-form" value={search.seachnew}  name="search-form" style={{fontFamily: 'IBM Plex Sans',outline:'none'}} onChange={inputEventEmpSerach} /></label></div>
                  
            <table className="table table-bordered mg-b-0 text-center">
                <thead>
                  <tr className="heading-sec-table">
                    <th scope="col" style={{width:'250px'}}>Facilities Admin Name</th>
                    <th scope="col">Email</th>
                    <th>Password</th>
                    <th scope="col" style={{width:'150px'}}>Action</th>
                  </tr>
                </thead>
                <tbody class="tbody-color">

                
                {   locationAdmin.length >0 ? <>
                
                {   locationAdmin.map((post,index)=>(        
                  <tr>
                    <th scope="row">{post.firstName} {post.lastName}</th>
                    <td>{post.email}</td>
                    <td>{post.password} </td>
                   
                    <td>
                      
                    <a href="#" onClick={()=>editAdmin(post)}> <i class="fa fa-pencil view-class view-pencil" title="edit" style={{cursor:'pointer',marginRight: '10px'}} aria-hidden="true"></i></a>
                  {/*  <a href="#" onClick={()=>deleteAdmin(post.sub_admin_id)}><i class="fa fa-trash view-class view-delete" aria-hidden="true"></i>
                    </a> */}
                  
                    </td>
                  </tr>

                ))}
</> :
<>  <tr>
                 
                 <td colSpan={4}  >No Location Yet</td>
                  </tr></>
} 
                 
                </tbody>
              </table>
              <div className="dataTables_info" id="example2_info" role="status" aria-live="polite" style={{color:'#707070', fontSize: '15px'}}>Showing {(pagination.currentPage * pagination.perPage)-pagination.perPage +1} to {(pagination.currentPage * pagination.perPage)>pagination.totalCount?pagination.totalCount:pagination.currentPage * pagination.perPage} of {pagination.totalCount} entries</div>
              <div style={{width: 'auto', float: 'right', border: '1px solid #ccc', marginTop:'20px'}}>
                <div style={{float: 'left', padding: '5px 10px', background: '#f79e00', color: '#fff', fontSize: '14px'}}> Page {pagination.currentPage}<span> of </span> {pagination.totalPage} </div>
                <div  onClick={()=>callPagination('previouPage')}  style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '6px', marginLeft: '10px', color: '#f79e00'}}>&lt;</div>
                <span style={{float: 'left', fontSize: '14px', marginTop: '6px', marginLeft: '10px', color:'#707070;'}}>Go To</span>
                <input
                onChange={inputEventEmppagexcahnge} name="namepageadmin" id="namepageadmin" onClick={handleFocus} 
                value={pagination.currentPage} type="text" style={{color:'#707070', width: '31px', float: 'left', height: '22px', marginBottom: '0', textAlign: 'center', marginLeft: '4px', marginTop: '4px', border: '1px solid #f79e00'}} />


              <div onClick={()=>callPagination('nextPage')} style={{float: 'left', cursor: 'pointer', fontSize: '18px', lineHeight: '18px', marginTop: '8px', marginLeft: '10px', marginRight: '8px', color: '#f79e00'}}>&gt;</div>
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
                <span aria-hidden="true">×</span>
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
          <span aria-hidden="true">×</span>
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
<Modal show={showalert} onHide={handleClosealert} >
    <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '550px', marginTop: '50px'}}>
          <Modal.Header closeButton >
          </Modal.Header>
          <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>
  
              {(Alerterr.Alerterr_err === 1) &&<p style={{marginBottom: '0px',fontSize: '20px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#FF0000'}}>{Alerterr.Alerterr_message}</p> }
  
  
  <button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealert()}}>Click Here</button>
  
  </div>
  </div>
        
  </Modal> 

  <Modal show={showalertsuccess} onHide={handleClosealertsuccess} >
  <div class="bookingclose" style={{backgroundColor: '#ffffff', width: '620px', marginTop: '50px'}}>
        <Modal.Header closeButton >
        </Modal.Header>
        <div class="modal-body modal-body-apply modal-request" style={{padding:'22px 0px'}}>

            {(Alertsuccess.Alertsuccess_err === 1) &&<p style={{marginBottom: '0px',fontSize: '15px',lineHeight: '24px', width: '95%', margin:'0 auto', textAlign: 'center',color:'#007500'}}>{Alertsuccess.Alertsuccess_message}</p> }


<button class="btn-process btn-confirm btn-save" style={{float:'initial',marginTop:'15px',fontSize:'13px',padding:'8px 3px',marginBottom:'35px'}}  onClick={() => {handleClosealertsuccess()}}>Click Here </button>

</div>
</div>
      
</Modal>
</>
  );
}
