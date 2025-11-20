const axios = require('axios');

exports.recommendBooks = async (userId) => {
  //API externa
  const response = await axios.post('https://api-inferência-ia.com/recommend', {
    userId
  });
  return response.data;
};
