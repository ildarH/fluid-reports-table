<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpDown, ArrowUpWideNarrow, ArrowDownWideNarrow, LoaderCircle } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/table'
import type { Report, ReportData } from '@/@types'
import type { SortDirection } from '@/@types/components'

interface TableProps {
  title: string
  tableData: null | Report
  loading: boolean
  sortField: Report['header'][number]['id']
  sortOrder: SortDirection
}

const props = defineProps<TableProps>()
const emits = defineEmits(['sort'])

const cachedSortField = ref<Report['header'][number]['id'] | null>(null)

const header = computed(() => {
  return props.tableData?.header || []
})

const rows = computed(() => {
  return props.tableData?.data || []
})

function getCellValue(cell: ReportData[number]) {
  if (typeof cell === 'object') {
    return cell.data
  } else if (typeof cell === 'boolean') {
    return cell ? 'Yes' : 'No'
  }
  return cell
}

function getCellAlignment(cellIndex: number) {
  const alignments = {
    boolean: 'center',
    int: 'right',
    float: 'right',
    string: 'left'
  }
  return header.value[cellIndex]?.align || alignments[header.value[cellIndex]?.type || 'string']
}

function getNextSortOrder(): SortDirection {
  switch (props.sortOrder) {
    case 'default':
      return 'asc'
    case 'asc':
      return 'desc'
    case 'desc':
      return 'default'
    default:
      return 'default'
  }
}

function getSortIcon(field: string) {
  if (props.sortOrder === 'desc' && props.sortField === field) {
    return ArrowUpWideNarrow
  } else if (props.sortOrder === 'asc' && props.sortField === field) {
    return ArrowDownWideNarrow
  }
  return ArrowUpDown
}

function handleSort(field: string) {
  let _order: SortDirection
  if (cachedSortField.value === field) {
    _order = getNextSortOrder()
  } else {
    _order = 'asc'
  }
  cachedSortField.value = field
  emits('sort', { field, order: _order })
}
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center h-96">
    <LoaderCircle class="w-12 h-12 text-sky-300 animate-spin" />
  </div>
  <Table
    v-else
    class="shadow-sm focus:ring-1 ring-ring"
    tabindex="0"
    role="region"
    aria-labelledby="tableCaption"
  >
    <TableCaption class="text-right">{{ title }}</TableCaption>
    <TableHeader>
      <TableRow class="bg-sky-700 hover:bg-sky-800">
        <TableHead
          v-for="item in header"
          :key="item.id"
          class="text-white font-bold cursor-pointer"
          @click="handleSort(item.id)"
        >
          <div class="flex items-center justify-between">
            {{ item.caption }}
            <component :is="getSortIcon(item.id)" class="w-4 h-4" />
            <span class="sr-only">Sort by {{ sortOrder }}</span>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody class="shadow-sm">
      <TableRow v-for="row in rows" :key="`${row[0]}-row`" class="odd:bg-sky-50 even:bg-sky-100">
        <TableCell
          v-for="(cell, cellIndex) in row"
          :key="`${typeof cell === 'object' ? cell.data : cell}-cell`"
          :class="`text-${getCellAlignment(cellIndex)}`"
          :style="{ color: typeof cell === 'object' && cell.color && cell.color }"
          >{{ getCellValue(cell) }}</TableCell
        >
      </TableRow>
    </TableBody>
  </Table>
</template>
