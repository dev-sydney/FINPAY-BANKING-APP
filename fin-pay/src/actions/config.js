/**
 * Validates the inputted the credentials and returns a resolved value if the credentials are valid or returns a rejected value when the credentials are invalid
 * @param {string} user username of the account
 * @param {number} pin pin of the account
 * @returns {Promise} resolve | reject
 */
export const loginValidilityCheck = async (user, pin) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === 'sot' && pin === 2709) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};
