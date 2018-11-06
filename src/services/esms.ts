import SMSService from 'services'

interface ESMSAuth {
  apiKey: string
  secretKey: string
}

class ESMS extends SMSService<ESMSAuth> {}

export default ESMS
