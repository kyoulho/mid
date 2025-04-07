import { deleteTabMenu } from '../api';

export const useDeleteTabMenu = (tabId: string): Promise<undefined> => {
  return deleteTabMenu(tabId);
};
