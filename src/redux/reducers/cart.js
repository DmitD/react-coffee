import produce from 'immer';

const initialState = {
  order: [],
  totalCount: 0,
  totalPrice: 0
};

const cart = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_ITEM_TO_CART':
        const newItemAlreadyInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
        const newItemAlreadyInCart = state.order[newItemAlreadyInCartIndex]
        if (newItemAlreadyInCart) {
          const { price, count } = newItemAlreadyInCart;
          draft.order[newItemAlreadyInCartIndex].price = price + action.payload.price;
          draft.order[newItemAlreadyInCartIndex].count = count + action.payload.count;
        };
        if (!newItemAlreadyInCart) {
          draft.order.push(action.payload);
        }
        break;
      case 'PLUS_CART_ITEM':
        const plusItemInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
        const plusItemInCart = state.order[plusItemInCartIndex];
        const { price, count } = plusItemInCart;
        const plusItemPrise = (price / count) * (count + 1);
        draft.order[plusItemInCartIndex].price = plusItemPrise;
        draft.order[plusItemInCartIndex].count = count + 1;
        break;
      case 'MINUS_CART_ITEM':
        const minusItemInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
        const minusItemInCart = state.order[minusItemInCartIndex];
        if (minusItemInCart.count > 1) {
          const { count, price } = minusItemInCart;
          const minusItemPrise = (price / count) * (count - 1);
          draft.order[minusItemInCartIndex].price = minusItemPrise;
          draft.order[minusItemInCartIndex].count = count - 1;
        }
        break;
      case 'REMOVE_CART_ITEM':
        const removeItemInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
        draft.order.splice(removeItemInCartIndex, 1);
        break;
      case 'CLEAR_CART':
        draft.order = [];
        break;
      default:
        return state;
    }
    draft.totalCount = draft.order.reduce((sum, { count }) => sum + count, 0);
    draft.totalPrice = draft.order.reduce((sum, { price }) => sum + price, 0);
  })
}

export default cart;

// Без Immer:

// const cart = (state = initialState, action) => {

//   switch (action.type) {
//     case 'ADD_ITEM_TO_CART': {
//       const newItemAlreadyInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
//       const newItemAlreadyInCart = state.order[newItemAlreadyInCartIndex]
//       if (newItemAlreadyInCart) {
//         const { price, count } = newItemAlreadyInCart;
//         const newOrder = [...state.order.slice(0, newItemAlreadyInCartIndex),
//         {
//           ...state.order[newItemAlreadyInCartIndex],
//           price: price + action.payload.price,
//           count: count + action.payload.count
//         },
//         ...state.order.slice(newItemAlreadyInCartIndex + 1)]
//         return {
//           ...state,
//           order: [...newOrder],
//           totalCount: getTotalCount(newOrder),
//           totalPrice: getTotalPrice(newOrder)
//         }
//       }
//       if (!newItemAlreadyInCart) {
//         const newOrder = [...state.order, action.payload];
//         return {
//           ...state,
//           order: [...newOrder],
//           totalCount: getTotalCount(newOrder),
//           totalPrice: getTotalPrice(newOrder)
//         }
//       }
//     }
//     case 'PLUS_CART_ITEM': {
//       const plusItemInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
//       const plusItemInCart = state.order[plusItemInCartIndex];
//       const { price, count } = plusItemInCart;
//       const plusItemPrise = (price / count) * (count + 1);
//       const newOrder = [...state.order.slice(0, plusItemInCartIndex),
//       {
//         ...state.order[plusItemInCartIndex],
//         price: plusItemPrise,
//         count: count + 1
//       },
//       ...state.order.slice(plusItemInCartIndex + 1)]
//       return {
//         ...state,
//         order: [...newOrder],
//         totalCount: getTotalCount(newOrder),
//         totalPrice: getTotalPrice(newOrder)
//       }
//     }
//     case 'MINUS_CART_ITEM': {
//       const minusItemInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
//       const minusItemInCart = state.order[minusItemInCartIndex];
//       const { price, count } = minusItemInCart;
//       if (count > 1) {
//         const minusItemPrise = (price / count) * (count - 1);
//         const newOrder = [...state.order.slice(0, minusItemInCartIndex),
//         {
//           ...state.order[minusItemInCartIndex],
//           price: minusItemPrise,
//           count: count - 1
//         },
//         ...state.order.slice(minusItemInCartIndex + 1)]
//         return {
//           ...state,
//           order: [...newOrder],
//           totalCount: getTotalCount(newOrder),
//           totalPrice: getTotalPrice(newOrder)
//         }
//       }
//     }
//     case 'REMOVE_CART_ITEM': {
//       const removeItemInCartIndex = state.order.findIndex(item => item.id === action.payload.id && item.weight === action.payload.weight);
//       const newOrder = [...state.order.slice(0, removeItemInCartIndex),
//       ...state.order.slice(removeItemInCartIndex + 1)]
//       return {
//         ...state,
//         order: [...newOrder],
//         totalCount: getTotalCount(newOrder),
//         totalPrice: getTotalPrice(newOrder)
//       }
//     }
//     case 'CLEAR_CART': {
//       return {
//         order: [],
//         totalCount: 0,
//         totalPrice: 0
//       }
//     }
//     default:
//       return state;
//   }
// };

// const getTotalCount = (arr) => arr.reduce((sum, { count }) => sum + count, 0);
// const getTotalPrice = (arr) => arr.reduce((sum, { price }) => sum + price, 0);
// draft.totalCount = getTotalCount(state.order);
// draft.totalPrice = getTotalPrice(state.order);

