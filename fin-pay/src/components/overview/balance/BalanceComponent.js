import React, { useEffect, useState } from 'react';
import balStyle from './balStyle.scss';
import { connect } from 'react-redux';

const BalanceComponent = ({ app: { currentUser }, cardMovements }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (cardMovements) {
      setBalance(
        cardMovements.reduce((prev, curr) => {
          return prev + curr;
        }, 0)
      );
    }
    //eslint-disable-next-line
  }, [cardMovements]);

  return (
    <div className="bal_card">
      <p>Your Balance</p>
      <h3>{currentUser ? balance : 800}</h3>
      <p>Saving A/C: xxxxxxxxx6789</p>
    </div>
  );
};

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps, null)(BalanceComponent);
