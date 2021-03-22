import {combineReducers} from 'redux';

import coffee from './coffee';
import filters from './filters';


const rootReducer = combineReducers({
  coffee,
  filters
});

export default rootReducer;