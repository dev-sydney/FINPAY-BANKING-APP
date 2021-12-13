import React, { useState, useEffect } from 'react';
import paneStyle from './paneStyle.scss';

import BalanceComponent from '../overview/balance/BalanceComponent';
import TransactionItem from '../overview/transItem/TransactionItem';
import CardCarosuel from '../overview/cards/CardsCarosuel';
import PaymentComponent from '../overview/payment/PaymentComponent';

const RightPaneComponent = () => {
  const [userPin, setUserPin] = useState('');
  const [user, setUser] = useState('');

  const onUserChange = e => {
    setUser(e.target.value);
  };
  const onPinChange = e => {
    setUserPin(e.target.value);
  };

  /*  useEffect(()=>{

  },[]) */

  return (
    <div className="right_pane">
      <header className="header_panel">
        <h3>Overiew</h3>
        <p>Hi Sydney, welcome back</p>
        <form>
          <input
            className="userNameInput"
            placeholder="user"
            value={user}
            onChange={onUserChange}
            type="text"
          />
          <input
            className="userPinInput"
            placeholder="PIN"
            value={userPin}
            onChange={onPinChange}
            type="text"
            maxLength="4"
          />
        </form>
      </header>
      <div className="dash_board">
        <BalanceComponent />
        <PaymentComponent />
        <div className="transactions_container">
          <TransactionItem />
        </div>
        <CardCarosuel />
      </div>
    </div>
  );
};
export default RightPaneComponent;
