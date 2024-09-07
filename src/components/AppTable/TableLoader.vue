<script setup lang="ts">
import { ref } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'

const skeletonOptions = ref({
  columns: 6,
  rows: 10
})
</script>

<template>
  <div class="relative w-full opacity-90 transition-opacity duration-300">
    <table class="w-full caption-bottom text-sm shadow-sm focus:ring-1 ring-ring">
      <caption class="mt-1 ml-auto w-1/4 h-4 bg-gray-200 rounded animate-pulse"></caption>
      <thead class="[&amp;_tr]:border-b">
        <tr
          class="border-b transition-colors data-[state=selected]:bg-muted bg-sky-700 hover:bg-sky-800"
        >
          <th
            v-for="(_, header) in skeletonOptions.columns"
            :key="`${header}-skeleton-header`"
            class="h-12 px-4 text-left align-middle [&amp;:has([role=checkbox])]:pr-0 text-white font-bold cursor-pointer"
          >
            <div
              class="flex items-center justify-between bg-gray-200 rounded animate-pulse w-1/2 h-4"
            />
          </th>
        </tr>
      </thead>
      <tbody class="[&amp;_tr:last-child]:border-0 shadow-sm">
        <tr
          v-for="(_, row) in skeletonOptions.rows"
          :key="`${row}-skeleton-row`"
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted odd:bg-sky-50 even:bg-sky-100"
        >
          <td
            v-for="(_, column) in skeletonOptions.columns"
            :key="`${column}-skeleton-cell`"
            class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-left"
          >
            <div
              class="flex items-center justify-between bg-gray-200 rounded animate-pulse h-4"
              :class="row % 2 === 0 ? 'w-1/2' : 'w-1/4'"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <LoaderCircle class="absolute top-1/2 left-1/2 w-12 h-12 text-sky-300 animate-spin" />
  </div>
</template>
