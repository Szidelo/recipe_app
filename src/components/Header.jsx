/* eslint-disable react/prop-types */
import { banner1, banner2, banner3, banner4 } from "../banner";

const Header = ({ title, image, info, mode }) => {
	const BANNERS = [banner1, banner2, banner3, banner4];

	let headClass;
	let maskClass;

	if (mode === "full") {
		headClass = "w-full h-[100vh]";
		maskClass = "h-full";
	} else {
		headClass = "w-full h-[66.66vh]";
		maskClass = "h-2/3";
	}

	return (
		<header className={headClass}>
			<div className="relative w-1/2 h-full ms-auto">
				<img
					className="w-full h-full object-cover"
					src={image ?? BANNERS[Math.round(Math.random() * (BANNERS.length - 1))]}
					alt="food"
				/>
			</div>
			<div
				className={`absolute flex justify-center items-center w-full ${maskClass} top-0 left-0 z-10 bg-gradient-to-r from-50% from-slate-950 to-transparent`}>
				<div className="flex-1">
					<h1 className="text-5xl text-center font-bold text-white">{title}</h1>
					{info ? (
						<div className="text-md mt-4 text-center text-green-500 bg-[#00000090] px-6 py-4 rounded-full capitalize">
							<p>{info} cuisine</p>
						</div>
					) : (
						<div className="text-sm mt-4 text-center text-green-500 bg-[#00000090] px-6 py-4 rounded-full ">
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, nulla!</p>
						</div>
					)}
				</div>
				<div className="flex-1"></div>
			</div>
		</header>
	);
};

export default Header;
