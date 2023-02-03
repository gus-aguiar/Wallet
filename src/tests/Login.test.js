import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import { initialState } from './helpers/initialState';
// import { fetchCurrencies, fetchAllInfo } from '../redux/actions/index';

// jest.mock('../redux/actions/index');

describe('Testes na tela de Login', () => {
  test('Verifica se os elementos da página de login são todos renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });
  test('Verifica a navegação do Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(enterButton).toBeDisabled();
    userEvent.type(emailInput, 'teste@teste.com.br');
    userEvent.type(passwordInput, 'senha123');
    expect(enterButton).toBeEnabled();
    userEvent.click(enterButton);
  });
});
