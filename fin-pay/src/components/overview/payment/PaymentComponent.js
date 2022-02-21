import React, { useState, useEffect } from 'react';
import paymentStyle from './paymentStyle.scss';

import { connect } from 'react-redux';

import { TransactionValidility } from '../../../actions/userActions';

const PaymentComponent = ({
  app: { accounts, currentUser },
  TransactionValidility,
  cardMovements,
}) => {
  useEffect(() => {
    if (cardMovements) {
      setAvBalance(
        cardMovements.reduce((prev, curr) => {
          return prev + curr;
        }, 0)
      );
    }
    //eslint-disable-next-line
  }, [cardMovements]);

  const [avBalance, setAvBalance] = useState(0);
  const [recepientName, setRecepientName] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recieptAccNum, setRecieptAccNum] = useState('');
  const [reference, setReference] = useState('');
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
    setTransferAmount(e.target.value);
  };

  /**
   * Responsible for handling the change event in the Reference input
   * @param {*} e
   */
  const onReferenceChange = e => {
    setReference(e.target.value);
  };
  /**
   * Responsinle for handling the change event in the reciept Account Number input
   * @param {Object} e
   */
  const onAccNumChange = e => {
    setRecieptAccNum(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (recepientName !== currentUser.owner) {
      TransactionValidility(
        recepientName,
        accounts,
        transferAmount,
        avBalance,
        currentUser,
        reference,
        +recieptAccNum
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
          placeholder="acc num"
          value={recieptAccNum}
          onChange={onAccNumChange}
        />
        <input
          type="text"
          placeholder="amount"
          onChange={onAmountChange}
          value={transferAmount}
        />
        <input
          type="text"
          placeholder="reference"
          onChange={onReferenceChange}
          value={reference}
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
