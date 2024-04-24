const stateOrders = {
  orders: [],
};

const stateOrder = {
  order: {},
};

const orders = (state = stateOrders, action) => {
  if (action.type === "GET_ORDERS") {
    return {
      ...state,
      orders: action.payload,
    };
  }

  return state;
};

const order = (state = stateOrder, action) => {
  if (action.type === "GET_ORDER") {
    return {
      ...state,
      order: action.payload,
    };
  }

  return state;
};

export { orders, order };
