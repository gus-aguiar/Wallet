import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ description, tag, method, value, currency, id }, index) => {
            const exchangeRatesCurrency = expenses[id].exchangeRates[currency];
            console.log(exchangeRatesCurrency);
            const askValue = exchangeRatesCurrency.ask;
            const convertedValue = value * askValue;
            const formattedConvertedValue = Number(convertedValue).toFixed(2);
            const currencyText = currency === 'USD'
              ? 'Dólar Americano/Real Brasileiro'
              : 'Euro/Real Brasileiro';
            return (
              <tr key={ index }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{currencyText}</td>
                <td>{Number(askValue).toFixed(2)}</td>
                <td>{formattedConvertedValue}</td>
                <td>Real</td>
                <td>
                  <button>Editar</button>
                  <button>Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Table);

// commit test
