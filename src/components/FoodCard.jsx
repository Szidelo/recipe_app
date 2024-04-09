/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ bgImage, title, info, cuisine, uri }) => {
    const initialStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        transition: 'background-size 0.3s ease'
    }
    const [style, setStyle] = useState(initialStyle)
	const id = uri?.split("#")[1]

    const handleHover = () => {
        setStyle((prevStyle) => {
            return {
                ...prevStyle,
                filter: `${blur('200%')}`,
            }
        } )
    }
	return (
		<div
			className="card transition rounded-3xl"
            onMouseEnter={handleHover}
            onMouseLeave={() => setStyle(initialStyle)}
			style={{
				...style
			}}>
			<div className="card-content">
				<h2 className="transition ">{title}</h2>
				<p>{info}</p>
				<span className="py-2">Type: {cuisine}</span>
				<div className="mask"></div>
			</div>
			<div className="cta-container transition">
				<button className="slide-link border-solid border-green-600 border text-green-600 capitalize font-medium px-10 py-1">
					<Link className="" to={`/recipes/${id}`} >
						Explore!
					</Link>
				</button>
			</div>
			<div className="card_circle transition"></div>
		</div>
	);
};

export default Card;
