<template>
  <VDialog
    :model-value="open"
    max-width="650"
    :close-on-back="false"
    class="upsert-popup"
    @click:outside="handleClose"
  >
    <VCard>
      <VCardTitle>{{ title }}</VCardTitle>
      <VCardText>
        <slot></slot>
      </VCardText>
      <VCardActions>
        <Button :variant="Variant.Outlined" @click="handleClose">취소</Button>
        <Button @click="handleSave">저장</Button>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
  import { Variant } from '@/constants/enums/style-enum';

  type TUpsertPopupProps = {
    title: string;
    open: boolean;
  };

  const { title, open } = defineProps<TUpsertPopupProps>();

  const emit = defineEmits<{
    save: [];
    close: [boolean];
  }>();

  const handleClose = () => {
    emit('close', false);
  };

  const handleSave = () => {
    emit('save');
  };
</script>

<style lang="scss" scoped>
  @use './UpsertPopup.scss' as *;
</style>
