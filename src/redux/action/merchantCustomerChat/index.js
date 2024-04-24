import Api from '../../../api/Api';

const getToken = () => {
  return localStorage.getItem('token-customer');
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    Api.get('/customer-merchant-chats', {
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

const storeChat = (merchantId, form) => {
  return new Promise((resolve, reject) => {
    Api.post(`/customer-merchant-chats/merchants/${merchantId}`, form, {
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

const getChats = merchantId => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-merchant-chats/merchants/${merchantId}`, {
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

const getTotalUnread = token => dispatch => {
  Api.get('/customer-merchant-chats/total-unread', {
    headers: {Authorization: token},
  })
    .then(res => {
      dispatch({
        type: 'GET_TOTAL_UNREAD',
        payload: res.data.data,
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export {getAll, getChats, getTotalUnread, storeChat};
