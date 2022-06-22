import axios from 'axios';
// const Axios = axios.create({
//     baseURL: 'http://demo.ivdisplays.net/leaveback/',
//   });
export const facility  = (data)=>{

//   const a=Axios.post('api/login_log',{        
//         employee_id:data.empid        
//       })
 
    return {
        type:'FACILITY',
        payload:{
           // id:new Date().getTime().toString(),
           data:data
            
        }
    }
}






