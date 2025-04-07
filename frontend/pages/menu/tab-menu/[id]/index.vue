<template>
  <div class="layout__section__content">
    <div class="interface-wrap">
      <Button @click="handleEditTabMenu">수정</Button>
    </div>
    <DetailList />
    <TabMenuForm v-model:open="open" :mode="FormMode.Edit" />
  </div>
</template>

<script setup lang="ts">
  import { useGetTabMenu } from '@/api/tab-menu';
  import { FormMode } from '@/constants/enums/common';

  const route = useRoute();
  const id = route.params.id as string;

  const { data: tabMenu } = useGetTabMenu(id);

  const open = ref(false);

  const handleEditTabMenu = () => {
    open.value = true;
  };
</script>

<style lang="scss" scoped>
  .layout__section__content {
    display: flex;
    flex-direction: column;
    gap: rem(12px);

    .interface-wrap {
      justify-content: end;
      display: flex;
    }
  }
</style>
