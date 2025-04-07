<template>
  <VTextarea
    class="textarea"
    :model-value="modelValue"
    :placeholder="placeholder"
    :density="size"
    :variant="variant === FormVariant.Regular ? undefined : variant"
    :disabled="disabled"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
  import { FormSize, FormVariant } from '@/constants/enums/style-enum';
  import { VTextarea } from 'vuetify/lib/components/index.mjs';

  export type TTextAreaProps = {
    modelValue: unknown;
    placeholder?: string;
    size?: FormSize;
    variant?: FormVariant;
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
  };

  const {
    modelValue,
    placeholder,
    size = FormSize.Default,
    variant = FormVariant.Outlined,
    disabled = false,
    readonly = false,
  } = defineProps<TTextAreaProps>();
</script>

<style lang="scss" scoped></style>
