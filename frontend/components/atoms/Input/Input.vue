<template>
  <VTextField
    class="input"
    :model-value="modelValue"
    :placeholder="placeholder"
    :density="size"
    :variant="variant === FormVariant.Regular ? undefined : variant"
    :label="label"
    :disabled="disabled"
    :readonly="readonly"
    :hide-details="hideDetails"
    @update:model-value="handleUpdate"
  />
</template>

<script setup lang="ts">
  import { VTextField } from 'vuetify/lib/components/index.mjs';
  import { FormSize, FormVariant } from '@/constants/enums/style-enum';

  export type TInputProps = {
    modelValue: unknown;
    placeholder?: string;
    size?: FormSize;
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
    variant?: FormVariant;
    prefix?: string;
    suffix?: string;
    hideDetails?: boolean;
  };

  const {
    placeholder = '',
    size = FormSize.Compact,
    label = '',
    variant = FormVariant.Outlined,
    disabled = false,
    readonly = false,
    hideDetails = true,
  } = defineProps<TInputProps>();

  const emit = defineEmits<{
    'update:modelValue': [string];
  }>();

  const handleUpdate = (value: string) => {
    emit('update:modelValue', value);
  };
</script>
