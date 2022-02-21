import React from 'react';
import { connect } from 'react-redux';

import TransactionItem from '../transItem/TransactionItem';
import paneStyle from '../../panes/paneStyle.scss';

const TransactionsContainer = ({ ccMovements }) => {
  return (
    <div className="transactions_container">
      <div className="summaries">
        <span style={{ color: 'green' }}>{'INCOME SUMMARY'}</span>
        <span style={{ color: 'red' }}>{'TRANSFER SUMMRY'}</span>
      </div>
      {ccMovements &&
        ccMovements.map((el, i) => (
          <TransactionItem transAction={el} key={i} />
        ))}
    </div>
  );
};

export default TransactionsContainer;
