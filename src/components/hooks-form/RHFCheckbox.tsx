import { ChangeEvent, FC } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { Checkbox, FormGroup, FormControlLabel, CheckboxProps, FormHelperText } from "@mui/material";

import { useTheme } from "@mui/material/styles";

interface RHFCheckboxProps {
  name: string;
  label: string;
  rules?: object;
}

export const RHFCheckbox: FC<RHFCheckboxProps & CheckboxProps> = ({
  name,
  label,
  rules,
  //   ...other
}) => {
  const { control } = useFormContext<FieldValues>();

  return (
    //TODO: fix {...other}
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Checkbox
              sx={{
                color: "#00AA5C",
                "&.Mui-checked": {
                  color: "#00AA5C",
                },
              }}
              {...field}
            />
          )}
        />
      }
    />
  );
};

interface RHFMultiCheckboxProps {
  name: string;
  errorMessage?: string;
  options: string[];
  rules?: object;
  handleChange?: (option: string) => void;
  handleBlur?: () => void;
}

export const RHFMultiCheckbox: FC<RHFMultiCheckboxProps> = ({ name, options, handleBlur, rules, ...other }) => {
  const theme = useTheme();
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const onSelected = (option: string) => {
          return field?.value?.includes(option)
            ? field?.value?.filter((value: string) => value !== option)
            : [...field?.value, option];
        };

        return (
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 2fr)",
              gap: 0,
              [theme.breakpoints.down("md")]: {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
              [theme.breakpoints.between("xs", 344)]: {
                gridTemplateColumns: "repeat(1, 1fr)",
              },
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field?.value?.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                    sx={{
                      color: "#00AA5C",
                      "&.Mui-checked": {
                        color: "#00AA5C",
                      },
                    }}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
};
