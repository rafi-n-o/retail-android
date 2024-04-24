import Api from '../../../api/Api';

const getToken = () => {
  return localStorage.getItem('token-customer');
};

const storeCart = (token, form, direct) => {
  return new Promise((resolve, reject) => {
    Api.post(`/customer-carts?direct=${direct}`, form, {
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

const getCart = (direct, paymentMethod = '') => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-carts?direct=${direct}&paymentMethod=${paymentMethod}`, {
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

const updateCart = (form, direct, value) => {
  return new Promise((resolve, reject) => {
    Api.put(`/customer-carts?direct=${direct}&quantity=${value}`, form, {
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

const getTotalItem = token => dispatch => {
  Api.get('/customer-carts/total-item', {
    headers: {Authorization: token},
  })
    .then(res => {
      dispatch({
        type: 'GET_TOTAL_ITEM',
        payload: res.data.data,
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export {storeCart, getCart, updateCart, getTotalItem};
