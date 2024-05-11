import {useState} from "react";
import {Link, Outlet} from "react-router-dom";

import Providers from "../components/Providers";
import {Box, CssBaseline, MenuItem, TextField} from "@mui/material";

import logo from "/logo.webp";
import English from "/usa.svg";
import China from "/china.svg";

const LANG_DATA = [
	{value: "en", flag: English},
	{value: "ch", flag: China},
];

const MainLayout = () => {
	const [country, setCountry] = useState(English);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCountry(event.target.value);
	};
	return (
		<Providers>
			<CssBaseline />
			<div className={"flex flex-col h-screen w-full"}>
				{/* <Header /> */}
				<div className="bg-[#80ca7b] items-center flex justify-between mb-4 h-20 px-7">
					<img src={logo} className="py-2" />

					<div className="flex items-center gap-8">
						<Link to="/" className="font-semibold capitalize text-white">
							Home
						</Link>
					</div>
				</div>

				<div className="px-4 w-full mx-auto">
					<div className="border border-[#ce7428] rounded-t-xl ">
						<div className="bg-[#ce7428] rounded-t-xl p-4 flex items-center justify-between">
							<h1 className="text-2xl font-semibold text-white xl:text-4xl">Welcome to Way Fong</h1>
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
									value={country}
									onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
										handleChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
									}
								>
									{LANG_DATA.map((option, i) => (
										<MenuItem value={option.value} key={i}>
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
							<p>Please enter your details for us to connect with you</p>
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
