import { Box, SxProps, Theme } from "@mui/material";
import { ComponentPropsWithoutRef } from "react";

export interface FieldGroupProps extends ComponentPropsWithoutRef<"div"> {
  id?: string;
  label?: string;
  isDisabled?: boolean;
  sx?: SxProps<Theme>;
}

export function FieldGroup({
  id,
  isDisabled,
  label,
  children,
  sx,
}: FieldGroupProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 2,
        opacity: isDisabled ? "0.5" : "1",
        cursor: isDisabled ? "not-allowed" : "default",
        ...sx,
      }}
    >
      {label ? (
        <label htmlFor={id} style={{ marginBottom: 2 }}>
          {label}
        </label>
      ) : null}
      {children}
    </Box>
  );
}
