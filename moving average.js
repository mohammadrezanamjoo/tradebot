function priceActionStrategy(prices, period1, period2) {
  if (!Array.isArray(prices)) {
    throw new Error('Invalid input: prices must be an array');
  }
  if (!Number.isInteger(period1) || period1 <= 0 || !Number.isInteger(period2) || period2 <= 0) {
    throw new Error('Invalid input: period values must be positive integers');
  }

  const sma1 = simpleMovingAverage(prices, period1);
  const sma2 = simpleMovingAverage(prices, period2);


  if (sma1[sma1.length - 1] > sma2[sma2.length - 1] && sma1[sma1.length - 2] <= sma2[sma2.length - 2]) {
    return { signal: 'BUY', price: prices[prices.length - 1] };
  } else if (sma1[sma1.length - 1] < sma2[sma2.length - 1] && sma1[sma1.length - 2] >= sma2[sma2.length - 2]) {
    return { signal: 'SELL', price: prices[prices.length - 1] };
  } else {
    return { signal: 'HOLD', price: prices[prices.length - 1] };
  }
}

function simpleMovingAverage(prices, period) {
  if (!Array.isArray(prices)) {
    throw new Error('Invalid input: prices must be an array');
  }

  // Ensure that the period value is a positive integer
  if (!Number.isInteger(period) || period <= 0) {
    throw new Error('Invalid input: period value must be a positive integer');
  }

  // Calculate the simple moving average
  const sma = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
}
