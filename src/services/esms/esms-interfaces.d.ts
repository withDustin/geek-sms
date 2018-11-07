export interface ESMSAuthConfig {
  API_KEY: string
  SECRET_KEY: string
}

export interface ESMSGetBalanceResponse {
  Balance: number
  CodeResponse: string
  UserID: number
  ErrorMessage?: string
}

export interface ESMSBrandName {
  Brandname: string
  Type: 1 | 2
}

export interface ESMSGetBrandNameListResponse {
  CodeResponse: string
  ListBrandName: ESMSBrandName[]
}
