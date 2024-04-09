/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
// import { IoSearchSharp } from "react-icons/io5";

const Input = forwardRef(function ({ label, textarea, isSearchInput, ...props }, ref) {
	const classes =
		"w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

	if (isSearchInput) {
		return (
			<input
				ref={ref}
				className="bg-slate-600 rounded-3xl px-7 py-3 w-[800px] text-slate-100 focus:outline-none target:outline-none"
				{...props}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-1 my-4">
			{label && <label className="text-sm font-bold uppercase text-stone-500">{label}</label>}
			{textarea ? (
				<textarea ref={ref} className={classes} {...props}></textarea>
			) : (
				<input ref={ref} className={classes} {...props} />
			)}
		</div>
	);
});

export default Input;
