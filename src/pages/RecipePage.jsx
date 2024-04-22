import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchRecipe, fetchFood } from "../fetch/fetchFood";
import Header from "../components/Header";
import FoodBody from "../components/FoodCard";

const RecipePage = () => {
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState("");
	const { id } = useParams();

	const { isFetching, error, fetchData: fetchedData } = useFetch(fetchFood, [], query);
	const getRecipe = async (id) => {
		try {
			setIsLoading(true);

			const data = await fetchRecipe(id);
			setRecipe(data);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getRecipe(id);
		setQuery(recipe?.label);
	}, [recipe?.label, id]);

	let spanClass = "bg-green-600 text-slate-100 capitalize rounded-full px-3 py-1 me-1";

	if (isLoading) {
		console.log("loading");
		return <div>Is loading</div>;
	}

	if (error) {
		console.log(error.message);
		return <div>Error {error.message}</div>;
	}

	if (recipe === null) {
		console.log("null");
		return <div>Is loading</div>;
	}

	console.log(typeof recipe.totalNutrients);
	return (
		<>
			{recipe && !isLoading && (
				<main>
					<div>
						{recipe && (
							<Header
								title={recipe?.label}
								image={recipe?.images?.LARGE?.url ?? recipe?.image}
								info={recipe?.cuisineType[0]}
							/>
						)}
					</div>
					<div className="bg-slate-100 w-full flex flex-col justify-center items-center container mx-auto">
						<div className="mt-20">{recipe?.mealType[0] || "Not Specified"}</div>
						<div className="mt-10 flex gap-8">
							<span className="bg-green-600 text-slate-100 capitalize rounded-full px-3 py-1 me-1">
								{(recipe.calories?.toFixed() / 1000).toFixed()} kcal
							</span>
							<span className="bg-green-600 text-slate-100 capitalize rounded-full px-3 py-1 me-1">
								{recipe.totalWeight?.toFixed()} g
							</span>
							<span className="bg-green-600 text-slate-100 capitalize rounded-full px-3 py-1 me-1">
								{recipe.yield} servings
							</span>
						</div>
						<div className="grid grid-cols-2 w-full my-16">
							<div className="">
								<div>
									<h1 className="text-5xl font-bold capitalize">ingredients</h1>
									<ul className="mt-16">
										{recipe.ingredients.map((ingredient, index) => (
											<li key={index}>
												<div className="flex gap-5 pb-2">
													<img
														className="w-7 h-7 object-cover rounded-xl"
														src={ingredient.image}
														alt=""
													/>
													<p>{ingredient.text}</p>
												</div>
											</li>
										))}
									</ul>
								</div>
								<div>
									<h1 className="text-5xl font-bold capitalize my-16">nutirents</h1>
									<div className="flex flex-wrap gap-3">
										{Object.keys(recipe.totalNutrients).map((key, index) => {
											const nutrient = recipe.totalNutrients[key];
											return (
												<span key={index} className={spanClass}>
													{nutrient?.label}
												</span>
											);
										})}
									</div>
								</div>
							</div>
							<div className="flex flex-col">
								<h1 className="text-5xl font-bold capitalize mb-16">Related recipes</h1>
								<div className="grid grid-cols-2 gap-5">
									{isFetching && (
										<div className="text-5xl text-red-600">Wainting to fetch data</div>
									)}
									{recipe?.label ? (
										fetchedData.splice(1, 6).map((recipe) => {
											let image;
											if (recipe.recipe.images && recipe.recipe.images.LARGE) {
												image = recipe.recipe.images.LARGE.url;
											} else {
												image = recipe.recipe.image;
											}

											return (
												<FoodBody
													key={recipe.recipe.url}
													bgImage={image}
													title={recipe.recipe.label}
													info={recipe.recipe.mealType}
													cuisine={recipe.recipe.cuisineType}
													uri={recipe.recipe.uri}
												/>
											);
										})
									) : (
										<div className="text-5xl text-red-600">Wainting to fetch data</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default RecipePage;
