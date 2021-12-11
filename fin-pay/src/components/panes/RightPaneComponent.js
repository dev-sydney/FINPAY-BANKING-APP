import React from 'react';
import paneStyle from './paneStyle.scss';

import BalanceComponent from '../overview/balance/BalanceComponent';
import TransactionItem from '../overview/transItem/TransactionItem';

const RightPaneComponent = () => {
  return (
    <div className="right_pane">
      <header className="header_panel">
        <h3>Overiew</h3>
        <p>Hi Sydney, welcome back</p>
      </header>
      <BalanceComponent />
      <div className="transactions_container">
        <TransactionItem />
      </div>
    </div>
  );
};
export default RightPaneComponent;
