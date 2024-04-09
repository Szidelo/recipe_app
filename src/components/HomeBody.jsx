import FoodSection from "./FoodSection";

const HomeBody = () => {

	return (
		<main>
            <FoodSection q={'salad'} />
            <FoodSection q={'beef'}/>
            <FoodSection q={'desert'} />
		</main>
	);
};

export default HomeBody;
