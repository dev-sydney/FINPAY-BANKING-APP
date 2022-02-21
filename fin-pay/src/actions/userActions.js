import {
  SET_CURRENT,
  INCOME_SUMMARY,
  TRANSFERS_SUMMARY,
  TRANSFER_MONEY,
  UPDATE_RECIVER_ACC,
  UPDATE_SENDER_ACC,
  LOGOUT_USER,
  CARDS_MOVEMENTS,
  CC_MOVEMENTS,
  CARD_TRANSACTIONS,
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

const setMovementDate = () => {
  const movDate = new Date().toISOString();
  return movDate;
};
/**
 * This Function Is Responsible For Calculating The User's Transaction Summaries eg Total incomes & Transfers
 * @param {Object} acc The Currently Logged In Account Object
 * @returns
 */
export const calcSummaries = acc => dispatch => {
  console.log('summaries not available yet');
  /* const incomes = acc.movements
    .filter(mov => {
      return mov.mvtAmt > 0;
    })
    .map(mov => mov.mvtAmt)
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);

  dispatch({
    type: INCOME_SUMMARY,
    payload: incomes,
  });

  const transfers = acc.movements
    .filter(mov => mov.mvtAmt < 0)
    .map(mov => mov.mvtAmt)
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  dispatch({
    type: TRANSFERS_SUMMARY,
    payload: transfers,
  }); */
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
  (recepient, accounts, trnsferAmt, bal, sender, ref, accNum) => dispatch => {
    //Sorting Out The Reciever Object
    const [validRecepient] = accounts.filter(acc => acc.owner === recepient);

    console.log(validRecepient.cards.filter(cd => accNum === cd.CardNumber));

    //Form Validation(Guard Clauses)
    if (+trnsferAmt > bal || !validRecepient) return;
    console.log(trnsferAmt);
    //Updating Both The Movements Of Both The Sender & Reciever
    validRecepient.movements = [
      ...validRecepient.movements,
      {
        mvtAmt: trnsferAmt,
        mvtReference: ref,
        mvtTo: validRecepient.owner,
        mvtDate: setMovementDate(),
      },
    ];
    const newSenderMov = {
      mvtAmt: -trnsferAmt,
      mvtReference: ref,
      mvtTo: sender.owner,
      mvtDate: setMovementDate(),
    };
    sender.movements = [...sender.movements, newSenderMov];

    dispatch({
      type: TRANSFER_MONEY,
      payload: newSenderMov,
    });
    updateAccounts(sender, recepient);
  };
export const LogoutUser = pin => dispatch => {};

export const createCardMovements = acc => dispatch => {
  const { cards } = acc;
  const everyCardMvt = cards.map(el => el.cardMvts.map(cMvt => cMvt.mvtAmt));

  dispatch({
    type: CARD_TRANSACTIONS,
    payload: everyCardMvt,
  });
};

export const loadCCMovements = acc => dispatch => {
  const { cards } = acc;
  const ccMovements = cards.map(el => el.cardMvts);
  dispatch({
    type: CC_MOVEMENTS,
    payload: ccMovements,
  });
};

// TODO:/* //54(MASTER-CARD)//4(VISA) */
