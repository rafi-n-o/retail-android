const stateSearch = {
  search: [],
};

const search = (state = stateSearch, action) => {
  if (action.type === 'GET_SEARCH') {
    return {
      ...state,
      search: action.payload,
    };
  }

  return state;
};

export {search};
