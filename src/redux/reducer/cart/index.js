const stateCart = {
  cart: {},
};

const stateTotalItem = {
  total_item: "",
};

const cart = (state = stateCart, action) => {
  if (action.type === "GET_CART") {
    return {
      ...state,
      cart: action.payload,
    };
  }

  return state;
};

const totalItem = (state = stateTotalItem, action) => {
  if (action.type === "GET_TOTAL_ITEM") {
    return {
      ...state,
      total_item: action.payload,
    };
  }

  return state;
};

export { cart, totalItem };
