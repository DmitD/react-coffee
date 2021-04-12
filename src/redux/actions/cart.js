export const addItemToCart = (itemObj) => ({
  type: 'ADD_ITEM_TO_CART',
  payload: itemObj
});

export const plusCartItem = ({ id, weight }) => ({
  type: 'PLUS_CART_ITEM',
  payload: { id, weight }
});

export const minusCartItem = ({ id, weight }) => ({
  type: 'MINUS_CART_ITEM',
  payload: { id, weight }
});

export const removeCartItem = ({ id, weight }) => ({
  type: 'REMOVE_CART_ITEM',
  payload: { id, weight }
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});