const initialState = {
  openedItem: {},
  isModalOpen: false,
};


const modal = (state = initialState, action) => {

  switch (action.type) {
    case 'MODAL_PRODUCT_OPEN':
      return {
        ...state,
        isModalOpen: true,
        openedItem: action.payload
      }
    case 'MODAL_PRODUCT_CLOSE':
      return {
        ...state,
        openedItem: {},
        isModalOpen: false
      }
    default:
      return state;
  }
}

export default modal;