import Api from "../../../api/Api";

const getNeeds = (merchantId = "") => {
  return new Promise((resolve, reject) => {
    Api.get(`/customer-needs?merchantId=${merchantId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getNeeds };
