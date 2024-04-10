/* eslint-disable react/prop-types */
import FoodCard from "./FoodCard";
import { useFetch } from "../hooks/useFetch";
import { fetchFood } from "../fetch/fetchFood";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FoodSection = ({q, reversed}) => {
    const [keyWord, setKeyWord] = useState(q);

	const handleFood = (query) => {
		setKeyWord(query);
	};

	useEffect(() => {
		handleFood(q);
	}, [q]);

	const { isFetching, error, fetchData: fetchedData } = useFetch(fetchFood, [], keyWord);
	if (error) {
		return <div>{error.message}</div>;
	}

	if (!fetchedData || !keyWord) {
		return <div>Loading...</div>; // or any loading indicator
	}

    let flexReverseClass = 'w-full h-[65vh] bg-slate-100 flex justify-center items-center'

    if(reversed) {
        flexReverseClass += ' flex-row-reverse'
    }

    return (
        <section className="w-full flex flex-col flex-nowrap px-5">
				<div className={flexReverseClass}>
					<div className="w-1/3 bg-inherit h-full">
						<img className="w-full h-full object-cover rounded-3xl" src={fetchedData[0]?.recipe.image} alt="" />
					</div>
					<div className="w-2/3 bg-inherit ps-8 flex flex-col gap-3">
						<h1 className="text-5xl">{fetchedData[0]?.recipe.label}</h1>
						<p>Time to cook: {fetchedData[0]?.recipe.totalTime} minutes</p>
						<h2 className="text-3xl">Ingredients</h2>
						<div className="flex gap-2 flex-wrap">
							{fetchedData[0]?.recipe?.ingredients?.map((item, index) => (
								<span
									className="bg-green-600 text-slate-100 capitalize rounded-full px-3 py-1 me-1"
									key={index}>
									{item?.food}{" "}
								</span>
							))}
						</div>
						<div className="mt-5 transition">
							<button className="explore-link capitalize font-medium px-10 border-b border-slate-900">
								<Link className="" to={`/recipes/`}>
									Explore!
								</Link>
							</button>
						</div>
					</div>
				</div>
				<div className="carousel relative overflow-x-scroll bar w-full h-full bg-slate-100 flex gap-4 mt-5">
					{isFetching && <div className="text-5xl text-red-600">Wainting to fetch data</div>}
					{fetchedData.splice(1, 4).map((recipe) => {
						let image;
						if (recipe.recipe.images && recipe.recipe.images.LARGE) {
							image = recipe.recipe.images.LARGE.url;
						} else {
							image = recipe.recipe.image;
						}

						return (
							<FoodCard
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
			</section>
    )
}

export default FoodSection