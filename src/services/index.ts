import * as loglevel from 'loglevel'

export interface ServiceOptions {
  /** Define loglevel for debugging. */
  loglevel: loglevel.LogLevelDesc
}

/** The default value for `serviceOptions` when we don't pass it into constructor. */
const DEFAULT_SERVICE_OPTIONS: Partial<ServiceOptions> = {
  loglevel: 'silent',
}

class SMSService<AuthConfig> {
  authConfig: AuthConfig
  serviceOptions: ServiceOptions
  logger = loglevel

  constructor(
    authConfig: AuthConfig,
    serviceOptions: ServiceOptions = {
      loglevel: 'silent',
    },
  ) {
    this.authConfig = authConfig
    this.serviceOptions = {
      ...DEFAULT_SERVICE_OPTIONS,
      ...serviceOptions,
    }

    this.logger.setLevel(this.serviceOptions.loglevel)
  }

  /** Overrides current `authConfig` by a new value. */
  public setAuthConfig = (authConfig: AuthConfig) => {
    this.authConfig = authConfig
  }
}

export default SMSService
