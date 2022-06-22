const initialState = {
    info:"",   
    status:"",
 
};


const reducer2 = (state=initialState, action)=>{
  // console.log("action:");
  // console.log(action);
  
  switch(action.type){
     
        case "FINAL":  
        const {info,status} = action.payload;
        return {
          info,
          status
         
        }
    
          default: return state;
  }

}
export  default reducer2;