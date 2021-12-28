import React, { useState, useEffect } from 'react';
import paymentStyle from './paymentStyle.scss';

import { connect } from 'react-redux';

import { TransactionValidility } from '../../../actions/userActions';

const PaymentComponent = ({
  app: { movements, accounts, currentUser },
  TransactionValidility,
}) => {
  const [avBalance, setAvBalance] = useState(0);

  useEffect(() => {
    if (movements.length > 0)
      setAvBalance(
        movements.reduce((prev, curr) => {
          return prev + curr;
        }, 0)
      );
    //eslint-disable-next-line
  }, [movements]);

  const [recepientName, setRecepientName] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  /**
   * Responsible for handling the change Event in the recepientName input
   * @param {*} e
   */
  const onUserChange = e => {
    setRecepientName(e.target.value);
  };
  /**
   * Responsible for handling the change Event in the TransferAmount input
   * @param {*} e
   */
  const onAmountChange = e => {
    setTransferAmount(+e.target.value);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (recepientName !== currentUser.owner) {
      TransactionValidility(
        recepientName,
        accounts,
        transferAmount,
        avBalance,
        currentUser
      );
    }
  };

  return (
    <div className="payment_card">
      <p>Quick transfer</p>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="user"
          onChange={onUserChange}
          value={recepientName}
        />
        <input
          type="text"
          placeholder="amount"
          onChange={onAmountChange}
          value={transferAmount}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps, { TransactionValidility })(
  PaymentComponent
);
