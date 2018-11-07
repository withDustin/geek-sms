// tslint:disable:no-console
import * as Chance from 'chance'

import { getConfig } from 'config'
import ESMS, { ESMSAuthConfig } from 'services/esms'

const chance = new Chance()
const config = getConfig().services.eSMS

describe('eSMS constructoring', () => {
  let authConfig: ESMSAuthConfig = {
    API_KEY: config.API_KEY,
    SECRET_KEY: config.SECRET_KEY,
  }

  let eSMS: ESMS

  it('should run constructor() without crash', () => {
    eSMS = new ESMS(authConfig)

    expect(eSMS.authConfig).toEqual(authConfig)
  })

  it('authConfig should be updated after ran setAuthConfig()', () => {
    authConfig = {
      API_KEY: chance.string(),
      SECRET_KEY: chance.string(),
    }

    eSMS.setAuthConfig(authConfig)
    expect(eSMS.authConfig).toEqual(authConfig)
  })

  it('default logLevel should be silent', () => {
    expect(eSMS.logger.getLevel()).toBe(eSMS.logger.levels.SILENT)
  })

  it('logLevel should be assigned correctly to TRACE', () => {
    const eSMS = new ESMS(authConfig, { loglevel: 'trace' })

    expect(eSMS.logger.getLevel()).toBe(eSMS.logger.levels.TRACE)
  })
})
