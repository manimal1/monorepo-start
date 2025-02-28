import { TextField, BaseTextFieldProps } from "@mui/material";
import { useGetHookFormError } from "../hooks/useGetHookFormError";
import type { FieldPath, FieldValues } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues>
  extends BaseTextFieldProps {
  name: FieldPath<TFieldValues>;
  rules?: object;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export function Input<TFieldValues extends FieldValues = FieldValues>(
  props: InputProps<TFieldValues>
) {
  const { control, trigger } = useFormContext();
  const { name, rules, ...rest } = props;

  const {
    field,
    fieldState: { error },
    formState,
  } = useController({
    name,
    control,
    rules,
  });

  const { isError, errorMessage } = useGetHookFormError<TFieldValues>({
    error,
    name,
  });

  return (
    <TextField
      {...field}
      id={name}
      disabled={formState.isSubmitting}
      error={isError}
      helperText={errorMessage}
      onBlur={() => trigger(name)}
      {...rest}
    />
  );
}
