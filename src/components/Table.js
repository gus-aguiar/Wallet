import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, startEditExpense } from '../redux/actions';
import styles from './Table.module.scss';

class Table extends Component {
  handleclickExclude = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleclickEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(startEditExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className={ styles.tableHolder }>
        <table id={ styles.table }>
          <thead>
            <tr>
              <th id={ styles.tableCell }>Descrição</th>
              <th id={ styles.tableCell }>Tag</th>
              <th id={ styles.tableCell }>Método de pagamento</th>
              <th id={ styles.tableCell }>Valor</th>
              <th id={ styles.tableCell }>Moeda</th>
              <th id={ styles.tableCell }>Câmbio utilizado</th>
              <th id={ styles.tableCell }>Valor convertido</th>
              <th id={ styles.tableCell }>Moeda de conversão</th>
              <th id={ styles.tableCell }>Editar/Excluir</th>
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
                    <td id={ styles.tableCell }>{description}</td>
                    <td id={ styles.tableCell }>{tag}</td>
                    <td id={ styles.tableCell }>{method}</td>
                    <td id={ styles.tableCell }>{Number(value).toFixed(2)}</td>
                    <td id={ styles.tableCell }>{currencyText}</td>
                    <td id={ styles.tableCell }>{Number(askValue).toFixed(2)}</td>
                    <td id={ styles.tableCell }>{formattedConvertedValue}</td>
                    <td id={ styles.tableCell }>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        onClick={ () => this.handleclickExclude(id) }
                        className={ styles.deleteBtn }
                        id={ styles.tableCell }
                      >
                        Excluir
                      </button>
                      <button
                        data-testid="edit-btn"
                        onClick={ () => this.handleclickEdit(id) }
                        className={ styles.editBtn }
                        id={ styles.tableCell }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
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
