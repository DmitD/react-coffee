export const openModalProduct = (itemId) => ({
  type: 'MODAL_PRODUCT_OPEN',
  payload: itemId
});

export const closeModalProduct = () => ({
  type: 'MODAL_PRODUCT_CLOSE',
});
