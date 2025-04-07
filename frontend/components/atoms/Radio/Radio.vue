<template>
  <VRadioGroup
    class="radio-group"
    :model-value="modelValue"
    :color="color"
    :density="size"
    :disabled="disabled"
    :readonly="readonly"
    :ripple="useRipple"
    :inline="direction === 'horizontal'"
    hide-details
    @update:model-value="handleUpdate"
  >
    <VRadio
      v-for="({ label, value, disabled: isDisabled, readonly: isReadonly }, i) in items"
      :key="i"
      class="radio"
      :label="label"
      :value="value"
      :disabled="isDisabled"
      :readonly="isReadonly"
    />
  </VRadioGroup>
</template>

<script setup lang="ts">
  import { Color, Direction, FormSize } from '@/constants/enums/style-enum';
  import { VRadioGroup, VRadio } from 'vuetify/lib/components/index.mjs';

  export type TRadioItem = {
    label: string;
    value: unknown;
    disabled?: boolean;
    readonly?: boolean;
  };

  type TRadioProps = {
    modelValue: unknown;
    items: TRadioItem[];
    size?: FormSize;
    color?: Color | string;
    disabled?: boolean;
    readonly?: boolean;
    useRipple?: boolean;
    direction?: Direction;
  };

  const {
    size = FormSize.Default,
    color = Color.Primary,
    disabled = false,
    readonly = false,
    useRipple = false,
    direction = Direction.Horizontal,
  } = defineProps<TRadioProps>();

  const emit = defineEmits<{
    'update:modelValue': [unknown];
  }>();

  const handleUpdate = (value: unknown) => {
    emit('update:modelValue', value);
  };
</script>

<style lang="scss" scoped>
  @use './Radio.scss' as *;
</style>
