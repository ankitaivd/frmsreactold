import axios from 'axios';

export const bookingData  = (id,detailsBookings)=>{

//   const a=Axios.post('api/login_log',{        
//         employee_id:data.empid        
//       })
// alert("user info");
// alert(data.user_id);
 
    return {
        type:'BOOKINGDATA',
        payload:{
           // id:new Date().getTime().toString(),
           id:id,
           booking:detailsBookings            
        }
    }
}






