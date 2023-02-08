import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import styles from './Wallet.module.scss';

class Wallet extends React.Component {
  render() {
    return (

      <div>
        <div className={ styles.divHeader }>
          <Header />
        </div>
        <WalletForm />
        <Table />

      </div>
    );
  }
}

export default Wallet;
