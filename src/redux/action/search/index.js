import Api from '../../../api/Api';

const getSearch = (by, search = '') => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-search?search=${search}&by=${by}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response.data);
      });
  });
};

export {getSearch};
