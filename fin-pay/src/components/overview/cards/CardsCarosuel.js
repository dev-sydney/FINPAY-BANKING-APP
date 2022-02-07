import React from 'react';

import carosuelStyle from './carosuelStyle.scss';
import CreditCard from '../../credit-card/CreditCard';

import { connect } from 'react-redux';
import uuid from 'uuid';

const CardCarosuel = ({ app: { currentUser } }) => {
  return (
    <div className="card_carosuel">
      <h3 style={{ margin: '0%' }}>Your Cards</h3>
      <div className="cards">
        {currentUser &&
          currentUser.cards.map(el => <CreditCard cardObj={el} key={uuid()} />)}

        <CreditCard />
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  app: state.app,
});
export default connect()(CardCarosuel);
