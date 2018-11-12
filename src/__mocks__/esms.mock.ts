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
            Brandname: 'STORELAMMOC',
            Type: 1,
          },
          {
            Brandname: 'STORELAMMOC',
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

  // Calls sendMessage() with good data
  if (
    url ===
    'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=0979477635&Content=Test%20message%20jest&SmsType=2&IsUnicode=0&Brandname=STORELAMMOC&RequestId=&Sandbox=1&ApiKey=__SUCCESS_API_KEY__&SecretKey=__SUCCESS_SECRET_KEY__'
  ) {
    return {
      data: {
        CodeResult: '100',
        CountRegenerate: 0,
        SMSID: '871a70d0-0c6c-4b47-9664-5745603da2d0169',
      },
    }
  }

  // Calls sendMessage() with empty brand name
  if (
    url ===
    'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=0979477635&Content=Test%20message%20jest&SmsType=2&IsUnicode=0&Brandname=&RequestId=&Sandbox=0&ApiKey=__SUCCESS_API_KEY__&SecretKey=__SUCCESS_SECRET_KEY__'
  ) {
    return {
      data: {
        CodeResult: '104',
        CountRegenerate: 0,
        ErrorMessage: 'Brand name code is not exist',
      },
    }
  }
}
