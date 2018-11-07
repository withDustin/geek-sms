import ESMS from 'services/esms'

import { getConfig } from 'config'

const config = getConfig().services.eSMS

describe('eSMS API', async () => {
  let esms: ESMS

  it('should init without errors', () => {
    esms = new ESMS(config, { loglevel: 'debug' })
  })

  it('getBalance() should resolve a number that greater than 0', async () => {
    expect.assertions(1)

    const balance = await esms.getBalance()

    return expect(balance).toBeGreaterThan(0)
  })

  it('getBrandNameList() should resolve a list of BrandName', async () => {
    expect.assertions(1)

    const brandNames = await esms.getBrandNameList()
    return expect(brandNames).toBeDefined()
  })
})
