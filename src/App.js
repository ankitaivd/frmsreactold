import React, { Component } from "react";
import {useSelector, useDispatch} from "react-redux";
import logo from './logo.svg';
import './App.css';
// import Login from './components/login';
import Home from './components/home';
import Facility from './components/facility';
import Header from './components/header';
import Footer from './components/footer';
import ViewFacility from './components/viewFacility';
import Signup from './components/signup';
import Booking from './components/booking';
import Profile from './components/profile';
import AdminHome from './components/admin/Home';
import GlobalAdminLogin from './components/locationadmin/AdminLogin';
import Terms  from './components/Terms';
import ResetPassword from './components/ResetPassword';
import AdminHeader from './components/admin/Header';
import AdminHeaderNew from './components/admin/Headernew';
import Viewenquiries from './components/admin/Viewenquiries';
import Applicationstatus from './components/admin/Applicationstatus';
import Viewdetails from './components/admin/Viewdetails';
import Applicationstatusdetails from './components/admin/Applicationstatusdetails';
import Facilityadmin from './components/admin/Facilityadmin';


import BookingCalender from './components/admin/BookingCalender';
import BookingList from './components/admin/BookingList';
import BookingDetails from './components/admin/BookingDetails';

import Requestordetails from './components/admin/Requestordetails';
import Createestimate from './components/admin/Createestimate';
import Previewpage from './components/admin/Previewpage';
import Locationadmin from './components/admin/Locationadmin';
import Locationviewdetails from './components/admin/Locationviewdetails';
import AdminLogin from './components/admin/Login';
import LocationAdminLogin from './components/locationadmin/Login';

// import AdminViewdetails from './component/admin/Viewdetails';
// import AdminRequestordetails from './component/admin/Requestordetails';
// import AdminCreateestimate from './component/admin/Createestimate';
// import AdminError from './component/admin/Error'
// import AdminHeader from './component/admin/Header'

import NotFound from './components/notFound';

// import AddUser from './components/admin/addUser';
// import ManageUser from './components/admin/manageUser';
// import AddLeave from './components/admin/addLeave';
// import LeaveStatus from './components/admin/leaveStatus';
// import Dashboard from './components/admin/dashboard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {

  const dispatch=useDispatch();
//  const name = useSelector((state) => state.todoReducer.name);
//  const empid = useSelector((state) => state.todoReducer.empid);
//  const email = useSelector((state) => state.todoReducer.email);
//  const type = useSelector((state) => state.todoReducer.type);  

  return (
    <div className="App">
       {/* <Router basename={'/frms'}> */}
       <Router basename={'/'}>
       <Switch>
                    {/* USER */}
                    {/* <Route path="/login"><Login/></Route> 
                    <Route path="/home"><Header/><Home/></Route>                   
                    <Route path="/mytask"><Header/><MyTask/></Route>                   
                    <Route path="/leavestatus"> */}
                      
                      { 
                      //type==='admin'?<AdminHeader/>:<Header/> 
                    }
                      
                      {/* <LeaceStatus/>
                      </Route>                    */}
                    {/* <Route path="/history"><Header/><History/></Route>   */}

                     {/* ADMIN */}
                    {/* <Route path="/dashboard"><AdminHeader/><Dashboard/></Route>                 
                    <Route path="/adduser"><AdminHeader/><AddUser/></Route>
                    <Route path="/manage"><AdminHeader/> <ManageUser/>  </Route>   
                    <Route exact path="/leave" component={AddLeave}/> 
                    <Route path="/leave/:id" component={AddLeave}/>  
                    <Route path="/leavestatus"><AdminHeader/> <LeaveStatus/>  </Route>    */}
                                 
                    
                    <Route path="/booking"><Header/><Booking/><Footer/></Route>
                    <Route path="/facility/:id"><Header/><Facility/><Footer/></Route>
                    {/* <Route path="/profile/:id"><Header/><Profile/><Footer/></Route> */}
                    <Route path="/profile" component={Profile} />
                    <Route path="/terms"><Header/><Terms/><Footer/></Route>
                 
                    
                    <Route path="/viewfacility/:id"><Header/><ViewFacility/><Footer/></Route>
                    <Route path="/confirm"><Header/><Signup/><Footer/></Route>
                  
                    
                    {/* <Route path="/admin"><AdminLogin/></Route> */}
                    <Route path="/home"><AdminHeader/><AdminHome/></Route>
                     <Route path="/Viewrequest"><AdminHeader/><Viewenquiries/></Route>
                    <Route path="/Applicationstatus"><AdminHeaderNew/><Applicationstatus/></Route>
                    <Route path="/Viewdetails"><AdminHeader/><Viewdetails/></Route>
                    <Route path="/Requestordetails"><AdminHeader/><Requestordetails/></Route>
                    <Route path="/Createestimate/:id"><AdminHeader/><Createestimate/></Route>
                    <Route path="/Previewpage/:id"><Previewpage/></Route>
                    <Route path="/Applicationstatusdetails"><AdminHeader/><Applicationstatusdetails/></Route>
                    <Route path="/admin"><LocationAdminLogin/></Route>
                     <Route path="/Facilityadmin"><AdminHeader/><Facilityadmin/></Route>
                    <Route path="/Locationadminview"><AdminHeader/><Locationadmin/></Route>
                    <Route path="/Locationviewdetails"><AdminHeader/><Locationviewdetails/></Route>
                    <Route path="/globaladmin"><GlobalAdminLogin/></Route>
                    <Route path="/BookingCalender"><AdminHeader/><BookingCalender/></Route>
                    <Route path="/ResetPassword/:id"><Header/><ResetPassword/><Footer/></Route>
                   <Route path="/BookingList"><AdminHeader/><BookingList/></Route>
                   <Route path="/BookingDetails"><AdminHeader/><BookingDetails/></Route>
                    <Route exact path="/"><Header/><Home/><Footer/></Route>
                    {/* <Route exact path="/" component={Home}></Route> 
                    <Route path="/Viewenquiries" component={Viewenquiries}></Route>
                    <Route path="/Applicationstatus" component={Applicationstatus}></Route>
                    <Route path="/Viewdetails" component={Viewdetails}></Route>
                    <Route path="/Requestordetails" component={Requestordetails}></Route>
                    <Route path="/Createestimate" component={Createestimate}></Route>
                    <Route component={Error} />*/}










                    <Route> <Header/><NotFound/><Footer/> </Route>
        </Switch>
            </Router>
    </div>
  );
}

export default App;
