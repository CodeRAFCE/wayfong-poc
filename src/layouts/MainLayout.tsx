import {Link, Outlet} from "react-router-dom";

import logo from "/logo.webp";

import Providers from "../components/Providers";
import {CssBaseline} from "@mui/material";

const MainLayout = () => {
	return (
		<Providers>
			<CssBaseline />
			<div className={"flex flex-col justify-between h-screen w-full"}>
				{/* <Header /> */}
				<div className="bg-[#80ca7b] items-center flex justify-between mb-4 h-40 px-7">
					<img src={logo} className="py-2" />

					<div className="flex items-center gap-8">
						<Link to="/" className="font-semibold capitalize text-white">
							Home
						</Link>
					</div>
				</div>

				<div className="mx-5 xl:w-1/2 xl:mx-auto">
					<div className="border border-[#ce7428] rounded-t-xl ">
						<div className="bg-[#ce7428] rounded-t-xl p-4">
							<h1 className="text-2xl font-semibold text-white xl:text-4xl">Welcome to Way Fong</h1>
						</div>
						<div className="p-3">
							<p>Enter your detail for us to connect with you.</p>
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

				<main className="w-full h-auto bg-hero-pattern bg-cover bg-no-repeat bg-center mt-4">
					<Outlet />
				</main>
			</div>
		</Providers>
	);
};

export default MainLayout;
