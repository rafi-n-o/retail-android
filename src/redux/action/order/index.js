import Api from '../../../api/Api';

const storeOrder = (token, form, direct) => {
  return new Promise((resolve, reject) => {
    Api.post(`/customer-orders?direct=${direct}`, form, {
      headers: {Authorization: token},
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const getOrders = status => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-orders?status=${status}`, {
      headers: {Authorization: getToken()},
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const getOrder = id => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-orders/${id}`, {
      headers: {Authorization: getToken()},
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const upload = (id, form) => {
  return new Promise((resolve, reject) => {
    Api.put(`/customer-orders/${id}/proof-of-payment`, form, {
      headers: {Authorization: getToken()},
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const updateOrderStatus = form => {
  return new Promise((resolve, reject) => {
    Api.put(`/customer-orders/status/update`, form, {
      headers: {Authorization: getToken()},
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export {storeOrder, getOrders, getOrder, upload, updateOrderStatus};
