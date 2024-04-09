import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
	const locationPath = useLocation();
	const [location, setLocation] = useState();
	const links = [
		{
			name: "home",
			path: "/",
		},
		{ name: "BMI", path: "/bmi" },
		{ name: "food", path: "/recipes" },
		{ name: "cocktails", path: "/cocktails" },
		{ name: "contact", path: "/contact" },
	];

	useEffect(() => {
		setLocation(locationPath.pathname);
	}, [locationPath.pathname]);
	return (
		<header className="w-full px-20 py-5 bg-[#00000099] flex justify-around z-20 nav">
			<div>
				<a className="text-green-600 font-bold text-3xl" href="./">
					LOGO
				</a>
			</div>
			<nav className="w-full">
				<ul className="flex justify-center items-center w-full gap-6">
					{links.map((link) => {
						let cssClasses = "slide-link text-green-600 capitalize font-medium px-3 py-1";
						return (
							<li
								onClick={() => setLocation(link.path)}
								className={location === link.path ? `${cssClasses} active-link` : cssClasses}
								key={link.path}>
								<Link className="px-4 py-3 w-full h-full" to={link.path}>{link.name}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
