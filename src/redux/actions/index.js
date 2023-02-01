// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  console.log(currencies);
  dispatch(fetchCurrenciesSuccess(currencies));
};
