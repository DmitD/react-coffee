import { combineReducers } from 'redux';

import coffee from './coffee';
import filters from './filters';
import modal from './modal';
import cart from './cart';


const rootReducer = combineReducers({
  coffee,
  filters,
  modal,
  cart
});

export default rootReducer;