<template>
  <component
    :is="searchable ? 'VAutocomplete' : 'VSelect'"
    class="selectbox"
    :model-value="modelValue"
    :items="items"
    :placeholder="placeholder"
    :density="size"
    :variant="variant === FormVariant.Regular ? undefined : variant"
    :multiple="multiple"
    :disabled="disabled"
    :readonly="readonly"
    :menu="menu"
    :menu-props="{ contentClass: 'select-menu' }"
    item-props
    hide-details
    @update:model-value="handleUpdate"
  >
    <template #append-inner>
      <svgo-arrow-select class="svg-icon v-select__menu-icon" />
    </template>
  </component>
</template>

<script setup lang="ts">
  import { FormSize, FormVariant } from '@/constants/enums/style-enum';

  export type TSelectItem = {
    title: string | number;
    value: string | number;
    disabled?: boolean;
    subtitle?: string;
  };

  type TModelValue = string | number | null | Array<TSelectItem['value']>;

  export type TSelectProps = {
    modelValue: TModelValue;
    items: TSelectItem[];
    placeholder?: string; // modelValue가 null일 때 표시됨
    size?: FormSize;
    variant?: FormVariant;
    multiple?: boolean; // 다중 선택 시 modelValue는 Array type이어야 함
    disabled?: boolean;
    readonly?: boolean;
    menu?: boolean;
    searchable?: boolean;
  };

  const {
    placeholder = 'placeholder',
    size = FormSize.Compact,
    variant = FormVariant.Outlined,
    multiple = false,
    disabled = false,
    readonly = false,
    menu = false,
    searchable = false,
  } = defineProps<TSelectProps>();

  const emit = defineEmits<{
    'update:modelValue': [TModelValue];
  }>();

  const handleUpdate = (value: TModelValue) => {
    emit('update:modelValue', value);
  };
</script>
