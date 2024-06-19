const fetch = require('node-fetch');

const API_URL = 'https://api.pro.coinbase.com';

async function backtestCrypto(symbol, startDate, endDate, investment)
  {
  const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
  const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);
  const granularity = 86400;

  const response = await fetch(`${API_URL}/products/${symbol}-USD/candles?start=${startTimestamp}&end=${endTimestamp}&granularity=${granularity}`);
  const data = await response.json();

  let totalReturn = 0;

  for (let i = 0; i < data.length; i++) {
    const closePrice = data[i][4];
    const numCoins = investment / closePrice;
    const currentValue = numCoins * closePrice;
    const returnPercentage = (currentValue / investment - 1) * 100;

    totalReturn += returnPercentage;
  }

  const averageReturn = totalReturn / data.length;

  console.log(`Backtested ${symbol} from ${startDate} to ${endDate} with ${investment} USD investment`);
  console.log(`Average return: ${averageReturn.toFixed(2)}%`);
}

backtestCrypto('BTC', '2022-01-01', '2023-01-01', 1000);
