<template>
  <!-- MOD : 링크 추가함 -->
  <div class="breadcrumb">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__item">
        <a
          href="#"
          class="breadcrumb__link"
          :class="{ 'breadcrumb__link--active': !getMenuHierarchy()?.length }"
          @click.prevent="gotoMain"
        >
          <span>Home</span>
        </a>
      </li>
      <li v-for="(item, index) in getMenuHierarchy()" :key="index" class="breadcrumb__item">
        <a
          href="#"
          class="breadcrumb__link"
          :class="{ 'breadcrumb__link--active': index === itemList.length }"
          @click.prevent="handleClick(item)"
        >
          <span>{{ item.name }}</span>
        </a>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
  import { PATH_MAIN } from '@/routes/path';
  import type { TMenu } from '@/constants/types/menu';
  import { useMenuStore } from '@/store/menu';

  export type TBreadCrumbProps = {
    itemList: TMenu[];
  };

  defineProps<TBreadCrumbProps>();

  const menuStore = useMenuStore();
  const { selectMenu, getMenuHierarchy } = menuStore;

  const handleClick = (menu: TMenu) => {
    selectMenu(menu);
  };

  const gotoMain = () => {
    navigateTo(PATH_MAIN);
  };
</script>

<style lang="scss" scoped>
  @use './BreadCrumb.scss';
</style>
