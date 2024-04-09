import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="h-lvh w-full bg-slate-800 flex flex-col justify-center items-center">
			<h1 className="text-slate-200 text-6xl mb-5">404 page not found!</h1>
   
				<button className="slide-link border-solid border-green-600 border text-green-600 capitalize font-medium px-10 py-1">
					<Link className="" to={"/"}>
						Back to homepage
					</Link>
				</button>
		
		</div>
	);
}

export default NotFound;
