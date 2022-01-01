import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import loginStyle from './loginStyle.scss';
import { loginValidilityCheck } from '../../actions/userActions';

const LoginComponent = ({
  setShowApp,
  setShowLogoutForm,
  loginValidilityCheck,
  app: { accounts },
}) => {
  const [user, setUser] = useState('');
  const [userPin, setUserPin] = useState('');

  const onUserChange = e => {
    setUser(e.target.value);
  };
  const onUserPinChange = e => {
    setUserPin(+e.target.value);
  };
  const onLoginSubmit = e => {
    e.preventDefault();

    const isLoginvalid = loginValidilityCheck(user, userPin, accounts);

    setShowApp(isLoginvalid);
    setShowLogoutForm(false);
  };
  return (
    <Fragment>
      <form className="login_form" onSubmit={onLoginSubmit}>
        <input
          type="text"
          placeholder="user"
          onChange={onUserChange}
          value={user}
        />
        <input
          type="text"
          placeholder="PIN"
          maxLength={4}
          onChange={onUserPinChange}
          value={userPin}
        />
        <button type="submit">login</button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps, { loginValidilityCheck })(
  LoginComponent
);
