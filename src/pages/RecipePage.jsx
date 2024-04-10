import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipe, fetchFood } from "../fetch/fetchFood";
import Header from "../components/Header";
import FoodBody from "../components/FoodCard";

const RecipePage = () => {
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState([]);
	const { id } = useParams();
	console.log(id);

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

	const getRecommended = async (q) => {
		console.log(q);
		const data = await fetchFood(q.split(" ").splice(0, 1));
		setRecipes(data);
	};

	useEffect(() => {
		getRecommended(recipe?.label);
	}, [recipe?.label]);

	useEffect(() => {
		getRecipe(id);
	}, [id]);

	if (isLoading) {
		return <div>Is loading</div>;
	}

	if (!recipe) {
		return <div>Is loading</div>;
	}

	console.log(recipe);
	return (
		<>
			<div>
				{recipe && (
					<Header title={recipe?.label} image={recipe?.images?.LARGE?.url ?? recipe?.image} />
				)}
			</div>
			<div className="bg-slate-100 w-full flex flex-col justify-center items-center container mx-auto">
				<div className="mt-20">World cousine: {recipe?.cuisineType[0] || "Not Specified"}</div>
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
				<div className="grid grid-cols-2 w-full mt-16">
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
											{/* <p className="text-xl text-green-600">{ingredient.food}</p> */}
											<p>{ingredient.text}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="flex flex-col">
						<h1 className="text-5xl font-bold capitalize mb-16">Related recipes</h1>
						<div className="grid grid-cols-2 gap-5">
							{isLoading && <div className="text-5xl text-red-600">Wainting to fetch data</div>}
							{recipes.splice(1, 6).map((recipe) => {
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
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecipePage;
