import { useState, useRef } from "react";
import Input from "./Input";
import FoodCard from './FoodCard'
import { useFetch } from "../hooks/useFetch";
import { fetchFood } from "../fetch/fetchFood";
import { IoSearchSharp } from "react-icons/io5";

const Foodbody = () => {

    const [keyWord, setKeyWord] = useState("chicken");

	const food = useRef();

	const handleSearch = () => {
		setKeyWord(food.current.value);
		food.current.value = ''
	};

	const { isFetching, error, fetchData: fetchedData } = useFetch(fetchFood, [], keyWord);
    console.log(fetchedData)

	if (error) {
		return <div>{error.message}</div>;
	}

	if (!fetchedData) {
		return <div>Loading...</div>; // or any loading indicator
	}
  return (
    <>
        <section className="w-full flex justify-center py-8">
				<div className="relative">
					<Input type="text" ref={food} isSearchInput={true} placeholder='Search food...'/>
					<IoSearchSharp
						className="search-icon bg-transparent text-slate-200 hover:bg-slate-800 "
						onClick={handleSearch}
					/>
				</div>
			</section>
			<section>
				<div className="py-20 px-6">
					<h1 className="text-green-600 text-3xl">HELLLLLLLLLLLLLLLL</h1>
					{isFetching && <div className="text-5xl text-red-600">Wainting to fetch data</div>}

					{!isFetching && (
						<div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
							{fetchedData.map((recipe) => {
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
					)}
				</div>
			</section>
    </>
  )
}

export default Foodbody