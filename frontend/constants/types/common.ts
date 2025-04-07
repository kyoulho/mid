import type { FormMode } from '../enums/common';

export type TFormProps = {
  mode: FormMode.Create | FormMode.Edit;
  open?: boolean;
};
