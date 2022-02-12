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

/**ACTION-IMPORTS */
import { calcSummaries, createCardMovements } from '../../actions/userActions';

const RightPaneComponent = ({
  app: { currentUser, incomeSumm, transferSumm, movements },
  calcSummaries,
  createCardMovements,
}) => {
  useEffect(() => {
    if (currentUser) {
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
      setCardsMovements(
        dates.current.map((el, id) =>
          dates.current
            .map(el =>
              currentUser.cards.map(el2 =>
                el2.cardMvts.filter(
                  el3 => new Date(el3.mvtDate).toLocaleDateString() === el
                )
              )
            )
            .flat()
            .filter(arrEl => arrEl.length > 0)
        )[0]
      );

      maxCard.current = currentUser.cards.length;
    }
    //eslint-disable-next-line
  }, [currentUser]);

  /////////////STATES////////////////////////////
  const [userPin, setUserPin] = useState('');
  const [user, setUser] = useState('');
  const [showApp, setShowApp] = useState(false);
  const [showLogoutForm, setShowLogoutForm] = useState(true);
  const [cardsMovements, setCardsMovements] = useState([]);

  /////////////REFS////////////////////////////
  const maxCard = useRef(0);
  let [currentCard, setCurrentCard] = useState(0);

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
    if (currentCard === maxCard.current) return;

    setCurrentCard(currentCard + 1);
    setCardsMovements(
      dates.current.map((el, id) =>
        dates.current
          .map(el =>
            currentUser.cards[currentCard].cardMvts.filter(
              el3 => new Date(el3.mvtDate).toLocaleDateString() === el
            )
          )
          .filter(arrEl => arrEl.length > 0)
      )[0]
    );
  };

  const prevCard = () => {
    if (currentCard === 0) return;

    setCurrentCard(currentCard - 1);
    setCardsMovements(
      dates.current.map((el, id) =>
        dates.current
          .map(el =>
            currentUser.cards[
              currentCard === maxCard.current
                ? currentCard - 2
                : currentCard - 1
            ].cardMvts.filter(
              el3 => new Date(el3.mvtDate).toLocaleDateString() === el
            )
          )
          .filter(arrEl => arrEl.length > 0)
      )[0]
    );
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
            {movements.length > 0 ? (
              <BalanceComponent
                cardMovements={
                  currentCard === maxCard.current
                    ? movements[0]
                    : movements[currentCard]
                }
              />
            ) : (
              ''
            )}
            <PaymentComponent />
            <div className="transactions_container">
              <div className="summaries">
                <span style={{ color: 'green' }}>
                  {incomeSumm && incomeSumm}
                </span>
                <span style={{ color: 'red' }}>
                  {transferSumm && transferSumm}
                </span>
              </div>
              {cardsMovements.length > 0 &&
                cardsMovements.map((el, i) => (
                  <TransactionItem transActions={el} key={i} />
                ))}
            </div>

            <div className="card_carosuel">
              <h3 style={{ margin: '0%' }}>Your Cards</h3>
              <div className="cards">
                <button onClick={prevCard}>⬅️</button>
                <button onClick={nextCard}>➡️</button>
                {currentUser && (
                  <CreditCard
                    cardObj={
                      currentCard === maxCard.current
                        ? currentUser.cards[0]
                        : currentUser.cards[currentCard]
                    }
                  />
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
export default connect(mapStateToProps, { calcSummaries, createCardMovements })(
  RightPaneComponent
);
