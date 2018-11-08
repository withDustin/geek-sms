import { merge } from 'lodash'

const config = {
  services: {
    eSMS: {
      API_KEY: '__SUCCESS_API_KEY__',
      SECRET_KEY: '__SUCCESS_SECRET_KEY__',
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
