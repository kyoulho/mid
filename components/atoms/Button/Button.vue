<template>
  <VBtn
    class="button"
    :size="size"
    :color="color"
    :variant="variant"
    :disabled="disabled"
    :readonly="readonly"
    :ripple="useRipple"
    :icon="useOnlyIcon"
  >
    <template v-if="typeof useOnlyIcon === 'string'">
      <VIcon :icon="useOnlyIcon" />
    </template>
    <slot v-else></slot>
  </VBtn>
</template>

<script setup lang="ts">
  import { VBtn, VIcon } from 'vuetify/lib/components/index.mjs';
  import { Color, Size, Variant } from '@/constants/enums/style-enum';

  export type TButtonProps = {
    size?: Size;
    color?: Color | string;
    variant?: Variant;
    disabled?: boolean;
    readonly?: boolean;
    useRipple?: boolean;
    useOnlyIcon?: boolean | string;
  };

  const {
    size = Size.M,
    color = Color.Primary,
    variant = Variant.Flat,
    disabled = false,
    readonly = false,
    useRipple = false,
    useOnlyIcon = false,
  } = defineProps<TButtonProps>();
</script>

<style lang="scss" scoped>
  @use './Button.scss';
</style>
