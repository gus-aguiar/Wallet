import mockData from './mockData';

export const initialState = {
  wallet: { value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currencies: ['USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE'],
    expenses: [],
  },

};

export const initialStateTwo = {
  value: '10',
  description: '10 dólares',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
  id: 1,
};
