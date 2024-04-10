import FoodSection from "./FoodSection";

const HomeBody = () => {

	return (
		<main className="flex flex-col gap-5">
            <FoodSection q={'salad'} />
            <FoodSection q={'beef'}/>
            <FoodSection q={'desert'} />
		</main>
	);
};

export default HomeBody;
