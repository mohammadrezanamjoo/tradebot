const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

const url = new URL(apiUrl);

url.searchParams.append('start','1');
url.searchParams.append('limit','10');

fetch(url, {
  headers: {
    'X-CMC_PRO_API_KEY': apiKey,
    'Accept': 'application/json'
  }
})
  .then(response => response.json())
  
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
