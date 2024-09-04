<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { SelectOption } from '@/@types/components'

interface SelectProps {
  options: SelectOption
  placeholder: string
}

defineProps<SelectProps>()
</script>

<template>
  <Select @update:modelValue="$emit($event)">
    <SelectTrigger title="Select">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="(value, key) in options" :value="key" :key="`${key}-select-value`">
        {{ value }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<style scoped></style>
