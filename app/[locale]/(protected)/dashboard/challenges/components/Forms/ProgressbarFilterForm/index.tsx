import { forwardRef } from "react";

interface IProgressbarFilterFormProps {}

const ProgressbarFilterForm = forwardRef<
  HTMLButtonElement,
  IProgressbarFilterFormProps
>((props, ref) => (
  <form noValidate>
    <button ref={ref} hidden />
  </form>
));

ProgressbarFilterForm.displayName = "ProgressbarFilterForm";
export default ProgressbarFilterForm;
