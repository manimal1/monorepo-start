import { FieldError, Path } from "react-hook-form";

export function useGetHookFormError<T>({
  error,
  name,
}: {
  error?: FieldError;
  name: Path<T>;
}) {
  const isError = error !== undefined;
  const validationError: string | null =
    // FieldError type does not extend schema validation pathnames type
    // @ts-expect-error type cannot be used to index
    isError && error[name]?.message ? error[name].message : null;
  const errorMessage = isError
    ? validationError
      ? validationError
      : (error?.message ?? "error")
    : "";

  return { isError, errorMessage };
}
