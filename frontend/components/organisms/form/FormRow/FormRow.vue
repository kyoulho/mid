<template>
  <div class="form-row">
    <label class="form-row__label" :class="{ 'form-row__label--required': required }">
      {{ label }}
    </label>
    <div class="form-row__input">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  type TFormRowProps = {
    label: string;
    required?: boolean;
  };

  const { label, required = false } = defineProps<TFormRowProps>();
</script>

<style lang="scss" scoped>
  @use './FormRow.scss' as *;
</style>
