import React from 'react';
import ccStyle from './ccStyle.scss';

const CreditCard = ({ cardObj }) => {
  return (
    <div className="card_component">
      <span>logo</span>
      <p className="card_num" style={{ margin: '0%' }}>
        {cardObj && cardObj.CardNumber}
      </p>
      <div className="holder_expiry">
        <span className="holder_details">
          <p style={{ margin: '0%' }}>CARD HOLDER</p>
          <p style={{ margin: '0%' }}> {cardObj && cardObj.cardHolder}</p>
        </span>
        <span className="expiry_details">
          <p style={{ margin: '0%' }}>EXPIRES</p>
          <p style={{ margin: '0%' }}>{cardObj && cardObj.expiry}</p>
        </span>
      </div>
    </div>
  );
};
export default CreditCard;
