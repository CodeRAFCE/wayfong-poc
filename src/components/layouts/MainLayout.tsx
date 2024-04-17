import {Link, Outlet} from "react-router-dom";
import {Toaster} from "sonner";

import logo from "/logo.webp";

import Providers from "../Providers";

const MainLayout = () => {
	return (
		<Providers>
			<div className={"flex flex-col justify-between h-screen w-full"}>
				{/* <Header /> */}
				<div className="bg-[#80ca7b] items-center flex justify-between mb-4 h-40 px-10">
					<img src={logo} />

					<div className="flex items-center gap-8">
						<Link to="/" className="font-semibold capitalize text-white">
							Home
						</Link>

						<Link to="/lists" className="font-semibold capitalize text-white">
							Lists
						</Link>
					</div>
				</div>

				<div className="mx-10">
					<div className="border border-[#ce7428] rounded-t-xl ">
						<div className="bg-[#ce7428] rounded-t-xl p-4">
							<h1 className="text-4xl font-semibold text-white">Welcome to WayFong</h1>
						</div>
						<div className="p-4">
							<p>Enter your detail for us to connect with you.</p>
							<a href="https://wayfong.com" target="_blank">
								https://wayfong.com
							</a>
						</div>
					</div>
				</div>

				<main className="w-full h-full bg-hero-pattern bg-cover bg-no-repeat bg-center mt-4">
					<Outlet />
				</main>

				{/* FOOTER */}
				<Toaster position="bottom-center" richColors closeButton />
			</div>
		</Providers>
	);
};

export default MainLayout;
