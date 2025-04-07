<template>
  <VTabs
    :model-value="modelValue"
    :color="color"
    :density="size"
    :direction="direction"
    :disabled="disabled"
    @update:model-value="handleClick"
  >
    <VTab
      v-for="{ value, title, disabled: isDisabled } in items"
      :key="value"
      :value="value"
      :disabled="isDisabled"
      :variant="variant"
      :ripple="useRipple"
      >{{ title }}</VTab
    >
  </VTabs>
</template>

<script setup lang="ts">
  import { FormSize, Direction, Color, Variant } from '@/constants/enums/style-enum';
  import { VTab, VTabs } from 'vuetify/lib/components/index.mjs';

  type TTabItem = {
    title: string | number;
    value: string | number;
    disabled?: boolean;
  };

  type TTabsProps = {
    modelValue: string | number;
    items: TTabItem[];
    color?: Color;
    size?: FormSize;
    direction?: Direction;
    disabled?: boolean;
    variant?: Variant;
    useRipple?: boolean;
  };

  const {
    color = Color.Primary,
    size = FormSize.Default,
    direction = Direction.Horizontal,
    disabled = false,
    variant = Variant.Outlined,
    useRipple = false,
  } = defineProps<TTabsProps>();

  const emit = defineEmits<{
    'update:modelValue': [string | number];
  }>();

  const handleClick = (value: unknown) => {
    emit('update:modelValue', value as string | number);
  };
</script>
