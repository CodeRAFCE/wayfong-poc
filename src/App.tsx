import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {Home} from "./pages/home";
import {ThankYou} from "./pages/thank-you";

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
