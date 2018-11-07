import { BASE_URL } from 'constants/esms'

export const eSMSMockAPI = async (url: string) => {
  if (url.startsWith(`${BASE_URL}/GetBalance/__SUCCESS_API_KEY__`)) {
    return {
      data: {
        Balance: 4422190,
        CodeResponse: '100',
        UserID: 52787,
      },
    }
  }

  // Calls getBalance() with wrong authConfig
  if (url.startsWith(`${BASE_URL}/GetBalance/__WRONG_API_KEY__`)) {
    return {
      data: {
        Balance: 0,
        CodeResponse: '101',
        ErrorMessage: 'Authorize Failed',
        UserID: 0,
      },
    }
  }

  if (url.startsWith(`${BASE_URL}/GetListBrandname/__SUCCESS_API_KEY__`)) {
    return {
      data: {
        CodeResponse: '100',
        ListBrandName: [
          {
            Brandname: 'QCAO_ONLINE',
            Type: 2,
          },
          {
            Brandname: 'TARGEEK.IO',
            Type: 1,
          },
          {
            Brandname: 'TARGEEK.IO',
            Type: 2,
          },
        ],
      },
    }
  }

  // Calls getBrandNameList() with wrong authConfig
  if (url.startsWith(`${BASE_URL}/GetListBrandname/__WRONG_API_KEY__`)) {
    return {
      data: {
        CodeResponse: '101',
        ErrorMessage: 'Authorize Failed',
      },
    }
  }
}
