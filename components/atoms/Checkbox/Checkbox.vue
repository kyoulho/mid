<template>
  <VCheckbox
    class="checkbox"
    :model-value="modelValue"
    :label="item.label"
    :value="item.value"
    :density="size"
    :color="color"
    :disabled="item.disabled"
    :readonly="item.readonly"
    :ripple="useRipple"
    hide-details
    @update:model-value="handleUpdate"
  >
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
  </VCheckbox>
</template>

<script setup lang="ts">
  import { Color, FormSize } from '@/constants/enums/style-enum';
  import { VCheckbox } from 'vuetify/lib/components/index.mjs';

  export type TCheckboxItem = {
    label?: string;
    value: unknown;
    disabled?: boolean;
    readonly?: boolean;
  };

  export type TCheckboxProps = {
    modelValue: unknown;
    item: TCheckboxItem;
    size?: FormSize;
    color?: Color | string;
    useRipple?: boolean;
  };

  const {
    item,
    size = FormSize.Default,
    color = Color.Primary,
    useRipple = false,
  } = defineProps<TCheckboxProps>();

  const emit = defineEmits<{
    'update:modelValue': [unknown];
  }>();

  const handleUpdate = (value: unknown) => {
    console.log('value', value);
    emit('update:modelValue', value);
  };
</script>

<style lang="scss" scoped></style>
