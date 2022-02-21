import {
  SET_CURRENT,
  INCOME_SUMMARY,
  TRANSFERS_SUMMARY,
  TRANSFER_MONEY,
  UPDATE_RECIVER_ACC,
  UPDATE_SENDER_ACC,
  CARD_TRANSACTIONS,
  CC_MOVEMENTS,
} from '../actions/types';

const initialState = {
  currentUser: null,
  incomeSumm: null,
  transferSumm: null,
  cardTransactions: [],
  ccMovements: null,

  accounts: [
    {
      owner: 'ss',
      ownerFullName: 'Sarah Smith',
      movements: [],
      interestRate: 1,
      pin: 4444,
      movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2022-01-25T14:18:46.235Z',
        '2021-02-05T16:33:06.386Z',
      ],
      locale: 'en-US',
      currency: 'GHS',
      cards: [
        {
          cardHolder: 'Sarah Smith',
          expiry: '09/23',
          type: 'Visa',
          CardNumber: 474747474747,
          cardMvts: [
            {
              id: 0,
              mvtAmt: 430,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2019-11-01T13:15:33.035Z',
            },
            {
              id: 1,
              mvtAmt: 1000,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2019-11-30T09:48:16.867Z',
            },
            {
              id: 2,

              mvtAmt: 700,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2019-12-25T06:04:23.907Z',
            },
          ],
        },
        {
          cardHolder: 'Sarah Smith',
          expiry: '09/23',
          type: 'Master-card',
          CardNumber: 5454_5454_5454,
          cardMvts: [
            {
              id: 0,
              mvtAmt: 50,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2022-01-25T14:18:46.235Z',
            },
            {
              id: 1,
              mvtAmt: 90,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-02-05T16:33:06.386Z',
            },
          ],
        },
      ],
    },
    {
      owner: 'sot',
      ownerFullName: 'Sydney Tetteh',
      movements: [],
      interestRate: 1.5,
      pin: 2709,
      movementsDates: [
        '2021-05-17T07:32:21.364Z',
        '2021-05-16T00:10:00.000Z',
        '2021-05-16T00:00:00.000Z',
        '2021-06-14T00:00:00.000Z',
        '2021-06-10T00:00:00.000Z',
        '2021-06-12T00:32:20.364Z',
        '2021-04-16T00:00:00.000Z',
        '2021-07-26T12:01:20.894Z',
      ],
      locale: 'en-US',
      currency: 'GHS',
      cards: [
        {
          id: 0,
          cardHolder: 'Sydney Tetteh',
          expiry: '05/27',
          type: 'Visa',
          CardNumber: 4848_4848_4848,
          cardMvts: [
            {
              id: 0,
              mvtAmt: 530,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-05-17T07:32:21.364Z',
            },
            {
              id: 1,
              mvtAmt: 200,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-05-16T00:10:00.000Z',
            },
            {
              id: 2,
              mvtAmt: 1000,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-05-16T00:00:00.000Z',
            },
            {
              id: 3,
              mvtAmt: 700,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-06-14T00:00:00.000Z',
            },
          ],
        },
        {
          id: 1,
          cardHolder: 'Sydney Tetteh',
          expiry: '09/23',
          type: 'Master-card',
          CardNumber: 5454_5454_5454,
          cardMvts: [
            {
              id: 0,
              mvtAmt: 90,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-06-10T00:00:00.000Z',
            },
            {
              id: 1,
              mvtAmt: -100,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-06-12T00:32:20.364Z',
            },
            {
              id: 2,
              mvtAmt: 600,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-04-16T00:00:00.000Z',
            },
            {
              id: 3,
              mvtAmt: -50,
              mvtReference: 'ref',
              mvtWith: 'reciept/Sender',
              mvtDate: '2021-07-26T12:01:20.894Z',
            },
          ],
        },
      ],
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        currentUser: action.payload[0],
        movements: action.payload[1],
      };
    case INCOME_SUMMARY:
      return {
        ...state,
        incomeSumm: action.payload,
      };
    case TRANSFERS_SUMMARY:
      return {
        ...state,
        transferSumm: action.payload,
      };
    case TRANSFER_MONEY:
      return {
        ...state,
        movements: [...state.movements, action.payload],
      };
    case UPDATE_SENDER_ACC:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter(acc => acc.owner !== action.payload.owner),
          action.payload,
        ],
      };
    case UPDATE_RECIVER_ACC:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter(acc => acc.owner !== action.payload.owner),
          action.payload,
        ],
      };
    case CARD_TRANSACTIONS:
      return {
        ...state,
        cardTransactions: action.payload,
      };
    case CC_MOVEMENTS:
      return {
        ...state,
        ccMovements: action.payload,
      };
    default:
      return state;
  }
};
/*
TODO:
1. IMPLEMENT THE CARD OBJECTS
 */
