function priceActionStrategy(prices, period, deviation) {
  // Ensure that the price data is an array
  if (!Array.isArray(prices)) {
    throw new Error('Invalid input: prices must be an array');
  }

  // Ensure that the period value is a positive integer
  if (!Number.isInteger(period) || period <= 0) {
    throw new Error('Invalid input: period value must be a positive integer');
  }

  // Ensure that the deviation value is a positive number
  if (typeof deviation !== 'number' || deviation <= 0) {
    throw new Error('Invalid input: deviation value must be a positive number');
  }

  // Calculate the Bollinger Bands
  const sma = simpleMovingAverage(prices, period);
  const stdDev = standardDeviation(prices, period);
  const upperBand = sma.map((price, index) => price + deviation * stdDev[index]);
  const lowerBand = sma.map((price, index) => price - deviation * stdDev[index]);

  // Determine the trading signal based on the price position relative to the Bollinger Bands
  const lastPrice = prices[prices.length - 1];
  const lastUpperBand = upperBand[upperBand.length - 1];
  const lastLowerBand = lowerBand[lowerBand.length - 1];
  if (lastPrice > lastUpperBand) {
    return { signal: 'SELL', price: lastPrice };
  } else if (lastPrice < lastLowerBand) {
    return { signal: 'BUY', price: lastPrice };
  } else {
    return { signal: 'HOLD', price: lastPrice };
  }
}

function simpleMovingAverage(prices, period) {
  // Ensure that the price data is an array
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

function standardDeviation(prices, period) {
  // Ensure that the price data is an array
  if (!Array.isArray(prices)) {
    throw new Error('Invalid input: prices must be an array');
  }

  // Ensure that the period value is a positive integer
  if (!Number.isInteger(period) || period <= 0) {
    throw new Error('Invalid input: period value must be a positive integer');
  }

  // Calculate the standard deviation
  const sma = simpleMovingAverage(prices, period);
  const variance = sma.map((price, index) => {
    const pricesSlice = prices.slice(index - period + 1, index + 1);
    const sum = pricesSlice.reduce((a, b) => a + Math.pow(b - price, 2), 0);
    return sum / period;
  });
  const stdDev = variance.map(Math.sqrt);
  return stdDev;
}
