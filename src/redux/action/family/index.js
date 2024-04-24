import Api from "../../../api/Api";

const getFamilies = (merchantId = "", needId = "") => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-families?merchantId=${merchantId}&needId=${needId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getFamilies };
