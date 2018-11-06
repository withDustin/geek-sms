// tslint:disable:no-console
import * as Chance from 'chance'

import { ESMS } from 'services'
import { ESMSAuthConfig } from 'services/esms'

const chance = new Chance()

describe('eSMS service', () => {
  let authConfig: ESMSAuthConfig = {
    apiKey: chance.string(),
    secretKey: chance.string(),
  }

  let eSMS: ESMS

  it('should run constructor() without crash', () => {
    eSMS = new ESMS(authConfig)

    expect(eSMS.authConfig).toEqual(authConfig)
  })

  it('authConfig should be updated after ran setAuthConfig()', () => {
    authConfig = {
      apiKey: chance.string(),
      secretKey: chance.string(),
    }

    eSMS.setAuthConfig(authConfig)
    expect(eSMS.authConfig).toEqual(authConfig)
  })

  it('default logLevel should be silent', () => {
    expect(eSMS.loglevel.getLevel()).toBe(eSMS.loglevel.levels.SILENT)
  })

  it('logLevel should be assigned correctly', () => {
    const eSMS = new ESMS(authConfig, { loglevel: 'TRACE' })

    expect(eSMS.loglevel.getLevel()).toBe(eSMS.loglevel.levels.TRACE)
  })
})
