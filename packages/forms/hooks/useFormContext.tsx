import {
  FieldValues,
  useFormContext as useFormContextBase,
} from "react-hook-form";

export function useFormContext<T extends FieldValues>() {
  return useFormContextBase<T>();
}
