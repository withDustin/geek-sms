import SMSService, { ServiceOptions } from 'services'

import { BASE_URL } from 'constants/esms'

export interface ESMSAuthConfig {
  apiKey: string
  secretKey: string
}

class ESMS extends SMSService<ESMSAuthConfig> {
  constructor(authConfig: ESMSAuthConfig, serviceOptions?: ServiceOptions) {
    super(authConfig, serviceOptions)

    this.logger.info('eSMS service initialized')
  }

  public getBalance = () => {
    this.logger.debug(BASE_URL)
  }
}

export default ESMS
