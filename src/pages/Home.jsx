/* eslint-disable react/prop-types */
import Header from "../components/Header";
import HomeBody from "../components/HomeBody";

const Home = () => {
	return (
		<main>
			<Header title={"Welcome to LesMunchees"} info={false} mode={'full'}/>
			<HomeBody />
		</main>
	);
};

export default Home;
