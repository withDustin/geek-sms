import ESMS from 'services/esms'

import { getConfig } from 'config'

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

    expect(brandNames!.length).toBeGreaterThan(0)
  })

  it('should throw correct error message if authConfig is wrong', async () => {
    const esms = new ESMS({
      API_KEY: '__WRONG_API_KEY__',
      SECRET_KEY: '__WRONG_SECRET_KEY',
    })
    expect.assertions(1)

    await expect(esms.getBrandNameList()).rejects.toEqual(
      new Error('Authentication failed. Incorrect API_KEY nor SECRET_KEY.'),
    )
  })
})
