<template>
  <header class="header">
    <div class="header__inner">
      <BreadCrumb :item-list="itemList" />
      <div class="header__interface">
        <Dropdown :items="userItems">{{ data?.user?.name }}<em>님</em></Dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import type { TMenu } from '@/constants/types/menu';

  const { data, signOut } = useAuth();

  const itemList = ref<TMenu[]>([
    {
      id: 'home',
      name: 'Home',
      visible: true,
    },
  ]);

  const userItems = ref([{ label: '로그아웃', value: 'sign-out', onClick: () => signOut() }]);
</script>

<style lang="scss" scoped>
  @use './Header.scss';
</style>
