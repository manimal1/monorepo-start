import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import { useGetHookFormError } from "../hooks/useGetHookFormError";
import type { FieldPath, FieldValues } from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";

export interface CustomSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<SelectProps, "name"> {
  name: FieldPath<TFieldValues>;
  rules?: object;
  label: string;
  options: {
    value: string | number | boolean | undefined;
    label: string;
    icon?: React.ReactNode;
  }[];
  labelBgColor?: string;
}

export function Select<TFieldValues extends FieldValues = FieldValues>(
  props: CustomSelectProps<TFieldValues>
) {
  const { control, trigger } = useFormContext();
  const { labelBgColor, name, rules, label, options, ...rest } = props;

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

  // This is to allow boolean as a value type from options.
  // It must be converted to a string though for Select to work.
  // Be sure to convert your value back to boolean when setting it in the form.
  const defaultValue =
    field.value !== undefined
      ? typeof field.value === "boolean"
        ? String(field.value)
        : field.value
      : typeof options[0]?.value === "boolean"
        ? String(options[0]?.value)
        : options[0]?.value;

  return (
    <FormControl
      fullWidth
      error={isError}
      disabled={formState.isSubmitting}
      variant="outlined"
    >
      <InputLabel
        id={`${name}-label`}
        sx={{ backgroundColor: labelBgColor ?? "grey" }}
      >
        {label}
      </InputLabel>
      <MuiSelect
        {...field}
        labelId={`${name}-label`}
        id={name}
        value={defaultValue}
        onBlur={() => trigger(name)}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem
            key={
              typeof option.value === "boolean"
                ? `${field.name}-${String(option.value)}`
                : option.value
            }
            value={
              typeof option.value === "boolean"
                ? String(option.value)
                : option.value
            }
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              {option.icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    marginRight: 1,
                    display: "inline",
                  }}
                >
                  {option.icon}
                </ListItemIcon>
              )}
              <Typography>{option.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
      {isError && (
        <span style={{ color: "red", marginTop: "4px", fontSize: "0.75rem" }}>
          {errorMessage}
        </span>
      )}
    </FormControl>
  );
}
