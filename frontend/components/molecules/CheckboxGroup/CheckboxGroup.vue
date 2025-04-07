<template>
  <div class="checkbox-group" :class="`checkbox-group--${direction}`">
    <Checkbox
      v-for="(item, i) in items"
      :key="i"
      :item="item"
      :model-value="modelValue"
      v-bind="{
        size,
        color,
        useRipple,
      }"
      @update:model-value="handleUpdate"
    >
      <template v-if="$slots.label" #label>
        <slot name="label" :value="item.value"></slot>
      </template>
    </Checkbox>
  </div>
</template>

<script setup lang="ts">
  import type { TCheckboxItem, TCheckboxProps } from '@/components/atoms/Checkbox/Checkbox.vue';
  import { Direction } from '@/constants/enums/style-enum';

  type TCheckboxGroupProps = Omit<TCheckboxProps, 'modelValue' | 'item'> & {
    modelValue: unknown[];
    items: TCheckboxItem[];
    direction?: Direction;
  };

  const { direction = Direction.Horizontal } = defineProps<TCheckboxGroupProps>();

  const emit = defineEmits<{
    'update:modelValue': [unknown];
  }>();

  const handleUpdate = (value: unknown) => {
    emit('update:modelValue', value);
  };
</script>

<style lang="scss" scoped>
  @use './CheckboxGroup.scss' as *;
</style>
