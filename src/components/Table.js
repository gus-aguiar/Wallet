import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleclick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

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
          {expenses
            .map(({ description, tag, method, value, currency, id, exchangeRates }) => {
              const exchangeRatesCurrency = exchangeRates[currency];
              const askValue = exchangeRatesCurrency.ask;
              const convertedValue = value * askValue;
              const formattedConvertedValue = Number(convertedValue).toFixed(2);
              const currencyText = exchangeRatesCurrency.name;
              return (
                <tr key={ id }>
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
                    <button
                      data-testid="delete-btn"
                      onClick={ () => this.handleclick(id) }
                    >
                      Excluir
                    </button>
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
