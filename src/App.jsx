import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BmiPage from "./pages/BmiPage";
import FoodPage from "./pages/FoodPage";
import Cocktails from "./pages/Cocktails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import RecipePage from "./pages/RecipePage";

function App() {
	const Layout = () => {
		return (
			<>
				<Navbar />
				<Outlet />
			</>
		);
	};
	return (
		<div className="bg-slate-100">
			<Routes>
				<Route path="/" errorElement={<NotFound />} element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="*" element={<NotFound />} />
					<Route path="recipes" element={<FoodPage />} />
					<Route path="recipes/:id" element={<RecipePage />} />
					<Route path="cocktails" element={<Cocktails />} />
					<Route path="bmi" element={<BmiPage />} />
					<Route path="contact" element={<Contact />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
