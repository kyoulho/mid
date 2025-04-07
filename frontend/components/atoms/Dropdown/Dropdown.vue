<template>
  <VMenu :location="location" class="dropdown">
    <template #activator="{ props }">
      <Button class="dropdown__button" v-bind="{ ...props, ...buttonProps }"><slot></slot></Button>
    </template>
    <VList :density="listSize" class="dropdown__list">
      <VListItem v-for="{ label, value, onClick } in items" :key="value" :value="value">
        <VListItemTitle @click="onClick">{{ label }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
  import { Color, FormSize, Size, Variant } from '@/constants/enums/style-enum';
  import type { TButtonProps } from '../Button/Button.vue';

  export type TMenuItem = {
    label: string;
    value: string;
    onClick?: () => void;
  };

  type TDropdownProps = {
    location?: 'top' | 'bottom' | 'left' | 'right';
    items: TMenuItem[];
    buttonProps?: TButtonProps;
    listSize?: FormSize;
  };

  const {
    location = 'bottom',
    items,
    listSize = FormSize.Compact,
    buttonProps = { color: Color.Primary, variant: Variant.Text, size: Size.M },
  } = defineProps<TDropdownProps>();
</script>

<style lang="scss" scoped>
  @use './Dropdown.scss';
</style>
