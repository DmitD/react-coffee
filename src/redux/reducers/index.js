import { combineReducers } from 'redux';

import coffee from './coffee';
import filters from './filters';
import modal from './modal'


const rootReducer = combineReducers({
  coffee,
  filters,
  modal
});

export default rootReducer;