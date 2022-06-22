import axios from 'axios';

export const booking  = (data)=>{

//   const a=Axios.post('api/login_log',{        
//         employee_id:data.empid        
//       })
 
    return {
        type:'BOOKING',
        payload:{
           // id:new Date().getTime().toString(),
           schoolFacility:data.schoolFacility,
           location:data.location,
           schoolFacilitySelect:data.schoolFacilitySelect,
           date:data.date,
           endtime:data.endtime,
           time:data.time,
           month:data.month,
           year:data.year  
            
        }
    }
}






