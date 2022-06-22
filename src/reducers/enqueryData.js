const initialState = {
  id:"",   
   
 
};


const enqueryData = (state=initialState, action)=>{
  // console.log("action:");
  // console.log(action);
  
  switch(action.type){
     
        case "ENQUERYDATA":  
        const {id} = action.payload;
        return {
          id
         
        }
    
          default: return state;
  }

}
export  default enqueryData;