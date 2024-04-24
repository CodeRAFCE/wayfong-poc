import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import {Home} from "./pages/home";
import Lists from "./pages/list-page/Lists";
import ThankYou from "./pages/ThankYou";

function App() {
	const router = createBrowserRouter([
		{
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <Home />,
				},

				{
					path: "/lists",
					element: <Lists />,
				},
				{
					path: "/thankyou",
					element: <ThankYou />,
				},
			],
		},

		// {
		// 	path: "*",
		// 	element: (
		// 		<Suspense fallback={<div>Loading...</div>}>
		// 			<NotFound />
		// 		</Suspense>
		// 	),
		// },
	]);

	return <RouterProvider router={router} />;
}

export default App;
