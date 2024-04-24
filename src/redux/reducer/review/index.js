const stateReviews = {
  reviews: [],
};

const reviews = (state = stateReviews, action) => {
  if (action.type === "GET_REVIEWS") {
    return {
      ...state,
      reviews: action.payload,
    };
  }

  return state;
};

export { reviews };
