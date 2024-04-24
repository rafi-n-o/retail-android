import Api from "../../../api/Api";

const getToken = () => {
  return localStorage.getItem("token-customer");
};

const getReviews = (orderId) => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-reviews/orders/${orderId}`, {
      headers: { Authorization: getToken() },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const storeReview = (form) => {
  return new Promise((resolve, reject) => {
    Api.post("/customer-reviews", form, {
      headers: { Authorization: getToken() },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getReviews, storeReview };
