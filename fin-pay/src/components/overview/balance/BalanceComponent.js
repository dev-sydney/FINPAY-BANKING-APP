import React from 'react';
import balStyle from './balStyle.scss';

const BalanceComponent = () => {
  return (
    <div className="bal_card">
      <p>Your Balance</p>
      <h3>GHS 2000,000,00.00</h3>
      <p>Saving A/C: xxxxxxxxx6789</p>
    </div>
  );
};

export default BalanceComponent;
