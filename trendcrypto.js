async function findMostTrendingCrypto() {
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  const params = {
    vs_currency: 'usd',
    order: 'gecko_desc',
    per_page: 1,
    page: 1,
    sparkline: false,
  };

  try {

    const url = new URL(apiUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


    const response = await fetch(url);
    const data = await response.json();


    if (data.length > 0) {
      const mostTrendingCrypto = data[0];
      console.log('Most trending cryptocurrency:', mostTrendingCrypto.name);
    } else {
      console.log('No trending cryptocurrencies found...');
    }

  } catch (error) {
    console.error('Error fetching cryptocurrency trends:', error);
  }
}

// Call the function to find the most trending cryptocurrency
findMostTrendingCrypto();
