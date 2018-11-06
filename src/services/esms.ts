import SMSService, { ServiceOptions } from 'services'

export interface ESMSAuthConfig {
  apiKey: string
  secretKey: string
}

class ESMS extends SMSService<ESMSAuthConfig> {
  constructor(authConfig: ESMSAuthConfig, serviceOptions?: ServiceOptions) {
    super(authConfig, serviceOptions)

    this.loglevel.info('eSMS service initialized')
  }
}

export default ESMS
