/** root reducer */
import { combineReducers } from "redux";
import pageInfoSlice from "./slice/pageInfoSlice";

const rootReducer = combineReducers({
    pageInfo: pageInfoSlice,
});

export default rootReducer;


