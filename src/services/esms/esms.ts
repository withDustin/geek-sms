import axios from 'axios'

import SMSService, { ServiceOptions } from 'services'

import { BASE_URL, BRAND_NAME_TYPES, ERROR_CODES } from 'constants/esms'
import { BrandName } from 'types/brand-name'
import {
  ESMSAuthConfig,
  ESMSGetBalanceResponse,
  ESMSGetBrandNameListResponse,
} from './esms-interfaces'

/**
 * @see Documentation at https://drive.google.com/file/d/0ByZdl9Zt3D_fbWFkQ3pHc0I3Q0xSelAxMjFXWXRtTWdETGVr/view
 */
class ESMS extends SMSService<ESMSAuthConfig> {
  constructor(authConfig: ESMSAuthConfig, serviceOptions?: ServiceOptions) {
    super(authConfig, serviceOptions)

    this.logger.info('eSMS service initialized with', authConfig)
  }

  public getBalance = async () => {
    /** API Template:
     * http://rest.esms.vn/MainService.svc/xml/GetBalance/{ApiKey}/{SecretKey}
     */

    const { API_KEY, SECRET_KEY } = this.authConfig
    const getBalanceURL = `${BASE_URL}/GetBalance/${API_KEY}/${SECRET_KEY}`

    this.logger.debug(`Getting eSMS balance by GET ${getBalanceURL}`)

    try {
      const data: ESMSGetBalanceResponse = (await axios.get(getBalanceURL)).data
      const balance = data.Balance

      if (data.CodeResponse === '100') {
        this.logger.debug(data)
        this.logger.info(`Your balance is ${balance}`)

        return balance
      }

      throw new Error(ERROR_CODES[data.CodeResponse] || data.ErrorMessage)
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }

  public getBrandNameList = async () => {
    /**
     * API template:
     * http://rest.esms.vn/MainService.svc/json/GetListBrandname/{ApiKey}/{SecretKey}
     */

    const { API_KEY, SECRET_KEY } = this.authConfig
    const getBrandNameListURL = `${BASE_URL}/GetListBrandname/${API_KEY}/${SECRET_KEY}`

    this.logger.debug(
      `Getting eSMS brand name list by GET ${getBrandNameListURL}`,
    )

    try {
      const data: ESMSGetBrandNameListResponse = (await axios.get(
        getBrandNameListURL,
      )).data

      if (data.CodeResponse === '100') {
        const brandNames = data.ListBrandName.map(
          (brandName): BrandName => ({
            name: brandName.Brandname,
            type: brandName.Type,
          }),
        )

        this.logger.debug(data)
        this.logger.info(
          `You have ${brandNames.length} brand name(s): ${brandNames
            .map(brandName => brandName.name)
            .join(', ')}`,
        )

        return brandNames
      }

      throw new Error(ERROR_CODES[data.CodeResponse] || data.ErrorMessage)
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }

  public sendMessage = () => {
    /** API template:
     * http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?
     * Phone={Phone}&Content={Content}&ApiKey={ApiKey}&SecretKey={SecretKey}
     * &IsUnicode={IsUnicode}&Brandname={Brandname}&SmsType={SmsType}
     */
  }
}

export default ESMS
