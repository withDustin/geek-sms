class SMSService<AuthConfig> {
  authConfig: AuthConfig

  constructor(authConfig: AuthConfig, options?: any) {
    this.authConfig = authConfig
    console.log(options)
  }
}

export default SMSService

// Child-services exports
export { default as ESMS } from './esms'
