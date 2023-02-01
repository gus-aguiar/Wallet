import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  email: state.user.email,
});

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{`email: ${email}`}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
// Acesso ao estado global

// No export
export default connect(mapStateToProps)(Header);
