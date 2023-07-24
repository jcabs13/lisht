const axios = require('axios');
const qs = require('qs');

let data = qs.stringify({
  'grant_type': 'client_credentials',
  'scope': 'product.compact' // replace '{{scope}}' with the actual value
});

let config = {
  method: 'post',
  url: 'https://api.kroger.com/v1/connect/oauth2/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic bGlzaHQtMTA4YjBkNWUyMTU0NWM1NTM4NmU4ODM2MmM3MDQ3NTQ0MDU4ODQxNzc4MjA2ODMyNTE1OjVISk1nZ0FKNm14MEF3Y2s0NkctNC1fMVI3UndtVkpoTEFXUzlDVGE='
  },
  data: data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.error(error);
});
