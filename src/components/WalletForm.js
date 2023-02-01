import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="despesa">
            despesa:
            {' '}
            <input type="number" name="despesa" id="despesa" data-testid="value-input" />
          </label>
          <label htmlFor="descrição">
            descrição:
            {' '}
            <input name="descrição" id="descrição" data-testid="description-input" />
          </label>
          <select data-testid="currency-input">
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>{currency}</option>
            ))}
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
