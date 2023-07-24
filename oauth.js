var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.kroger.com/v1/connect/oauth2/token",
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic bGlzaHQtMTA4YjBkNWUyMTU0NWM1NTM4NmU4ODM2MmM3MDQ3NTQ0MDU4ODQxNzc4MjA2ODMyNTE1OiA1SEpNZ2dBSjZteDBBd2NrNDZHLTQtXzFSN1J3bVZKaExBV1M5Q1Rh"
    },
    "data": {
      "grant_type": "client_credentials",
      "scope": "product.compact"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  