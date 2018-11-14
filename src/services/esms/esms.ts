import axios from 'axios'
import { stringify } from 'querystring'

import SMSService from '../index'

import {
  BASE_URL,
  BASE_URL_HTTP,
  BASE_URL_HTTPS,
  BRAND_NAME_TYPES,
  ERROR_CODES,
} from '../../constants/esms'
import { BrandName } from '../../interfaces/brand-name'
import {
  ESMSAuthConfig,
  ESMSGetBalanceResponse,
  ESMSGetBrandNameListResponse,
  ESMSSendMessageArgs,
  ESMSSendMessageResponse,
  ESMSServiceOptions,
} from './esms-interfaces'

/**
 * @see Documentation at https://drive.google.com/file/d/0ByZdl9Zt3D_fbWFkQ3pHc0I3Q0xSelAxMjFXWXRtTWdETGVr/view
 */
class ESMS extends SMSService<ESMSAuthConfig> {
  BASE_URL = BASE_URL
  constructor(
    authConfig: ESMSAuthConfig,
    serviceOptions: ESMSServiceOptions = { loglevel: 'silent' },
  ) {
    super(authConfig, serviceOptions)

    if (serviceOptions.baseUrl) this.BASE_URL = serviceOptions.baseUrl
    else {
      this.BASE_URL = serviceOptions.useHttp ? BASE_URL_HTTP : BASE_URL_HTTPS
    }

    this.logger.info('eSMS service initialized with', authConfig)
  }

  public getBalance = async () => {
    /** API Template:
     * http://rest.esms.vn/MainService.svc/xml/GetBalance/{ApiKey}/{SecretKey}
     */

    const { API_KEY, SECRET_KEY } = this.authConfig
    const getBalanceURL = `${this.BASE_URL}/GetBalance/${API_KEY}/${SECRET_KEY}`

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
    const getBrandNameListURL = `${
      this.BASE_URL
    }/GetListBrandname/${API_KEY}/${SECRET_KEY}`

    this.logger.debug(
      `Getting eSMS brand name list by GET ${getBrandNameListURL}`,
    )

    try {
      const data: ESMSGetBrandNameListResponse = (await axios.get(
        getBrandNameListURL,
      )).data

      if (data.CodeResponse === '100') {
        const brandNames = data.ListBrandName!.map(
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

  public sendMessage = async (messageInfo: ESMSSendMessageArgs) => {
    /** API template:
     * http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?
     * Phone={Phone}&Content={Content}&ApiKey={ApiKey}&SecretKey={SecretKey}
     * &IsUnicode={IsUnicode}&Brandname={Brandname}&SmsType={SmsType}
     */

    try {
      const { API_KEY, SECRET_KEY } = this.authConfig
      const messageData = {
        Phone: messageInfo.phone,
        Content: messageInfo.message,
        SmsType: messageInfo.type,
        IsUnicode: messageInfo.unicode || 0,
        Brandname: messageInfo.brandName,
        RequestId: messageInfo.requestId,
        Sandbox: messageInfo.sandBox === true ? 1 : 0,
        ApiKey: API_KEY,
        SecretKey: SECRET_KEY,
      }

      const sendMessageURL = `${
        this.BASE_URL
      }/SendMultipleMessage_V4_get?${stringify(messageData)}`

      this.logger.debug(`Sending message by GET`, sendMessageURL)

      const data: ESMSSendMessageResponse = (await axios.get(sendMessageURL))
        .data

      if (data.CodeResult === '100') {
        const message = {
          id: data.SMSID,
          ...messageInfo,
        }

        this.logger.debug('Message sent successfully', message)

        return message
      }

      this.logger.debug({ data })

      throw new Error(ERROR_CODES[data.CodeResult] || data.ErrorMessage)
    } catch (error) {
      this.logger.error(error)
      return Promise.reject(error)
    }
  }
}

export default ESMS
