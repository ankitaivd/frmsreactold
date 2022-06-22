
import todoReducer from "./calculationa";
import todoReducer2 from "./reducer2";
import todoReducer3 from "./reducerUser";
import todoReducer4 from "./siteData";
import todoReducer5 from "./enqueryData";
import { combineReducers } from "redux";
const rootReducer = combineReducers({   
    todoReducer,
    todoReducer2,
    todoReducer3,
    todoReducer4,
    todoReducer5,
});
export default rootReducer;