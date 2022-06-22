const initialState = {
    name:"",   
    empid:"",
    email:"",
    type:"",    
    err:'0',
    schoolFacility:"",
    location:'',
    schoolFacilitySelect:"",
     date:"",
     time:"",
     endtime:"",
     applicant_id:"",
     applicant_info:""
};


const todoReducer = (state=initialState, action)=>{
  // console.log("action:");
  // console.log(action);
  
  switch(action.type){
      case "ADD_TODO":
          const {name,empid,email,type,err} = action.payload;
         
          return {
            name,
            empid,
            email,
            type,
            err
          }
        case "abc":  
        return {
          name:"",
          empid:"",
          email:"",
          type:"",          
          err:0
         
        }
        case "BOOKING":  
        const {schoolFacility,location, schoolFacilitySelect, date,time,endtime,month,year  } = action.payload;
        return {
          schoolFacility,
          location,
          schoolFacilitySelect,
          date,
          time,
          endtime,
          month,
          year
         
        }
        case "FACILITY":  
        const {data } = action.payload;
        return {
        //  ...state.data,
        //   data
          // data: data

         
           
              
        }
        // case "FINAL":  
        // const {info,status} = action.payload;
        // return {
        //   info,
        //   status
         
        // }
        case "USERDATA":  
        const {user_id,user_info} = action.payload;
        return {
          user_id:user_id,
          user_info:user_info
          
         
        }
          
          default: return state;
  }

}
export  default todoReducer;