import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchAllInfo } from '../redux/actions/index';

class WalletForm extends Component {
  INITIAL_STATE = {
    value: '',
    descrição: '',
  };

  state = {
    value: 0,
    descrição: '',
    currency: 'USD',
    pagamento: 'dinheiro',
    tag: 'alimentação',
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

  setValue = ({ target }) => this.setState({ value: target.value });

  setDescrição = ({ target }) => this.setState({ descrição: target.value });

  setCurrency = ({ target }) => this.setState({ currency: target.value });

  setPagamento = ({ target }) => this.setState({ pagamento: target.value });

  setTag = ({ target }) => this.setState({ tag: target.value });

  render() {
    const { currencies } = this.props;
    const { value, descrição, currency, pagamento, tag } = this.state;
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
          <label htmlFor="descrição">
            descrição:
            {' '}
            <input
              name="descrição"
              id="descrição"
              data-testid="description-input"
              onChange={ this.setDescrição }
              value={ descrição }
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
            value={ pagamento }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input" value={ tag } onChange={ this.setTag }>
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
