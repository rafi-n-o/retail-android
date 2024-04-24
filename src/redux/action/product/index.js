import Api from '../../../api/Api';

const getProducts = (merchantId, needId = '', familyId = '', search = '') => {
  return new Promise((resolve, reject) => {
    if (needId && familyId) {
      Api.get(
        `/customer-products?merchantId=${merchantId}&needId=${needId}&familyId=${familyId}&search=${search}`,
      )
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.response.data);
        });
    } else if (needId) {
      Api.get(
        `/customer-products?merchantId=${merchantId}&needId=${needId}&search=${search}`,
      )
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.response.data);
        });
    } else {
      Api.get(`/customer-products?merchantId=${merchantId}&search=${search}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.response.data);
        });
    }
  });
};

const getProduct = id => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-products/${id}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export {getProduct, getProducts};
