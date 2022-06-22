import axios from 'axios';

export const finalData  = (data)=>{

//   const a=Axios.post('api/login_log',{        
//         employee_id:data.empid        
//       })
// alert("action");
let a= '' ;
if(data.info){
  let a= 'submit' ;
}
 
    return {
        type:'FINAL',
        payload:{
           // id:new Date().getTime().toString(),
           info:data.info,
           status:a 
            
        }
    }
}






