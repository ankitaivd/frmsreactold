const initialState = {
    info:"",   
    status:"",
 
};


const siteData = (state=initialState, action)=>{
  // console.log("action:");
  // console.log(action);
  
  switch(action.type){
     
        case "SITEDATA":  
        const {page} = action.payload;
        return {
         page
         
        }
    
          default: return state;
  }

}
export  default siteData;