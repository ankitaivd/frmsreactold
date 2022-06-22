import axios from 'axios';
const Axios = axios.create({
    baseURL: 'http://demo.ivdisplays.net/leaveback/',
  });
export const addTodo  = (data)=>{
   
   

  const a=Axios.post('api/login_log',{        
        employee_id:data.empid        
      })
    
    return {
        type:'ADD_TODO',
        payload:{
           // id:new Date().getTime().toString(),
            name:data.name,
            empid:data.empid,
            email:data.email,
            type:data.type,
            err:data.err
        }
    }
}






