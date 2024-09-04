import { CONFIG } from '@/config'
import { MOCKS } from '@/__mocks__'
import type { Report } from '@/@types'

const API_URL = CONFIG.API_URL

const ERRORS = {
  NOT_IMPLEMENTED: 'Not implemented'
}

function throwErr(msg: string): never {
  throw new Error(msg)
}

export class Http {
  private readonly useMockData: boolean
  private readonly apiUrl: string
  private readonly mockDelay: number

  constructor(useMockData?: boolean) {
    this.useMockData = useMockData || CONFIG.USE_MOCK_DATA_FOR_REPORTS
    this.apiUrl = API_URL
    this.mockDelay = CONFIG.MOCK_DELAY
  }

  public async fetchProjectProfit(): Promise<Report | never> {
    if (!this.useMockData) {
      throwErr(ERRORS.NOT_IMPLEMENTED)
    }
    return this.simulateDelay(Promise.resolve(MOCKS.projectProfit as Report))
  }

  public async fetchEmployeePerformance(): Promise<Report | never> {
    if (!this.useMockData) {
      throwErr(ERRORS.NOT_IMPLEMENTED)
    }
    return this.simulateDelay(Promise.resolve(MOCKS.employeePerformance as Report))
  }

  public async fetchProductSales(): Promise<Report | never> {
    if (!this.useMockData) {
      throwErr(ERRORS.NOT_IMPLEMENTED)
    }
    return this.simulateDelay(Promise.resolve(MOCKS.productSales as Report))
  }

  private simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), this.mockDelay)
    })
  }
}
