import React from 'react';
import carosuelStyle from './carosuelStyle.scss';
import CreditCard from '../../credit-card/CreditCard';

const CardCarosuel = () => {
  return (
    <div className="card_carosuel">
      <h3 style={{ margin: '0%' }}>Your Cards</h3>
      <div className="cards">
        <CreditCard />
        <CreditCard />
      </div>
    </div>
  );
};
export default CardCarosuel;
