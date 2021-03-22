import axios from 'axios';

export const fetchCoffee = (category, sortBy) => (dispatch) => {
  //const baseUrl = `http://localhost:3001/coffee`
  axios.get(
    `http://localhost:3001/coffee?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
    .then(({ data }) => {
      dispatch(setCoffee(data));
    })
};

export const setCoffee = (items) => ({
  type: 'SET_COFFEE',
  payload: items,
});