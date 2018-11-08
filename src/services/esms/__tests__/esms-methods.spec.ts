import ESMS from 'services/esms'

import { getConfig } from 'config'
import { ERROR_CODES } from 'constants/esms'
import { ESMSSendMessageArgs } from '../esms-interfaces'

jest.mock('axios')

const config = getConfig().services.eSMS

describe('eSMS getBalance()', async () => {
  it('should resolve a number that is greater than 0', async () => {
    const esms = new ESMS(config)
    expect.assertions(1)

    const balance = await esms.getBalance()

    return expect(balance).toBeGreaterThan(0)
  })

  it('should throw correct error message if authConfig is wrong', async () => {
    const esms = new ESMS({
      API_KEY: '__WRONG_API_KEY__',
      SECRET_KEY: '__WRONG_SECRET_KEY',
    })
    expect.assertions(1)

    await expect(esms.getBalance()).rejects.toEqual(
      new Error('Authentication failed. Incorrect API_KEY nor SECRET_KEY.'),
    )
  })
})

describe('eSMS getBrandNameList()', async () => {
  it('should get a list of brand names', async () => {
    const esms = new ESMS(config)
    expect.assertions(1)

    const brandNames = await esms.getBrandNameList()

    expect(brandNames.length).toBeGreaterThan(0)
  })

  it('should throw correct error message if authConfig is wrong', async () => {
    const esms = new ESMS({
      API_KEY: '__WRONG_API_KEY__',
      SECRET_KEY: '__WRONG_SECRET_KEY',
    })
    expect.assertions(1)

    await expect(esms.getBrandNameList()).rejects.toEqual(
      new Error(ERROR_CODES['101']),
    )
  })
})

describe('eSMS sendMessage()', async () => {
  it('should send SMS properly', async () => {
    const esms = new ESMS(config)
    expect.assertions(1)

    const messageInfo: ESMSSendMessageArgs = {
      phone: '0979477635',
      message: 'Test message jest',
      type: 2,
      brandName: 'STORELAMMOC',
      sandBox: true,
    }

    await expect(esms.sendMessage(messageInfo)).resolves.toBeDefined()
  })

  it('should throw error when phone number is invalid', async () => {
    const esms = new ESMS(config)
    expect.assertions(1)

    const messageInfo: ESMSSendMessageArgs = {
      phone: '0979477XXX',
      message: 'Test message jest',
      type: 2,
      brandName: 'STORELAMMOC',
      sandBox: true,
    }

    await expect(esms.sendMessage(messageInfo)).rejects.toBeDefined()
  })

  it('should throw correct error message if brand name is undefined', async () => {
    const esms = new ESMS(config)
    expect.assertions(1)

    await expect(
      esms.sendMessage({
        phone: '0979477635',
        message: 'Test message jest',
        type: 2,
      }),
    ).rejects.toEqual(new Error(ERROR_CODES['104']))
  })
})
