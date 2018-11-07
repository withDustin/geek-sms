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
  ListBrandName: ESMSBrandName[]
}
