export interface ESMSAuthConfig {
  API_KEY: string
  SECRET_KEY: string
}

export interface ESMSResponse {
  CodeResponse: string
  ErrorMessage?: string
}

export interface ESMSGetBalanceResponse extends ESMSResponse {
  Balance: number
  UserID: number
}

export interface ESMSBrandName {
  Brandname: string
  Type: 1 | 2
}

export interface ESMSGetBrandNameListResponse extends ESMSResponse {
  ListBrandName?: ESMSBrandName[]
}

export enum ESMSMessageType {
  /** Advertising message using brand name (send to >= 20 numbers). */
  AdvertisingBrandName = 1,
  /** Customer care message using brand name (send to 1 or more numbers). */
  CustomerCareBrandName = 2,
  /** For both advertising or customer care, using a static phone number to send. */
  StaticNumber = 4,
  /** Static 6394 number. Used for customer care or confirmation. */
  StaticConfirmation = 6,
  /** Use a static 10-digit number for customer care. Must registry message content first. */
  Static10Digit = 8,
}

export interface ESMSSendMessageArgs {
  /** Could be one or multi numbers. Eg: `09191191199` or `09191191199,09181181188`. */
  phone: string
  /** Message content. */
  message: string
  type: ESMSMessageType
  unicode?: 0 | 1
  brandName?: string
  sandBox?: boolean
  requestId?: string
}

export interface ESMSSendMessageResponse extends ESMSResponse {
  SMSID?: string
  CodeResult: string
}
