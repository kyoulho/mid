<template>
  <div class="layout__container default-layout">
    <VLayout>
      <Snb />
      <div class="layout__warp">
        <Header />
        <main class="layout__main">
          <section class="layout__section">
            <div class="layout__section__header">
              <h2 class="layout__section__title">{{ currentMenu?.name }}</h2>
            </div>
            <NuxtPage />
          </section>
        </main>
      </div>
    </VLayout>
  </div>
</template>

<script setup lang="ts">
  import { useMenuStore } from '@/store/menu';

  const store = useMenuStore();
  const { currentMenu } = storeToRefs(store);
</script>

<style lang="scss" scoped>
  @use './layout.scss';
</style>
