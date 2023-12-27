// Sample price data
const priceData = [100, 110, 120, 115, 130, 140, 135, 150, 160, 155];

function calculateSMA(data, period) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    const average = sum / period;
    sma.push(average);
  }
  return sma;
}

// Determine the trend based on the moving average crossover
function determineTrend(smaShort, smaLong) {
  const lastShort = smaShort[smaShort.length - 1];
  const lastLong = smaLong[smaLong.length - 1];
  
  if (lastShort > lastLong) {
    return "Bullish"; // Short-term SMA is above long-term SMA
  } else if (lastShort < lastLong) {
    return "Bearish"; // Short-term SMA is below long-term SMA
  } else {
    return "Sideways"; // Short-term SMA is equal to long-term SMA
  }
}

// Define the period for short-term and long-term SMAs
const shortTermPeriod = 5;
const longTermPeriod = 10;

// Calculate the SMAs
const smaShortTerm = calculateSMA(priceData, shortTermPeriod);
const smaLongTerm = calculateSMA(priceData, longTermPeriod);

// Determine the trend
const trend = determineTrend(smaShortTerm, smaLongTerm);

console.log("Trend:", trend);
