import {ThemeProvider, createTheme} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {I18nextProvider} from "react-i18next";
import i18n from "../locale/i18n";

type ProviderProps = {
	children: React.ReactNode;
};

const theme = createTheme({});

const Providers = ({children}: ProviderProps) => {
	return (
		<ThemeProvider theme={theme}>
			<I18nextProvider i18n={i18n}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
			</I18nextProvider>
		</ThemeProvider>
	);
};

export default Providers;
