import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useForm as useFormBase,
  type FieldValues,
  type UseFormProps as RHFormProps,
  type UseFormReturn as UseFormReturnBase,
} from "react-hook-form";
import type { ZodSchema } from "zod";

export type UseFormReturn<TInput extends FieldValues> =
  UseFormReturnBase<TInput> & {
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  };

export type FormSubmitHandler<T> = (
  data: T,
  event?: React.BaseSyntheticEvent
) => Promise<void> | void;

export interface UseFormProps<TInput extends FieldValues, TOutput = TInput>
  extends Omit<RHFormProps<TInput>, "resolver"> {
  onSubmit: FormSubmitHandler<TOutput>;
  onSubmitError?: (
    errors: FieldErrors<TInput>,
    event?: React.BaseSyntheticEvent
  ) => void;
  schema?: ZodSchema<TOutput, any, TInput>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function useForm<TInput extends FieldValues, TOutput = TInput>({
  schema,
  onSubmit,
  onSubmitError,
  ...props
}: UseFormProps<TInput, TOutput>) {
  const form = useFormBase<TInput>({
    ...props,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const handleSubmit = form.handleSubmit(
    async (data, event) => {
      const parsed = schema ? await schema.parseAsync(data) : data;
      await onSubmit(parsed as TOutput, event);
    },
    (errors, event) => onSubmitError?.(errors, event)
  );

  return {
    ...form,
    handleSubmit,
  } as UseFormReturn<TInput>;
}
