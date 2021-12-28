import {
  SET_CURRENT,
  INCOME_SUMMARY,
  TRANSFERS_SUMMARY,
  TRANSFER_MONEY,
  UPDATE_RECIVER_ACC,
  UPDATE_SENDER_ACC,
} from '../actions/types';

const initialState = {
  currentUser: null,
  incomeSumm: null,
  transferSumm: null,
  movements: [],
  accounts: [
    {
      owner: 'ss',
      ownerFullName: 'Sarah Smith',
      movements: [430, 1000, 700, 50, 90],
      interestRate: 1,
      pin: 4444,
      movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2022-01-25T14:18:46.235Z',
        '2021-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2021-07-26T12:01:20.894Z',
      ],
      locale: 'en-US',
      currency: 'GHS',
    },
    {
      owner: 'sot',
      ownerFullName: 'Sydney Tetteh',
      movements: [530, 1000, 700, 550, 90, -100, 600, -50],
      interestRate: 1.5,
      pin: 2709,
      movementsDates: [
        '2021-05-17T07:32:21.364Z',
        '2021-05-16T00:00:00.000Z',
        '2021-06-14T00:00:00.000Z',
        '2021-05-16T00:00:00.000Z',
        '2021-06-10T00:00:00.000Z',
        '2021-06-12T00:32:20.364Z',
        '2021-04-16T00:00:00.000Z',
      ],
      locale: 'en-US',
      currency: 'GHS',
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
    default:
      return state;
  }
};
