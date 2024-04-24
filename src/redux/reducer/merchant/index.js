const stateMerchants = {
  merchants: [],
};

const stateMerchant = {
  merchant: {},
};

const merchants = (state = stateMerchants, action) => {
  if (action.type === 'GET_MERCHANTS') {
    return {
      ...state,
      merchants: action.payload,
    };
  }

  return state;
};

const merchant = (state = stateMerchant, action) => {
  if (action.type === 'GET_MERCHANT') {
    return {
      ...state,
      merchant: action.payload,
    };
  }

  return state;
};

export {merchants, merchant};
