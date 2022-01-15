import React from 'react';
import transItemStyle from './transItemStyle.scss';

/**
 * Renders a Transaction that has been made
 * @returns {Element} An element created using JSX is returned
 */
const TransactionItem = ({ transActions }) => {
  console.log(transActions);
  return (
    <div className="transaction">
      <strong>{new Date(transActions[0].mvtDate).toLocaleDateString()}</strong>
      {transActions.map(transAct => (
        <div className="Info_Amount" key={transAct.id}>
          <span className="transaction_info">
            <p>
              {transAct.mvtAmt < 0 ? 'Transfer To' : 'Recieved from'}
              <strong>{transAct.mvtWith}</strong>
            </p>
            <p>Reference</p>
          </span>
          <span className="transaction_amount">{transAct.mvtAmt}</span>
        </div>
      ))}
    </div>
  );
};
export default TransactionItem;
