import {
  SET_CURRENT,
  INCOME_SUMMARY,
  TRANSFERS_SUMMARY,
  TRANSFER_MONEY,
  UPDATE_RECIVER_ACC,
  UPDATE_SENDER_ACC,
} from './types';

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
      payload: [validAccount, validAccount.movements],
    });
  }

  return accounts.includes(validAccount);
};

/**
 * This Function Is Responsible For Calculating The User's Transaction Summaries eg Total incomes & Transfers
 * @param {Object} acc The Currently Logged In Account Object
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
/**
 * Function Responsible For dispatching the types that will update the accounts movements
 * Whenever a transaction is made
 * @param {Object} sender The account Sending The Funds
 * @param {Object} reciever The 1account Receiving The Funds
 */
const updateAccounts = (sender, reciever) => dispatch => {
  dispatch({
    type: UPDATE_RECIVER_ACC,
    payload: reciever,
  });
  dispatch({
    type: UPDATE_SENDER_ACC,
    payload: sender,
  });
};
/**
 * Checks Whether The Sender Has Enough Funds And isn't SendIng Funds To Him/Herself
 * @param {string} recepient The Receivers username
 * @param {object} accounts An Array of all Accounts
 * @param {number} trnsferAmt The Amount The User is Transferring
 * @param {number} bal Availabe Balance Of The User
 * @param {object} sender A sender Object
 */
export const TransactionValidility =
  (recepient, accounts, trnsferAmt, bal, sender) => dispatch => {
    //Sorting Out The Reciever Object
    const [validRecepient] = accounts.filter(acc => acc.owner === recepient);

    //Form Validation(Guard Clauses)
    if (trnsferAmt > bal || !validRecepient) return;

    //Updating Both The Movements Of Both The Sender & Reciever
    validRecepient.movements = [...validRecepient.movements, trnsferAmt];
    sender.movements = [...sender.movements, -trnsferAmt];

    dispatch({
      type: TRANSFER_MONEY,
      payload: -trnsferAmt,
    });
    updateAccounts(sender, recepient);
  };

export const setMovementDate = () => {
  const movDate = new Date().toISOString();
  return movDate;
};
