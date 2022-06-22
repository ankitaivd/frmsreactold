const initialState = {
    info:"",   
    status:"",
 
};


const reducerUser = (state=initialState, action)=>{
  // console.log("action:");
  // console.log(action);
  
  switch(action.type){
   
        case "USERDATA":  
        const {applicant_id,applicant_info} = action.payload;
        return {
          applicant_id,
          applicant_info
          
         
        }
          
          default: return state;
  }

}
export  default reducerUser;