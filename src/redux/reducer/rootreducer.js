import { getProductsreducer } from "./reducer";
import {combineReducers} from "redux";

const rootreducers=combineReducers({
    getproductsdata:getProductsreducer
});
export default rootreducers;