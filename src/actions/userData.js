import axios from 'axios';

export const userData  = (data)=>{

//   const a=Axios.post('api/login_log',{        
//         employee_id:data.empid        
//       })
// alert("user info");
// alert(data.user_id);
 
    return {
        type:'USERDATA',
        payload:{
           // id:new Date().getTime().toString(),
           applicant_id:data.user_id,
           applicant_info:data.user_info            
        }
    }
}






