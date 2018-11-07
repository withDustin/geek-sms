import { BASE_URL as ESMS_BASE_URL } from 'constants/esms'
import { eSMSMockAPI } from './esms.mock'

const axios = jest.genMockFromModule('axios') as any

axios.get = async (url: string) => {
  if (url.startsWith(ESMS_BASE_URL)) return eSMSMockAPI(url)
}

module.exports = axios
