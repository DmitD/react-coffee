const initialState = {
  items: [],
  isLoader: false,
  isError: false,
};

const coffee = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_COFFEE':
      return {
        ...state,
        items: action.payload,
        isLoader: true,
      };

    case 'SET_LOADED':
      return {
        ...state,
        isLoader: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default coffee;