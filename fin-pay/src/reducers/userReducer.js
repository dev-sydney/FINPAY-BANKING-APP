const initialState = {
  owner: null,
  movements: null,
  interestRate: null,
  movementDates: null,
  pin: null,
  locale: null,
  currency: null,
};

export default (state = initialState, action) => {
  switch (action.payload) {
    default:
      return state;
  }
};
