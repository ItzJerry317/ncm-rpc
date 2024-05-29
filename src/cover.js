const axios = require('axios');
axios.get('https://music.163.com/#/search/m/?s=R.I.P.')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
