// Sample code to calculate 5 common indicators for the crypto market

// Example price data
const priceData = [100, 105, 110, 95, 120, 115, 125, 130, 140, 135, 130, 125];

// Simple Moving Average (SMA)
function calculateSMA(data, period) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    const average = sum / period;
    sma.push(average);
  }
  return sma;
}

// Relative Strength Index (RSI)
function calculateRSI(data, period) {
  const rsi = [];
  for (let i = period; i < data.length; i++) {
    const gains = [];
    const losses = [];
    for (let j = i - period; j < i; j++) {
      const diff = data[j + 1] - data[j];
      if (diff >= 0) {
        gains.push(diff);
      } else {
        losses.push(Math.abs(diff));
      }
    }
    const avgGain = gains.reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / period;
    const relativeStrength = avgGain / avgLoss;
    const rsiValue = 100 - (100 / (1 + relativeStrength));
    rsi.push(rsiValue);
  }
  return rsi;
}

// Moving Average Convergence Divergence (MACD)
function calculateMACD(data, shortPeriod, longPeriod, signalPeriod) {
  const macdLine = [];
  const signalLine = [];
  for (let i = longPeriod - 1; i < data.length; i++) {
    const shortEMA = calculateEMA(data.slice(i - shortPeriod + 1, i + 1), shortPeriod);
    const longEMA = calculateEMA(data.slice(i - longPeriod + 1, i + 1), longPeriod);
    const macdValue = shortEMA - longEMA;
    macdLine.push(macdValue);
    if (macdLine.length >= signalPeriod) {
      const signalEMA = calculateEMA(macdLine.slice(i - signalPeriod + 1, i + 1), signalPeriod);
      signalLine.push(signalEMA);
    }
  }
  return { macdLine, signalLine };
}

// Exponential Moving Average (EMA)
function calculateEMA(data, period) {
  const smoothingFactor = 2 / (period + 1);
  let ema = data[0];
  for (let i = 1; i < data.length; i++) {
    ema = (data[i] - ema) * smoothingFactor + ema;
  }
  return ema;
}

// Example usage
const period = 5;
const shortPeriod = 12;
const longPeriod = 26;
const signalPeriod = 9;

const sma = calculateSMA(priceData, period);
const rsi = calculateRSI(priceData, period);
const { macdLine, signalLine } = calculateMACD(priceData, shortPeriod, longPeriod, signalPeriod);

console.log('SMA:', sma);
console.log('RSI:', rsi);
console.log('MACD Line:', macdLine);
console.log('Signal Line:', signalLine);
