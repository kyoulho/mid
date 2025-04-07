<template>
  <div class="layout__section__content">
    <div class="interface-wrap">
      <Button @click="handleAddTabMenu">탭 메뉴 추가</Button>
    </div>
    <Table :columns="columns(portalMenuList || [])" :data="tabMenuList" />
    <TabMenuForm v-model:open="open" :mode="FormMode.Create" />
  </div>
</template>

<script setup lang="ts">
  import { usePortalMenu } from '@/api/menu';
  import { useTabMenu } from '@/api/tab-menu';
  import { columns } from '@/columns/tab-menu';
  import { FormMode } from '@/constants/enums/common';

  const { data: tabMenuList } = await useTabMenu({});
  const { data: portalMenuList } = await usePortalMenu({});

  const open = ref(false);

  const handleAddTabMenu = () => {
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
