import Api from '../../../api/Api';

const storeRegister = form => {
  return new Promise((resolve, reject) => {
    Api.post('/customer-customers', form)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const storeLogin = form => {
  return new Promise((resolve, reject) => {
    Api.post('/customer-customers/login', form)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const authentication = token => {
  return new Promise((resolve, reject) => {
    Api.get('/customer-customers', {
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};
export {storeRegister, storeLogin, authentication};
