import React, {useState} from 'react'; 
import {Link} from 'react-router-dom';
// import '../../assetsAdmin/admincss/style1.css';
// import '../../assetsAdmin/admincss/dashforge.css';
// import '../../assetsAdmin/admincss/dashforge.dashboard.css';


const Header = () => {
  /*** for menu active start code */
  const [clicked, setClicked] = useState('');
  const [clicked1, setClicked1] = useState('');

const handleClick = () => {
  clicked ? setClicked('') : setClicked('active-tab');
  clicked1 ? setClicked1('') : setClicked1('');
  
};
const handleClick1 = () => {
  clicked1 ? setClicked1('') : setClicked1('active-tab');
  clicked ? setClicked('') : setClicked('');
  
};



  /*** for menu active start code */
  



/*** for menu active end code */
return (
  <React.Fragment>
   {/* <Link to="/">Home</Link>
   <Link to="/Viewenquiries">View Enquiries</Link>
   <Link to="/Applicationstatus">Application Status</Link> */}
   <header className="navbar navbar-header navbar-header-fixed">
      <a href="" id="mainMenuOpen" className="burger-menu"><i data-feather="menu"></i></a>
      <div className="navbar-brand">
        <Link to="/admin" className="df-logo"> <img src="../image/logo.png" /> </Link>
      </div>
      {/* <div id="navbarMenu" className="navbar-menu-wrapper">
        <div className="navbar-menu-header">
          <a href="#" className="df-logo"><img src="logo.svg"  alt="CoolBrand" /></a>
          <a id="mainMenuClose" href=""><i data-feather="x"></i></a>
        </div>
       
      </div> */}
      <div className="navbar-right">
       
      
        <div className="dropdown dropdown-notification dropdown-list">
         
            <ul>
              <li><Link to="/Viewenquiries" className={clicked || 'base-state' } onClick={handleClick}>View Enquiries</Link></li>
              <li><Link to="/Applicationstatus" className={clicked1 || 'base-state' } onClick={handleClick1}>Application Status</Link></li>
            </ul>

          
        
        </div>
        <div className="dropdown dropdown-profile">
          <a href="" className="dropdown-link" data-toggle="dropdown" data-display="static">
            <p className="avatar-name">John</p>
            <div className="avatar avatar-sm">
                <img src="https://via.placeholder.com/500" className="rounded-circle" alt="" /></div>
          </a>
          <div className="dropdown-menu dropdown-menu-right dropdown-top tx-13">
        

           
            <a href="#" className="dropdown-item dropdown-sign"><i className="fa fa-sign-out" aria-hidden="true"></i>
              Sign Out</a>
          </div>
        </div>
      </div>
      
    </header>
    </React.Fragment>
)
}
export default Header