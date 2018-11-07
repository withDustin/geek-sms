import axios from 'axios'

import SMSService, { ServiceOptions } from 'services'

import { BASE_URL } from 'constants/esms'

export interface ESMSAuthConfig {
  API_KEY: string
  SECRET_KEY: string
}

class ESMS extends SMSService<ESMSAuthConfig> {
  constructor(authConfig: ESMSAuthConfig, serviceOptions?: ServiceOptions) {
    super(authConfig, serviceOptions)

    this.logger.info('eSMS service initialized with', authConfig)
  }

  public getBalance = async () => {
    const { API_KEY, SECRET_KEY } = this.authConfig
    const getBalanceURL = `${BASE_URL}/GetBalance/${API_KEY}/${SECRET_KEY}`

    this.logger.debug(`Getting eSMS balance by GET ${getBalanceURL}`)

    try {
      const respond = await axios.get(getBalanceURL)
      const balance = respond.data.Balance

      this.logger.debug(`Your balance is ${balance}`)

      return balance
    } catch (error) {
      this.logger.trace(error)
      return Promise.reject(error)
    }
  }
}

export default ESMS
