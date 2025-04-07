export type TMenu = {
  id: string;
  name: string;
  visible?: boolean;
  url?: string;
  icon?: string;
  children?: TMenu[];
};
