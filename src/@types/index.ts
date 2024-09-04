type HeaderType = 'string' | 'int' | 'float' | 'boolean'
type AlignType = 'left' | 'right' | 'center'

export interface ReportHeader {
  id: string
  type: HeaderType
  caption: string
  align: AlignType
}

export interface DataValue {
  data: number
  color?: string
}

export type ReportData = (string | number | boolean | DataValue)[]

export interface Report {
  header: ReportHeader[]
  data: ReportData[]
}

export enum REPORT_NAME {
  PROJECT_PROFIT = 'projectProfit',
  EMPLOYEE_PERFORMANCE = 'employeePerformance',
  PRODUCT_SALES = 'productSales'
}
