import {ReactNode} from "react";
import {Box} from "@mui/material";
import type {UseFormReturn} from "react-hook-form";
import {FormProvider as Form} from "react-hook-form";

type FormProviderProps = {
	children: ReactNode;
	methods: UseFormReturn;
	handleSubmit: () => void;
};

const FormProvider = ({children, handleSubmit, methods}: FormProviderProps) => {
	return (
		<Form {...methods}>
			<Box component="form" onSubmit={handleSubmit}>
				{children}
			</Box>
		</Form>
	);
};

export default FormProvider;
