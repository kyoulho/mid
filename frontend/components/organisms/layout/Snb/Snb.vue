<template>
  <aside class="snb">
    <VNavigationDrawer :mobile="false" :rail="rail">
      <VList>
        <VListItem
          class="snb__title"
          title="ADMINISTRATOR"
          value="title"
          :ripple="false"
          @click="handleClickMenu(PATH_MAIN)"
        >
          <template #prepend>
            <Button useOnlyIcon useRipple :variant="Variant.Text" @click.stop="rail = !rail">
              <VIcon size="20" color="#212121" icon="mdi-menu" />
            </Button>
          </template>
        </VListItem>
      </VList>
      <VDivider />
      <VList v-model:opened="openGroups" :color="Color.Primary">
        <template v-for="{ id, name, url = '', icon, children } in visibleMenuList" :key="id">
          <VListGroup v-if="children" :value="id">
            <template #activator="{ props }">
              <VListItem v-bind="props" :title="name">
                <template #prepend>
                  <VIcon size="18" :icon="icon" color="#212121" />
                </template>
              </VListItem>
            </template>
            <template v-for="{ id, name, url = '' } in getVisibleChildren(children)" :key="id">
              <VListItem
                :title="name"
                :value="name"
                :active="currentMenu?.name === name"
                @click="handleClickMenu(url)"
              />
            </template>
          </VListGroup>
          <VListItem
            v-else
            :title="name"
            :value="name"
            :active="currentMenu?.name === name"
            @click="handleClickMenu(url)"
          >
            <template #prepend>
              <VIcon size="18" :icon="icon" color="#212121" />
            </template>
          </VListItem>
        </template>
      </VList>
    </VNavigationDrawer>
  </aside>
</template>

<script setup lang="ts">
  import { Color, Variant } from '@/constants/enums/style-enum';
  import type { TMenu } from '@/constants/types/menu';
  import { PATH_MAIN } from '@/routes/path';
  import { useMenuStore } from '@/store/menu';

  const menuStore = useMenuStore();
  const { menuList, getMenuHierarchy } = menuStore;
  const { currentMenu } = storeToRefs(menuStore);

  const openGroups = ref<string[]>([getMenuHierarchy()?.[0]?.id || '']);
  const visibleMenuList = computed(() => menuList.filter(({ visible }) => visible !== false));

  const rail = ref(false);

  const getVisibleChildren = (children: TMenu[]): TMenu[] =>
    children.filter(({ visible }) => visible !== false);

  const handleClickMenu = async (path: string) => {
    await navigateTo(path);
  };
</script>

<style lang="scss" scoped>
  @use './Snb.scss';
</style>
