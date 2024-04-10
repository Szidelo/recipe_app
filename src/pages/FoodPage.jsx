import Header from "../components/Header";
import Foodbody from "../components/Foodbody";

const FoodPage = () => {
	return (
		<main>
			<Header title={"Welcome to Food"} />
			<main className="bg-slate-950">
				<Foodbody />
			</main>
		</main>
	);
};

export default FoodPage;
