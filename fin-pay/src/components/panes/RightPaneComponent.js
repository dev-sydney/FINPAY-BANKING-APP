/**CORE-IMPORTS */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import paneStyle from './paneStyle.scss';
/**COMPONENT-IMPORTS */
import BalanceComponent from '../overview/balance/BalanceComponent';
import TransactionItem from '../overview/transItem/TransactionItem';
import CardCarosuel from '../overview/cards/CardsCarosuel';
import PaymentComponent from '../overview/payment/PaymentComponent';
import LoginComponent from '../login/LoginComponent';

/**ACTION-IMPORTS */
import { calcSummaries } from '../../actions/userActions';

const RightPaneComponent = ({
  app: { currentUser, incomeSumm, transferSumm },
  calcSummaries,
}) => {
  useEffect(() => {
    if (currentUser) {
      calcSummaries(currentUser);
      dates.current = [
        ...new Set(
          currentUser.movementsDates.map(el =>
            new Date(el).toLocaleDateString()
          )
        ),
      ];
    }
    //eslint-disable-next-line
  }, [currentUser]);

  const [userPin, setUserPin] = useState('');
  const [user, setUser] = useState('');
  const [showApp, setShowApp] = useState(false);
  const [showLogoutForm, setShowLogoutForm] = useState(true);

  const dates = useRef([]);

  const onUserChange = e => {
    setUser(e.target.value);
  };
  const onPinChange = e => {
    setUserPin(e.target.value);
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
            <BalanceComponent />
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
              {dates.current.map((el, id) => (
                <TransactionItem
                  transActions={currentUser.movements.filter(
                    dt => new Date(dt.mvtDate).toLocaleDateString() === el
                  )}
                  key={id}
                />
              ))}
            </div>
            <CardCarosuel />
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  app: state.app,
});
export default connect(mapStateToProps, { calcSummaries })(RightPaneComponent);
