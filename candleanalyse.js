// Simple JavaScript to fetch OHLC (candlestick) data and compute basic analytics

// 1. Fetch OHLC data from Binance public API
async function getCandles(symbol, interval, limit = 100) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const rawData = await response.json();

  // Map raw array to objects
  return rawData.map(c => ({
    openTime: new Date(c[0]),
    open:  parseFloat(c[1]),
    high:  parseFloat(c[2]),
    low:   parseFloat(c[3]),
    close: parseFloat(c[4]),
    volume: parseFloat(c[5])
  }));
}

function analyze(candles) {
  const closes = candles.map(c => c.close);
  const opens  = candles.map(c => c.open);
  const highs  = candles.map(c => c.high);
  const lows   = candles.map(c => c.low);
  const ranges = candles.map(c => c.high - c.low);

  const avg = arr => arr.reduce((sum, v) => sum + v, 0) / arr.length;
  const sma = (arr, period) => arr.slice(-period).reduce((s, v) => s + v, 0) / period;

  const latest = candles[candles.length - 1];

  return {
    averageOpen:  avg(opens),
    averageHigh:  avg(highs),
    averageLow:   avg(lows),
    averageClose: avg(closes),
    averageRange: avg(ranges),
    changePercent: ((latest.close - latest.open) / latest.open) * 100,
    sma20: sma(closes, Math.min(20, closes.length))
  };
}

// 3. Run and log results
async function runAnalysis(symbol = 'BTCUSDT', interval = '1h') {
  try {
    console.log(`Fetching ${interval} candles for ${symbol}...`);
    const candles = await getCandles(symbol, interval, 100);
    const stats = analyze(candles);

    console.log(`\n--- Analytics for ${symbol} (${interval}) ---`);
    console.log(`Avg Open:   ${stats.averageOpen.toFixed(2)}`);
    console.log(`Avg High:   ${stats.averageHigh.toFixed(2)}`);
    console.log(`Avg Low:    ${stats.averageLow.toFixed(2)}`);
    console.log(`Avg Close:  ${stats.averageClose.toFixed(2)}`);
    console.log(`Avg Range:  ${stats.averageRange.toFixed(2)}`);
    console.log(`Latest % Change: ${stats.changePercent.toFixed(2)}%`);
    console.log(`20-Period SMA:   ${stats.sma20.toFixed(2)}`);
  } catch (err) {
    console.error('Error running analysis:', err);
  }
}

// Example invocation:
runAnalysis('BTCUSDT', '1h');
