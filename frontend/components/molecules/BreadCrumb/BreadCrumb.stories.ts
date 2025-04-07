import type { Meta, StoryObj } from '@storybook/vue3';
import BreadCrumb from './BreadCrumb.vue';

const meta: Meta<typeof BreadCrumb> = {
  title: 'molecules/BreadCrumb',
  component: BreadCrumb,
  args: {
    itemList: [
      { id: 'menu-1', name: '메뉴 1', children: [] },
      { id: 'menu-2', name: '메뉴 2', children: [] },
      { id: 'menu-3', name: '메뉴 3', children: [] },
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof BreadCrumb> = {};
