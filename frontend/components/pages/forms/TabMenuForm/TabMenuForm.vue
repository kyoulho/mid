<template>
  <UpsertPopup :open="open" title="탭 메뉴 추가" @save="handleAddTabMenu" @close="handleClose">
    <FormContainer>
      <FormRow label="탭명" required>
        <Input v-model="form.title" />
      </FormRow>
      <FormRow label="메뉴 매핑" required>
        <div class="menu-mapping">
          <Select v-model="form.menuId" :items="menuOptions" :searchable="true" />
        </div>
      </FormRow>
      <FormRow label="노출 순서" required>
        <Select v-model="form.seq" :items="sortOrderOptions" />
      </FormRow>
      <FormRow label="외부 URL" required>
        <Input v-model="form.iframeUrl" />
      </FormRow>
      <FormRow label="내부 경로" required>
        <Input v-model="form.srcPath" />
      </FormRow>
      <FormRow label="공개 여부" required>
        <Radio v-model="form.visibleYn" :items="visibleYnOptions" />
      </FormRow>
      <FormRow label="속성" required>
        <Input v-model="form.attributes" />
      </FormRow>
    </FormContainer>
  </UpsertPopup>
</template>

<script setup lang="ts">
  import { usePortalMenu } from '@/api/menu';
  import {
    useAddTabMenu,
    useGetTabMenu,
    useTabMenu,
    useUpdateTabMenu,
    type TTabMenu,
    type TTabMenuBody,
  } from '@/api/tab-menu';
  import { FormMode, YN } from '@/constants/enums/common';
  import type { TFormProps } from '@/constants/types/common';
  import { useMenuStore } from '@/store/menu';
  import { useRoute } from 'vue-router';
  import * as yup from 'yup';
  import { ref, computed, watchEffect } from 'vue';
  import type { TSelectItem } from '@/components/atoms/Select/Select.vue';

  const { mode, open } = defineProps<TFormProps>();
  const emit = defineEmits<{ 'update:open': [boolean] }>();
  const id = useRoute().params.id as string;
  const isEditMode = mode === FormMode.Edit;

  const { getLeafMenuList, getMenuHierarchy } = useMenuStore();
  const { data: portalMenuList } = usePortalMenu({});

  const form = ref<TTabMenuBody>({
    title: '',
    menuId: '',
    seq: 0,
    visibleYn: YN.Y,
    iframeUrl: '',
    srcPath: '',
    attributes: {},
  });

  // 메뉴 옵션: 리프 메뉴만, 계층 구조 문자열로 변환
  const menuOptions = computed(() => {
    const list = portalMenuList.value || [];
    return getLeafMenuList(list).map((leaf) => {
      const hierarchy = getMenuHierarchy(leaf, list);
      return {
        title: hierarchy?.map(({ name }) => name).join(' > ') || '',
        value: leaf.id,
      };
    });
  });

  // 선택된 메뉴의 자식 탭메뉴 목록
  const childTabMenus = ref<TTabMenu[]>([]);

  // 메뉴 선택 시 자식 탭메뉴 목록 가져오기
  watch(
    () => form.value.menuId,
    async (newMenuId) => {
      if (!newMenuId) return;

      useTabMenu({ menuId: newMenuId }, true)
        .then((result) => {
          childTabMenus.value = result;
        })
        .catch((error) => {
          // const snackbar = useSnackbar();
          // snackbar.add({
          //   type: 'error',
          //   text: error.data.errorMessage,
          // });
        });
    },
    { immediate: true },
  );

  // 노출 순서 옵션
  const sortOrderOptions = computed<TSelectItem[]>(() => {
    const children = childTabMenus.value;
    return [
      ...children.map((child, index) => ({
        title: `${index + 1} (${child.title})`,
        value: index + 1,
      })),
      {
        title: `${children.length + 1}`,
        value: children.length + 1,
      },
    ];
  });

  // 초기 메뉴 선택
  watchEffect(() => {
    if (!form.value.menuId && menuOptions.value.length > 0) {
      form.value.menuId = menuOptions.value[0].value;
    }
  });

  // 메뉴 선택 시 노출 순서 기본값 자동 설정 (추가 모드만)
  watchEffect(() => {
    if (!isEditMode && form.value.menuId) {
      form.value.seq = childTabMenus.value.length + 1;
    }
  });

  // 공개 여부 옵션
  const visibleYnOptions = [
    { label: '공개', value: YN.Y },
    { label: '비공개', value: YN.N },
  ];

  // 수정 모드일 경우 초기 값 설정
  useGetTabMenu(
    id,
    { immediate: isEditMode },
    {
      onResponse: ({ response }) => {
        const { menu, ...data } = response._data.data as TTabMenu;
        form.value = {
          ...data,
          menuId: menu.id,
          seq: data.seq,
        };
      },
    },
  );

  // Yup 유효성 스키마
  const formSchema = yup.object().shape({
    title: yup.string().required('제목을 입력해주세요.'),
    menuId: yup.string().required('메뉴를 선택해주세요.'),
    seq: yup.number().required('노출 순서를 선택해주세요.'),
    visibleYn: yup.string().oneOf(['Y', 'N']).required('공개여부를 선택해주세요.'),
    iframeUrl: yup.string().required('URL을 입력해주세요.'),
    srcPath: yup.string().required('내부 경로를 입력해주세요.'),
  });

  const handleAddTabMenu = async () => {
    try {
      await formSchema.validate(form.value, { abortEarly: false });

      if (isEditMode) {
        await useUpdateTabMenu(id, form.value);
      } else {
        await useAddTabMenu(form.value);
      }
      emit('update:open', false);
    } catch (error) {
      console.log(error); // TODO: 사용자 알림 처리 추가
    }
  };

  const handleClose = () => emit('update:open', false);
</script>

<style lang="scss" scoped>
  @use './TabMenuForm.scss' as *;
</style>
