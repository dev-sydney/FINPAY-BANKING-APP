import React from 'react';
import transItemStyle from './transItemStyle.scss';

/**
 * Renders a Transaction that has been made
 * @returns {Element} An element created using JSX is returned
 */
const TransactionItem = () => {
  return (
    <div className="transaction">
      <span className="transaction_info">
        <p>
          Transfer to <strong>Sydney</strong>
        </p>
        <p>Reference</p>
      </span>
      <span className="transaction_amount">GHS 2000</span>
    </div>
  );
};
export default TransactionItem;
