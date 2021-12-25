import { SET_CURRENT, INCOME_SUMMARY, TRANSFERS_SUMMARY } from './types';

/**
 * This function is responsible for checking the login credentials and dispatches the valid account Object to the userReducer
 * @param {string} userName represents the user name that is entered
 * @param {number} pin represents the pin that is entered
 * @param {Array} accounts represents all the available accounts
 * @returns {boolean} validUserOrNot a boolean variable based on whether the account exists or not
 */
export const loginValidilityCheck = (userName, pin, accounts) => dispatch => {
  const validAccount = accounts.find(
    acc => acc.owner === userName && acc.pin === pin
  );

  if (validAccount) {
    dispatch({
      type: SET_CURRENT,
      payload: validAccount,
    });
  }

  return accounts.includes(validAccount);
};

/**
 * This Functioin Is Responsible For Calculating The User's Transaction Summaries eg Total incomes & Transfers
 * @param {*} acc The Currently Logged In Account Object
 * @returns
 */
export const calcSummaries = acc => dispatch => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  dispatch({
    type: INCOME_SUMMARY,
    payload: incomes,
  });

  const transfers = acc.movements
    .filter(mov => mov < 0)
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  dispatch({
    type: TRANSFERS_SUMMARY,
    payload: transfers,
  });
};

export const setMovementDate = () => {
  const movDate = new Date().toISOString();
  return movDate;
};
