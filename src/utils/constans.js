export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'ac21fd6673294e97b9b11bdf6b998a7e';
export const REACT_APP_STRIPE_KEY =
  'pk_test_51M9eW0KWAGAFt5ISp7zjCaW8X0BKJ0sE7cuMpHTAu44ob7grzsMDzLXwzmEV5LH1Ok0Vi052kkKIVdkPCddqKdAr00OKoFYTAv';

export const calculateCreatedTime = (timeCreated) => {
  let periods = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  let diff = Date.now() - timeCreated;

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key + 's'} ago`;
    }
  }

  return 'Just now';
};
