import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchAllInfo, endEditExpense } from '../redux/actions/index';

class WalletForm extends Component {
  INITIAL_STATE = {
    value: '',
    description: '',
  };

  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  restoreState = () => {
    this.setState(this.INITIAL_STATE);
  };

  handleClick = () => {
    this.setState((prevState) => {
      const newState = { ...prevState };
      delete newState.expenses;

      const { dispatch } = this.props;
      dispatch(fetchAllInfo(newState));
    });
    this.restoreState();
  };

  handleEdit = () => {
    this.setState((prevState) => {
      const newState = { ...prevState };
      delete newState.expenses;

      const { dispatch, idToEdit } = this.props;
      dispatch(endEditExpense(newState, idToEdit));
    });
    this.restoreState();
  };

  setValue = ({ target }) => this.setState({ value: target.value });

  setdescription = ({ target }) => this.setState({ description: target.value });

  setCurrency = ({ target }) => this.setState({ currency: target.value });

  setPagamento = ({ target }) => this.setState({ method: target.value });

  setTag = ({ target }) => this.setState({ tag: target.value });

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="despesa">
            despesa:
            {' '}
            <input
              type="text"
              name="despesa"
              id="despesa"
              data-testid="value-input"
              onChange={ this.setValue }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            description:
            {' '}
            <input
              name="description"
              id="description"
              data-testid="description-input"
              onChange={ this.setdescription }
              value={ description }
            />
          </label>
          <select
            data-testid="currency-input"
            onChange={ this.setCurrency }
            value={ currency }
          >
            {currencies.map((currencyType) => (
              <option
                key={ currencyType }
                value={ currencyType }

              >
                {currencyType}

              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            onChange={ this.setPagamento }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input" value={ tag } onChange={ this.setTag }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ editor ? this.handleEdit : this.handleClick }
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
