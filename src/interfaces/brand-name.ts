export enum BrandNameType {
  Advertising,
  CustomerCare,
}

export interface BrandName {
  name: string
  type: BrandNameType
}
