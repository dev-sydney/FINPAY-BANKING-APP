/**CORE-IMPORTS */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import paneStyle from './paneStyle.scss';
/**COMPONENT-IMPORTS */
import BalanceComponent from '../overview/balance/BalanceComponent';
import TransactionItem from '../overview/transItem/TransactionItem';
import PaymentComponent from '../overview/payment/PaymentComponent';
import LoginComponent from '../login/LoginComponent';
import CreditCard from '../credit-card/CreditCard';
import TransactionsContainer from '../overview/transactions/TransactionsContainer';

/**ACTION-IMPORTS */
import {
  calcSummaries,
  createCardMovements,
  loadCCMovements,
} from '../../actions/userActions';

const RightPaneComponent = ({
  app: { currentUser, incomeSumm, transferSumm, cardTransactions, ccMovements },
  calcSummaries,
  createCardMovements,
  loadCCMovements,
}) => {
  useEffect(() => {
    if (currentUser) {
      loadCCMovements(currentUser);
      calcSummaries(currentUser);
      createCardMovements(currentUser);
      dates.current = [
        ...new Set(
          currentUser.movementsDates.map(el =>
            new Date(el).toLocaleDateString()
          )
        ),
      ];
      //SETTING THE CREDIT CARD MOVEMENTS

      maxCard.current = currentUser.cards.length;
    }
    //eslint-disable-next-line
  }, [currentUser]);

  /////////////STATES////////////////////////////
  const [userPin, setUserPin] = useState('');
  const [user, setUser] = useState('');
  const [showApp, setShowApp] = useState(false);
  const [showLogoutForm, setShowLogoutForm] = useState(true);
  let [currentCard, setCurrentCard] = useState(0);

  /////////////REFS////////////////////////////
  const maxCard = useRef(0);

  const dates = useRef([]);
  //////////////ONCHANGE HANDLER FUNCTIONS
  const onUserChange = e => {
    setUser(e.target.value);
  };
  const onPinChange = e => {
    setUserPin(e.target.value);
  };
  //////////////UTILITY FUNCTIONS
  const nextCard = () => {
    if (currentCard === maxCard.current - 1) return;

    setCurrentCard(currentCard + 1);
  };

  const prevCard = () => {
    if (currentCard === 0) return;

    setCurrentCard(currentCard - 1);
  };

  return (
    <div className="right_pane">
      {!showApp || showLogoutForm ? (
        <LoginComponent
          setShowApp={setShowApp}
          setShowLogoutForm={setShowLogoutForm}
        />
      ) : (
        <div className="overview_board">
          <header className="header_panel">
            <h3>Overiew</h3>
            <p>
              Hi {currentUser && currentUser.ownerFullName.split(' ')[0]},
              welcome back
            </p>
            <button
              onClick={() => {
                setShowApp(false);
                setShowLogoutForm(false);
              }}
            >
              Logout
            </button>
          </header>
          <div className="dash_board">
            {cardTransactions.length > 0 ? (
              <BalanceComponent cardMovements={cardTransactions[currentCard]} />
            ) : (
              ''
            )}

            {cardTransactions.length > 0 ? (
              <PaymentComponent cardMovements={cardTransactions[currentCard]} />
            ) : (
              ''
            )}
            {ccMovements ? (
              <TransactionsContainer ccMovements={ccMovements[currentCard]} />
            ) : (
              ''
            )}

            <div className="card_carosuel">
              <h3 style={{ margin: '0%' }}>Your Cards</h3>
              <div className="cards">
                <button onClick={prevCard}>⬅️</button>
                <button onClick={nextCard}>➡️</button>
                {currentUser && (
                  <CreditCard cardObj={currentUser.cards[currentCard]} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  app: state.app,
});
export default connect(mapStateToProps, {
  calcSummaries,
  createCardMovements,
  loadCCMovements,
})(RightPaneComponent);
