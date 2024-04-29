import {FC, ReactNode} from "react";
import {useFormContext, Controller, FieldValues} from "react-hook-form";
import {Box, SelectChangeEvent, TextField, TextFieldProps} from "@mui/material";

interface RulesObject {
	required?: {value: boolean; message: string};
	// Add other specific rule types here if needed
}

interface RHFSelectProps {
	name: string;
	rules?: RulesObject;
	children: ReactNode;
	handleBusinessTypeChange?: (event: SelectChangeEvent<string | string[]>) => void;
}

const RHFSelect: FC<RHFSelectProps & TextFieldProps> = ({name, children, rules, ...other}) => {
	const {control} = useFormContext<FieldValues>();

	return (
		<Box sx={{height: "3.5em", maxHeight: "3.5em"}}>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({field, fieldState: {error}}) => (
					<TextField
						select
						fullWidth
						error={!!error}
						helperText={error?.message}
						size="small"
						{...other}
						{...field}
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
					>
						{children}
					</TextField>
				)}
			/>
		</Box>
	);
};
export default RHFSelect;
