const fetch = require('node-fetch');

const symbol = 'BTCUSDT';
const interval = '1d'; 
const limit = 1000; 
const startTime = new Date('2019-01-01').getTime();
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
      volume: parseFloat(d[])
    }));
    console.log(prices);
  })
  .catch(err => console.error(err));
