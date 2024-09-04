<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import { REPORT_NAME } from '@/@types'
import { useFetchReport } from '@/composables/useFetchReport'
import type { SelectOption } from '@/@types/components'
import { Alert, AlertDescription, AlertTitle } from '@/components/UI/alert'
const Table = defineAsyncComponent(() => import('@/components/AppTable/AppTable.vue'))
const Select = defineAsyncComponent(() => import('@/components/AppSelect/AppSelect.vue'))

const selectOptions = ref<SelectOption>({
  [REPORT_NAME.PROJECT_PROFIT]: 'Project profit',
  [REPORT_NAME.EMPLOYEE_PERFORMANCE]: 'Employee performance',
  [REPORT_NAME.PRODUCT_SALES]: 'Product Sales'
})

const selectedValue = ref<REPORT_NAME>(REPORT_NAME.PROJECT_PROFIT)

const { report, error, loading, fetchReport, sortTable, currentSortDirection, currentSortField } =
  useFetchReport()

watch(
  selectedValue,
  async (newValue) => {
    if (!newValue) return
    await fetchReport(newValue)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col gap-8">
      <div class="flex flex-row">
        <div class="w-full sm:w-1/2 2xl:w-1/4">
          <Select :options="selectOptions" placeholder="Select report" v-model="selectedValue" />
        </div>
        <div />
      </div>
      <Alert v-if="error" class="mt-10 text-red-500">
        <AlertTitle> Warning </AlertTitle>
        <AlertDescription> {{ error || 'Error getting report' }} </AlertDescription>
      </Alert>
      <Table
        v-else
        :loading="loading"
        :table-data="report"
        :sort-field="currentSortField"
        :sort-order="currentSortDirection"
        :title="selectOptions[selectedValue] || ''"
        @sort="sortTable"
      />
    </div>
  </div>
</template>

<style scoped></style>
