const API_KEY = 'b620fad7a898130e7075aa11';

export const countryDetails = async (country:string) => {
  console.log(country);
  const req = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const res = await req.json();

  const currency_iso = Object.keys(res[0].currencies)[0];
  const currency_symbol = res[0].currencies[currency_iso].symbol;
  const currency_name = res[0].currencies[currency_iso].name;
  const continent = res[0].continents[0];

  console.log(currency_name, currency_iso, currency_symbol, continent);

  return { currency_symbol, currency_name, currency_iso, continent };
};

export const exchangeRate = async (iso:string) => {
  const req = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${iso}`
  );
  const res = await req.json();
  const rate = await res.conversion_rate;
  return rate;
};
