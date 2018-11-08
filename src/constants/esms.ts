export const BASE_URL = 'http://rest.esms.vn/MainService.svc/json'
export const ERROR_CODES = {
  // 99: 'Something went wrong. Please try again.',
  100: 'Request succeeded.',
  101: 'Authentication failed. Incorrect API_KEY nor SECRET_KEY.',
  102: 'Account suspended.',
  103: "Account balance isn't enough to send message.",
  104: 'Incorrect brand name code.',
}

export const BRAND_NAME_TYPES = {
  1: 'Advertising',
  2: 'CustomerCare',
}

export default {
  BASE_URL,
  ERROR_CODES,
}
