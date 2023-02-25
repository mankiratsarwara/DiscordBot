const axios = require('axios');

axios.get('https://footlocker.ca/')
    .then(function (response) {
        console.log(response);
    })