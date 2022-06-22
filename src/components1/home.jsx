import React,{useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
// import { Redirect, Route } from "react-router";

// import { addTodo } from "../actions/index";
import axios from 'axios';
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
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
const  Home =()=> {
  const [login,setLogInfo]=useState({
    name:"",
    empid:"",
    email:"",
    type:"",
    err:'0',
  });

  const Axios = axios.create({
    baseURL: process.env.REACT_APP_ENV_URL   
  });
//   const location = useLocation();
  const [facilities, setFacilities] = useState([]);
//   const handleHalfClose = () => setHalfShow(false);
//   const handleHalfShow = () => setHalfShow(true);


//   const dispatch=useDispatch();


//   const name = useSelector((state) => state.todoReducer.name);
//   const empid = useSelector((state) => state.todoReducer.empid);
//   const type = useSelector((state) => state.todoReducer.type);
  
  useEffect(() => {


     Axios.post("getAllFacility")
    .then(res =>{
      console.log("request");
      console.log(res.data.response);
      
      setFacilities(res.data.response);
    
    });
   
    // Axios.post("getAllFacility",{empid:empid})
    // .then(res =>{
    //   console.log("request");
    //   console.log(res.data.data);
      
    //   setHeader({time:res.data.data.time});
    
    // });
    
 

    },[]);
   

        
        
        // if (!type) return <Redirect to="/login" />;
 
        
        // const type = useSelector((state) => state.todoReducer.type);

        // if (type==='admin') return <Redirect to="/dashboard" />;
        //   else if(type==='participant' || type=== 'wpadmin') return <Redirect to="/home" />;
        //   else  return <Redirect to="/" />;
        


        return (
        <React.Fragment>



    <div class="multiple-school mutiple-facility">
    <div class="container">     
        <div class="row">
          <div class="col-md-12">
           </div>      

            
          <div class="col-sm-12">
 <div class="sort-by-section">

  <a href="#" class="sort-date" data-toggle="modal" data-target="#basicModal">Sort by Date</a>
 
            </div>
            <p class="para-more">Spaces for all your community needs </p>
              </div>
               
              {   facilities.map((post,index)=>(
                <>



                
{(index === 4 ? 
  (    <div class="col-sm-4 col-md-4" style={{marginTop: '20px',paddingLeft: '0px',paddingRight: '0px'}}>
                        
  <div class="content content-bg">
    <a href="#" target="_blank" style={{textDecoration: 'none'}}>
      
      <img class="content-image" />
      <div class="content-details">
        <h3 class="content-titles ">FRMS</h3>
        <img src="./image/arrow.png" class="img-content"/>
        
      </div>
    </a>
 
</div>
</div>) 
  : ('') 
)}
                    <div class="col-sm-4 col-md-4">
                        
                            <div class="content">
                              <a  target="_blank" style={{textDecoration: 'none'}}>
                                <div class="content-overlay"></div>
                                <img class="content-image" src="./image/audi-libert.jfif"/>
                                <div class="content-details">
                                  <h3 class="content-title">{post.type}</h3>
                                  {/* <p class="content-text">Liberty High School</p>                                   */}
                                 <Link to={`/facility/${post.id}`}> <a  class="btn-view" style={{textDecoration: 'none'}}>View</a></Link>
                                </div>
                                <div class="img-sample" style={{bottom: '0px'}}><span>SAMPLE PHOTO {index}</span></div>
                              </a>
                           
                          </div>
                    </div>


</>
 ))
}
                    

              

          


   







              
                
           
          
          
        </div>
      </div>
    </div>

</React.Fragment>
        
        
        )
    

  
}

export default Home;