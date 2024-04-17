import {ThemeProvider, createTheme} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

type ProviderProps = {
	children: React.ReactNode;
};

const theme = createTheme({});

const Providers = ({children}: ProviderProps) => {
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
		</ThemeProvider>
	);
};

export default Providers;
