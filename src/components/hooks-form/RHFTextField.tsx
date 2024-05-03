import {FC, forwardRef} from "react";
import {Box, TextField, TextFieldProps} from "@mui/material";
import {useFormContext, Controller, FieldValues} from "react-hook-form";
import {IMaskInput} from "react-imask";

interface RHFTextFieldProps {
	name: string;
	rules?: object;
}

interface CustomProps {
	onChange: (event: {target: {name: string; value: string}}) => void;
	name: string;
}

export const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(
	props,
	ref
) {
	const {onChange, name, ...other} = props;

	return (
		<IMaskInput
			{...other}
			name={name}
			mask="(000)-000-0000"
			definitions={{
				"#": /[1-9]/,
			}}
			ref={ref}
			onAccept={(value: string) => onChange({target: {name, value}})}
			overwrite
		/>
	);
});

const RHFTextField: FC<RHFTextFieldProps & TextFieldProps> = ({name, rules, ...other}) => {
	const {control} = useFormContext<FieldValues>();

	return (
		<Box sx={{height: "3.5em", maxHeight: "3.5em"}}>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({field, fieldState: {error}}) => (
					<TextField
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
						{...field}
					/>
				)}
			/>
		</Box>
	);
};

export default RHFTextField;
