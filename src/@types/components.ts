import type { REPORT_NAME } from '@/@types/index'

export interface SelectOption<T = REPORT_NAME> {
  [key: T]: string
}

export type SortDirection = 'asc' | 'desc' | 'default'
