import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import { initialState } from './helpers/initialState';
import mockData from './helpers/mockData';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(mockData) },
  );
});

// Pode acontecer de eu precisar zerar os mocks, vou fazer isso no afterEach :
// link para o clear, reset e restore https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/095ebb0d-1932-4d37-933b-9e1d721646fb/section/89bf51d9-0bcc-4c9f-86a5-c7ff5df910bc/day/b848cbc2-853c-441f-8e2e-52c5f2467a4b/lesson/a1c0eed1-aa1a-435d-8f0e-b5773f807422

describe('Testes na tela de Carteira', () => {
  test('Verifica se os elementos da carteira são renderizados', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
  test('Verifica o comportamento do usuário dentro do ', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const goButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, '10 dólares');
    userEvent.click(goButton);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    // const editButton = screen.getByRole('button', {
    //   name: /editar/i,
    // });
    // expect(editButton).toBeInTheDocument();
  });
});
