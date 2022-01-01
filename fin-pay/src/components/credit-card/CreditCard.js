import React from 'react';
import ccStyle from './ccStyle.scss';

const CreditCard = () => {
  return (
    <div className="card_component">
      <span>logo</span>
      <p className="card_num" style={{ margin: '0%' }}>
        card number
      </p>
      <div className="holder_expiry">
        <span className="holder_details">
          <p style={{ margin: '0%' }}>CARD HOLDER</p>
          <p style={{ margin: '0%' }}>My Name</p>
        </span>
        <span className="expiry_details">
          <p style={{ margin: '0%' }}>EXPIRES</p>
          <p style={{ margin: '0%' }}>My Name</p>
        </span>
      </div>
    </div>
  );
};
export default CreditCard;
