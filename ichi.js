function calculateIchimoku(prices) {
  const { high, low, close } = prices;

  // Calculate Tenkan-sen (Conversion Line)
  const tenkanSen = (Math.max(...high.slice(0, 9)) + Math.min(...low.slice(0, 9))) / 2;

  // Calculate Kijun-sen (Base Line)
  const kijunSen = (Math.max(...high.slice(0, 26)) + Math.min(...low.slice(0, 26))) / 2;

  // Calculate Senkou Span A (Leading Span A)
  const senkouSpanA = (tenkanSen + kijunSen) / 2;

  // Calculate Senkou Span B (Leading Span B)
  const senkouSpanB = (Math.max(...high.slice(0, 52)) + Math.min(...low.slice(0, 52))) / 2;

  // Calculate Chikou Span (Lagging Span)
  const chikouSpan = close.slice(0, -26);

  return {
    tenkanSen,
    kijunSen,
    senkouSpanA,
    senkouSpanB,
    chikouSpan,
  };
}

const prices = {
  high: [50, 52, 48, 55, 53, 57, 60, 58, 62, 59, 55, 50, 48, 45, 47, 49, 52, 55, 53, 50, 48, 45, 42, 40, 38, 35, 33, 30, 32, 34, 36, 40, 42, 45, 43, 41, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2],
  low: [45, 48, 44, 50, 48, 52, 55, 53, 57, 54, 50, 45, 43, 40, 42, 44, 47, 50, 48, 45, 42, 40, 38, 36, 34, 32, 30, 28, 30, 31, 32, 35, 38, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
  close: [48, 50, 46, 52, 50, 54, 57, 55, 60, 56, 52, 48, 46, 43, 45, 48, 50, 52, 50, 47, 45, 42, 39, 38, 36, 34, 32, 30, 32, 33, 35, 38, 42, 44, 41, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4],
};

const ichimokuValues = calculateIchimoku(prices);
console.log(ichimokuValues);
