/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from "react";
import {Box, MenuItem, Popover, Stack} from "@mui/material";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import {LANGS, TLanguage} from "../types/lang.type";
import {useTranslation} from "react-i18next";

interface ILanguagePopover {}

const obj = localStorage.getItem("i18nextLng");

const parseObj: TLanguage = JSON.parse(obj as string);

const LanguagePopover = ({}: ILanguagePopover) => {
	const [open, setOpen] = useState(null);
	const {i18n} = useTranslation();
	const [currentLang, setCurrentLang] = useState<TLanguage>(parseObj || LANGS[0]);

	const handleChangeLanguage = (newLang: TLanguage) => {
		i18n.changeLanguage(newLang.value);
		setCurrentLang(newLang);

		localStorage.setItem("i18nextLng", JSON.stringify(newLang));
	};

	// TODO: Remove any
	const handleOpen = (event: any) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};
	return (
		<>
			<Box
				onClick={handleOpen}
				sx={{
					width: 40,
					height: 40,
					display: "flex",
					alignItems: "center",
					mr: 4,
					cursor: "pointer",
				}}
			>
				<Box component="img" src={currentLang.icon} alt={currentLang.label} />
				{!open ? <ArrowDropDown /> : <ArrowDropUp />}
			</Box>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				sx={{
					mt: 1.5,
					ml: 0.75,
					width: "100%",
					"& .MuiMenuItem-root": {px: 1, typography: "body2", borderRadius: 0.75},
				}}
				anchorOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<Stack spacing={0.75}>
					{LANGS.map((option) => (
						<MenuItem
							key={option.value}
							selected={option.value === currentLang.value}
							onClick={() => {
								handleChangeLanguage(option);
								handleClose();
							}}
						>
							<Box component="img" src={option.icon} alt={option.label} sx={{width: 28, mr: 2}} />

							{option.label}
						</MenuItem>
					))}
				</Stack>
			</Popover>
		</>
	);
};

export default LanguagePopover;
