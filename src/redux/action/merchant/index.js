import Api from '../../../api/Api';

const getMerchants = (needId, search = '') => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-merchants?needId=${needId}&search=${search}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

const getMerchant = id => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-merchants/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export {getMerchants, getMerchant};
