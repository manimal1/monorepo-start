import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  Box,
  Typography,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { FieldGroup } from "@repo/ui";
import { ReactNode } from "react";
import {
  useController,
  FieldValues,
  FieldPath,
  useFormContext,
} from "react-hook-form";

export interface SwitchProps<TFieldValues extends FieldValues = FieldValues>
  extends MuiSwitchProps {
  label: string;
  name: FieldPath<TFieldValues>;
  fieldSx?: SxProps<Theme>;
  headerText?: string;
  icon?: ReactNode;
  rules?: object;
}

export function Switch<TFieldValues extends FieldValues = FieldValues>(
  props: SwitchProps<TFieldValues>
) {
  const { fieldSx, headerText, icon, label, name, rules, sx, ...rest } = props;

  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <FieldGroup id={name} label={headerText} sx={fieldSx}>
      <Box
        sx={{
          border: `1px solid grey`,
          width: "100%",
          borderRadius: "0.5rem",
          padding: "0.5rem 0.5rem 0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "grey",
          ...sx,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
          <Typography>{label}</Typography>
        </Box>
        <MuiSwitch
          {...field}
          checked={field.value || false}
          onChange={(e) => field.onChange(e.target.checked)}
          color="primary"
          {...rest}
        />
      </Box>
    </FieldGroup>
  );
}
