import { Http } from '@/api'
import { type DataValue, type Report, REPORT_NAME } from '@/@types'
import { ref } from 'vue'
import type { SortDirection } from '@/@types/components'
import { deepToRaw } from '@/lib/utils'
import { CONFIG } from '@/config'

const http = new Http(CONFIG.USE_MOCK_DATA_FOR_REPORTS)

const method = {
  [REPORT_NAME.PROJECT_PROFIT]: http.fetchProjectProfit.bind(http),
  [REPORT_NAME.EMPLOYEE_PERFORMANCE]: http.fetchEmployeePerformance.bind(http),
  [REPORT_NAME.PRODUCT_SALES]: http.fetchProductSales.bind(http)
}

const cachedReports = new Map<REPORT_NAME, Report>()

export const useFetchReport = () => {
  const report = ref<Report | null>(null)
  const error = ref<string | null | unknown>(null)
  const loading = ref<boolean>(false)
  const currentSortField = ref<string>('')
  const currentSortDirection = ref<SortDirection>('default')
  const _type = ref<REPORT_NAME | null>(null)

  async function fetchReport(type: REPORT_NAME) {
    loading.value = true
    error.value = null
    currentSortField.value = ''
    currentSortDirection.value = 'default'
    _type.value = type
    try {
      report.value = await method[type]()
      if (CONFIG.USE_MOCK_DATA_FOR_REPORTS) {
        cachedReports.set(type, deepToRaw(report.value))
      }
    } catch (err) {
      console.error('fetchReport error: ', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function sortTable({
    field,
    order
  }: {
    field: Report['header'][number]['id']
    order: SortDirection
  }) {
    if (!report.value) return
    currentSortField.value = field
    currentSortDirection.value = order
    const data = deepToRaw(report.value.data)
    const index = report.value.header.findIndex((header) => header.id === field)
    if (order === 'default') {
      report.value.data = cachedReports.get(_type.value!)!.data
    } else {
      data.sort((a, b) => {
        const _a = typeof a[index] === 'object' ? (a[index] as DataValue).data : a[index]
        const _b = typeof b[index] === 'object' ? (b[index] as DataValue).data : b[index]
        if (_a === _b) return 0
        return order === 'asc' ? (_a > _b ? 1 : -1) : _a < _b ? 1 : -1
      })
      report.value.data = data
    }
  }

  return { report, error, loading, fetchReport, sortTable, currentSortField, currentSortDirection }
}
