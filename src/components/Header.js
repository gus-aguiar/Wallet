import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Header.module.scss';

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

class Header extends Component {
  state = {
    total: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      const total = expenses.reduce(
        (acc, { value, exchangeRates, currency }) => {
          const askValue = exchangeRates[currency].ask;
          return acc + value * askValue;
        },
        0,
      );

      this.setState({
        total: Number(total).toFixed(2),
      });
    }
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div className={ styles.contentHolderHeader }>
        <p data-testid="email-field">{`email: ${email}`}</p>
        <div className={ styles.totalBlock }>
          <p>Total de despesas: </p>
          <p data-testid="total-field">{total}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
