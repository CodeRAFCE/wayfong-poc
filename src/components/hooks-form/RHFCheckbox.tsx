import { ChangeEvent, FC } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  CheckboxProps,
} from "@mui/material";

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
              {...field}
              checked={field.value}
              sx={{
                color: "#00AA5C",
                "&.Mui-checked": {
                  color: "#00AA5C",
                },
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.checked)
              }
            />
          )}
        />
      }
      //   {...other}
    />
  );
};

interface RHFMultiCheckboxProps {
  name: string;
  options: string[];
  rules?: object;
  handleChange?: (option: string) => void;
}

export const RHFMultiCheckbox: FC<RHFMultiCheckboxProps> = ({
  name,
  options,
  rules,
  ...other
}) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value?.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                    value={option}
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
