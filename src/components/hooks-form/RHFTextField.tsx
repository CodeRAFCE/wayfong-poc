import { FC } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { Box, TextField, TextFieldProps } from "@mui/material";

interface RHFTextFieldProps {
  name: string;
  rules?: object; 
}

const RHFTextField: FC<RHFTextFieldProps & TextFieldProps> = ({
  name,
  rules,
  ...other
}) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Box sx={{ height: "3.5em", maxHeight: "3.5em" }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  transition: "border-color 0.3s",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#CA7229",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#CA7229",
                    borderWidth: "2px",
                  },

                  "& .MuiInputLabel-outlined": {
                    color: "#CA7229",
                    "&.Mui-focused": {
                      color: "#CA7229",
                    },
                  },
                },
              },

              "& .MuiInputLabel-outlined": {
                "&.Mui-focused": {
                  color: "#CA7229",
                },
              },
            }}
            {...other}
          />
        )}
      />
    </Box>
  );
};

export default RHFTextField;
