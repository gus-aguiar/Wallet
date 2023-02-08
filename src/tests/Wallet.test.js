import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { initialState, initialStateTwo } from './helpers/initialState';
import mockData from './helpers/mockData';
import { addExpense } from '../redux/actions';

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
  test('Verifica o comportamento do usuário dentro da rota da carteira ', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const goButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, '10 dólares');
    userEvent.click(goButton);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(valueInput.value).toBe('');
    act(() => {
      store.dispatch(addExpense(initialStateTwo));
    });

    const deleteButton = screen.getByTestId('delete-btn');
    expect(deleteButton).toBeInTheDocument();
    const dinheiroMethod = screen.getByRole('cell', {
      name: /dinheiro/i,
    });
    expect(dinheiroMethod).toBeInTheDocument();
    userEvent.click(deleteButton);
    expect(dinheiroMethod).not.toBeInTheDocument();
  });

  test('Verifica o componente de edit e depois as opções dos dropdowns ', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialStateTwo });
    act(() => {
      store.dispatch(addExpense(initialStateTwo));
    });
    const editButton = screen.getByTestId('edit-btn');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    const editExpense = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    expect(editExpense).toBeInTheDocument();
    userEvent.click(editExpense);
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, '10 dólares');
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '10');
    userEvent.click(editExpense);
    const headerValue = screen.getByTestId('total-field');
    expect(headerValue).not.toBe(0);
  });
});
