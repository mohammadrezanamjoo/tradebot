const fetch = require('node-fetch');

const startDate = '2019-01-01'; // start date of the historical data
const endDate = '2023-07-11'; // end date of the historical data
const currency = 'BTC'; // cryptocurrency symbol

const url = `https://api.coinbase.com/v2/prices/${currency}-USD/spot?start=${startDate}&end=${endDate}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const prices = data.data.map(d => ({ 
      time: new Date(d.time),
      price: parseFloat(d.price)
    }));
    console.log(prices);
  })
  .catch(err => console.error(err));
