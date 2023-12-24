function priceActionStrategy(prices, period, rsiThreshold) {
  if (!Array.isArray(prices)) {
    throw new Error('Invalid input: prices must be an array');
  }

  if (!Number.isInteger(period) || period <= 0) {
    throw new Error('Invalid input: period value must be a positive integer');
  }

  // Ensure that the RSI threshold value is between 0 and 100
  if (rsiThreshold < 0 || rsiThreshold > 100) {
    throw new Error('Invalid input: RSI threshold value must be between 0 and 100');
  }

  // Calculate the RSI
  const rsi = relativeStrengthIndex(prices, period);

  // Determine the trading signal based on the RSI value
  if (rsi[rsi.length - 1] > rsiThreshold && rsi[rsi.length - 2] <= rsiThreshold) {
    return { signal: 'BUY', price: prices[prices.length - 1] };
  } else if (rsi[rsi.length - 1] < 100 - rsiThreshold && rsi[rsi.length - 2] >= 100 - rsiThreshold) {
    return { signal: 'SELL', price: prices[prices.length - 1] };
  } else {
    return { signal: 'HOLD', price: prices[prices.length - 1] };
  }
}

function relativeStrengthIndex(prices, period) {
  if (!Array.isArray(prices)) {
    throw new Error('Invalid input: prices must be an array');
  }

  // Ensure that the period value is a positive integer
  if (!Number.isInteger(period) || period <= 0) {
    throw new Error('Invalid input: period value must be a positive integer');
  }

  // Calculate the RSI
  const rsi = [];
  let gainSum = 0;
  let lossSum = 0;
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) {
      gainSum += diff;
    } else {
      lossSum += -diff;
    }
    if (i >= period) {
      const avgGain = gainSum / period;
      const avgLoss = lossSum / period;
      const rs = avgGain / avgLoss;
      const currentRsi = 100 - (100 / (1 + rs));
      rsi.push(currentRsi);
      gainSum -= diff > 0 ? diff : 0;
      lossSum -= diff < 0 ? -diff : 0;
    }
  }
  return rsi;
}
