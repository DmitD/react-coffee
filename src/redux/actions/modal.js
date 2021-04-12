export const openModalProduct = (item) => ({
  type: 'MODAL_PRODUCT_OPEN',
  payload: item
});

export const closeModalProduct = () => ({
  type: 'MODAL_PRODUCT_CLOSE',
});
