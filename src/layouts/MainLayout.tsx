import {useState} from "react";
import {Outlet} from "react-router-dom";

import Providers from "../components/Providers";
import {Box, CssBaseline, MenuItem, TextField} from "@mui/material";

import logo from "/logo.webp";
import English from "/usa.svg";
import China from "/china.svg";
import {useTranslation} from "react-i18next";

const LANG_DATA = [
	{value: "en", flag: English},
	{value: "ch", flag: China},
];

const MainLayout = () => {
	const {i18n, t} = useTranslation();
	const [country, setCountry] = useState<{value: string; flag: string}>(LANG_DATA[0]);

	const handleLangChange = (newLang: string) => {
		console.log(newLang);
		i18n.changeLanguage(newLang);
	};

	return (
		<Providers>
			<CssBaseline />
			<div className={"flex flex-col h-screen w-full"}>
				{/* <Header /> */}
				<div className="bg-[#80ca7b] items-center flex justify-between mb-4 h-20 px-7">
					<img src={logo} className="py-2" />
				</div>

				<div className="px-4 w-full mx-auto">
					<div className="border border-[#ce7428] rounded-t-xl ">
						<div className="bg-[#ce7428] rounded-t-xl p-4 flex items-center justify-between">
							<h1 className="text-2xl font-semibold text-white xl:text-4xl">{t("welcome")}</h1>
							<div className="">
								<TextField
									select
									name="country"
									InputLabelProps={{shrink: true}}
									SelectProps={{
										native: false,
										sx: {textTransform: "capitalize"},
									}}
									size="small"
									value={country.value}
									defaultValue={country}
									onChange={(event) => {
										const result = LANG_DATA.find((obj) => {
											return obj?.value === event.target.value;
										});
										setCountry(result as {value: string; flag: string});
										handleLangChange(event.target.value);
									}}
								>
									{LANG_DATA.map((option, i) => (
										<MenuItem
											value={option.value}
											key={i}
											selected={option.value === country.value}
										>
											<Box
												component="img"
												src={option.flag}
												alt={option.value}
												sx={{height: "20px"}}
											/>
										</MenuItem>
									))}
								</TextField>
							</div>
						</div>
						<div className="p-3">
							<p>{t("greeting")}</p>
							<a
								href="https://wayfong.com"
								target="_blank"
								style={{textDecoration: "underline", color: "#0000FF"}}
							>
								https://wayfong.com
							</a>
						</div>
					</div>
				</div>

				<main className="">
					<Outlet />
				</main>
			</div>
		</Providers>
	);
};

export default MainLayout;
