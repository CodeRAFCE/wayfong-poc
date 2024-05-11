import {Outlet} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {useTranslation} from "react-i18next";

import Providers from "../components/Providers";
import LanguagePopover from "../components/LanguagePopover";
import logo from "/logo.webp";

const MainLayout = () => {
	const {t} = useTranslation();

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
							<h1 className="text-2xl font-semibold text-white xl:text-4xl">
								{t("Welcome to Way Fong")}
							</h1>
							<LanguagePopover />
						</div>
						<div className="p-3">
							<p>{t("Please enter your details for us to connect with you")}</p>
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
