import { React, useEffect, useState } from 'react';
import transItemStyle from './transItemStyle.scss';

const TransactionItem = ({ transAction }) => {
  useEffect(() => {
    if (transAction) {
      console.log(transAction);
    }
    //eslint-disable-next-line
  }, [transAction]);
  return (
    <div className="transaction">
      <strong>{new Date(transAction.mvtDate).toLocaleDateString()}</strong>
      {
        <div className="Info_Amount">
          <span className="transaction_info">
            <p>
              {transAction.mvtAmt < 0 ? 'Transfer To' : 'Recieved from'}
              <strong>{transAction.mvtWith}</strong>
            </p>
            <p>Reference</p>
          </span>
          <span className="transaction_amount">{transAction.mvtAmt}</span>
        </div>
      }
    </div>
  );
};
export default TransactionItem;
