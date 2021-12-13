import React, { useState } from 'react';
import paymentStyle from './paymentStyle.scss';

const PaymentComponent = () => {
  const [senderName, setSenderName] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  /**
   * Responsible for handling the change Event in the senderName input
   * @param {*} e
   */
  const onUserChange = e => {
    setSenderName(e.target.value);
  };
  /**
   * Responsible for handling the change Event in the TransferAmount input
   * @param {*} e
   */
  const onAmountChange = e => {
    setTransferAmount(e.target.value);
  };
  return (
    <div className="payment_card">
      <p>Quick transfer</p>
      <form>
        <input
          type="text"
          placeholder="user"
          onChange={onUserChange}
          value={senderName}
        />
        <input
          type="text"
          placeholder="amount"
          onChange={onAmountChange}
          value={transferAmount}
        />
      </form>
      <button type="submit">Send</button>
    </div>
  );
};

export default PaymentComponent;
