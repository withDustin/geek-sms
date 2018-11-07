import * as Chance from 'chance'
import { merge } from 'lodash'

const chance = new Chance()

const config = {
  services: {
    eSMS: {
      API_KEY: chance.string(),
      SECRET_KEY: chance.string(),
    },
  },
}

export const getConfig = () => {
  let localConfig: any = {}

  try {
    /**
     * You can create `local.config.ts` with the same structure with
     * `config.local.example.ts` to override the randomized config above.
     */
    localConfig = require('./config.local').default
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('No config.local.ts found. Using default config.')
  }

  return merge(config, localConfig)
}
