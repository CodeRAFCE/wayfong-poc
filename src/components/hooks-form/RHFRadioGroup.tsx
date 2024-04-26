import { FC } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  RadioProps,
} from "@mui/material";

interface RHFRadioGroupProps {
  name: string;
  options: string[];
  getOptionLabel?: string[];
  rules: object;
}

const RHFRadioGroup: FC<RHFRadioGroupProps & RadioProps> = ({
  name,
  options,
  getOptionLabel,
  rules
}) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup
            {...field}
            row
            //    {...other}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={
                  <Radio
                    sx={{
                      color: "#00AA5C",
                      "&.Mui-checked": {
                        color: "#00AA5C",
                      },
                    }}
                  />
                }
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default RHFRadioGroup;
