const fetch = require('node-fetch');

const symbol = 'BTCUSDT'; // trading pair symbol
const interval = '1d'; // time interval (1 day)
const limit = 1000; // max number of data points to retrieve
const startTime = new Date('2019-01-01').getTime(); // start time in milliseconds
const endTime = new Date('2023-07-11').getTime(); 

const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}&startTime=${startTime}&endTime=${endTime}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const prices = data.map(d => ({
      time: new Date(d[0]),
      open: parseFloat(d[1]),
      high: parseFloat(d[2]),
      low: parseFloat(d[3]),
      close: parseFloat(d[4]),
      volume: parseFloat(d[5])
    }));
    console.log(prices);
  })
  .catch(err => console.error(err));
