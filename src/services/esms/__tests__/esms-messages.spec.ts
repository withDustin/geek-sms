import ESMS from 'services/esms'

import { getConfig } from 'config'

const config = getConfig().services.eSMS

describe('eSMS API', async () => {
  let esms: ESMS

  it('should init without errors', () => {
    esms = new ESMS(config, { loglevel: 'debug' })
  })

  it('should check for balance OK', async () => {
    expect.assertions(1)

    const balance = await esms.getBalance()

    return expect(typeof balance).toBe('number')
  })
})
