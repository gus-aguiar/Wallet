import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;
    const { history, dispatch } = this.props;
    const minLength = 6;
    e.preventDefault();
    if (this.isValidEmail(email) && password.length >= minLength) {
      dispatch(addEmail(email));
      // navigate to /carteira
      history.push('/carteira');
    }
  };

  setEmail = ({ target }) => this.setState({ email: target.value });

  setPassword = ({ target }) => this.setState({ password: target.value });

  render() {
    const { email, password } = this.state;
    const minLength = 6;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          value={ email }
          onChange={ this.setEmail }
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          type="password"
          value={ password }
          onChange={ this.setPassword }
          data-testid="password-input"
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={ !this.isValidEmail(email) || password.length < minLength }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
